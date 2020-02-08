/**
 *
 * A simple middleware class.
 *
 */
class Middleware {
  use(fn) {
    this.go = (stack => next => {
      stack(() => fn(() => next()));
    })(this.go);
  }
  go(next) {
    next();
  }
}

/**
 *
 * A simple caching class.
 *
 */
class Cache {
  constructor(options = {}) {
    const defaults = {
      defaultCache: 0
    };
    this.options = {...defaults, ...options};
    this.db = {};
  }
  set(url, data = {}, time = this.options.defaultCache) {
    this.db[url] = isPromise(data) ? data : JSON.stringify(data);
    if (time) {
      setTimeout(() => {
        delete this.db[url];
      }, time);
    }
  }
  get(url) {
    const data = this.db[url];
    if (data) return isPromise(data) ? data : JSON.parse(data);
  }
}

function isPromise(obj) {
  return typeof obj.then === 'function';
}

/**
 *
 * The Core API
 * This could be used to create many other rest APIs
 * Things like caching, cancelling requests, loading handlers etc
 * should be taken care of there
 *
 * Middleware functions get called before and after
 * requests are made
 *
 */
export default class API {

  constructor(options = {}) {
    this.rest = {};
    this.preFetch = new Middleware();
    this.postFetch = new Middleware();
    this.options = options;
    this.options.cors = options.cors || 'no-cors';
    this.options.cache = options.cache || 'default';
    this.options.origin = options.origin || '';
    this.options.credentials = options.credentials || 'include';
    this.cache = new Cache({defaultCache: options.defaultCache});
  }

  static toQueryString(paramsObject = {}, innerKey) {
    let str = new Array();
    for (const key in paramsObject) {
      if (typeof paramsObject[key] === 'object') {
        str[str.length] = this.toQueryString(paramsObject[key], key);
      }
      else {
        str[str.length] = encodeURIComponent(innerKey ? innerKey : key) + '=' + encodeURIComponent(paramsObject[key]);
      }
    }
    return str.join('&');
  }

  /**
   * Add endpoint
   * @param {Object} config
   * @param {string} config.root - the path the endpoint should be accessable at
   * @param {string} config.method - the method
   * @return {undefined}
   */
  addEndPoint(config) {
    const valid_methods = ['get', 'post', 'put', 'delete'];
    let endpoint = this.rest;
    config.root.split('/').forEach(folder => {
      if (!endpoint[folder]) endpoint[folder] = {};
      endpoint = endpoint[folder];
    });
    valid_methods.forEach(method => {
      if (typeof config[method] === 'function') {
        endpoint.root = config.root;
        endpoint[method] = config[method];
      }
    });
  }

  check(params) {
    const checkRequired = (bundle, params) => {
      const method = bundle.method;
      const exists = value => {
        let val = bundle.config[value];
        val = val === void 0
          ? ''
          : Array.isArray(val)
            ? val.join('\n')
            : typeof val === 'object'
              ? JSON.stringify(val)
              : '' + val;
        return !!val;
      };
      (Array.isArray(params) ? params : [params]).forEach(obj => {
        const { one_of, all_of } = obj;
        const condition = 'condition' in obj ? obj.condition : true;
        if (condition && one_of && !one_of.some(exists)) {
          throw new TypeError(`${method}: one of {${one_of.join(' | ')}} must be defined`);
        }
        if (condition && all_of && !all_of.every(exists)) {
          throw new TypeError(`${method}: {${all_of.join(' & ')}} must be defined`);
        }
      });
    };
    const checkDependencies = (bundle, dependencies) => {
      const { config, method } = bundle;
      ((Array.isArray(dependencies) ? dependencies : [dependencies])).forEach(dependency => {
        if (!dependency.require || !dependency.fields) {
          throw new TypeError('checkDependencies: each dependency must have "fields" and "require"');
        }
        if (config[dependency.require] !== void 0) return;
        dependency.fields.forEach(field => {
          if (config[field] === void 0) return;
          throw new ReferenceError(`${method}:${field} require(s) ${dependency.require}`);
        });
      });
    };
    [params.bundle, params.bundle.method, params.bundle.config]
      .forEach(param => {
        if (!param) {
          throw new TypeError('check: params.bundle must contain method and config');
        }
      });
    if (params.required) checkRequired(params.bundle, params.required);
    if (params.dependencies) checkDependencies(params.bundle, params.dependencies);
  }

  request(endpoint, config = {}, options = {}) {
    const api = this;
    const mode = this.options.cors;
    const cache = this.options.cache;
    const method = config.meta.requestType || 'GET';
    const content = config.meta.contentType || 'json';
    const credentials = this.options.credentials;
    const headers = new Headers({});
    const successCode = [].concat(config.meta.successCode);
    const unauthorizedHandler = this.options.unauthorizedHandler;
    const settings = {
      mode,
      cache,
      method,
      headers,
      credentials
    };
    const contentMap = {
      'xml': 'text',
      'json': 'json',
      'multipart': 'blob'
    };
    const authorization = typeof this.options.authorization === 'function'
      ? this.options.authorization()
      : false;

    if (!config.data) config.data = {};

    if (authorization) {
      headers.set('Authorization', authorization);
    }

    if (content === 'json') {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        settings.body = JSON.stringify(config.data);
      }
    }
    if (content === 'multipart') {
      // headers.set('Accept', 'application/json');
      if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        const fd = new FormData(config.data);
        Object.keys(config.data).forEach(field => {
          if (options.undefined === false && config.data[field] === void 0) {
            // do nothing
          }
          else {
            fd.append(field, config.data[field]);
          }
        });
        settings.body = fd;
      }
    }

    if (method === 'GET') {
      const paramsString = API.toQueryString(config.data);
      if (paramsString) {
        endpoint.push(`?${paramsString}`);
      }
    }

    const url = endpoint.join('/');
    api.data = {url, settings};
    api.preFetch.go(next => {}); // eslint-disable-line no-unused-vars

    return new Promise(resolve => {
      if (options.urlOnly) {
        return resolve(url);
      }
      if (method === 'GET') {
        const data = api.cache.get(url);
        if (data) {
          if (isPromise(data)) return data;
          else resolve(data);
        }
      }
      const promise = fetch(url, settings)
        .then(response => {
          if (response.ok) {
            if (Math.floor(response.status / 100) === 2) {
              let contentType = contentMap[content];
              const format = method === 'GET' && contentType !== 'json' ? contentType : 'json';
              if (response.status === 204 || response.status === 201) {
                resolve({status: response.status, message: response.statusText});
              } else {
                return response[format]().then(data => {
                    const meta = {method, contentType, url};
                    for (let [key, val] of response.headers.entries()) {
                      meta[key] = val;
                    }
                    api.data = {data, meta, options, error: false};
                    api.postFetch.go(next => {}); // eslint-disable-line no-unused-vars
                    if (method === 'GET' && options.cacheFor) {
                      api.cache.set(url, api.data, options.cacheFor);
                    }
                    resolve(api.data);
                });
              }
            }
          } else {
            // unauthorized
            if (response.status === 401) {
              unauthorizedHandler(() => {
                api
                  .request(endpoint, config, options)
                  .then(result => {
                    return resolve(result);
                  });
              });
            }
            // any other error
            else {
              let status = successCode.includes(response.status) ? response.status : "UNKNOWN!!";
              return response.json().then(data => {
                resolve({
                  error: true,
                  status: status,
                  title: `Looks like there was a problem. Status Code: ${status}`,
                  message: data.message
                });
              });
            }
            // push error further for the next `catch`, like
            return Promise.reject(response);
          }
        })
        .catch(err => {
          resolve({
            error: true,
            message: 'Fetch Error :-S', err
          });
        });
      // TODO: make caching promises work
      // currently returns undefined
      // if (method === 'GET' && options.cacheFor) {
      //   api.cache.set(url, promise, options.cacheFor);
      // }
    });

  }
}

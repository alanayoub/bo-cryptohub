/**
 *
 * @param {Function} method
 * @param {Object} options
 *
 * TODO: Add caching
 *
 */
async function paginate(method, options, cachePrefix) {

  // const { to } = require('await-to-js');
  // const cache = require('./cache');

  // const key = `${cachePrefix}-${JSON.stringify(options)}`;
  // let error, data, response;

  // [error, data] = await to(cache.getAsync(key));
  // if (error) throw new Error(error);
  // if (data !== null) return data;

  // response = await method(options);
  // { data } = response;
  // while (octokit.hasNextPage(response)) {
  //   response = await octokit.getNextPage(response);
  //   data = data.concat(response.data);
  // }
  // [error] = await to(cache.setAsync(key, data));
  // if (error) console.log(`paginate(): ${error}`);
  // return data;

}

module.exports = {
  paginate,
};

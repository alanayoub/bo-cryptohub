/**
 *
 * @param {Function} method
 * @param {Object} octokitOptions
 * @param {String} cacheKey
 * @param {Number} cacheFor - in days
 *
 */
const log = require('single-line-log').stdout;
async function paginate(method, octokitOptions, cacheKey, cacheFor) {

  const { to } = require('await-to-js');
  const octokit = require('@octokit/rest')();
  let response;
  let [data, age] = global.cache.get(cacheKey);

  if (!data || age > cacheFor) {
    console.log('paginate(): Fetching lots of data, this could take a while...');
    let count = 0;
    response = await method(octokitOptions);
    log(`paginate(): ${cacheKey}:${++count}`);
    let { data } = response;
    while (octokit.hasNextPage(response)) {
      response = await octokit.getNextPage(response);
      data = data.concat(response.data);
      log.clear();
      log(`paginate(): ${cacheKey}:${++count}`);
    }
    global.cache.set(cacheKey, JSON.stringify(data));
    return data;
  }
  else {
    return JSON.parse(data);
  }

}

module.exports = {
  paginate,
};

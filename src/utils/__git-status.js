/**
 *
 * @param {String} path
 * @return {Array} git status
 *
 */
const git = require('nodegit');
const { to } = require('await-to-js');
module.exports = async function gitStatus(path) {
  try {
    const repository = await git.Repository.open(path);
    const [error, statusArr] = await to(repository.getStatus({}));
    console.log(`gitStatus(): Got status for ${path}`);
    return statusArr;
  }
  catch(error) {
    console.log(`gitStatus(): Failed to get status for ${path}`);
    return {error: true, message: `gitStatus(): ${error}`};
  }
}

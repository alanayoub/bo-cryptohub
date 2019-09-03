/**
 *
 * Checkout repo at branch
 * @param {String} path
 * @param {String} branch
 *
 */
const git = require('nodegit');
module.exports = async function gitCheckoutBranch(path, branch) {
  try {
    const repository = await git.Repository.open(path);
    repository.checkoutBranch(branch);
    console.log(`gitCheckoutBranch(): Checked out branch:${branch} from ${path}`);
    return true;
  }
  catch(error) {
    console.log(`gitCheckoutBranch(): Failed to checked out branch:${branch} from ${path}`);
    return {error: true, message: `gitCheckoutBranch(): ${error}`};
  }
}

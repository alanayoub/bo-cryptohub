/**
 *
 * @param {String} path - absolute path to repo
 * @param {String} hash - commit to checkout
 * @return {Boolean}
 *
 */
const git = require('nodegit');
module.exports = async function gitCheckout(path, hash) {
  try {
    const repository = await git.Repository.open(path);
    const commit = await repository.getCommit(hash);
    await repository.setHeadDetached(commit.id(), repository.defaultSignature(), `Checkout: HEAD ${commit.id()}`);
    await git.Checkout.tree(repository, commit.sha(), {checkoutStrategy: git.Checkout.STRATEGY.FORCE});
    console.log(`gitCheckout(): Checked out ${hash} from ${path}`);
    return true;
  }
  catch (error) {
    console.log(`gitCheckout(): Failed to checked out ${hash} from ${path}`);
    return {error: true, message: `gitCheckout(): ${error}`};
  }
}

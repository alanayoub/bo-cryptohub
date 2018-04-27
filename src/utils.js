/**
 *
 * Get the current date in the format yyyy/mm/dd
 *
 */
function getCurrentDate() {
  const nowDate = new Date();
  const yyyy = nowDate.getFullYear();
  const mm = (nowDate.getMonth() + 1).toString().padStart(2, 0);
  const dd = nowDate.getDate().toString().padStart(2, 0);
  return `${yyyy}-${mm}-${dd}`;
}

/**
 *
 * @param {Object} object - any type of object
 *
 */
function typeOfData(object) {
  return Object.prototype.toString.call(object).replace(/^\[object (.*)\]$/, '$1');
}

/**
 *
 * @param {String} message
 *
 */
function logHeader(message) {
  console.log(
      '----------------------------------------------------------------\n'
    + '-                                                              -\n'
    + ' ' + message +                                                 '\n'
    + '-                                                              -\n'
    + '----------------------------------------------------------------\n'
  );
}

/**
 *
 * Get all directories in directory (not deep)
 * @param {String} path
 * @param {Boolean} full - fully qualified path
 *
 */
function getDirs(path, full = false) {
  const { resolve, basename } = require('path');
  const { lstatSync, readdirSync } = require('fs');
  const isDirectory = path => lstatSync(path).isDirectory();
  let dirs = readdirSync(path)
    .map(name => resolve(path, name))
    .filter(isDirectory);
  if (!full) dirs = dirs.map(p => basename(p));
  return dirs;
}

/**
 *
 * Array difference
 * @param {Array} a
 * @param {Array} b
 *
 */
function arrayDiff(a, b) {
  return a.filter(i => !b.includes(i));
}

/**
 *
 * @param {String} path - absolute path to repo
 * @param {String} hash - commit to checkout
 * @return {Boolean}
 *
 */
async function gitCheckout(path, hash) {
  const git = require('nodegit');
  return new Promise(async resolve => {
    try {
      const repository = await git.Repository.open(path);
      const commit = await repository.getCommit(hash);
      await repository.setHeadDetached(commit.id(), repository.defaultSignature(), `Checkout: HEAD ${commit.id()}`);
      await git.Checkout.tree(repository, commit.sha(), {checkoutStrategy: git.Checkout.STRATEGY.FORCE});
      console.log(`gitCheckout(): Checked out ${hash} from ${path}`);
      resolve(true);
    }
    catch(error) {
      console.log(`gitCheckout(): Failed to checked out ${hash} from ${path}`);
      resolve({error: true, message: `gitCheckout(): ${error}`});
    }
  });
}

async function gitCheckoutBranch(path, branch) {
  const git = require('nodegit');
  return new Promise(async resolve => {
    try {
      const repository = await git.Repository.open(path);
      repository.checkoutBranch(branch);
      console.log(`gitCheckoutBranch(): Checked out branch:${branch} from ${path}`);
      resolve(true);
    }
    catch(error) {
      console.log(`gitCheckoutBranch(): Failed to checked out branch:${branch} from ${path}`);
      resolve({error: true, message: `gitCheckoutBranch(): ${error}`});
    }
  });
}

/**
 *
 * @param {String} path - absolute path to repo
 * @return {Array|Object} - An array of commits or an error object
 *
 * TODO: What else can we get from the log? number of changes etc?
 *
 */
async function gitLog(path, branch) {
  const git = require('nodegit');
  const { to } = require('await-to-js');

  try {
    // TODO: at the moment if an incorrect path is used nothing is returned and it hangs
    console.log(`gitLog(): Getting log for ${path}`);
    // let repository;

    let repo;
    let error;
    let commit;

    [error, repo] = await to(git.Repository.open(path));
    if (error) throw new Error(`gitLog(): Repository.open(): ${error}`);
    [error] = await to(repo.fetch('origin'));
    if (error) throw new Error(`gitLog(): repo.fetch(): ${error}`);
    [error] = await to(repo.mergeBranches(branch, `origin/${branch}`));
    if (error) throw new Error(`gitLog(): repo.mergeBranches(): ${error}`);
    if (repo.isEmpty()) {
      return [];
    }
    [error, commit] = await to(repo.getBranchCommit(`refs/remotes/origin/${branch}`));
    if (error) throw new Error(`gitLog(): repo.getBranchCommit(): ${error}`);

    if (!commit) return [];

    const history = commit.history();
    history.on('commit', commit => {});
    history.on('end', commits => {
      const results = [];
      let author;
      let details;
      for (let [i, commit] of commits.entries()) {
        author = commit.author();
        details = {
          hash: commit.sha(),
          date: commit.date(),
          author: {
            name: author.name(),
            email: author.email(),
          },
          message: commit.message(),
        };
        results.unshift(details);
      }
      console.log(`gitLog(): Got log for ${path} (${results.length} items)`);
      return results;
    });
    history.on('error', error => {
      return {error: true, message: error}
    });
    history.start();

    // git.Repository
    //   .open(path)
    //   .then(repo => {
    //     repository = repo;
    //     repository.fetch('origin');
    //   })
    //   .then(() => {
    //     repository.mergeBranches(branch, `origin/${branch}`);
    //   })
    //   .then(() => {
    //     if (repository.isEmpty()) {
    //       resolve([]);
    //       return false;
    //     }
    //     return repository.getBranchCommit(`refs/remotes/origin/${branch}`);
    //   })
    //   .then(commit => {

    //     if (!commit) resolve([]);

    //     const history = commit.history();

    //     history.on('commit', commit => {});

    //     history.on('end', commits => {
    //       const results = [];
    //       let author;
    //       let details;
    //       for (let [i, commit] of commits.entries()) {
    //         author = commit.author();
    //         details = {
    //           hash: commit.sha(),
    //           date: commit.date(),
    //           author: {
    //             name: author.name(),
    //             email: author.email(),
    //           },
    //           message: commit.message(),
    //         };
    //         results.unshift(details);
    //       }
    //       console.log(`gitLog(): Got log for ${path} (${results.length} items)`);
    //       resolve(results);
    //     });

    //     history.on('error', error => resolve({error: true, message: error}));

    //     history.start();

    //   });
  }
  catch(error) {
    console.log(`gitLog(): ${error}`);
  }

}

/**
 *
 * Save commits to db if they don't alrady exist
 * @param {Array} log - array of commits
 * @param {String} project - project/repo
 * @return {Array} array of Commit objects
 *
 */
async function dbSaveCommits(log, project) {

    try {

      const { to } = require('await-to-js');
      const { Commit } = require('./db-schema');
      const commits = [];
      let error;
      let dbCommit;
      let savedCommit;

      for (let [i, commit] of log.entries()) {
        [error, dbCommit] = await to(Commit.findOne({hash: commit.hash}).exec());
        if (error) throw new Error(`saveCommits(): ${error}`);
        if (dbCommit) {
          // console.log(`savedCommits(): Skipping, ${commit.hash} already exists for ${project}`);
          commits.push(dbCommit);
        }
        else {
          [error, savedCommit] = await to(Commit.create(commit));
          if (error) throw new Error(error);
          // console.log(`savedCommits(): Creating new commit ${commit.hash} for ${project}`);
          commits.push(savedCommit);
        }
      };

      return commits;

    }
    catch(error) {
      console.log(`saveCommits(): ${error}`);
      return false;
    }

}

/**
 *
 */
function get(uri) {
  const rp = require('request-promise');
  return rp({
    uri,
    json: true,
    headers: {'user-agent': 'node.js'},
  });
}

module.exports = {
  getDirs,
  arrayDiff,
  logHeader,
  typeOfData,
  getCurrentDate,

  // resource
  get,

  // git
  gitLog,
  gitCheckout,
  gitCheckoutBranch,

  // db
  dbSaveCommits,
};

'use strict';

// Node
const glob = require('glob');
const { join, dirname, basename } = require('path');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Project, Commit, Repo } = require('./db-schema');
const { arrayDiff, logHeader, getDirs, gitCheckout, gitCheckoutBranch, gitLog } = require('./utils.js');

/**
 *
 * hashFiles();
 * ---------------
 * loop over repos
 * if first commit hash all files else hash changed files
 *
 */
module.exports = async function hashFiles() {

  /**
   *
   * Make sure every repo is at the correct commit as defined in the DB.
   * If no commit is registered for a repo go to the first commit
   * Save commit information to Commit schema and reference in Reop
   *
   * @param {Array} commitLog
   * @param {String} project
   *
   */
  async function syncCommits() {

    async function saveCommits(commitLog, project) {
      new Promise(async resolve => {
        try {
          for (let [i, commit] of commitLog.entries()) {
            const _id = commit.hash;
            const [error, dbCommit] = await to(Commit.findOne({_id: _id}));
            if (error) throw new Error(`saveCommits(): ${error}`);
            if (dbCommit) {
              const dbDate = +dbCommit.commit.date;
              const newDate = +commit.date;
              if (newDate < dbDate) {
                debugger
                // replace commit
              }
            }
            else {
              const doc = {_id, project, commit};
              await to(Commit.create(doc));
            }
          };
          resolve(true);
        }
        catch(error) {
          console.log(`saveCommits(): ${error}`);
        }
      });
    }

    return new Promise(async resolve => {

      try {
        let log;
        let path;
        let error;
        let repos;
        let commit;
        [error, repos] = await to(Repo.find({}));
        if (error) throw new Error(`Repo.find(): ${error}`);
        for (let [i, repo] of repos.entries()) {
          path = `projects/${repo._id}`;
          [error] = await to(gitCheckoutBranch(path, 'master'));
          if (error) throw new Error(`gitCheckoutBranch(): ${error}`);
          [error, log] = await to(gitLog(path));
          if (error) throw new Error(`gitLog(): ${error}`);
          else {
            console.log(`syncCommits(): Saved commit info to commits collection for ${path}`);
          }
          await saveCommits(log, repo.project);
          repo.log = JSON.stringify(log);
          if (!repo.commit) {
            commit = repo.commit = log[0].hash;
          }
          else {
            commit = repo.commit;
          }
          [error] = await to(gitCheckout(path, commit));
          if (error) throw new Error(`gitCheckout(): ${error}`);
          [error] = await to(repo.save());
          if (error) throw new Error(`repo.save(): ${error}`);
          else {
            console.log(`syncCommits(): Saved repo.commit and repo.log for ${path}`);
          }
        }
        resolve(true);
      }
      catch(error) {
        console.log(`syncCommits(): ${error}`);
        resolve(false);
      }

    });

  }

  /**
   *
   */
  async function hashAllFiles() {
    new Promise(async resolve => {
      try {
        let error;
        let repos;
        [error, repos] = await to(Repo.find({}));
        if (error) throw new Error(`Repo.find(): ${error}`);
        // For each repo
        for (let [i, repo] of repos.entries()) {
          const commit = repo.commit;
          const log = JSON.parse(repo.log);
          const idx = log.findIndex(c => c.hash = commit);
          if (idx === 0) {
            // For all Files: HashFiles()
            // todo await!
            glob(`projects/${repo._id}/**/*.*`, {}, (error, files) => {
              if (error) throw new Error();
              files.forEach(path => {
                hashFile(repo.project, repo._id, path);
              });
            });
          }
          // Go to the next commit in repo.log
          else {
            const nextCommit = log[idx];
            [error] = await to(gitCheckout(`projects/${repo._id}`, nextCommit.hash));
            // For all changed files: HashFiles()
          }
          // Update repo.commit
        }
        resolve(true);
      }
      catch(error) {
        console.log(`hashAllFiles(): ${error}`);
        resolve(false);
      }
    });

    // return new Promise(async resolve => {
    //   var results = [];
    //   //
    //   // log a hash of all files in folder
    //   //
    //   glob(`projects/bitcoin/**/*.*`, {}, (error, files) => {
    //     // files.forEach(path => {
    //       // fs.readFile(path, 'utf8', (error, contents) => {
    //       //   var md5 = crypto.createHash('md5');
    //       //   var item = md5.update(contents).digest('hex');
    //       //   results.push(item);
    //       //   console.log(`${path}\n${item}\n`);
    //       //   // console.log(item);
    //       // });
    //     // });
    //     debugger
    //     // TODO: count times filetype is used, maybe chars too?
    //     files.map(file => {
    //       return file.split('.').pop();
    //     })
    //   });
    //   debugger;
    //   resolve(true);
    // });

  }

  /**
   *
   */
  async function hashFile(projectName, repo, path) {
    console.log(`Hashing ${path}`);
    // fs.readFile(path, 'utf8', (error, contents) => {
    //   var md5 = crypto.createHash('md5');
    //   var item = md5.update(contents).digest('hex');
    //   results.push(item);
    //   console.log(`${path}\n${item}\n`);
    //   // console.log(item);
    // });
  }

  /**
   *
   */
  async function doOtherSTuff() {

    //
    // For each repo
    //  go to Master
    //    do stuff...
    //

    //
    // What do we want to see?
    // -----------------------
    //
    // 1. commit average message length
    // 2. language split
    // 3. that there are tests, test coverage if possible
    // 4. number of core team
    // 5. number of contributors
    // 6. exclude libraries
    // 7. stars, watchers, forked
    // 8. forkes in, has this repo forked other repos or did it start as a fork?
    // 9. branches and tags, how many? legit names?
    // 10. documentation, how many and length of md files
    // 11. WE NEED ALL THIS INFO FROM WHEN THE PROJECT WAS FORKED. WE NEED TO KNOW ORIGINAL CODE
    // 12. team member ratings, from github?
    // 13. cryptocompaire rankings?
    // 14. Get youtube crypto peeps predictions and check for correlations
    // 15. Whitespace, comments, authors
    //

    // const schema = {
    //   bitcoin: {
    //     history: [
    //       // ...all this same info for each commit
    //     ],
    //     commits: 32,
    //     avgCommitMsgLen: 10,
    //     testCoverage: 50,
    //     numFiles: 2
    //     size: 123,
    //     loc: 23
    //     files: {
// l         js: {
    //         numFiles: 2
    //         size: 123,
    //         loc: 23
    //       },
    //       h: {
    //         numFiles: 2
    //         size: 123,
    //         loc: 23
    //       },
    //       cpp: {
    //         numFiles: 2
    //         size: 123,
    //         loc: 23
    //       }
    //     }
    //   }
    // }

    // _id: String,          // hash of file
    // length: Number,
    // project: String,
    // repo: String,
    // active: Boolean,
    // date: Date,
    // copies: [
    //   {project: String, date: Date, active: Boolean}
    // ]


  }

  return new Promise(async resolve => {
    logHeader('Hashing Files');
    // await syncCommits();
    await hashAllFiles();
    resolve();
  });
};

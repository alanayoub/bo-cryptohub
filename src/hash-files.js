// Node
const fs = require('fs');
const glob = require('globby');
const crypto = require('crypto');
const { join, dirname, basename } = require('path');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Project, File, Repo } = require('./db-schema');
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
   * Save commit information to Commit schema and reference in Reop
   *
   */
  async function syncCommits() {

    return new Promise(async resolve => {

      try {
        let log;
        let path;
        let error;
        let repos;
        [error, repos] = await to(Repo.find({}));
        if (error) throw new Error(`Repo.find(): ${error}`);
        for (let [i, repo] of repos.entries()) {
          path = `projects/${repo._id}`;
          [error] = await to(gitCheckoutBranch(path, 'master'));
          if (error) throw new Error(`gitCheckoutBranch(): ${error}`);
          if (repo.commit) {
            [error] = await to(gitCheckout(path, commit));
            if (error) throw new Error(`gitCheckout(): ${error}`);
          }
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
   * Hash all files in all repos
   * Start at the commit registered at repo.commit
   * TODO: Set overwrite to start again from the first commit
   * TODO: remove all this new Promise stuff, we dont need it as async functions return a promise by default
   *
   * ---------------------------------
   * NOTE: This doest work because oldCommit.date and newCommit.date will be the same for forked stuff, but this
   * will work only for copied files. For forked stuff we should find the commit where the project started and work
   * from there on only, dont run firstCommit in thoes cases
   * ---------------------------------
   */
  async function hashAllFiles() {

    /**
     *
     * This function should be called on the first commit of any repo, it parse
     * all the files in the repo not just the changed ones
     *
     */
    async function firstCommit(repo, commitObj) {

      let error;
      let newFile;
      let oldFile;
      const files = await glob(`projects/${repo._id}/**/*.*`);

      for (let [i, path] of files.entries()) {

        newFile = parseFile(repo.project, repo._id, path, commitObj);
        [error, oldFile] = await to(File.findOne({_id: newFile._id}));
        if (error) throw new Error(error);

        // If file already exists
        if (oldFile) {

          const oldCopies = oldFile.copies;
          const oldDate = +oldFile.date;
          const newDate = +newFile.date;

          switch (true) {

            case oldDate > newDate:
              // If newFile is older update file and set the old file and any copies as copies
              // Don't add copies for files in the same project
              if (oldFlie.project !== newFile.project) {
                newFile.copies = [...oldFile.copies, {date: oldFile.date, project: oldFile.project}];
              }
              File.update({_id: newFile._id}, newFile);

            case oldDate < newDate:
              // if oldFile is older leave as is but update copies
              const newCopy = {date: newFile.date, project: newFile.project};
              const exists = oldCopies.some(copy =>  {
                return copy.project === newFile.project && copy.date === newFile.date;
              });
              if (!exists) {
                oldFile.copies = [...oldCopies, newCopy];
              }

            case oldDate > newDate || oldDate < newDate:
              // If either of the above, save and break
              [error] = await to(oldFile.save());
              if (error) throw new Error(error);
              else {
                console.log(`hashAllFiles(): update old file from (${oldFile.project} -> ${newFile.project})`);
              }
              break;

            case oldDate === newDate:
              // If same date, most likely same commit, do nothing
              console.log(`hashAllFiles(): skipping ${oldFile.path}, been here done that`);
              break;

          }

        }
        // If file doesn't already exist add it
        else {
          [error] = await to(File.create(newFile));
          if (error) throw new Error(error);
          console.log(`hashAllfiles(): Added new file to DB: ${newFile.path}`);
        }
      }
    }

    new Promise(async resolve => {
      try {
        let error;
        let repos;
        [error, repos] = await to(Repo.find({}));
        if (error) throw new Error(`Repo.find(): ${error}`);
        // For each repo
        for (let [i, repo] of repos.entries()) {
          const commit = repo.commit;
          const log = repo.log;
          const idx = log.findIndex(c => c.hash === commit);
          if (idx < 1) {
            [error] = await to(gitCheckout(`projects/${repo._id}`, log[0].hash));
            if (error) throw new Error(error);
            await firstCommit(repo, log[0]);
          }
          else {
            [error] = await to(gitCheckout(`projects/${repo._id}`, log[idx + 1].hash));
            // For all changed files: HashFiles()
          }
          repo.commit = log[idx + 1].hash;
          // Update repo.commit
        }
        resolve(true);
      }
      catch(error) {
        console.log(`hashAllFiles(): ${error}`);
        resolve(false);
      }
    });
  }

  /**
   *
   * Conduct all required file operations
   * @param {String} projectName
   * @param {String} repo
   * @param {String} path
   * @param {Object} commit
   *
   */
  function parseFile(projectName, repo, path, commit) {
    try {
      const file = fs.readFileSync(path, 'utf8');
      const md5 = crypto.createHash('md5');
      const hash = md5.update(file).digest('hex');
      return {
        _id: hashFile(path),
        ext: path.split('.').pop(),
        path,
        repo,
        date: new Date(commit.date),
        commit: commit.hash,
        length: file.length,
        project: projectName,
        whitespace: (file.split(' ').length - 1),
      };
    }
    catch(error) {
      console.log(`parseFile(): ${error}`);
    }
  }


  /**
   *
   * @param {String} path
   * @return {String}
   *
   */
  function hashFile(path) {
    const file = fs.readFileSync(path, 'utf8');
    const md5 = crypto.createHash('md5');
    const hash = md5.update(file).digest('hex');
    return hash;
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
    await syncCommits();
    await hashAllFiles();
    resolve();
  });
};

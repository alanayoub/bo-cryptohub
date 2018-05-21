// Node
const fs = require('fs');
const glob = require('globby');
const crypto = require('crypto');
const { join, dirname, basename } = require('path');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger = require('../logger');
const { Project, File, Repo } = require('../db-schema');
const { arrayDiff, logHeader, getDirs } = require('../utils.js');
const { gitDiff, gitCheckout, gitCheckoutBranch, gitLog } = require('../utils/index.js');

/**
 *
 * Conduct all required file operations
 * @param {String} projectName
 * @param {String} repo
 * @param {String} path
 * @param {Object} commit
 *
 */
function generateFileData(projectName, repo, path, commit) {
  try {
    const file = fs.readFileSync(path, 'utf8');
    const md5 = crypto.createHash('md5');
    const hash = md5.update(file).digest('hex');


    debugger;
    // comments: Number,     // number of comment characters
    // language: String,
    // whiteSpace: Number,   // number of whitespace characters
    // blankLines: Number,


    return {
      _id: hash,
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
    console.log(`generateFileData(): ${error}`);
  }
}

/**
 *
 * This function should be called on the first commit of any repo, it parse
 * all the files in the repo not just the changed ones
 *
 * @param {Object} repo
 * @param {Object} commitObj
 *
 */
async function firstCommit(repo, commitObj) {
  const files = await glob(`projects/${repo._id}/**/*.*`);
  logger.info(`firstCommit(): ${files.length} files to hash`);
  for (let [i, path] of files.entries()) {
    await hashAndSave(repo.project, repo._id, path, commitObj);
  }
}

/**
 *
 * @param {Object} repo
 * @param {Array} log
 * @param {Number} commitIdx
 *
 */
async function allOtherCommits(repo, log, commitIdx) {

  const path = join('projects', repo._id);
  const hash1 = log[commitIdx - 1].hash;
  const hash2 = log[commitIdx].hash;

  let diff;
  let error;
  let key = `/git/diff/${repo._id}/diff-${hash1}-${hash2}`;
  [diff] = global.cache.get(key);

  if (diff) {
    diff = JSON.parse(diff);
  }
  else {
    [error, diff] = await to(gitDiff(path, hash1, hash2));
    if (error) {
      logger.error(error);
      debugger;
      return false;
    }
    global.cache.set(key, JSON.stringify(diff));
  }

  if (diff.added) {
    diff.added.forEach(async file => {
      await hashAndSave(repo.project, repo._id, join(path, file), log[commitIdx]);
    });
  }
  if (diff.deleted) {
    // do nothing
  }
  if (diff.modified) {
    diff.modified.forEach(async modified => {
      await hashAndSave(repo.project, repo._id, join(path, modified.path), log[commitIdx]);
    });
  }

}

/**
 *
 *
 *
 */
async function hashAndSave(projectName, repo, path, commit) {

  try {

    let error;
    let newFile;
    let oldFile;

    newFile = generateFileData(projectName, repo, path, commit);
    [error, oldFile] = await to(File.findOne({_id: newFile._id}));
    if (newFile.path.split('.')[1] === 'gitignore' && oldFile === void 0) debugger;
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
          if (oldFile.project !== newFile.project) {
            newFile.copies = [...oldfile.copies, {date: oldFile.date, project: oldFile.project, repo: oldFile.repo}];
          }
          for (let [key, val] of Object.entries(newFile)) {
            oldFile[key] = val;
          }

        case oldDate < newDate:
          // If oldFile is older leave as is but update file.copies
          // Also only update copies if this copy doesn't already exist the project
          const exists = oldCopies.some(copy =>  {
            return copy.project === newFile.project && +copy.date === +newFile.date && copy.repo === newFile.repo;
          });
          if (!exists && (oldFile.project !== newFile.project)) {
            oldFile.copies = [...oldCopies, {date: newFile.date, project: newFile.project, repo: newFile.repo}];
          }

        case oldDate > newDate || oldDate < newDate:
          // If either of the above, save oldFile and break
          [error] = await to(oldFile.save());
          if (error) {
            debugger
            throw new Error(error);
          }
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
      if (error) {
        debugger;
        throw new Error(error);
      }
      console.log(`hashAllfiles(): Added new file to DB: ${newFile.path}`);
    }

  }
  catch(error) {
    debugger;
    logger.error(`hash(): ${error}`);
  }

}

/**
 *
 */
async function doOtherSTuff() {

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
  // 13. cryptocompaire rankings? // thats for projects
  // 14. Get youtube crypto peeps predictions and check for correlations
  // 15. Whitespace, comments, authors
  //

  // const schema = {
  //   bitcoin: {
  //
  //     history: [
  //       // ...all this same info for each commit
  //     ],
  //
  //     commits: 32,
  //     coreTeam: [{
  //       name: String,
  //       rating: Number
  //     }],
  //     contributors: [],
  //     testCoverage: 50,
  //     avgCommitMsgLen: 10,
  //     numFiles: 2,
  //     size: 123,
  //     loc: 23,
  //     whiteSpaceSize: 4,
  //     commentsSize: 32,
  //     files: {
  //       js: {
  //         quality: 43,
  //         numFiles: 2,
  //         size: 123,
  //         loc: 23,
  //       },
  //       h: {
  //         quality: 43,
  //         numFiles: 2
  //         size: 123,
  //         loc: 23
  //       },
  //       cpp: {
  //         quality: 43,
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

/**
 *
 * hashFiles();
 * ---------------
 *
 * loop over repos
 * if first commit hash all files else hash changed files
 *
 * Hash all files in all repos
 * Start at the commit registered at repo.commit
 * TODO: Set override to start again from the first commit
 *
 * ---------------------------------
 * NOTE: This doest work because oldCommit.date and newCommit.date will be the same for forked stuff, but this
 * will work only for copied files. For forked stuff we should find the commit where the project started and work
 * from there on only, dont run firstCommit in thoes cases
 * ---------------------------------
 *
 */
module.exports = async function hashFiles(regex = /.*/) {

   try {
     let error;
     let repos;
     logHeader('Hashing Files');
     [error, repos] = await to(Repo.find({_id: regex}));
     for (let [i, repo] of repos.entries()) {
       console.log(`Working on repo # ${i}: ${repo._id}`);
       const log = repo.log;
       console.log(`log lengh = ${log.length}`);

       // tmp only apply to this repo
       if (repo._id !== 'bitcoin/bitcoin') return;

       if (!log.length) continue;

       // const commit = repo.commit === null
       //   ? repo.firstCommit || log[0].hash
       //   : repo.commit;
       // const idx = log.findIndex(c => c.hash === commit);

       const commitIdx = log.findIndex(c => {
         return c.hash === (repo.commit === null ? repo.firstCommit : repo.commit);
       });

       // Loop through all commits from the last one that was parsed to the end
       // commitIdx could be -1 if no commits have been parsed yet
       for (let i = commitIdx; i < log.length - 1; i++) {

         [error] = await to(gitCheckout(`projects/${repo._id}`, log[i + 1].hash));
         if (error) throw new Error(error);

         // [error] = await to(gitCheckout(`projects/${repo._id}`, log[idx].hash));
         // if (error) throw new Error(error);
         if (i === -1) {
           await firstCommit(repo, log[0]);
           repo.commit = log[0].hash;
         }
         else {
           // hash changed files
           const commitIndex = i + 1;
           await allOtherCommits(repo, log, commitIndex);
           // repo.commit = log[idx].hash;
         }
       }

     }
     return true;
   }
   catch(error) {
     console.log(`hashAllFiles(): ${error}`);
     debugger;
     return false;
   }

};

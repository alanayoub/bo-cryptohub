/**
 *
 * @param {Object} repo
 *
 */
const git = require('nodegit');
const { to } = require('await-to-js');
module.exports = async function gitDiff(path, hash1, hash2) {

  try {

    let diff;
    let error;
    let index;
    let patch;
    let commit1;
    let commit2;
    let repository;
    let commit1Tree;

    [error, repository]  = await to(git.Repository.open(path));
    [error, index]       = await to(repository.refreshIndex());
    [error, commit1]     = await to(repository.getCommit(hash1));
    [error, commit1Tree] = await to(commit1.getTree());
    [error, commit2]     = await to(repository.getCommit(hash2));
    [error, diff]        = await to(commit2.getDiff());
    [error, patch]       = await to(diff[0].patches());

    let hunks;
    let lines;
    let oldFile;
    let newFile;

    const result = {
      added: [],
      deleted: [],
      modified: []
    };
    for (let i = 0; i < patch.length; i++) {
      oldFile = patch[i].oldFile();
      newFile = patch[i].newFile();
      if (patch[i].isModified()) {
        const path = newFile.path();
        const additions = [];
        const deletions = [];
        [error, hunks] = await to(patch[i].hunks());
        for (let j = 0; j < hunks.length; j++) {
          [error, lines] = await to(hunks[j].lines());
          lines.forEach(l => {
            if (l.origin() === git.Diff.LINE.ADDITION) {
              additions.push(l.content().substring(1));
            }
            else if (l.origin() === git.Diff.LINE.DELETION) {
              deletions.push(l.content().substring(1));
            }
          });
        }
        result.modified.push({path, additions, deletions});
      }
      else if (patch[i].isAdded()) {
        result.added.push(newFile.path());
      }
      else if (patch[i].isDeleted()) {
        result.deleted.push(newFile.path());
      }
      else if (patch[i].isRenamed()) {
        console.log('renamed');
        debugger;
      }
      else {
        console.log('what now?');
        debugger;
      }
    }

    return result;

  }
  catch(error) {
    console.log(`gitDiff(): Failed to diff ${hash1} & ${hash2} for ${path}`);
    return {error: true, message: `gitStatus(): ${error}`};
  }
}

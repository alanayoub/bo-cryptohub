// Libs
const logger = require('./log.js');
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('./db-schema');

/**
 *
 * Diffs the logs of forked projects with their parent project
 * to find the first real commit of the forked project,
 * then sets repo.firstCommit
 *
 */
module.exports = async function setFirstCommit() {

  try {

    // Load forkMap
    let [forkmap] = global.cache.get('forkmap');
    if (!forkmap) {
      throw new Error('setFirstCommit(): Can\'t find forkmap');
    }
    forkmap = JSON.parse(forkmap);

    for (let [child, parent] of Object.entries(forkmap)) {

      // skip non forked repos
      if (parent === null) continue;

      // Load both logs
      const [childProject, childRepo] = child.split('/');
      const [parentProject, parentRepo] = parent.split('/');
      const query = {
        $or: [
          {$and: [{githubProjectName: childProject}, {githubRepoName: childRepo}]},
          {$and: [{githubProjectName: parentProject}, {githubRepoName: parentRepo}]}
        ]
      }
      const [error, repos] = await to(Repo.find(query));
      if (error || repos.length !== 2) throw new Error('ahhh');

      let parentRepo, childRepo;
      repos[0].githubProjectName === parentProject
        ? [parentRepo, childRepo] = repos
        : [childRepo, parentRepo] = repos;

      // findThingy(parentRepo.logs, childRepo.logs);

      debugger;
      // Find when commits diverge
      console.log('setFirstCommit(): chlid -> parent: ', repos[0]._id, repos[1]._id);

      // Set first real commit

    }


  }
  catch(error) {
    logger.error(`setFirstCommit(): ${error}`);
    return false;
  }

}

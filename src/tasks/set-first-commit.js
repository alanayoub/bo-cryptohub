// Libs
const logger = require('../logger');
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('../db-schema');

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
      const [childProjectName, childRepoName] = child.split('/');
      const [parentProjectName, parentRepoName] = parent.split('/');
      const query = {
        $or: [
          {$and: [{githubProjectName: childProjectName, githubRepoName: childRepoName}]},
          {$and: [{githubProjectName: parentProjectName, githubRepoName: parentRepoName}]}
        ]
      }
      const [error, repos] = await to(Repo.find(query));
      if (error || repos.length !== 2) {
        //
        // Find out what repos have been assigned to multiple projects
        //
        const map = {};
        repos.forEach((repo, i) => {
          const github = `${repos[i].githubProjectName}/${repos[i].githubRepoName}`;
          if (!Array.isArray(map[github])) map[github] = [];
          map[github].push(repo._id);
        });
        for (let [key, github] of Object.entries(map)) {
          if (github.length < 2) delete map[key];
        }
        const msg = Object.keys(map).length
          ? `setFirstCommit(): The following Github repos have been assigned to multiple projects in Coinmarketcap:\n${JSON.stringify(map)}`
          : `setFirstCommit(): Either the child or parent repo doesn\'t exist`;
        global.notes.push(msg);
        logger.warn(msg);
      }

      // Get both repos
      // NOTE: any extra repos are ignored
      let parentRepo, childRepo;
      repos[0].githubProjectName === parentProjectName
        ? [parentRepo, childRepo] = repos
        : [childRepo, parentRepo] = repos;

      //
      // Find when commits diverge and save repo.firstCommit hash
      //
      // NOTE: We can't do a binary search because commits could always be merged back in,
      // so we need to find the first instance of a divergence
      //
      for (let [i, commit] of parentRepo.log.entries()) {
        if (!childRepo.log[i] || commit.hash === childRepo.log[i].hash) {
          continue;
        }
        else {
          childRepo.firstCommit = childRepo.log[i].hash;
          let [error, updated] = await to(childRepo.save());
          if (error) {
            logger.error(`setFirstCommit(): Error saving repo.firstCommit for ${childProjectName}/${childRepoName}: ${error}`);
          }
          else {
            logger.info(`setFirstCommit(): Updated repo.firstCommit for ${childProjectName}/${childRepoName} to: ${updated.firstCommit}`);
          }
          break;
        }
      }
    }

  }
  catch(error) {
    logger.error(`setFirstCommit(): ${error}`);
    return false;
  }

}

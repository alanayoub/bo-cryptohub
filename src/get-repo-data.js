'use strict';

// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Project, Repo } = require('./db-schema');
const { get, logHeader, gitLog, dbSaveCommits } = require('./utils.js');

/**
 *
 * Get and save all github repo information for all projects
 *
 */
module.exports = async function getRepoData() {

  return new Promise(async resolve => {

    try {

      logHeader('Get all github repo information');
      const projects = await Project.find({githubUrls: {$exists: true, $not: {$size: 0}}});
      const numProjects = projects.length;
      let numGithubUrls;
      let numRepos;
      let commits;
      let error;

      //
      // - Iterate projects
      //
      for (let [i, project] of projects.entries()) {

        numGithubUrls = project.githubUrls.length;

        //
        // - Iterate githubUrls
        // - Get repo info
        //
        for (let [j, githubUrl] of project.githubUrls.entries()) {

          const [projectPage, repo] = githubUrl.split('https://github.com/')[1].split('/');
          const reposJson = await get(`https://api.github.com/orgs/${projectPage}/repos`);
          numRepos = reposJson.length;

          //
          // - Iterate repos
          // - Save data
          //
          for (let [k, repoObj] of reposJson.entries()) {

            const _id = `${project._id}/${repoObj.name}`;
            const query = {_id};
            const log = await gitLog(`projects/${_id}`);

            [error, commits] = await to(dbSaveCommits(log, _id));

            const update = {
              _id,
              log: commits,
              isFork: repoObj.fork,
              commit: null,
              project: project._id,
              githubObject: JSON.stringify(repoObj),
            };
            const options = {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true,
            };

            [error] = await to(Repo.findOneAndUpdate(query, update, options).exec());

            if (error) {
              resolve({error: true, message: error});
              console.log(`getRepoData() error saving repo info for ${_id}: ${error}`);
            }
            else {
              console.log(`getRepoData(): Saved repo information from github for ${_id}`);
            }

            // We are finished if this loop is the last repo in last github url in last project
            if ((numProjects === i + 1) && (numGithubUrls === j + 1) && (numRepos === k + 1)) {
              resolve(true);
            };

          }

        }

      }

    }
    catch (error) {

      console.log(`getRepoData(): ${error}`);
      resolve({error: true, message: error});

    }

  });

};

'use strict';

// Node
const fs = require('fs');

// Libs
const rp = require('request-promise');
const git = require('nodegit');
const { to } = require('await-to-js');

// CryptoHub
const { Project, Repo } = require('./db-schema');
const { logHeader } = require('./utils.js');

/**
 *
 *
 *
 * checkoutRepos();
 * ----------------
 * loop over Projects
 *   if has github repo that is not checked out checkout repo
 *     curl https://api.github.com/orgs/ethereum/repos
 *
 *
 */
module.exports = async function checkoutRepos() {

  /**
   *
   * Get and save all github repo information for all projects
   *
   */
  const getRepoInfo = async function() {

    return new Promise(async resolve => {

      try {
        const projects = await Project.find({githubUrls: {$exists: true, $not: {$size: 0}}});
        const numProjects = projects.length;
        let numGithubUrls;
        let numRepos;
        //
        // Iterate over projects
        //
        for (let [i, project] of projects.entries()) {
          console.log(`getRepoInfo(): List Github urls for ${project._id}: ${JSON.stringify(project.githubUrls)}`);
          numGithubUrls = project.githubUrls.length;
          //
          // Iterate over githubUrls, get repo info for each and save
          //
          for (let [j, githubUrl] of project.githubUrls.entries()) {
            const [projectPage, repo] = githubUrl.split('https://github.com/')[1].split('/');
            const reposJson = await rp({
              uri: `https://api.github.com/orgs/${projectPage}/repos`,
              json: true,
              headers: {'user-agent': 'node.js'},
            });
            numRepos = reposJson.length;
            //
            // Iterate over repos in project and save
            //
            for (let [k, repoObj] of reposJson.entries()) {
              const _id = `${project._id}/${repoObj.name}`;
              const query = {_id};
              const update = {
                _id,
                isFork: repoObj.fork,
                commit: null,
                commits: null,
                project: project._id,
                githubObject: JSON.stringify(repoObj),
              };
              const options = {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
              };
              const [error, result] = await to(Repo.findOneAndUpdate(query, update, options).exec());
              if (error) {
                resolve({error: true, message: error});
                console.log(`getRepoInfo() error saving repo info for ${_id}: ${error}`);
              }
              else {
                console.log(`getRepoInfo(): Saved repo information from github for ${_id}`);
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
        console.log(`getRepoInfo(): ${error}`);
        resolve({error: true, message: error});
      }

    });

  };

  /**
   *
   * Clone all repos
   *
   */
  const cloneRepos = async function () {

    return new Promise(async resolve => {

      try {
        const repos = await Repo.find();
        const numRepos = repos.length;
        //
        // Iterate over repos and clone
        //
        for (let [j, repo] of repos.entries()) {
          const repoObj = JSON.parse(repo.githubObject);
          if (repoObj && repoObj.clone_url) {
            const url = repoObj.clone_url;
            const path = `./projects/${repo._id}`;
            const options = {
              fetchOpts: {
                callbacks: {
                  certificateCheck: () => 1
                }
              }
            };
            if (!fs.existsSync(path)) {
              console.log(`cloneRepos(): Cloning ${url} repo`);
              await git.Clone(url, path, options);
            }
            else {
              console.log(`cloneRepos(): Skipping ${url}, repo already exists`);
            }
          }
          if (numRepos === j + 1) {
            resolve(true);
          };
        }

      }
      catch (error) {
        console.log(`cloneRepos(): ${error}`);
        resolve(false);
      }

    });

  };

  return new Promise(async resolve => {
    logHeader('Checking out repos');
    await getRepoInfo();
    await cloneRepos();
    resolve();
  });

};

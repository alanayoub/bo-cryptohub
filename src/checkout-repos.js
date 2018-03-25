'use strict';

// Node
const fs = require('fs');

// Libs
const rp = require('request-promise');
const git = require('nodegit');

// CryptoHub
const { Project } = require('./db-schema');
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
        let lastProject = false;
        //
        // Iterate over projects
        //
        for (let [i, project] of projects.entries()) {
          console.log(`Github urls for ${project._id}: ${JSON.stringify(project.githubUrls)}`);
          const numGithubUrls = project.githubUrls.length;
          if (numProjects === i + 1) {
            lastProject = true;
          }
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
            project.repos = !!repo ? [reposJson[repo]] : reposJson;
            const updated = await project.save();
            if (updated.errors) {
              const msg = `Error saving repos field for project ${project._id}: ${updated.error}`;
              console.log(msg);
              throw new Error(msg);
            }
            else {
              console.log(`Updated project ${project._id} repos field`);
            }
            if (lastProject && (numGithubUrls === j + 1)) {
              resolve(!!updated.errors);
            };
          }
        }
      }
      catch (error) {
        console.log(`getRepoInfo(): ${error}`);
        resolve(false);
      }

    });

  }

  /**
   *
   * Clone all repos
   *
   */
  const cloneRepos = async function () {

    return new Promise(async resolve => {

      try {
        const projects = await Project.find({repos: {$exists: true, $not: {$size: 0}}});
        const numProjects = projects.length;
        let lastProject = false;
        //
        // Iterate over projects
        //
        for (let [i, project] of projects.entries()) {
          console.log(`Github repos for ${project._id}: `);
          const numRepos = project.repos.length;
          if (numProjects === i + 1) {
            lastProject = true;
          }
          //
          // Iterate over repos and clone
          //
          for (let [j, repoJson] of project.repos.entries()) {
            if (repoJson && repoJson.clone_url) {
              const url = repoJson.clone_url;
              const path = `./projects/${project._id}/${repoJson.name}`;
              const options = {
                fetchOpts: {
                  callbacks: {
                    certificateCheck: () => 1
                  }
                }
              };
              if (!fs.existsSync(path)) {
                console.log(`cloneRepos(): Cloning ${repoJson.clone_url} repo`);
                await git.Clone(url, path, options)
              }
              else {
                console.log(`cloneRepos(): Skipping ${repoJson.clone_url}, repo already exists`);
              }
            }
            if (lastProject && (numRepos === j + 1)) {
              resolve(true);
            };
          }

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

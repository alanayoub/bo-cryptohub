"use strict"

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

    return new Promise(resolve => {

      //
      // Get projects with github Urls
      //
      const query = {githubUrls: {$exists: true, $not: {$size: 0}}};
      Project.find(query, '', (error, projects) => {

        //
        // Loop over projects
        //
        const numProjects = projects.length;
        let lastProject = false;
        projects.forEach((project, i) => {

          //
          // Loop over github Urls for each project
          //
          console.log(`Github urls for ${project._id}: `, JSON.stringify(project.githubUrls));
          if (numProjects === i + 1) lastProject = true;
          const numGithubUrls = project.githubUrls.length;
          project.githubUrls.forEach((githubUrl, j) => {

            //
            // Get repo information for each github url and save it
            //
            // TODO: dont make all these requests at once!!! arrr
            //
            const [ projectPage, repo ] = githubUrl.split('https://github.com/')[1].split('/');
            const options = {
              uri: `https://api.github.com/orgs/${projectPage}/repos`,
              json: true,
              headers: {'user-agent': 'node.js'}
            };
            rp(options).then(reposJson => {
              project.repos = !!repo ? [reposJson[repo]] : reposJson;
              project.save((error, updated) => {
                if (error) {
                  console.log(`Error saving repos field for project ${project._id}: ${error}`);
                }
                else {
                  console.log(`Updated project ${project._id} repos field`);
                }
                if (lastProject && (numGithubUrls === j + 1)) {
                  resolve(!!error);
                };
              });
            });

          });

        });
      });

    });

  }

  /**
   *
   * Clone all repos
   *
   */
  const cloneRepos = async function () {

    //
    // maybe we can modularise this bit of getting and looping over projects.
    //
    return new Promise(resolve => {

      //
      // Get projects with github Urls
      //
      const query = {repos: {$exists: true, $not: {$size: 0}}};
      Project.find(query, '', (error, projects) => {

        //
        // Loop over projects
        //
        const numProjects = projects.length;
        let lastProject = false;
        projects.forEach((project, i) => {

          //
          // Loop over github Urls for each project
          //
          console.log(`Github repos for ${project._id}: `);
          if (numProjects === i + 1) lastProject = true;

          //
          // TODO: dont clone everything at once!!! arrr
          //
          project.repos.forEach((repoJson, j) => {
            console.log(`Cloning ${repoJson.url} repo`);

            git.Clone(`${repoJson.url}.git`, `../projects/${project._id}/${repoJson.name}`)
              .then(repo => {
                console.log(repo);
              })
              .catch(error => {
                console.log(err);
              });

          });

          if (lastProject) { // && (numGithubUrls === j + 1)) {
            resolve();
          };

        });
      });

    });
  };

  /**
   *
   * Check if the project folder exists in projects
   *
   */
  const folderExists = async function(path) {

    // fs.access(`../projects/${project._id}`, fs.constants.R_OK | fs.constants.W_OK, error => {
    //   if (error) {
    //     if (error.code === 'ENOENT') {
    //       console.log('Project has not been cloned yet');
    //       // make folder
    //       // do clone of each repo
    //     }
    //     if (error.code === 'EEXIST') {
    //       console.error('Project has already been cloned');
    //       // do clone of missing repos
    //     }
    //     console.log(`checkoutRepos() error: ${error}`);
    //   }
    //   console.log(error ? 'no access!' : 'can read/write');
    // });

  }


  logHeader('Checking out repos');
  await getRepoInfo();
  // await cloneRepos();
  return;

};

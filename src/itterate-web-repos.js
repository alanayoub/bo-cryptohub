// Libs
const { to } = require('await-to-js');
const octokit = require('@octokit/rest')();

// CryptoHub
const logger = require('./logger');
const { Project } = require('./db-schema');
const { paginate } = require('./utils-github');
const { get, logHeader } = require('./utils.js');

/**
 *
 * Get and save all github repo information for all projects
 *
 */
module.exports = async function* itterateWebRepos(message) {

  try {

    logHeader(message);

    await octokit.authenticate({
      type: 'oauth',
      key: global.githubClientId,
      secret: global.githubClientSecret
    });

    const projects = await Project.find({githubUrls: {$exists: true, $not: {$size: 0}}});
    const numProjects = projects.length;
    let numGithubUrls;
    let numRepos;

    // Iterate projects
    for (let [i, project] of projects.entries()) {

      numGithubUrls = project.githubUrls.length;

      // Iterate githubUrls
      // Get repo info
      for (let [j, githubUrl] of project.githubUrls.entries()) {

        const [projectPage, repo] = githubUrl.split('https://github.com/')[1].split('/');
        const projectKey = `/github/projects/api.github.com-${projectPage}`;
        const repoKey = `/github/repos/api.github.com-${projectPage}-repos`;
        let error;
        let repoFile;
        let projectFile;
        let age;

        [projectFile, age] = global.cache.get(projectKey);
        if (!projectFile || true) { //age > global.cacheForGithubRepo) {
          [error, projectFile] = await to(paginate(octokit.users.getForUser, {username: projectPage}, projectKey, global.cacheForGithubForks));
          if (error) {
            console.log('error', error);
            debugger
            logger.error(`itterateWebRepos(): ${error}`);
          }
          else {
            global.cache.set(projectKey, JSON.stringify(projectFile));
          }
        }
        else {
          projectFile = JSON.parse(projectFile);
        }

        [repoFile, age] = global.cache.get(repoKey);
        if (!repoFile || true) { //age > global.cacheForGithubRepo) {
          const options = {
            org: projectPage,
            per_page: 30
          };
          const type = projectFile.type === 'User' ? 'User' : 'Org';
          [error, repoFile] = await to(paginate(octokit.repos.getFor[type], options, repoKey, global.cacheForGithubForks));
          if (error) {
            debugger;
            logger.error(`itterateWebRepos(): ${error}`);
          }
          else {
            global.cache.set(repoKey, JSON.stringify(repoFile));
          }
        }
        else {
          repoFile = JSON.parse(repoFile);
        }

        if (!Array.isArray(repoFile)) repoFile = [];
        numRepos = repoFile.length;

        // Iterate repos
        for (let [k, repoObj] of repoFile.entries()) {

          yield {
            githubUrl,
            data: repoObj,
            githubRepo: repo,
            projectId: project._id,
            githubProject: projectPage,
          };

          // We are finished if this loop is the last repo in last github url in last project
          if ((numProjects === i + 1) && (numGithubUrls === j + 1) && (numRepos === k + 1)) {
            yield false
          };

        }

      }

    }

  }
  catch (error) {

    // get the name of the calling fuction somehow and use it in the error?
    // or error from this function and say the calling function name?
    console.log(`itterateWebRepos(): ${error}`);
    return {error: true, message: error};

  }

};

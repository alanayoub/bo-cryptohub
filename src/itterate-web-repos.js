// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Project } = require('./db-schema');
const { get, logHeader } = require('./utils.js');

/**
 *
 * Get and save all github repo information for all projects
 *
 */
module.exports = async function* itterateWebRepos(message) {

  try {

    logHeader(message);
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
        const uri = `https://api.github.com/orgs/${projectPage}/repos`;
        const key = `api.github.com-${projectPage}-repos`;
        let error;
        let [file, age] = global.cache.get(key);

        if (!file || age > 30) {
          [error, file] = await to(get(uri));
          if (error) {
            throw `itterateWebRepos() error fetching ${uri}: ${error}`;
          }
          global.cache.set(key, JSON.stringify(file));
        }
        else {
          file = JSON.parse(file);
        }

        numRepos = file.length;

        // Iterate repos
        for (let [k, repoObj] of file.entries()) {

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

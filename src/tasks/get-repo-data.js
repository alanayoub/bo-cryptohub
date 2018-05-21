// Node
const { join } = require('path');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('../db-schema');
const itterateWebRepos = require('../itterate-web-repos');

/**
 *
 * Get and save all github repo information for all projects
 *
 */
module.exports = async function getRepoData() {

  try {

    for await (const repo of itterateWebRepos('Get all github repo information')) {

      if (!repo) break;

      const _id = join(repo.projectId, repo.data.name);
      const query = {_id};
      const [githubProjectName, githubRepoName] = repo.data.full_name.split('/');
      const update = {
        _id,
        githubRepoName,
        githubProjectName,
        size: repo.data.size,
        forks: repo.data.forks,
        commit: null,
        isFork: repo.data.fork,
        hasWiki: repo.data.has_wiki,
        project: repo.projectId,
        cloneUrl: repo.data.clone_url,
        watchers: repo.data.watchers,
        hasPages: repo.data.has_pages,
        hasIssues: repo.data.has_issues,
        openIssues: repo.data.open_issues,
        forksCount: repo.data.forks_count,
        hasProjects: repo.data.has_projects,
        hasDownloads: repo.data.has_downloads,
        defaultBranch: repo.data.default_branch,
        watchersCount: repo.data.watchers_count,
        stargazersCount: repo.data.stargazers_count,
        openIssuesCount: repo.data.open_issues_count,
      };
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      const [findError] = await to(Repo.findOneAndUpdate(query, update, options).exec());
      if (findError) {
        return {error: true, message: findError};
        console.log(`getRepoData() error saving repo info for ${_id}: ${findError}`);
      }
      else {
        console.log(`getRepoData(): Saved repo information from github for ${_id}`);
      }

    }

  }
  catch (error) {
    console.log(`getRepoData(): ${error}`);
    return {error: true, message: error};
  }

};

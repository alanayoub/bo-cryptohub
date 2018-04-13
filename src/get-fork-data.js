// Libs
const { to } = require('await-to-js');
const octokit = require('@octokit/rest')();

// CryptoHub
const { Repo } = require('./db-schema');

/**
 *
 * Get and save all github repo fork information for all projects
 *
 */
module.exports = async function getForkData() {

  try {

    const repos = await Repo.find({});
    for (const [i, repo] of repos.entries()) {
      // const url = repo.forksUrl;
      // debugger;
      // console.log(url);

      // const result = await octokit.repos.getForks({owner, repo, sort, page, per_page})

      // hasNextPage(response)
      // hasPreviousPage(response)
      // hasFirstPage(response)
      // hasLastPage(response)
      // getNextPage(response)
      // getPreviousPage(response)
      // getFirstPage(response)
      // getLastPage(response)

      async function paginate(method) {
        let response = await method({owner: repo.githubProjectName, repo: repo.githubRepoName, per_page: 30});
        let { data } = response;
        while (octokit.hasNextPage(response)) {
          response = await octokit.getNextPage(response);
          data = data.concat(response.data);
        }
        return data;
      }
      const [error, forks] = await to(paginate(octokit.repos.getForks));
      if (error) throw new Error(error);
      debugger
      console.log('forks: ', forks);


    }
    //
    // 1. For each Repo
    // 2.   Get fork data
    // 3.     Add data to Fork Map
    //
    // In another function / file
    // 1. Genenerate repo parent object
    //

    //
    // Fork Map
    // --------
    //
    // bitcoin: ['litecoin', 'blah' ...]
    // litecoin: ['reddcoin', ...]
    //

    //
    // Repo Parent
    // -----------
    //
    // bitcoin: null,
    // litecoin: bitcoin,
    // reddcoin: litecoin
    //

  }
  catch (error) {
    console.log(`getForkData(): ${error}`);
    return {error: true, message: error};
  }

};

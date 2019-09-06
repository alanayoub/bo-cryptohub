/**
 *
 * @param {String} path - absolute path to repo
 * @return {Array|Object} - An array of commits or an error object
 *
 * TODO: What else can we get from the log? number of changes etc?
 *
 */
const git = require('nodegit');
const { to } = require('await-to-js');
module.exports = function gitLog(path, branch) {
  return new Promise(async resolve => {
    try {

      // TODO: at the moment if an incorrect path is used nothing is returned and it hangs
      console.log(`gitLog(): Getting log for ${path}`);
      // let repository;

      let repo;
      let error;
      let commit;

      [error, repo] = await to(git.Repository.open(path));
      if (error) throw new Error(`gitLog(): Repository.open(): ${error}`);
      [error] = await to(repo.fetch('origin'));
      if (error) throw new Error(`gitLog(): repo.fetch(): ${error}`);
      [error] = await to(repo.mergeBranches(branch, `origin/${branch}`));
      if (error) throw new Error(`gitLog(): repo.mergeBranches(): ${error}`);
      if (repo.isEmpty()) {
        resolve([]);
        return false;
      }
      [error, commit] = await to(repo.getBranchCommit(`refs/remotes/origin/${branch}`));
      if (error) throw new Error(`gitLog(): repo.getBranchCommit(): ${error}`);

      if (!commit) resolve([]);

      const history = commit.history();
      history.on('commit', commit => {});
      history.on('end', commits => {
        const results = [];
        let author;
        let details;
        for (let [i, commit] of commits.entries()) {
          author = commit.author();
          details = {
            hash: commit.sha(),
            date: commit.date(),
            author: {
              name: author.name(),
              email: author.email()
            },
            message: commit.message()
          };
          results.unshift(details);
        }
        console.log(`gitLog(): Got log for ${path} (${results.length} items)`);
        resolve(results);
      });
      history.on('error', error => {
        resolve({error: true, message: error});
      });
      history.start();

    }
    catch (error) {
      console.log(`gitLog(): ${error}`);
    }
  });
}

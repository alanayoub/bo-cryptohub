'use strict';


// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');

// CryptoHub
require('./db-connect');
const scrape = require('./scrape.js');
const hashFiles = require('./hash-files');
const checkoutRepos = require('./checkout-repos');

(async function doStuffYo() {

  //
  // Each task is completely independent
  //
  try {
    // const [scrapeError, scrapeResults] = await to(scrape({requestLimit: 1, requestDelay: 2000}));
    // if (scrapeError) {
    //   throw new Error(scrapeError);
    // };

    const [cloneError, cloneResults]  = await to(checkoutRepos());
    if (cloneError) {
      throw new Error(cloneError);
    };

    // const [hash, hashError] = await to(hashFiles());
    // if (hashError) {
    //   throw new Error(hashError);
    // }
  }
  catch(error) {
    console.log('Um some error happened yo: ', error);
  }

})();




// scrape.on('done', async () => {

//   console.log('Finished scraping');
  // await checkoutRepos();
  // await hashFiles();

  //
  // hashFiles();
  // ----------------
  // loop over repos
  //   go to project.commits[repoIdx] or first commit
  //   if first commit hash all files else hash changed files
  //

  //
  // hashFile();
  // ----------------
  // minify file, strip comments or compile file so bullshit changes don't register
  // hash file
  // check if file is from forked repo and how old the file is
  // save file data
  //

// });

// var hashStuff = () => {
//   var results = [];
//   //
//   // log a hash of all files in folder
//   //
//   glob(`projects/**/*.*`, {}, (error, files) => {
//     files.forEach(path => {
//       fs.readFile(path, 'utf8', (error, contents) => {
//         var md5 = crypto.createHash('md5');
//         var item = md5.update(contents).digest('hex');
//         results.push(item);
//         console.log(`${path}\n${item}\n`);
//         // console.log(item);
//       });
//     });
//   });
// }

//
// Example
//
// projects: {
//   bitcoin: {
//     github: ['url1', 'url2'],                   // github to scan
//     commits: [],                               // last commit parsed per repo
//     original: {                                // original files (this project wrote this code)
//       active: ['12', '32', '123', '2f', '43'], // hashes of active files
//       old: []                                  // changed or deleted files
//     },
//     copies: {                                  // copied files (this project copied/forked this code)
//       active: [],
//       old: [],
//     },
//   },
//   ethereum: {
//     original: ['12', '32', '22', '23', '22d'],
//     copies: [],
//   },
// }

// hashes: {
//   files: {
//     '1232543fd4ffsdd24f2v2': {
//       length: 1003,                            // number of characters
//       project: 'bitcoin',
//       active: true,
//       date: 123,
//       copies: [
//         {project: 'ethereum': date: 1234, active: true},
//         {project: 'neo': date: 1254, active: false}
//       ]
//     }
//   }
// }




//
// Get github github
//
// curl https://api.github.com/orgs/ethereum/repos

//
// Projects & repos
//
//
// {
//   bitcoin: [
//     'https://github.com/bitcoin/bitcoin',
//     'https://github.com/bitcoin/bips',
//     'https://github.com/bitcoin/libblkmaker',
//     'https://github.com/bitcoin/libbase58',
//   ],
//   ethereum: [
//     'https://github.com/ethereum/remix-ide',

//   ],
//   litecoin: [
//     'https://github.com/litecoin-project/litecoin'
//   ]
// }

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const cryptohubDir = path.join(__dirname, '../../');

module.exports = function(cb) {

  let count = 0;
  let str = '';
  const obj = {};
  const files = [
    `${cryptohubDir}public/javascript/columns/binaryoverdose.js`,
    `${cryptohubDir}public/javascript/columns/coinmarketcap.js`,
    `${cryptohubDir}public/javascript/columns/cryptocompare.js`,
    `${cryptohubDir}public/javascript/columns/messari.js`
  ];
  const outputFile = `${cryptohubDir}src/utils/columnDependencies.generated.js`;

  for (const file of files) {

    const readInterface = readline.createInterface({
      input: fs.createReadStream(file),
      // output: process.stdout,
      console: false
    });

    readInterface.on('line', line => {
      str += line;
    });

    readInterface.on('close', () => {

      count++;
      if (count === files.length) {

        // Remove spaces and carage returns
        const s = str.replace(/\n|\s/g, '');

        // Regex that matches all fields that we care about
        const re = new RegExp("((colId:(.*?),|field:(.*?),|dependencies:\\[(.*?)\\]))", "g");

        // Push matches to matches array
        const matches = [];
        let tmp = null;
        while(tmp = re.exec(s)) {
          matches.push(tmp[1]);
        }

        // Group item in 2d array
        const groups = [];
        let counter = -1;
        for (const match of matches) {
          const [key] = match.split(':');
          if (key === 'colId') {
            counter++;
            groups[counter] = [];
          }
          groups[counter].push(match);
        }

        // Build new object
        const json = {};
        for (const item of groups) {
          let id = item[0].split(':')[1].slice(0, -1);
          let field = item[1].split(':')[1].slice(0, -1);
          let dependencies = item[2] ? item[2].split(':')[1] : [];
          id = eval(id);
          field = eval(field);
          dependencies = eval(dependencies);
          dependencies.push(field);
          json[id] = dependencies;
        }

        const outputString = `const obj = ${JSON.stringify(json)};\nexport default obj;`;

        // Write file
        fs.writeFile(outputFile, outputString, error => {
          if (error) {
            cb(error);
          }
          cb(true);
        });

      };

    });

  }

};

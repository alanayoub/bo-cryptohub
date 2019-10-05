const fs = require('fs');
const util = require('util');
const https = require('https');

/**
 *
 * Save an image from external URL
 *
 */
export default async function saveRemoteImage(url, destination) {

  return new Promise((resolve, reject) => {

    const file = fs.createWriteStream(destination);

    https
      .get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            resolve(file);
          });
        });
      })
      .on('error', error => {
        fs.unlink(destination).then(() => {
          reject({error: true, error});
        });
      });

  });

}

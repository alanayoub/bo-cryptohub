import fs from 'fs-extra';
import url from 'url';
import sharp from 'sharp';
import { to } from 'await-to-js';
import { join } from 'path';
import { objectGetNestedProperty as gnp } from 'bo-utils';

import logger from '../../logger';
import settings from '../../settings';
import saveRemoteImage from '../../utils/save-remote-image.js';

/**
 *
 * Create cryptohub-coin-image-url field
 *
 * @param {String} remoteImageUrl - the CryptoCompage imageUrl field
 * @return {String} the path to the generated image
 *
 */
export default async function cryptohubCoinImageUrl(remoteImageUrl, bid) {

  let remotePath;
  let publicPath;
  let localDirOriginal;
  let localPathOriginal;
  let localDirGenerated;
  let localPathGenerated;
  {

    if (!remoteImageUrl) {
      return;
    }

    let publicDir;
    let downloadDir;
    if (!settings.isProd) {
      publicDir = '/media/alan/Seagate1/code/bo-cryptohub/dist/public/images/';
      downloadDir = '/media/alan/Seagate1/code/bo-cryptohub/graphics/cryptocompare/';
    }
    else {
      //
      // NOTE:
      //  downloadDir is not inside the git folder for prod as we dont want to redownload the
      //  original files each time we run deploy
      //
      publicDir = '/home/ubuntu/live/vps/web/src/bo-cryptohub/dist/public/images/';
      downloadDir = '/home/ubuntu/live/vps/web/src/graphic/cryptocompare/';
    }

    remotePath = url.resolve('https://www.cryptocompare.com/', remoteImageUrl);
    const remoteFileName = remotePath.replace(/.*\/(.*)$/, '$1');
    const name = remoteFileName.split('.')[0];
    const localFileName = `${name}.webp`;

    publicPath = join('/images/generated/', bid, localFileName);
    localDirOriginal = join(downloadDir, bid);
    localPathOriginal = join(downloadDir, bid, remoteFileName);
    localDirGenerated = join(publicDir, '/generated/', bid);
    localPathGenerated = join(publicDir, '/generated/', bid, localFileName);
  }

  const fileExists = await fs.pathExists(localPathGenerated);
  if (!fileExists) {

    // Download original file
    await fs.ensureDir(localDirOriginal);
    const downloaded = await saveRemoteImage(remotePath, localPathOriginal);

    // If successfull download then resize image
    if (!downloaded.error) {

      await fs.ensureDir(localDirGenerated);
      const [error, resp] = await to(sharp(localPathOriginal)
        .resize(24)
        .webp({
          quality: 90
        })
        .toFile(localPathGenerated));

      if (error) {
        logger.error(`cryptohub-coin-image-url.js: failed to create webp image for ${ccImageUrl}`);
        return
      }

    }

  }

  return publicPath;

}

import { bulkUpdatePerSecond, bulkUpdatePerDay } from '../save';
import logger from '../../logger';

/**
 *
 * data:
 * ```
 * {
 *   1182: {
 *     'cc-coinlist-Algorithm': "SHA-256"
 *     'cc-coinlist-BlockNumber': 585945
 *     'cc-coinlist-BlockNumber:last': 585945
 *   },
 *   ...
 * }
 *
 * ```
 *
 */
export default async function perSecond(data, timestamp = +new Date()) {

  let updated;
  let startTime;

  startTime = +new Date();
  updated = await bulkUpdatePerSecond(data, timestamp);
  logger.info(`db save-perSecond update time: ${+new Date() - startTime}`);
  // logger.info(`db save-perSecond stats: ${JSON.stringify(updated, null, 2)}`);

  startTime = +new Date();
  updated = await bulkUpdatePerDay(data, timestamp);
  logger.info(`db save-perDay update time: ${+new Date() - startTime}`);
  // logger.info(`db save-perDay stats: ${JSON.stringify(updated, null, 2)}`);

}

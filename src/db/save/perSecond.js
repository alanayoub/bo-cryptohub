import { bulkUpdatePerDay } from '../save';
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

  const startTime = +new Date();
  const updated = await bulkUpdatePerDay(data, timestamp);
  logger.info(`db save-perDay update time: ${+new Date() - startTime}`);

}

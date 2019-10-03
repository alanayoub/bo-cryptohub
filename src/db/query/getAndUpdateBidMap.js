import { getBidMap } from '../query';
import { bidSave as createNewIdMapping } from '../save';

/**
 *
 * GET BID MAP
 * A Binary Overdose id mapping to another source
 * Gets the persisted mappings and generates new ones if required
 * Only returns the subset of ids requested via the data
 *
 * @param {String} source
 * @param {Array} data
 * @returns {Object} bid to source id map
 *
 */
export default async function getAndUpdateBidMap(source, data) {

  let bidMap;

  switch(source) {

    case 'cmc':

      const cmcIds = data.map(v => String(v.id));
      bidMap = await getBidMap({source: 'cmc', ids: cmcIds});

      for (const val of data) {
        let bid = bidMap[val.id];
        if (!bid) {
          bid = await createNewIdMapping('cmc', val);
          if (bid) {
            bidMap[val.id] = bid;
          }
          else {
            logger.info(`bidMap: Can't map ${name}: ${symbol} from ${source} data`);
          }
        }
      }

      return bidMap;
      break;

    case 'cc':

      const ccIds = data.map(v => v.Id);
      bidMap = await getBidMap({source: 'cc', ids: ccIds});

      for (const val of data) {
        let bid = bidMap[val.Id];
        if (!bid) {
          bid = await createNewIdMapping('cc', val);
          if (bid) {
            bidMap[val.Id] = bid;
          }
          else {
            logger.info(`bidMap: Can't map ${name}: ${symbol} from ${source} data`);
          }
        }
      }

      return bidMap;
      break;

    case 'm':

      const mIds = data.data.map(v => v.id);
      bidMap = await getBidMap({source: 'm', ids: mIds});

      for (const val of data.data) {
        let bid = bidMap[val.id];
        if (!bid) {
          bid = await createNewIdMapping('m', val);
          if (bid) {
            bidMap[val.id] = bid;
          }
          else {
            logger.info(`bidMap: Can't map ${name}: ${symbol} from ${source} data`);
          }
        }
      }

      return bidMap;
      break;
  }

}

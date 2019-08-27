// Binary Overdose
import { arrayToObject }                        from 'bo-utils';
import { objectIsObject as isObject }           from 'bo-utils';
import { objectIsEmptyObject as isEmptyObject } from 'bo-utils';
import { timeseriesThin }                       from 'bo-utils';
import { timeseriesPrune }                      from 'bo-utils';
import { timeseriesScale }                      from 'bo-utils';

// Cryptohub util functions
import logger                                   from '../../logger';
import settings                                 from '../../settings';
import { perSecondSave }                        from '../../db/save';
import { getRows }                              from '../../db/query';

/**
 *
 * Backfill and format data
 *
 * When running a new instance of the ap the datastore starts off empty.
 * Some data takes longer to scrape than other therefore some items in the
 * datastore will stay empty for a while. To prevent this we backfill the datastore
 * with the last output datasource if any of the stores are empty
 *
 * NOTE:
 *   Regarding packing and diffing data
 *   We should never save packed data or data diffs
 *   We should only ever emit packed data or data diffs so knowing that
 *   all data we work with here should be full datasets of unpacked data
 *
 * @param {Object} [options]
 * @param {Object} data
 * @param {} cache
 *
 */
export default function dataOnHandleData(options = {}, data, cache, oldData = {}, appBootstrapData) {
  try {

    console.log('Not being used');
    debugger;


  }
  catch(error) {
    const message = `dataOnHandleData(): ${error}`;
    logger.error(message);
    if (process.env.NODE_ENV === 'development') debugger;
    return {message, error: true};
  }
}

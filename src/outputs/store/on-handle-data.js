import { objectGetNestedProperty as getNestedProp }  from 'bo-utils';

import analyticsMergeDataByKey                       from '../../utils/analytics-merge-data-by-key';
import settings                                      from '../../settings';

/**
 *
 *
 *
 */
export default function storeOnHandleData(options, data, cache, oldData = {}) {

  // Get old data
  const fileName = `${settings.generatedDir}/store/data.json`;

  // Maps
  const idName = getNestedProp(data, 'exchanges-general.maps.idName');
  const nameId = getNestedProp(data, 'exchanges-general.maps.nameId');

  // Exchanges object by Id
  const list = getNestedProp(data, 'exchanges-list.data') || {};
  const general = getNestedProp(data, 'exchanges-general.data') || {};
  const exchanges = analyticsMergeDataByKey([list, general]);

  const output = {
    ...oldData,
    ...exchanges && {exchanges},
    ...nameId && {'exchange-map-nameId': nameId},
    ...idName && {'exchange-map-idName': idName}
  }

  debugger;
  cache.set(fileName, JSON.stringify(output));

}

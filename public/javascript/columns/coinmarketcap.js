'use strict';

import { partialApplication } from '../libs/bo-utils-client';
import cellRendererCurrency   from '../utils/cell-renderer-currency.js';

export default {

  //
  // CoinMarketCap
  //

  // 'cmc-listings-circulating_supply' : val.circulating_supply,
  // 'cmc-listings-cmc_rank'           : val.cmc_rank,
  // 'cmc-listings-date_added'         : val.date_added,
  // 'cmc-listings-id'                 : val.id,
  // 'cmc-listings-last_updated'       : val.last_updated,
  // 'cmc-listings-max_supply'         : val.max_supply,
  // 'cmc-listings-name'               : val.name,
  // 'cmc-listings-num_market_pairs'   : val.num_market_pairs,
  // 'cmc-listings-tags'               : val.tags,
  // 'cmc-listings-total_supply'       : val.total_supply,
  // 'cmc-listings-market_cap'         : gnp(val, 'quote.USD.market_cap'),
  // 'cmc-listings-percent_change_1h'  : gnp(val, 'quote.USD.percent_change_1h'),
  // 'cmc-listings-percent_change_7d'  : gnp(val, 'quote.USD.percent_change_7d'),
  // 'cmc-listings-percent_change_24h' : gnp(val, 'quote.USD.percent_change_24h'),
  // 'cmc-listings-volume_24h'         : gnp(val, 'quote.USD.volume_24h'),

  marketcapUSDCMC: {
    colId: 'marketcapUSDCMC',
    field: 'cmc-listings-market_cap',
    headerName: 'Market Cap $ Coinmarketcap',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Coinmarketcap',
    lockPinned: true,
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

}

'use strict';

import { partialApplication } from '../libs/bo-utils-client';
import cellRendererCurrency   from '../utils/cell-renderer-currency.js';

export default {

  //
  // CoinMarketCap
  //

  // 'cmc-listings-cmc_rank'           : val.cmc_rank,
  // 'cmc-listings-id'                 : val.id,
  // 'cmc-listings-name'               : val.name,
  // 'cmc-listings-date_added'         : val.date_added,
  // 'cmc-listings-percent_change_1h'  : gnp(val, 'quote.USD.percent_change_1h'),

  marketcapUSDCMC: {
    colId: 'marketcapUSDCMC',
    field: 'cmc-listings-market_cap',
    headerName: 'Market Cap $',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: CoinMarketcap',
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

  volume24HourCMC: {
    colId: 'volume24HourCMC',
    field: 'cmc-listings-volume_24h',
    headerName: '24H Volume $',
    headerClass: 'CH-col',
    headerTooltip: 'The 24 hour volume across all exchanges in USD\n\nData Source: CoinMarketcap',
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

  circulatingSupplyCMC: {
    colId: 'circulatingSupplyCMC',
    field: 'cmc-listings-circulating_supply',
    headerName: 'Circulating Supply',
    headerClass: 'CH-col',
    headerTooltip: 'Circulating Supply\n\nData Source: CoinMarketCap',
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

  percentChange24HourCMC: {
    colId: 'percentChange24HourCMC',
    field: 'cmc-listings-percent_change_24h',
    headerName: '24H Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 Hours\n\nData Source: CoinMarketCap',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent',
    ],
  },

  percentChange7DayCMC: {
    colId: 'percentChange7DayCMC',
    field: 'cmc-listings-percent_change_7d',
    headerName: '24H Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 7 Days\n\nData Source: CoinMarketCap',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent',
    ],
  },

  // 'cmc-listings-max_supply'         : val.max_supply,
  // 'cmc-listings-num_market_pairs'   : val.num_market_pairs,
  // 'cmc-listings-tags'               : val.tags,
  // 'cmc-listings-total_supply'       : val.total_supply,

}

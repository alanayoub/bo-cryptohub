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

  rankCMC: {
    colId: 'rankCMC',
    field: 'cmc-listings-cmc_rank',
    headerName: 'Coinmarketcap rank',
    headerClass: 'CH-col',
    headerTooltip: [
      'Coinmarketcaps Cryptoasset Rank as described below can be found on Coinmarketcap at https://coinmarketcap.com/methodology/',
      'Due to the launch of the CoinMarketCap indices a project’s eligibility for a Top 200 Cryptoasset Rank will now be determined by market capitalization (8) and the following factors:',
      '-\tOur ability to verify the project’s supply information with no incongruities',
      '-\tStrengths in a number of areas of Listings Review Criteria\'s Section C (Evaluation Framework) below',
      '-\tSignificant liquidity/trading activity with normal bid-ask spreads across sufficient sources of market data',
      '-\tAbsence of significant price discrepancies across CMC-supported exchanges',
      '-\tThe asset is traded on at least three non-decentralized exchanges that possess a number of the following attributes:',
      '-\t\tDATA Partner',
      '-\t\tRegulated/Licensed',
      '-\t\tPublishes granular API endpoints',
      '-\t\tActive product development and communication from the team',
      '-\t\tActive/engaged community',
      '-\t\tAccredited/Audited by a credible 3rd party',
      'The aforementioned factors are intended to provide general guidance without disclosing internal thresholds so as to prevent projects from ‘gaming’ or manipulating the rankings. Further, the sheer variety of monetary and accounting models used by projects adds complexity to the process of verification, which means that there will be occasions where CoinMarketCap will have to exercise its discretion in determining a project’s circulating supply and/or eligibility for a Top 200 ranking (e.g. stablecoins, privacy coins, sidechains, and exchange tokens). Consequently, maximum rank eligibility of a project will fall under one of three categories:',
      'Top 200 Rank: The project must minimally have a CMC-verified market capitalization and fulfill the requirements outlined in 10a - 10e.',
      'Top 201 Rank and beyond: The project must minimally have a CMC-verified market capitalization but does not need to fulfill the requirements in 10a - 10e.',
      'Unranked: Cryptoassets without a CMC-verified market capitalization sorted by 24h trading volume.',
      'Data Source: CoinMarketcap'].join('\n\n'),
    lockPinned: true,
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
  },

  marketcapUSDCMC: {
    colId: 'marketcapUSDCMC',
    field: 'cmc-listings-quote_USD_market_cap',
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
    field: 'cmc-listings-quote_USD_volume_24h',
    headerName: 'Volume 24h $',
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
    field: 'cmc-listings-quote_USD_percent_change_24h',
    headerName: 'Change 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 Hours\n\nData Source: CoinMarketCap',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent',
    ],
  },

  percentChange7DayCMC: {
    colId: 'percentChange7DayCMC',
    field: 'cmc-listings-quote_USD_percent_change_7d',
    headerName: 'Change 7d $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 7 Days\n\nData Source: CoinMarketCap',
    lockPinned: true,
    width: 100,
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

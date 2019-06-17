'use strict';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from './libs/bo-utils-client';
import { partialApplication }             from './libs/bo-utils-client';

// ag-grid cell Renderer Classes
import CellRendererSparkline              from './utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererName                   from './utils/cell-renderer-name.js';
import cellRendererNumber                 from './utils/cell-renderer-number.js';
import cellRendererCurrency               from './utils/cell-renderer-currency.js';
import cellRendererExchanges              from './utils/cell-renderer-exchanges.js';
import cellRendererTradingview            from './utils/cell-renderer-tradingview.js';

import onCellClicked                      from './utils/on-cell-clicked.js';

// ag-grid filter comparators
import sortNumbers                        from './utils/sort-numbers.js';

const columnDefs = {

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

  //
  // Marketcap
  //
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

  //
  // The numeric index for each row
  // stays the same during sort and filtering
  // always counts from 1 to rows.length
  //
  rowIndex: {
    colId: 'rowIndex',
    field: 'rowIndex',
    valueGetter: 'node.rowIndex',
    headerName: '#',
    headerClass: 'CH-col',
    headerTooltip: 'Row Number',
    width: 40,
    pinned: 'left',
    lockPinned: true,
    lockPosition: true,
    suppressMenu: true,
    suppressFilter: true,
    cellClass: 'cryptohub-align-right',
    cellRenderer(params) {
      return params.value + 1;
    },
    type: [
      'cryptohubNumeric',
    ],
  },

  //
  // Name
  // Asset icon, name & symbol
  //
  name: {
    colId: 'name',
    field: 'cc-total-vol-full-FullName.value',
    headerName: 'Name',
    headerClass: 'CH-col',
    headerTooltip: 'Name',
    width: 180,
    pinned: 'left',
    lockPinned: true,
    cellRenderer: cellRendererName,
  },

  //
  // Sector
  // A list of the assets sectors
  //
  sectors: {
    colId: 'sectors',
    field: 'm-metrics-sectors',
    headerName: 'Sectors',
    headerClass: 'CH-col',
    headerTooltip: 'Sectors',
    lockPinned: true,
    width: 120,
    type: ['cryptohubText'],
    valueFormatter(params) {
      const value = gnp(params, 'value.value');
      if (!Array.isArray(value) || !value.length) return ch.emptyCellValue;
      else return value.join(', ');
    }
  },

  //
  // USD Price
  //
  priceUSD: {
    colId: 'priceUSD',
    field: 'cc-total-vol-full-PRICE',
    headerName: 'Price $',
    headerClass: 'CH-col',
    headerTooltip: 'Price in USD\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
      symbolTo: 'USD'
    },
    onCellClicked,
  },

  //
  // BTC Price
  //
  priceBTC: {
    colId: 'priceBTC',
    field: 'cryptohub-price-btc',
    headerName: 'Price ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: BinaryOverdose, calculated from Cryptocompare data',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'SAT',
      symbolTo: 'BTC'
    },
    onCellClicked,
  },

  //
  // All Time High (USD)
  //
  athUSD: {
    colId: 'athUSD',
    field: 'm-metrics-ath-price',
    headerName: 'ATH $',
    headerClass: 'CH-col',
    headerTooltip: 'All Time High (USD)\n\nData Source: OnChainFX',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

  //
  // All Time High Percent Down
  //
  athPercentDownUSD: {
    colId: 'athPercentDownUSD',
    field: 'm-metrics-ath-percent-down',
    headerName: 'ATH % Down',
    headerClass: 'CH-col',
    headerTooltip: '% Down from All Time High (USD)\n\nData Source: OnChainFX',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercentNoFormat'
    ],
  },

  //
  // Cycle low (USD)
  //
  // This is the lowest trading price (in USD) of the asset since its All-Time-High.
  // Notes about how OnChainFX determines Cycle Low:
  //
  // The Cycle Low quote is not necessarily the absolute lowest single trade price.
  // Due to the nature of the historical data we analyze, we are not always able to look at every trade for an asset.
  // For some assets, the Cycle Low quoted may refer to the lowest daily average since the ATH,
  // or a price-sample on the day the Cycle Low occured.
  //
  cycleLowUSD: {
    colId: 'cycleLowUSD',
    field: 'm-metrics-cycle-low-price',
    headerName: 'Cycle Low $',
    headerClass: 'CH-col',
    headerTooltip: 'The lowest trading price (in USD) of the asset since its All-Time-High\n\nData Source: OnChainFX',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

  //
  // 24 Hour Percent Change (USD)
  // NOTE: We want percent change against BTC too!
  //
  percentChange24hUSD: {
    colId: 'percentChange24hUSD',
    field: 'cc-total-vol-full-CHANGEPCTDAY',
    headerName: '24H Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 7 Day Percent change (BTC)
  //
  percentChange7dBTC: {
    colId: 'percentChange7dBTC',
    field: 'm-metrics-percent-change-btc-last-1-week',
    headerName: '7D Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 7 days against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 1 Month Percent change (BTC)
  //
  percentChange1mBTC: {
    colId: 'percentChange1mBTC',
    field: 'm-metrics-percent-change-btc-last-1-month',
    headerName: '1M Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 1 month against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 3 Month Percent change (BTC)
  //
  percentChange3mBTC: {
    colId: 'percentChange3mBTC',
    field: 'm-metrics-percent-change-btc-last-3-months',
    headerName: '3M Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 3 months against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 1 Year Percent change (BTC)
  //
  percentChange1yBTC: {
    colId: 'percentChange1yBTC',
    field: 'm-metrics-percent-change-btc-last-1-year',
    headerName: '1Y Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 1 year against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // Sparkline (USD)
  //
  // 7 Day USD price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineUSD: {
    colId: 'sparklineUSD',
    field: 'cryptohub-price-history',
    headerName: '7D Trend $',
    headerClass: 'CH-col',
    headerTooltip: '7 Day USD price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 124,
    cellRenderer: CellRendererSparkline,
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      volumeDays: 7,
    }
  },

  //
  // Volume
  //
  // The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD
  //
  volume24hUSD: {
    colId: 'volume24hUSD',
    field: 'cc-total-vol-full-TOTALVOLUME24HTO',
    headerName: 'Volume 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Cryptocompare',
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

  //
  // Marketcap
  //
  marketcapUSD: {
    colId: 'marketcapUSD',
    field: 'cc-total-vol-full-MKTCAP',
    headerName: 'Market Cap $',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Cryptocompare',
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

  //
  // Circulating Supply
  //
  circulatingSupply: {
    colId: 'circulatingSupply',
    field: 'cc-total-vol-full-SUPPLY',
    headerName: 'Circulating Supply',
    headerClass: 'CH-col',
    headerTooltip: 'Circulating supply\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Proof type
  //
  proofType: {
    colId: 'proofType',
    field: 'cc-total-vol-full-ProofType.value',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: ['cryptohubText'],
  },

  //
  // Algo
  //
  algo: {
    colId: 'algo',
    field: 'cc-total-vol-full-Algorithm.value',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: 'Algorithm\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: ['cryptohubText'],
  },

  //
  // Hashes per second
  //
  hashesPerSecond: {
    colId: 'hashesPerSecond',
    field: 'cc-total-vol-full-NetHashesPerSecond',
    headerName: 'Hashes per/s',
    headerClass: 'CH-col',
    headerTooltip: 'Net Hashes per/s\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 180,
    columnGroupShow: 'both',
    comparator: sortNumbers,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Number of Exchanges
  //
  numberOfExchanges: {
    colId: 'numberOfExchanges',
    field: 'cryptohub-numberOfExchanges',
    headerName: 'Exchanges',
    headerClass: 'CH-col',
    headerTooltip: 'Number of Exchanges the token is listed on\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellStyle: {
      padding: 0
    },
    cellRenderer: cellRendererExchanges,
    onCellClicked,
  },

  //
  // Number of pairs
  //
  numberOfPairs: {
    colId: 'numberOfPairs',
    field: 'cryptohub-numberOfPairs',
    headerName: 'Pairs',
    headerTooltip: 'Number of pairs\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Number of Fiat pairs
  //
  numberOfFiatPairs: {
    colId: 'numberOfFiatPairs',
    field: 'cryptohub-numberOfFiatPairs',
    headerName: 'Fiat pairs',
    headerTooltip: 'Number of fiat pairs\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Number of Fiat currencies
  //
  numberOfFiatCurrencies: {
    colId: 'numberOfFiatCurrencies',
    field: 'cryptohub-numberOfFiatCurrencies',
    headerName: 'Fiat Currencies',
    headerTooltip: 'Number of fiat Currencies\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // USD Price
  //
  messariPriceUSD: {
    colId: 'messariPriceUSD',
    field: 'm-metrics-price-usd',
    headerName: 'Price $',
    headerClass: 'CH-col',
    headerTooltip: 'Price in USD\n\nData Source: Messari',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
      symbolTo: 'USD'
    },
    onCellClicked,
  },

  //
  // BTC Price
  //
  messariPriceBTC: {
    colId: 'messariPriceBTC',
    field: 'm-metrics-price-btc',
    headerName: 'Price ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'SAT',
      symbolTo: 'BTC'
    },
    onCellClicked,
  },

  //
  // Volume
  //
  messariVolume24hUSD: {
    colId: 'messariVolume24hUSD',
    field: 'm-metrics-volume-last-24-hours',
    headerName: 'Volume 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Messari',
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

  //
  // Real Volume
  //
  messariRealVolume24hUSD: {
    colId: 'messariRealVolume24hUSD',
    field: 'm-metrics-real-volume-last-24-hours',
    headerName: 'Volume 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Messari',
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

  //
  // 24 Hour Percent Change (USD)
  //
  messariPercentChange24hUSD: {
    colId: 'messariPercentChange24hUSD',
    field: 'm-metrics-percent-change-usd-last-24-hours',
    headerName: 'Δ 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 24 Hour Percent Change (BTC)
  //
  messariPercentChange24hBTC: {
    colId: 'messariPercentChange24hBTC',
    field: 'm-metrics-percent-change-btc-last-24-hours',
    headerName: 'Δ 24h ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

};

export default columnDefs;

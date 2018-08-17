import { shortToFull } from '/javascript/utils/map-db-fields.js';

const socket = io();
let grid;
let rowData;
// let columnDefs;








let gridOptions = {
  enableFilter: true,
  enableSorting: true,
  floatingFilter: true,
  enableColResize: true,
  deltaRowDataMode: true,
  components: {
    currencyCellRenderer: function (params) {
      const usdFormatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
      });
      return usdFormatter.format(params.value);
    },
    numberRenderer: function (params) {
      const numString = params.value;
      return +numString;
    },
    numberFormattedRenderer: function (params) {
      const number = params.value;
      return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    checkboxRenderer: bool => {
      return `<input type='checkbox' ${bool ? 'checked' : ''} />`;
    },
    imageRenderer(params) {
      return `<img src="${params.value}" style="width: 22px; height: 22px; margin: 1px" />`;
    },
    nameRenderer(params) {
      debugger;
      const imgUrl = params.data['cryptohub-symbolUrl'];
      const css = 'width: 22px; height: 22px; margin: 1px; margin: 1px 5px 1px 2px; vertical-align: bottom;';
      return `<img src="${imgUrl}" style="${css}" />${params.value}`;
    },
  },
  defaultColDef: {
    editable: false,
    filter: 'agTextColumnFilter'
  },
  columnTypes: {
    image: {
      cellRenderer: 'imageRenderer',
      editable: false,
    },
    name: {
      cellRenderer: 'nameRenderer',
    },
    number: {
      filter: 'agNumberColumnFilter',
      cellRenderer: 'numberRenderer',
    },
    numberFormatted: {
      filter: 'agNumberColumnFilter',
      cellRenderer: 'numberFormattedRenderer',
    },
    booleanColumn: {
      cellRenderer: 'checkboxRenderer',
    },
    textColumn: {
      filter: 'agTextColumnFilter',
    },
    percentColumn: {
      filter: 'agNumberColumnFilter',
      cellRenderer: 'percentCellRenderer',
    },
    dateColumn: {
      filter: 'agDateColumnFilter',
    },
    usdColumn: {
      filter: 'agNumberColumnFilter',
      cellRenderer: 'currencyCellRenderer',
    },
    hiddenColumn: {
      hide: true
    },
  },
  columnDefs: [

    // Hidden
    // {field: 'cc-coinlist-Id'                                             , type: ['hiddenColumn']                        , headerName: ''                           , headerTooltip: ''},                                                              // "925095"
    // {field: 'cc-snapshot-SEO-BaseImageUrl'                               , type: ['hiddenColumn']                        , headerName: ''                           , headerTooltip: ''},                                                              // "https://www.cryptocompare.com"
    // {field: 'cc-snapshot-SEO-BaseUrl'                                    , type: ['hiddenColumn']                        , headerName: ''                           , headerTooltip: ''},                                                              // "https://www.cryptocompare.com"
    // {field: 'cc-snapshot-General-ImageUrl'                               , type: ['textColumn']                          , headerName: ''                           , headerTooltip: ''},                                                              // "/media/34478121/cdpt.png"
    // {field: 'cryptohub-symbolUrl'                            , width: 70    , type: ['image']                               , headerName: ''                           , headerTooltip: ''},                                                              //




    // Basic data
    { headerName: '',
      headerClass: '',
      children: [
        {field: 'cc-coinlist-SortOrder'    , pinned: 'left'      , width: 70               , type: ['number']                              , headerName: '#'                          , headerTooltip: 'Cryptocompare Sort Order'},                                      // "3223"
        {field: 'cc-coinlist-CoinName'     , pinned: 'left'                                , type: ['name']                                , headerName: 'Name'                       , headerTooltip: ''},                                                              // "Ethereum"
        {field: 'cc-coinlist-Symbol'       , pinned: 'left'      , width: 90               , type: ['textColumn']                          , headerName: 'Symbol'                     , headerTooltip: ''},                                                              // "CDPT"
      ]
    },

    { headerName: 'Price',
      headerClass: 'cryptohub-analytics-priceGroup',
      children: [
        {field: 'cc-price-PRICE'                                                           , type: ['numberFormatted', 'usdColumn']        , headerName: 'Price'                      , headerTooltip: ''},                                                              // 7470.67
        {field: 'cc-price-MKTCAP'                                                          , type: ['numberFormatted', 'usdColumn']        , headerName: 'Market Cap'                 , headerTooltip: 'The price in USD multiplied by the number of coins or tokens'},  // 128184833776.04001
        {field: 'cc-price-CHANGEPCT24HOUR'                                                 , type: ['numberFormatted', 'percentColumn']    , headerName: '24 Hour Change %'           , headerTooltip: 'Percent change in the last 24 hours'},                           // 1.741018108821805
        {field: 'cc-price-TOTALVOLUME24HTO'                 , columnGroupShow: 'closed'    , type: ['numberFormatted', 'usdColumn']        , headerName: 'Total Volume 24h (USD)'     , headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD'},  // 4981342812.399607
      ]
    },

    { headerName: 'Supply',
      headerClass: 'cryptohub-analytics-supplyGroup',
      children: [
        {field: 'cc-price-SUPPLY'                                                          , type: ['numberColumn']                        , headerName: 'Circulating Supply'         , headerTooltip: ''},                                                              // 17158412
        {field: 'cc-coinlist-TotalCoinSupply'                                              , type: ['textColumn']                          , headerName: 'Total Coins Supply'         , headerTooltip: ''},                                                              // "3,400,000,000"
        {field: 'cc-snapshot-General-TotalCoinsMined'                                      , type: ['numberColumn']                        , headerName: 'Total Coins Mined'          , headerTooltip: ''},                                                              // ""
        {field: 'cc-snapshot-General-PreviousTotalCoinsMined'                              , type: ['numberColumn']                        , headerName: 'Previous Total Coins Mined' , headerTooltip: ''},                                                              // ""
      ]
    },

    {headerName: 'Technical Data',
      headerClass: 'cryptohub-analytics-technicalGroup',
      children: [
        {field: 'cc-coinlist-FullyPremined'                                                , type: ['textColumn']                          , headerName: 'Fully Premined'             , headerTooltip: ''},                                                              // "0"
        {field: 'cc-coinlist-PreMinedValue'                                                , type: ['textColumn']                          , headerName: 'Pre Mined Value'            , headerTooltip: ''},                                                              // "N/A"
        {field: 'cc-coinlist-Algorithm'                     , columnGroupShow: 'closed'    , type: ['textColumn']                          , headerName: 'Algorithm'                  , headerTooltip: ''},                                                              // "Ethash"
        {field: 'cc-coinlist-ProofType'                     , columnGroupShow: 'closed'    , type: ['textColumn']                          , headerName: 'Proof Type'                 , headerTooltip: ''},                                                              // "PoA"
        {field: 'cc-snapshot-General-NetHashesPerSecond'    , columnGroupShow: 'closed'    , type: ['numberColumn']                        , headerName: 'Net Hashes per/s'           , headerTooltip: ''},                                                              // ""
      ]
    },

    {headerName: 'Fundamentals',
      headerClass: 'cryptohub-analytics-fundamentalsGroup',
      children: [
        {field: 'cryptohub-NumberOfExchanges'                                   , type: ['numberColumn']                        , headerName: '# of Exchanges'             , headerTooltip: ''},                                                              // 0
        {field: 'cryptohub-NumberOfPairs'                                       , type: ['numberColumn']                        , headerName: '# of Pairs'                 , headerTooltip: ''},                                                              // 0
      ]
    },

    {headerName: 'Links',
      headerClass: 'cryptohub-analytics-linksGroup',
      children: [
        {field: 'cc-snapshot-General-WebsiteUrl'                                , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "https://ternion.io/"
        {field: 'cc-snapshot-ICO-WebsiteLink'                                   , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "https://ternion.io/"
        {field: 'cc-snapshot-ICO-WhitePaperLink'                                , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "https://ternion.io/TernionWhitepaper_en.pdf"
        {field: 'cc-snapshot-General-Twitter'                                   , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "@ternionofficial"
      ]
    },
    // Trading data?
    // Fundamentals?

    // Cryptohub custom

    // Links

    // ICO
    {field: 'cc-snapshot-ICO-BlogLink'                                      , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "https://medium.com/ternion"
    {field: 'cc-snapshot-ICO-Date'                                          , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // 1530230400
    {field: 'cc-snapshot-ICO-EndDate'                                       , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // 1546214399
    {field: 'cc-snapshot-ICO-FundingCap'                                    , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "65,000,000 USD"
    {field: 'cc-snapshot-ICO-FundingTarget'                                 , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "No Target"
    {field: 'cc-snapshot-ICO-FundsRaisedUSD'                                , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "1436485"
    {field: 'cc-snapshot-ICO-ICOTokenSupply'                                , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "95000000"
    {field: 'cc-snapshot-ICO-Jurisdiction'                                  , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "Estonia"
    {field: 'cc-snapshot-ICO-StartPrice'                                    , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "3.23"
    {field: 'cc-snapshot-ICO-StartPriceCurrency'                            , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "USD"
    {field: 'cc-snapshot-ICO-Status'                                        , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "Ongoing"
    {field: 'cc-snapshot-ICO-TokenPercentageForInvestors'                   , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "80"
    {field: 'cc-snapshot-ICO-TokenReserveSplit'                             , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "3% B, 17% T"
    {field: 'cc-snapshot-ICO-TokenSupplyPostICO'                            , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "Increases"
    {field: 'cc-snapshot-ICO-TokenType'                                     , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "ETH (ERC20)"

    // Other
    {field: 'cc-snapshot-General-StartDate'                                 , type: []                                      , headerName: ''                           , headerTooltip: ''},                                                              // "01/01/0001"


    //
    // NOTE: Not interested at least for now
    //
    // {field: 'cc-coinlist-FullName'                                , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "Ethereum (ETH)"
    // {field: 'cc-coinlist-Name'                                    , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "ETH"
    // {field: 'cc-coinlist-Sponsored'                               , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : false
    // {field: 'cc-coinlist-Url'                                     , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "/coins/cdpt/overview"
    //
    // {field: 'cc-price-CHANGE24HOUR'                               , type: ['numberFormatted', 'usdColumn']          , headerName: ''    , headerTooltip: ''},  //             : 127.84000000000015
    // {field: 'cc-price-CHANGEDAY'                                  , type: ['numberFormatted', 'usdColumn']          , headerName: ''    , headerTooltip: ''},  //             : 87.27999999999975
    // {field: 'cc-price-CHANGEPCTDAY'                               , type: ['numberFormatted', 'percentColumn']      , headerName: ''    , headerTooltip: ''},  //             : 1.182112823513315
    // {field: 'cc-price-FLAGS'                                      , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "1"
    // {field: 'cc-price-FROMSYMBOL'                                 , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "BTC"
    // {field: 'cc-price-HIGH24HOUR'                                 , type: ['numberFormatted', 'usdColumn']          , headerName: ''    , headerTooltip: ''},  //             : 7521.64
    // {field: 'cc-price-HIGHDAY'                                    , type: ['numberFormatted', 'usdColumn']          , headerName: ''    , headerTooltip: ''},  //             : 7515.68
    // {field: 'cc-price-LASTMARKET'                                 , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "Coinbase"
    // {field: 'cc-price-LASTTRADEID'                                , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "46795108"
    // {field: 'cc-price-LASTUPDATE'                                 , type: ['dataColumn']                          , headerName: ''    , headerTooltip: ''},  //             : 1532031375
    // {field: 'cc-price-LASTVOLUME'                                 , type: ['numberFormatted']                       , headerName: ''    , headerTooltip: ''},  //             : 0.00960608
    // {field: 'cc-price-LASTVOLUMETO'                               , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 71.65175072
    // {field: 'cc-price-LOW24HOUR'                                  , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 7281.05
    // {field: 'cc-price-LOWDAY'                                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 7289.9
    // {field: 'cc-price-MARKET'                                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "CCCAGG"
    // {field: 'cc-price-OPEN24HOUR'                                 , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 7342.83
    // {field: 'cc-price-OPENDAY'                                    , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 7383.39
    // {field: 'cc-price-TOSYMBOL'                                   , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "USD"
    // {field: 'cc-price-TOTALVOLUME24H'                             , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 667170.3800342516
    // {field: 'cc-price-TYPE'                                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "5"
    // {field: 'cc-price-VOLUME24HOUR'                               , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 66276.30072056636
    // {field: 'cc-price-VOLUME24HOURTO'                             , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 492261440.89323807
    // {field: 'cc-price-VOLUMEDAY'                                  , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 58741.62314874989
    // {field: 'cc-price-VOLUMEDAYTO'                                , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : 436702891.31417674
    //
    // {field: 'cc-snapshot-General-AffiliateUrl'                    , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "-"
    // {field: 'cc-snapshot-General-Algorithm'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-BaseAngularUrl'                  , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "/coins/trn/"
    // {field: 'cc-snapshot-General-BlockNumber'                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-BlockReward'                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-BlockRewardReduction'            , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-BlockTime'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-DangerTop'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-Description'                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<p><span>Ternion is a hybrid...</p>"
    // {field: 'cc-snapshot-General-DifficultyAdjustment'            , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-DocumentType'                    , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "Webpagecoinp"
    // {field: 'cc-snapshot-General-Features'                        , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-H1Text'                          , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "Ternion (TRN)"
    // {field: 'cc-snapshot-General-Id'                              , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "910733"
    // {field: 'cc-snapshot-General-ImageUrl'                        , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "/media/34155510/trn.png"
    // {field: 'cc-snapshot-General-IndividualSponsor'               , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : {Text: "", Link: "https://perucoin.com.pe/?ref=1142", AffiliateLogo: Array(0), ExcludedCountries: ""}
    // {field: 'cc-snapshot-General-InfoTop'                         , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-LastBlockExplorerUpdateTS'       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-Name'                            , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "Ternion"
    // {field: 'cc-snapshot-General-ProofType'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-Sponsor'                         , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : {TextTop: "", Link: "https://goo.gl/x2wT5k", ImageUrl: "/media/34077388/100x65.gif"}
    // {field: 'cc-snapshot-General-Symbol'                          , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "TRN"
    // {field: 'cc-snapshot-General-Technology'                      , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<p><strongncy, etc)</p>"
    // {field: 'cc-snapshot-General-Url'                             , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "/coins/trn/"
    // {field: 'cc-snapshot-General-WarningTop'                      , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : ""
    // {field: 'cc-snapshot-General-Website'                         , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<a href='https://ternion.io/' target='_blank'>Ternion</a>"
    //
    // {field: 'cc-snapshot-ICO-Blog'                                , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<a href='https://medium.com/ternion' target='_blank'>Visit Blog</a>"
    // {field: 'cc-snapshot-ICO-Description'                         , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<p><span>Ternion is a hybrid crypto...</p>"
    // {field: 'cc-snapshot-ICO-FundsRaisedList'                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "1,436,485 USD"
    // {field: 'cc-snapshot-ICO-Features'                            , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<p>Eion.</p>"
    // {field: 'cc-snapshot-ICO-LegalAdvisers'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "N/A"
    // {field: 'cc-snapshot-ICO-LegalForm'                           , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "N/A"
    // {field: 'cc-snapshot-ICO-PaymentMethod'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "ETH"
    // {field: 'cc-snapshot-ICO-PublicPortfolioId'                   , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "N/A"
    // {field: 'cc-snapshot-ICO-PublicPortfolioUrl'                  , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "-"
    // {field: 'cc-snapshot-ICO-SecurityAuditCompany'                , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "N/A"
    // {field: 'cc-snapshot-ICO-Website'                             , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<a href='https://ternion.io/' target='_blank'>Go To Sale Website</a>"
    // {field: 'cc-snapshot-ICO-WhitePaper'                          , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "<a href='https://ternion.io/TernionWhitepaper_en.pdf' target='_blank'>Read Whitepaper</a>"
    // {field: 'cc-snapshot-SEO-OgImageHeight'                       , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "300"
    // {field: 'cc-snapshot-SEO-OgImageUrl'                          , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "/media/34155510/trn.png"
    // {field: 'cc-snapshot-SEO-OgImageWidth'                        , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "300"
    // {field: 'cc-snapshot-SEO-PageDescription'                     , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "Live Ternion prices from..."
    // {field: 'cc-snapshot-SEO-PageTitle'                           , type: []                                      , headerName: ''    , headerTooltip: ''},  //             : "Ternion (TRN) - Live streaming prices and market cap"

    // TODO: Filter out anything that isnt trading
    // {field: 'cc-coinlist-IsTrading'                               , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : true

    // TODO: What are these fields?
    // {field: 'cc-coinlist-BuiltOn'                                 , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "N/A"
    // {field: 'cc-coinlist-SmartContractAddress'                    , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "N/A"
    // {field: 'cc-coinlist-TotalCoinsFreeFloat'                     , type: ['textColumn']                          , headerName: ''    , headerTooltip: ''},  //             : "N/A"

// cc-price-CHANGE24HOUR : -6.029999999999973
// cc-price-CHANGEDAY : -11.359999999999957
// cc-price-CHANGEPCT24HOUR : -1.2729844413012672
// cc-price-CHANGEPCTDAY : -2.3715084965137065
// cc-price-FLAGS : "4"
// cc-price-FROMSYMBOL : "ETH"
// cc-price-HIGH24HOUR : 484.09
// cc-price-HIGHDAY : 483.79
// cc-price-LASTMARKET : "Coinbase"
// cc-price-LASTTRADEID : "37585856"
// cc-price-LASTUPDATE : 1532031375
// cc-price-LASTVOLUME : 0.20982181
// cc-price-LASTVOLUMETO : 98.0749104302
// cc-price-LOW24HOUR : 462.62
// cc-price-LOWDAY : 462.87
// cc-price-MARKET : "CCCAGG"
// cc-price-MKTCAP : 47136798523.39109
// cc-price-OPEN24HOUR : 473.69
// cc-price-OPENDAY : 479.02
// cc-price-PRICE : 467.66
// cc-price-SUPPLY : 100792880.5615
// cc-price-TOSYMBOL : "USD"
// cc-price-TOTALVOLUME24H : 2541659.2198308287
// cc-price-TOTALVOLUME24HTO : 1191641061.385223
// cc-price-TYPE : "5"
// cc-price-VOLUME24HOUR : 359374.7845037404
// cc-price-VOLUME24HOURTO : 171073922.3601567
// cc-price-VOLUMEDAY : 313973.9747841605
// cc-price-VOLUMEDAYTO : 149333327.6066779
// cc-snapshot-General-Algorithm : "Ethash"
// cc-snapshot-General-BaseAngularUrl : "/coins/eth/"
// cc-snapshot-General-BlockNumber : 5995127
// cc-snapshot-General-BlockReward : 3
// cc-snapshot-General-BlockRewardReduction : ""
// cc-snapshot-General-BlockTime : 15
// cc-snapshot-General-DangerTop : ""
// cc-snapshot-General-Description : "<p>Ethereum i.io</a>. </p>"
// cc-snapshot-General-DifficultyAdjustment : "Per 1 Block"
// cc-snapshot-General-DocumentType : "Webpagecoinp"
// cc-snapshot-General-Features : "<p>Eion.</p>"
// cc-snapshot-General-H1Text : "Ethereum (ETH)"
// cc-snapshot-General-Id : "7605"
// cc-snapshot-General-ImageUrl : "/media/20646/eth_logo.png"
// cc-snapshot-General-IndividualSponsor : {Text: "Trade Now!", Link: "https://ad.doubleclick.net/ddm/clk/422835620;224745460;b", AffiliateLogo: "/media/34477712/etoro.png", ExcludedCountries: ""}
// cc-snapshot-General-InfoTop : ""
// cc-snapshot-General-LastBlockExplorerUpdateTS : 1532047547
// cc-snapshot-General-Name : "Ethereum"
// cc-snapshot-General-NetHashesPerSecond : 250826557955759.78
// cc-snapshot-General-PreviousTotalCoinsMined : 0
// cc-snapshot-General-ProofType : "PoW"
// cc-snapshot-General-Sponsor : {TextTop: "", Link: "https://www.blockexmarkets.com/ico/ico-item/?id=TRIP&cxd=35069_360209&bta=35069&nci=5396", ImageUrl: "/media/34477707/two_weeks.gif"}
// cc-snapshot-General-StartDate : "30/07/2015"
// cc-snapshot-General-Symbol : "ETH"
// cc-snapshot-General-Technology : "<p><strongncy, etc)</p>"
// cc-snapshot-General-TotalCoinSupply : "0"
// cc-snapshot-General-TotalCoinsMined : 100797059.8428
// cc-snapshot-General-Twitter : "@ethereum"
// cc-snapshot-General-Url : "/coins/eth/"
// cc-snapshot-General-WarningTop : ""
// cc-snapshot-General-Website : "<a href='https://www.ethereum.org/' target='_blank'>Ethereum</a>"
// cc-snapshot-General-WebsiteUrl : "https://www.ethereum.org/"
// cc-snapshot-ICO-Blog : "<a href='https://blog.ethereum.org/' target='_blank'>Visit Blog</a>"
// cc-snapshot-ICO-BlogLink : "https://blog.ethereum.org/"
// cc-snapshot-ICO-Date : 1406070000
// cc-snapshot-ICO-Description : "<p>Ethe><p> </p>"
// cc-snapshot-ICO-EndDate : 1409698800
// cc-snapshot-ICO-Features : "Bonus"
// cc-snapshot-ICO-FundingCap : "Unlimited"
// cc-snapshot-ICO-FundingTarget : "No Target"
// cc-snapshot-ICO-FundsRaisedList : "31,529 BTC"
// cc-snapshot-ICO-FundsRaisedUSD : "18500000"
// cc-snapshot-ICO-ICOTokenSupply : "72009990.5"
// cc-snapshot-ICO-Jurisdiction : "Switzerland"
// cc-snapshot-ICO-LegalAdvisers : "MME"
// cc-snapshot-ICO-LegalForm : "Foundation"
// cc-snapshot-ICO-PaymentMethod : "BTC"
// cc-snapshot-ICO-PublicPortfolioId : "N/A"
// cc-snapshot-ICO-PublicPortfolioUrl : "-"
// cc-snapshot-ICO-SecurityAuditCompany : "DejaVu Security"
// cc-snapshot-ICO-StartPrice : "0.0005"
// cc-snapshot-ICO-StartPriceCurrency : "BTC"
// cc-snapshot-ICO-Status : "Finished"
// cc-snapshot-ICO-TokenPercentageForInvestors : "83.4"
// cc-snapshot-ICO-TokenReserveSplit : "8.3% T, 8.3% C"
// cc-snapshot-ICO-TokenSupplyPostICO : "Increases"
// cc-snapshot-ICO-TokenType : "New Blockchain"
// cc-snapshot-ICO-Website : "<a href='https://www.ethereum.org/' target='_blank'>Go To Sale Website</a>"
// cc-snapshot-ICO-WebsiteLink : "https://www.ethereum.org/"
// cc-snapshot-ICO-WhitePaper : "<a href='https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper' target='_blank'>Read Whitepaper</a>"
// cc-snapshot-ICO-WhitePaperLink : "https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper"
// cc-snapshot-SEO-BaseImageUrl : "https://www.cryptocompare.com"
// cc-snapshot-SEO-BaseUrl : "https://www.cryptocompare.com"
// cc-snapshot-SEO-OgImageHeight : "300"
// cc-snapshot-SEO-OgImageUrl : "/media/20646/eth_logo.png"
// cc-snapshot-SEO-OgImageWidth : "300"
// cc-snapshot-SEO-PageDescription : "Live Ether price from all markets and ETH coin market Capitalization. Stay up to date with the latest Ether price movements and forum discussion. Check out our snapshot charts and see when there is an opportunity to buy or sell."
// cc-snapshot-SEO-PageTitle : "Ethereum (ETH) - Live Ether price and market cap"
// cryptohub-NumberOfExchanges : 99
// cryptohub-NumberOfPairs : 282

    //
    // { headerName: '_id'             , field: '_id'                                                     },
    // { headerName: 'MARKET'          , field: 'MARKET'          , type: 'numericColumn'                      },
    // { headerName: 'TOSYMBOL'        , field: 'TOSYMBOL'        , type: 'numericColumn'                      },
    // { headerName: 'LASTTRADEID'     , field: 'LASTTRADEID'                                                 , headerTooltip: 'Fucking nora' },
    // { headerName: 'Last Volume'     , field: 'LASTVOLUME'      , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'Volume'          , field: 'VOLUMEDAY'       , type: 'numericColumn'                     , headerTooltip: 'Volume Today' },
    // { headerName: 'CHANGE24HOUR'    , field: 'CHANGE24HOUR'    , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'CHANGEDAY'       , field: 'CHANGEDAY'       , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'CHANGEPCTDAY'    , field: 'CHANGEPCTDAY'    , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'Symbol ID'       , field: 'SYMBOLID'        , type: 'numericColumn'                     , filter: 'agNumberColumnFilter'            , headerTooltip: 'Fucking nora' },

    // {
    //   headerName: 'Symbol',
    //   field: 'Symbol',
    //   headerTooltip: 'Symbol'
    // },

    // // {
    // //   headerName: 'TYPE',
    // //   field: 'TYPE',
    // //   type: 'numericColumn'
    // // },
    // // {
    // //   headerName: 'FLAGS',
    // //   field: 'FLAGS',
    // //   type: 'numericColumn'
    // // },
    // {
    //   headerName:    'Price (USD)',
    //   field:         'PRICE',
    //   type:          ['numericColumn', 'usdColumn'],
    //   headerTooltip: 'Price (USD)',
    // },
    // {
    //   headerName:    'Market Cap (USD)',
    //   field:         'MKTCAP',
    //   type:          'numericColumn',
    //   filter:        'agNumberColumnFilter',
    //   headerTooltip: 'The price in USD multiplied by the number of coins or tokens',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'Total Volume 24h (USD)',
    //   field: 'TOTALVOLUME24HTO',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'Total Volume 24h (TOKEN)',
    //   field: 'TOTALVOLUME24H',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in terms of the coin in question',
    // },
    // {
    //   headerName: 'Circulating Supply',
    //   field: 'SUPPLY',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Circulating Supply',
    //   cellRenderer:  'numberFormatter',
    //   // valueParser: numberValueParser
    //   // valueFormatter: numberValueParser
    // },
    // // {
    // //   headerName: 'VOLUME24HOUR',
    // //   field: 'VOLUME24HOUR',
    // //   type: 'numericColumn',
    // //   headerTooltip: '24 Hour volume traded against USD displayed in terms of the coin in question'
    // // },
    // // {
    // //   headerName: 'Volume 24H (USD)',
    // //   field: 'VOLUME24HOURTO',
    // //   type: 'numericColumn',
    // //   filter: 'agNumberColumnFilter',
    // //   headerTooltip: '24 Hour Volume traded against USD displayed in USD',
    // //   cellRenderer:  'currencyCellRenderer',
    // // },


    // {
    //   headerName: 'Open (Day, USD)',
    //   field: 'OPENDAY',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Open - Day - USD',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'High (Day, USD)',
    //   field: 'HIGHDAY',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'High so far today (USD)',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'Low (Day, USD)',
    //   field: 'LOWDAY',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Low so far today (USD)',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'Last Update',
    //   field: 'LASTUPDATE',
    //   type: 'dateColumn',
    //   headerTooltip: 'Last Update Time',
    // },
    // {
    //   headerName: 'Last Volume (USD)',
    //   field: 'LASTVOLUMETO',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Volume of last trade (USD)',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'Volume (USD)',
    //   field: 'VOLUMEDAYTO',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Todays Volume so far in USD',
    //   cellRenderer:  'currencyCellRenderer',
    // },
    // {
    //   headerName: 'Open 24H',
    //   field: 'OPEN24HOUR',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Open price last 24 hours'
    // },
    // {
    //   headerName: 'High 24h',
    //   field: 'HIGH24HOUR',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'High price last 24 hours'
    // },
    // {
    //   headerName: 'Low 24h',
    //   field: 'LOW24HOUR',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Low price last 24 hours'
    // },
    // {
    //   headerName: '24 Hour Change %',
    //   field: 'CHANGEPCT24HOUR',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: 'Percent change in the last 24 hours'
    // },
    // {
    //   headerName: 'Last Market',
    //   field: 'LASTMARKET',
    //   filter: 'agTextColumnFilter',
    //   headerTooltip: 'Last transaction exchange'
    // },
  ],
  rowData: [],
};













const eGridDiv = document.querySelector('#myGrid');

socket.on('data', data => {

  rowData = [];
  for (let [id, obj] of Object.entries(data)) {
    // if (!columnDefs) {
    //   columnDefs = [];
    //   const cols = Object.keys(obj);
    //   for (let [s, f] of Object.entries(shortToFull)) {
    //     // if (f === '_id') f = 'id';
    //     if (cols.includes(s)) {
    //       columnDefs.push({
    //         headerName: f, field: s
    //       });
    //     }
    //   }

    // }
    obj.id = obj.Id;
    rowData.push(obj);
  }
  debugger;

  //
  // TODO: Check if the columns change and update if nessisary
  //
  if (!grid) {
    gridOptions.rowData = rowData;
    // gridOptions = {
    //   columnDefs: columnDefs,
    //   rowData: rowData
    // };
    grid = new agGrid.Grid(eGridDiv, gridOptions);
  }
  else {
    gridOptions.api.setRowData(rowData);
  }

});

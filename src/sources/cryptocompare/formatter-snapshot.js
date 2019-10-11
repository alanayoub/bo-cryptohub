import logger from '../../logger';
import { getBid } from '../../db/query';
import { perSecondSave } from '../../db/save';

/**
 *
 * @return {Object} snapshot
 *
 * Data: {
 *   SEO: {
 *     PageTitle: "Ethereum (ETH) - Live Ether price and market cap",
 *     PageDescription: "Live Ether price ... charts and see when there is an opportunity to buy or sell.",
 *     BaseUrl: "https://www.cryptocompare.com",
 *     BaseImageUrl: "https://www.cryptocompare.com",
 *     OgImageUrl: "/media/20646/eth_logo.png",
 *     OgImageWidth: "300",
 *     OgImageHeight: "300"
 *   },
 *   General: {
 *     Id: "7605",
 *     DocumentType: "Webpagecoinp",
 *     H1Text: "Ethereum (ETH)",
 *     DangerTop: "",
 *     WarningTop: "",
 *     InfoTop: "",
 *     Symbol: "ETH",
 *     Url: "/coins/eth/",
 *     BaseAngularUrl: "/coins/eth/",
 *     Name: "Ethereum",
 *     ImageUrl: "/media/20646/eth_logo.png",
 *     Description: "<p>Ethereum is a decentralized platform that ...</p>",
 *     Features: "<p>Ethereum is a platform ...</p>",
 *     Technology: "<p><strong>Sandwich complexity...</p>",
 *     TotalCoinSupply: "0",
 *     DifficultyAdjustment: "Per 1 Block",
 *     BlockRewardReduction: "",
 *     Algorithm: "Ethash",
 *     ProofType: "PoW",
 *     StartDate: "30/07/2015",
 *     Twitter: "@ethereum",
 *     WebsiteUrl: "https://www.ethereum.org/",
 *     Website: "<a href='https://www.ethereum.org/' target='_blank'>Ethereum</a>",
 *     Sponsor: {
 *       TextTop: "",
 *       Link: "http://bit.ly/32ZySqt",
 *       ImageUrl: "/media/27010603/mbit1.png",
 *       ExcludedCountries: ""
 *     },
 *     IndividualSponsor: {
 *       Text: "Visit eToro",
 *       ExcludedCountries: "",
 *       AffiliateLogo: "/media/35651310/etoro-1-1.png",
 *       Link: "http://partners.etoro.com/A80944_TClick.aspx",
 *       Type: "Button"
 *     },
 *     LastBlockExplorerUpdateTS: 1570722779,
 *     BlockNumber: 8714964,
 *     BlockTime: 15,
 *     NetHashesPerSecond: 183811301642573,
 *     TotalCoinsMined: 108091023.624,
 *     PreviousTotalCoinsMined: 0,
 *     BlockReward: 2
 *   },
 *   ICO: {
 *     Status: "Finished",
 *     Description: "<p>Ethereum is a decentralized...</p>",
 *     TokenType: "New Blockchain",
 *     Website: "<a href='https://www.ethereum.org/' target='_blank'>Go To Sale Website</a>",
 *     WebsiteLink: "https://www.ethereum.org/",
 *     PublicPortfolioUrl: "-",
 *     PublicPortfolioId: "N/A",
 *     Features: "Bonus",
 *     FundingTarget: "No Target",
 *     FundingCap: "Unlimited",
 *     ICOTokenSupply: "72009990.5",
 *     TokenSupplyPostICO: "Increases",
 *     TokenPercentageForInvestors: "83.4",
 *     TokenReserveSplit: "8.3% T, 8.3% C",
 *     Date: 1406070000,
 *     EndDate: 1409698800,
 *     FundsRaisedList: "31,529 BTC",
 *     FundsRaisedUSD: "18500000",
 *     StartPrice: "0.0005",
 *     StartPriceCurrency: "BTC",
 *     PaymentMethod: "BTC",
 *     Jurisdiction: 557,
 *     LegalAdvisers: "MME",
 *     LegalForm: "Foundation",
 *     SecurityAuditCompany: "DejaVu Security",
 *     Blog: "<a href='https://blog.ethereum.org/' target='_blank'>Visit Blog</a>",
 *     BlogLink: "https://blog.ethereum.org/",
 *     WhitePaper: "<a href='https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper' target='_blank'>Read Whitepaper</a>",
 *     WhitePaperLink: "https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper"
 *   }
 * }
 *
 * @param {Array} data - scraped snapshot data
 * @param {String} timestamp
 * @return {Object}
 *
 */
export default async function snapshot(snapshot, timestamp, originUrl) {
  try {

    // TODO: Return a better error.
    const errorReturn = {data: {}, timestamp};

    if (!snapshot.Data) {
      return errorReturn;
    }

    const id = originUrl.split('/').reverse()[1];
    const bid = await getBid('cc', id);
    if (!bid) {
      logger.error(`Cryptocompare Formatter Snapshot: Couldn't get bid for cc id ${id}`);
      return errorReturn;
    }

    const data = {};
    const prefix = 'cc-snapshot-';

    const d = snapshot.Data;
    const general = d.General;
    const ico = d.ICO;

    data[bid] = {
      [`${prefix}General_TotalCoinSupply`]: general.TotalCoinSupply,
      [`${prefix}General_DifficultyAdjustment`]: general.DifficultyAdjustment,
      [`${prefix}General_BlockRewardReduction`]: general.BlockRewardReduction,
      [`${prefix}General_StartDate`]: general.StartDate,
      [`${prefix}General_WebsiteUrl`]: general.WebsiteUrl,
      [`${prefix}General_Description`]: general.Description,
      [`${prefix}General_Features`]: general.Features,
      [`${prefix}General_Technology`]: general.Technology,
      [`${prefix}ICO_Status`]: ico.Status,
      [`${prefix}ICO_Description`]: ico.Description,
      [`${prefix}ICO_TokenType`]: ico.TokenType,
      [`${prefix}ICO_WebsiteLink`]: ico.WebsiteLink,
      [`${prefix}ICO_PublicPortfolioUrl`]: ico.PublicPortfolioUrl,
      [`${prefix}ICO_Bonus`]: ico.Bonus,
      [`${prefix}ICO_FundingTarget`]: ico.FundingTarget,
      [`${prefix}ICO_FundingCap`]: ico.FundingCap,
      [`${prefix}ICO_ICOTokenSupply`]: ico.ICOTokenSupply,
      [`${prefix}ICO_TokenSupplyPostICO`]: ico.TokenSupplyPostICO,
      [`${prefix}ICO_TokenPercentageForInvestors`]: ico.TokenPercentageForInvestors,
      [`${prefix}ICO_TokenReserveSplit`]: ico.TokenReserveSplit,
      [`${prefix}ICO_Date`]: ico.Date,
      [`${prefix}ICO_EndDate`]: ico.EndDate,
      [`${prefix}ICO_FundsRaisedList`]: ico.FundsRaisedList,
      [`${prefix}ICO_FundsRaisedUSD`]: ico.FundsRaisedUSD,
      [`${prefix}ICO_StartPrice`]: ico.StartPrice,
      [`${prefix}ICO_StartPriceCurrency`]: ico.StartPriceCurrency,
      [`${prefix}ICO_PaymentMethod`]: ico.PaymentMethod,
      [`${prefix}ICO_Jurisdiction`]: ico.Jurisdiction,
      [`${prefix}ICO_LegalAdvisers`]: ico.LegalAdvisers,
      [`${prefix}ICO_LegalForm`]: ico.LegalForm,
      [`${prefix}ICO_SecurityAuditCompany`]: ico.SecurityAuditCompany,
      [`${prefix}ICO_BlogLink`]: ico.BlogLink,
      [`${prefix}ICO_WhitePaperLink`]: ico.WhitePaperLink
    }

    await perSecondSave(data, timestamp);

    return {data, timestamp};

  }
  catch (error) {
    const message = `snapshot(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}

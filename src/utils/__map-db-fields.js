const shortToFull = {
  _id: '_id',
  T: 'TYPE',
  F: 'FLAGS',
  M: 'MARKET',
  TS: 'TOSYMBOL',
  SID: 'SYMBOLID',
  FS: 'FROMSYMBOL',
  P: 'PRICE',
  LU: 'LASTUPDATE',
  LV: 'LASTVOLUME',
  LVT: 'LASTVOLUMETO',
  LTID: 'LASTTRADEID',
  V: 'VOLUMEDAY',
  VT: 'VOLUMEDAYTO',
  V24H: 'VOLUME24HOUR',
  V24HT: 'VOLUME24HOURTO',
  O: 'OPENDAY',
  H: 'HIGHDAY',
  L: 'LOWDAY',
  O24H: 'OPEN24HOUR',
  H24H: 'HIGH24HOUR',
  L24H: 'LOW24HOUR',
  LM: 'LASTMARKET',
  C24H: 'CHANGE24HOUR',
  CP24H: 'CHANGEPCT24HOUR',
  CD: 'CHANGEDAY',
  CPD: 'CHANGEPCTDAY',
  S: 'SUPPLY',
  MC: 'MKTCAP',
  TV24H: 'TOTALVOLUME24H',
  TV24HT: 'TOTALVOLUME24HTO',

  D: 'DATA'
}
const fullToShort = Object.assign({}, ...Object.entries(shortToFull).map(([a, b]) => ({ [b]: a })));
module.exports = {
  fullToShort,
  shortToFull
}

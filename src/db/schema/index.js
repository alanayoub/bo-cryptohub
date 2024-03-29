// Libs
import { model }        from 'mongoose';

// Binary Overdose
import BidSchema        from './bid';
import MapSchema        from './map';
import UsersSchema      from './users';
import PerDaySchema     from './perDay';
import WalletSchema     from './wallet';
import ExchangeSchema   from './exchange';
import { fieldTypeMap } from '../../settings';

const BidModel = model('Bid', BidSchema);
const MapModel = model('Map', MapSchema);
const UsersModel = model('Users', UsersSchema);
const PerDayModel = model('PerDay', PerDaySchema);
const WalletModel = model('Wallet', WalletSchema);
const ExchangeModel = model('Exchange', ExchangeSchema);

export {
  BidModel,
  MapModel,
  UsersModel,
  PerDayModel,
  WalletModel,
  ExchangeModel
}

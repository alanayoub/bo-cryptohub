// Libs
import { model }        from 'mongoose';

// Binary Overdose
import BidSchema        from './bid';
import MapSchema        from './map';
import PerDaySchema     from './perDay';
import ExchangeSchema   from './exchange';
import { fieldTypeMap } from '../../settings';

const BidModel = model('Bid', BidSchema);
const MapModel = model('Map', MapSchema);
const PerDayModel = model('PerDay', PerDaySchema);
const ExchangeModel = model('Exchange', ExchangeSchema);

export {
  BidModel,
  MapModel,
  PerDayModel,
  ExchangeModel
}

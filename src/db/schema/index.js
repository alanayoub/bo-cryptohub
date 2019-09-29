// Libs
import { model }        from 'mongoose';

// Binary Overdose
import MapSchema        from './map';
import PerDaySchema     from './perDay';
import ExchangeSchema   from './exchange';
import { fieldTypeMap } from '../../settings';

const MapModel = model('Map', MapSchema);
const PerDayModel = model('PerDay', PerDaySchema);
const ExchangeModel = model('Exchange', ExchangeSchema);

export {
  MapModel,
  PerDayModel,
  ExchangeModel
}

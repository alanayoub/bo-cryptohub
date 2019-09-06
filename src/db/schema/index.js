// Libs
import { model }        from 'mongoose';

// Binary Overdose
import MapSchema        from './map';
import PerDaySchema     from './perDay';
import ExchangeSchema   from './exchange';
import PerSecondSchema  from './perSecond';
import { fieldTypeMap } from '../../settings';

const MapModel = model('Map', MapSchema);
const PerDayModel = model('PerDay', PerDaySchema);
const ExchangeModel = model('Exchange', ExchangeSchema);
const PerSecondModel = model('PerSecond', PerSecondSchema);

export {
  MapModel,
  PerDayModel,
  ExchangeModel,
  PerSecondModel
}

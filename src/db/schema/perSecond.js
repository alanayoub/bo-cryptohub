import { Schema } from 'mongoose';

import { fieldTypeMap } from '../../settings';
import logger from '../../logger';

const idsList = Object.keys(fieldTypeMap);

const validator = {

  id(id) {
    const isValid = id.length < 10;
    if (!isValid) {
      logger.warn('perSecond schema, id is not valid:', id);
    }
    return isValid;
  },

  field(field) {
    const isValid = idsList.includes(field) && field.length < 200;
    if (!isValid) {
      logger.warn('perSecond schema, field is not valid:', field);
    }
    return isValid;
  },

  lastChecked(val) {
    const isValid = !isNaN(val) && String(val).length === 13
    if (!isValid) {
      logger.warn('perSecond schema, lastChecked is not valid:', lastChecked);
    }
    return isValid;
  },

  samples(arr) {

    const tsItemIsValid = tsItem => {

      const arrayIsValid = Array.isArray(tsItem) && tsItem.length === 2;
      let arrayDataIsValid;

      if (arrayIsValid) {

        let type = fieldTypeMap[this.field];
        type = type.includes('|') ? type.split('|') : [type];

        const [date, val] = tsItem;
        const dateType = Object.prototype.toString.call(date);
        const valType  = Object.prototype.toString.call(val);

        const validDate = dateType === '[object Number]';
        const validVal = type.some(v => valType === `[object ${v}]`);

        arrayDataIsValid = validDate && validVal;

      }

      return arrayIsValid && arrayDataIsValid;

    }

    const tsIsValid = Array.isArray(arr) && arr.length === 2 && tsItemIsValid(arr[0]) && tsItemIsValid(arr[1]);
    if (!tsIsValid) {
      logger.warn('perSecond schema, samples is not valid:', arr);
    }

    return tsIsValid;

  }

}

const options = {
  id: {
    type: String,
    required: true,
    validate: [validator.id, 'id is not valid']
  },
  field: {
    type: String,
    required: true,
    validate: [validator.field, 'field is not valid']
  },
  lastChecked: {
    type: Number,
    required: true,
    validate: [validator.lastChecked, 'lastChecked is not valid']
  },
  samples: {
    type: [[{
      type: Schema.Types.Mixed
    }]],
    default: [[+new Date(), null], [+new Date(), null]],
    required: true,
    validate: [validator.samples, 'samples is not valid']
  }
}

const PerSecond = new Schema(options, {
  collection: 'tsseconds',
  writeConcern: {
    w: 1, // 'majority',
    j: true
    // wtimeout: 1000
  }
});
PerSecond.set('versionKey', false);
PerSecond.index({samples: -1});
PerSecond.index({id: -1, field: -1});

export default PerSecond;

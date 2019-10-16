import logger from '../../logger';
import { Schema } from 'mongoose';

// Binary Overdose
import { fieldTypeMap } from '../../settings';

const idsList = Object.keys(fieldTypeMap);

const validator = {

  id(id) {
    const isValid = id.length < 10;
    if (!isValid) {
      logger.warn('perDay schema, id is not valid:', id);
    }
    return isValid;
  },

  field(field) {
    const isValid = idsList.includes(field) && field.length < 200;
    if (!isValid) {
      logger.warn('perDay schema, field is not valid:', field);
    }
    return isValid;
  },

  year(str) {
    const isValid = typeof str === 'string' && str.length === 4;
    if (!isValid) {
      logger.warn('perDay schema, year is not valid:', str);
    }
    return isValid;
  },

  samples(arr) {

    let month;
    let isValid = true;
    if (Array.isArray(arr) && arr.length === 12) {
      for (month of arr) {
        if (month.length !== 31) {
          isValid = false;
        }
      }
    }
    else {
      isValid = false;
    }

    if (!isValid) {
      logger.warn('perDay schema, samples is not valid:', samples);
    }

    return isValid;

  },

  sample(val) {

    let type = fieldTypeMap[this.field];
    type = type.includes('|') ? type.split('|') : [type];
    const valType  = Object.prototype.toString.call(val);
    // Ignoring this check while the data sucks
    const validVal = true; // type.some(v => valType === `[object ${v}]`);
    if (!validVal) {
      logger.warn('perDay schema, sample is not valid:', sample);
    }

    return validVal;

  },

  lastChecked(val) {
    const isValid = !isNaN(val) && String(val).length === 13
    if (!isValid) {
      logger.warn('perDay schema, lastChecked is not valid:', lastChecked);
    }
    return isValid;
  },

  realtime(arr) {

    const t = +new Date();
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
        // Ignoring this check while the data sucks
        const validVal = true; // type.some(v => valType === `[object ${v}]`);

        arrayDataIsValid = validDate && validVal;

      }

      return arrayIsValid && arrayDataIsValid;

    }

    const tsIsValid = Array.isArray(arr) && arr.length === 2 && tsItemIsValid(arr[0]) && tsItemIsValid(arr[1]);
    logger.info(`realtime validator time: ${+new Date() - t}`);
    return isValid;

  }

}

const yearArray = Array(12).fill().map(a => Array(31).fill(null));

const options = {
  id: {
    type: String,
    required: true,
    validate: [validator.id, 'id is not valid']
  },
  field: {
    type: String,
    required: true,
    validate: [validator.field, 'field is not a valid field']
  },
  year: {
    type: String,
    required: true,
    validate: [validator.year, 'year is not a valid field']
  },
  samples: {
    type: [[
      {
        type: Schema.Types.Mixed,
        validate: [validator.sample, 'sample is not valid'],
        'default': null,
        required: true
      }
    ]],
    //
    // NOTE:
    // - If using a function there is no context available to set the values after the defaults
    // - This seems to be because we are using bulkWrite
    // - You cant use middleware with bulkWrite either so cant apply the default values that way
    // - Can't use $set and $setOnInsert with the same field either
    // - Skipping for now. The reason we wanted to prefill all items is to save the space on disk
    //
    // default: yearArray,
    required: true,
    validate: [validator.samples, 'samples is not valid']
  },
  lastChecked: {
    type: Number,
    required: true,
    validate: [validator.lastChecked, 'lastChecked is not valid']
  },
  realtime: {
    type: [[{
      type: Schema.Types.Mixed
    }]],
    default: [[+new Date(), null], [+new Date(), null]],
    required: true,
    validate: [validator.realtime, 'realtime is not valid']
  },
}

const PerDay = new Schema(options, {
  collection: 'tsdays',
  writeConcern: {
    w: 0,     // requests acknowledgment that the write operation has propagated to a specified number of mongod instances
    j: false, // requests acknowledgment from MongoDB that the write operation has been written to the on-disk journal
    // wtimeout: 1000
  }
});
PerDay.set('versionKey', false);
PerDay.index({id: -1, field: -1, year: -1});

export default PerDay;

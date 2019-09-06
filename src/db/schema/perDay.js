// Libs
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
    const validVal = type.some(v => valType === `[object ${v}]`);
    if (!validVal) {
      logger.warn('perDay schema, sample is not valid:', sample);
    }

    return validVal;

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
  }
}

const PerDay = new Schema(options, {collection: 'tsdays'});
PerDay.set('versionKey', false);
PerDay.index({id: -1, field: -1, year: -1});

export default PerDay;

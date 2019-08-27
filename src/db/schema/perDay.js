'use strict';

// Libs
import { Schema } from 'mongoose';

// Binary Overdose
import { fieldTypeMap } from '../../settings';

const idsList = Object.keys(fieldTypeMap);

const validator = {

  id(id) {
    const isValid = id.length < 10;
    if (!isValid) {
      console.log(id);
      debugger;
    }
    return isValid;
  },

  field(field) {
    const isValid = idsList.includes(field) && field.length < 200;
    if (!isValid) {
      console.log(field);
      debugger;
    }
    return isValid;
  },

  year(str) {
    const isValid = typeof str === 'string' && str.length === 4;
    if (!isValid) {
      console.log(str);
      debugger;
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
      debugger;
      throw new Error('fuck');
    }

    return isValid;

  },

  sample(val) {

    debugger;
    let type = fieldTypeMap[this.field];
    type = type.includes('|') ? type.split('|') : [type];
    const valType  = Object.prototype.toString.call(val);
    const validVal = type.some(v => valType === `[object ${v}]`);
    if (!validVal) {
      debugger;
      throw new Error('fuck');
    }

    return validVal;

  },

}

// _id: 1182
// field: "cc-total-vol-full-PRICE"
// year: 2019,
// samples: [
//   [1234, 1233],
//   ...
// ]
// cc-total-vol-full-PRICE where year = 2019 return samples.2.01

const yearArray = Array(12).fill().map(a => Array(31).fill(null));

const options = {
  id: {
    type: String,
    required: true,
    validate: [validator.id, '{PATH} is not valid']
  },
  field: {
    type: String,
    required: true,
    validate: [validator.field, '{PATH} is not a valid field']
  },
  year: {
    type: String,
    required: true,
    validate: [validator.year, '{PATH} is not a valid field']
  },
  samples: {
    type: [[
      {
        type: Schema.Types.Mixed,
        validate: [validator.sample, '{PATH} is not valid'],
        'default': null,
        required: true,
      }
    ]],
    'default': yearArray,
    required: true,
    validate: [validator.samples, '{PATH} is not valid']
  },
}

const PerDay = new Schema(options, {collection: 'tsdays'});
PerDay.set('versionKey', false);
PerDay.index({samples: -1});
PerDay.index({id: -1, field: -1});

export default PerDay;

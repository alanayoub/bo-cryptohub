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

  lastChecked(val) {
    const isValid = (!isNaN(val) && String(val).length === 13)
    if (!isValid) {
      console.log(val);
      debugger;
    }
    return isValid;
  },

  samples(arr) {

    const tsItemIsValid = tsItem => {

      const arrayIsValid = (Array.isArray(tsItem) && tsItem.length === 2);
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

        if (!(arrayIsValid && arrayDataIsValid)) {
          console.log(type, date, val, this.id, dateType, valType);
          debugger;
        }

      }

      return arrayIsValid && arrayDataIsValid;

    }

    const tsIsValid = Array.isArray(arr) && arr.length === 2 && tsItemIsValid(arr[0]) && tsItemIsValid(arr[1]);
    if (!tsIsValid) {
      debugger;
      throw new Error('fuck');
    }

    return tsIsValid;

  },

}

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
  lastChecked: {
    type: Number,
    required: true,
    validate: [validator.lastChecked, '{PATH} is not valid timestamp']
  },
  samples: {
    type: [[{
      type: Schema.Types.Mixed,
      required: true,
    }]],
    validate: [validator.samples, '{PATH} is not valid']
  },
}

const PerSecond = new Schema(options, {collection: 'tsseconds'});
PerSecond.set('versionKey', false);
PerSecond.index({samples: -1});
PerSecond.index({id: -1, field: -1});

export default PerSecond;

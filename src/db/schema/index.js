'use strict';

// Libs
import { Schema, model } from 'mongoose';

// Binary Overdose
import { fieldTypeMap } from '../../settings';

//
// Validators
//

const idsList = Object.keys(fieldTypeMap);

const validator = {

  id(val) {
    const [ field, projectId ] = val.split(':');
    const isValid = idsList.includes(field) && !isNaN(projectId) && projectId.length < 10;
    if (!isValid) {
      console.log(field, projectId, idsList);
      debugger;
    }
    return isValid;
  },

  samples(arr) {

    const tsItemIsValid = tsItem => {

      const arrayIsValid = (Array.isArray(tsItem) && tsItem.length === 2);
      let arrayDataIsValid;

      if (arrayIsValid) {

        let type = fieldTypeMap[this._id.split(':')[0]];
        type = type.includes('|') ? type.split('|') : [type];

        const [date, val] = tsItem;
        const dateType = Object.prototype.toString.call(date);
        const valType  = Object.prototype.toString.call(val);

        const validDate = dateType === '[object Number]';
        const validVal = type.some(v => valType === `[object ${v}]`);

        arrayDataIsValid = validDate && validVal;

        if (!(arrayIsValid && arrayDataIsValid)) {
          console.log(type, date, val, this._id, dateType, valType);
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

//
// Schema
//

const perSecondOptions = {
  _id: {
    type: String,
    required: true,
    validate: [validator.id, '{PATH} is not valid']
  },
  samples: {
    type: [[{
      type: Schema.Types.Mixed,
      required: true,
    }]],
    validate: [validator.samples, '{PATH} is not valid']
  },
}

const PerSecondSchema = new Schema(perSecondOptions, {collection: 'tsseconds'});
const PerSecondModel = model('PerSecond', PerSecondSchema);


//
// TODO: Write queries
//
// Regex Query
// { _id: { $regex: "^cc-total-vol-full-HIGHDAY:" } }
//
// { "_id" : { $regex: "cc-coinlist-Id|cc-coinlist-IsTrading|cc-total-vol-full-HIGHDAY", $options: "i" } }
//

export {
  PerSecondModel
}

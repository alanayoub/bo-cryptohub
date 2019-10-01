// Libs
import { Schema } from 'mongoose';

const options = {
  bid: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 9,
    maxlength: 9
  },
  cmcid: {
    type: String,
    lowercase: true,
    maxlength: 10
  },
  cmcname: {
    type: String,
    lowercase: true,
    maxlength: 100
  },
  cmcsymbol: {
    type: String,
    lowercase: true,
    maxlength: 20
  },
  ccid: {
    type: String,
    lowercase: true,
    maxlength: 10
  },
  ccname: {
    type: String,
    lowercase: true,
    maxlength: 100
  },
  ccsymbol: {
    type: String,
    lowercase: true,
    maxlength: 20
  },
  mid: {
    type: String,
    lowercase: true,
    maxlength: 32
  },
  mname: {
    type: String,
    lowercase: true,
    maxlength: 100
  },
  msymbol: {
    type: String,
    lowercase: true,
    maxlength: 20
  },
}

const Bid = new Schema(options, {
  collection: 'bid',
  writeConcern: {
    w: 1,
    j: true,
  }
});
Bid.set('versionKey', false);

export default Bid;

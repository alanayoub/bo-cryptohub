import logger from '../../logger';
import { Schema } from 'mongoose';

const validator = {
  anonymousId(val) {
    return val.length === 24 || false;
  },
  sessionId(val) {
    return val.length < 100 || false;
  },
  ipAddress(val) {
    return val.length < 46 || false;
  }
}

const options = {
  lastIpAddress: {
    type: String,
    required: true,
    validate: [validator.ipAddress, 'anonymousId is invalid']
  },
  anonymousId: {
    type: String,
    required: true,
    validate: [validator.anonymousId, 'anonymousId is invalid']
  },
  sessionId: {
    type: String,
    required: true,
    validate: [validator.sessionId, 'sessionId is invalid']
  },
  local: {
    username: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
}

const Users = new Schema(options, {collection: 'users'});
Users.set('versionKey', false);

export default Users;

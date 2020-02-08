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

const ViewSchema = new Schema({
  lastUpdated: Date,
  name: String,
  view: String
});

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
    password: String,
    salt: String
  },
  views: {
    last: ViewSchema,
    user: [ViewSchema]
  },
  google: {
    id: String,
    displayName: String,
    emails: Array,
    name: {
      familyName: String,
      givenName: String,
    },
    photos: Array,
    local: String,
  }
}

const Users = new Schema(options, {collection: 'users'});
Users.set('versionKey', false);

export default Users;

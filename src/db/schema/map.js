// Libs
import { Schema } from 'mongoose';

const options = {
  _id: String,
  //
  // Map is stored as a string becuase mongodb doesnt currently allow
  // '.' or '$' in key names
  //
  // @see https://github.com/Automattic/mongoose/issues/7470
  //
  // That's correct, currently the mongodb driver doesn't allow storing keys with dots. We may add this to Mongoose in the near future if mongodb doesn't add support for it soon. If you need dotted key names, you should declare a field of type [[String]] and store values as [[key, value], [key, value]]
  //
  // map: {
  //   type: Map,
  //   of: {
  //     type: Schema.Types.Mixed,
  //     validate(value) {
  //       return true;
  //     }
  //   }
  // }
  map: String
}

const MapSchema = new Schema(options, {collection: 'maps'});

export default MapSchema;

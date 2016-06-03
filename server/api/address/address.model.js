import mongoose from 'mongoose';
// mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';
import shortId from 'shortid';
var AddressSchema = new Schema({
  fullname: String,
  userid:String,
  mob_no:Number,
  address_line1:String,
  address_line2:String,
  landmark:String,
  place:String,
  pin:Number,
  address_type:String
});
export default mongoose.model('Address', AddressSchema);

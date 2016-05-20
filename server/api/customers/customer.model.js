'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import shortId from 'shortid';
var CustomerSchema = new Schema({
  name: String,
  lastname:String,
  role: {
    type: String,
    default: 'customer'
  },
  active: { type: Boolean, default: true },
  phone:Number,
  timestamp:{type:Date},
  otp:{type:Number,index: { expires: 120 } }
});
export default mongoose.model('Customer', CustomerSchema);
mongoose.model('Customer').ensureIndexes(function(err) {
    console.log('ensure index', err)
})
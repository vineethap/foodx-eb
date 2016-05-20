import mongoose from 'mongoose';
// mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';
import shortId from 'shortid';
var CategorySchema = new Schema({
  name: String,
  active:Boolean,
  subcategory:[String],
  category_id:Number
});
export default mongoose.model('Category', CategorySchema);

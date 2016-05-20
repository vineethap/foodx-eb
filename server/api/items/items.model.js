import mongoose from 'mongoose';
// mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';
var ItemsSchema = new Schema({
  itemname: String,
  description:String,
  active:Boolean,
  category:String,
  itemtype:String,
  chef_id:String,
  subcategory:String,
  item_image:[String],
  thumb_img:String,
  featured:{type:String,default:"no"},
  featured_dscrptn:String,
  rating:Number,
  comment_title:String,
  comment:String,
  item_price:Number
});
export default mongoose.model('Items', ItemsSchema);

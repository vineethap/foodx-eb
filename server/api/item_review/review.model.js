import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var ReviewSchema = new Schema({
  itemname: String,
  active:Boolean,
  userid:String,
  comment_title:String,
  comment:String,
  rating:Number,
  item_id:String,
  time:Date,
  username:String
});
export default mongoose.model('Review', ReviewSchema);
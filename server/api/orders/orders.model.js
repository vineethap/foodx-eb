import mongoose from 'mongoose';
import {Schema} from 'mongoose';
 
 var OrdersSchema = new Schema({
  created_by:String,
  delivary_slot:String,
  delivary_address:String,
  total_price:Number,
  status:String,
  items: { type : Array , "default" : [] },
  time:Date,
  username:String,
 });

export default mongoose.model('Orders',OrdersSchema);
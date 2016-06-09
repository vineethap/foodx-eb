import mongoose from 'mongoose';
import {Schema} from 'mongoose';
 
 var OrdersSchema = new Schema({
  userid:String,
  delivery_slot:String,
  delivery_address:String,
  total_price:Number,
  status:String,
  items: { type : Array , "default" : [] },
  time:Date,
  username:String,
  phone:Number
 });

export default mongoose.model('Orders',OrdersSchema);
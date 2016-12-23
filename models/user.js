var mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var User = new Schema({
  name: String,
  nick_name:String,
  password:String,
  email: String,
  mobile:String,
  avatarUrl: String,
  _roomId: ObjectId,
  online: Boolean,
  level:String,
  level_name:String,
  user_type:String,
  analyst_intro:String,

  belong_analyst_id:ObjectId,
  belong_analyst_online:Boolean,
  belong_analyst_name:String,
  belong_analyst_nick:String,
  analyst_online:Boolean,
  analystNumber:String,

  belong_metal_id:ObjectId,
  belong_metal_online:Boolean,
  belong_metal_name:String,
  belong_metal_nick:String,
  metal_online:Boolean,
  metalNumber:String,

  belong_card_id:ObjectId,
  belong_card_online:Boolean,
  belong_card_name:String,
  belong_card_nick:String,
  card_online:Boolean,
  number:String,

  bindNumber:[{
    belongCustomer:ObjectId,
    belongCustomerName:String,
    customerNumber:String
  }],
  history:[{
    _id:ObjectId,
    time:Date
  }],
  collectRoom:[{
    room_id:ObjectId,
    room_name:String,
    time:Date
  }],
  customerList:[{
    customer_account:String,
    customer_name:String,
    bind_status:Boolean,
    customer_online:Boolean
  }],
  update_time:Date
});

module.exports = User
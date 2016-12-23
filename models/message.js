var mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var Message = new Schema({
  content: String,
  creator: {
    _id: ObjectId,
    email: String,
    name: String,
    level:String,
    level_name:String,
    avatarUrl: String,
    nick_name:String
  },
  _roomId: ObjectId,
  createAt:{type: Date, default: Date.now}
})

module.exports = Message

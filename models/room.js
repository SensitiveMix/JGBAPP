var mongoose = require('mongoose')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

var Room = new Schema({
  name: String,
  creator_id: ObjectId,
  creator_name: String,
  creator_avatarUrl: String,
  intro: String,
  status: String,
  online: Boolean,
  createAt: {type: Date, default: Date.now}
});

module.exports = Room
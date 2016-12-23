var mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var AnalystMessage = new Schema({
    content: String,
    creator: {
        _id: ObjectId,
        email: String,
        name: String,
        nick_name:String,
        avatarUrl: String,
        mobile:String,
        level:String,
        level_name:String,
        belong_analyst:ObjectId,
        belong_analyst_name:String
    },
    room_id:String,
    message_id: ObjectId,
    createAt:{type: Date, default: Date.now}
})

module.exports =AnalystMessage

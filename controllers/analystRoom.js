var db = require('../models')
var async = require('async')

exports.ChatCreate = function(message, callback) {
    var message = new db.AnalystMessage(message)
    message.save(callback)
}
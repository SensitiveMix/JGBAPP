var db = require('../models')
var async = require('async')


exports.create = function(room, callback) {
  var r = new db.Room()
  r.name = room.name
  r.status=room.status
  r.creator_id=room.creator_id
  r.creator_name=room.creator_name
  r.creator_avatarUrl=room.creator_avatarUrl
  r.online=room.online
  r.intro=room.intro
  // r.level=room.creator.level
  // r.level_name=room.creator.level_name
  r.save(callback)
}

exports.read = function(callback) {
  db.Room.find({}, function(err, rooms) {
    if (!err) {
      var roomsData = []
      async.each(rooms, function(room, done) {
        var roomData = room.toObject()
        async.parallel([

            function(done) {
              db.User.find({
                _roomId: roomData._id,
                online: true
              }, function(err, users) {
                done(err, users)
              })
            },
            function(done) {
              db.Message.find({
                _roomId: roomData._id
              }, null, {
                sort: {
                  'create_at': -1
                },
                limit: 20
              }, function(err, messages) {
                done(err, messages.reverse())
              })
            }
          ],
          function(err, results) {
            if (err) {
              done(err)
            } else {
              roomData.users = results[0]
              roomData.messages = results[1]
              roomsData.push(roomData)
              done()
            }
          });

      }, function(err) {
        callback(err, roomsData)
      })
    }
  })
}

exports.getById = function(_roomId, callback) {
  db.Room.findOne({
    _id: _roomId
  }, function(err, room) {
    if (err) {
      callback(err)
    } else {
      async.parallel([

          function(done) {
            db.User.find({
              _roomId: _roomId,
              online: true
            }, function(err, users) {
              done(err, users)
            })
          },
          function(done) {
            db.Message.find({
              _roomId: _roomId
            }, null, {
              sort: {
                'createAt': -1
              },
              limit: 20
            }, function(err, messages) {
              done(err, messages.reverse())
            })
          }
        ],
        function(err, results) {
          if (err) {
            callback(err)
          } else {
            room = room.toObject()
            room.users = results[0]
            room.messages = results[1]
            callback(null, room)
          }
        }
      );
    }
  })
}
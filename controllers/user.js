var db = require('../models')
var async = require('async')
var gravatar = require('gravatar')

exports.findUserById = function(_userId, callback) {
  db.User.findOne({
    _id: _userId
  }, callback)
}

exports.findUserByAnalystId = function(_userId, callback) {
  db.User.find({
    belong_analyst_id: _userId
  }, callback)
}

exports.findUserByCardId = function(_userId, callback) {
  db.User.find({
    belong_card_id: _userId
  }, callback)
}

exports.findUserByMetalId = function(_userId, callback) {
  db.User.find({
    belong_metal_id: _userId
  }, callback)
}

exports.findByEmailOrCreate = function(userInfo, callback) {
  console.log(userInfo)
  db.User.findOne({
    name: userInfo[0],
    password:userInfo[1]
  }, function(err, user) {
    if (user) {
      callback(null, user)
    } else {
      callback(null, user)
    }
  })
}

exports.online = function(_userId, callback) {
  db.User.findOneAndUpdate({
    _id: _userId
  }, {
    $set: {
      online: true
    }
  }, callback)
}

exports.offline = function(_userId, callback) {
  db.User.findOneAndUpdate({
    _id: _userId
  }, {
    $set: {
      online: false
    }
  }, callback)
}

exports.getOnlineUsers = function(callback) {
  db.User.find({
    online: true
  }, callback)
}

exports.joinRoom = function (join, callback) {
  db.User.findOneAndUpdate({
    _id: join.user._id
  }, {
    $set: {
      online: true,
      _roomId: join.room._id
    }
  }, callback)
}
//判断是否历史记录
exports.judgeRoomHistory = function (join, callback) {
  db.User.find({
    "_id": join.user._id,
    "history._id": join.room._id
  }, callback)
}
//最近浏览
exports.updateRoomHistory= function (join,callback) {
  db.User.findOneAndUpdate({
    _id: join.user._id
  }, {
    $set: {
      time: new Date()
    }
  }, callback)
}
//添加历史记录
exports.addRoomHistory= function (join,callback) {
  db.User.findOneAndUpdate({
    _id: join.user._id
  }, {
    $pushAll: {
      history:[{_id:join.room._id,time:new Date()}]
    }
  }, callback)
}

exports.leaveRoom = function (leave, callback) {
  db.User.findOneAndUpdate({
    _id: leave.user._id
  }, {
    $set: {
      online: true,
      _roomId: null
    }
  }, callback)
}

exports.getById = function(userId,callback) {
     async.parallel([
            function(done) {
              db.User.find({
                belong_analyst: userId,
                online: true
              }, function(err, online_users) {
                done(err, online_users)
              })
            },
            function(done) {
              db.User.find({
                belong_analyst: userId,
                online: false
              }, null,function(err, offline_users) {
                done(err, offline_users)
              })
            }
          ],
          function(err, results) {
            if (err) {
              callback(err)
            } else {
              var user={
                online_user:results[0],
                offline_user:results[1]
              }

              callback(null, user)
            }
          }
      );
    }
//获取在线客户
exports.getOnlineById= function (user, callback) {
  if(user.level==1){
    db.User.find({
      belong_card_id: user._id,
      online: true
    }, callback)
  }else if(user.level==2){
    db.User.find({
      belong_metal_id: user._id,
      online: true
    }, callback)
  }else if(user.level==66){
    db.User.find({
      belong_analyst_id:user._id,
      online:true
    },callback)
  }
}
//获取离线客户
exports.getOfflineById= function (user, callback) {
  if (user.level == 1) {
    db.User.find({
      belong_card_id: user._id,
      online: false
    }, callback)
  } else if (user.level == 2) {
    db.User.find({
      belong_metal_id: user._id,
      online: false
    }, callback)
  } else if (user.level == 66) {
    db.User.find({
      belong_analyst_id: user._id,
      online: false
    }, callback)
  }
}
//获取用户姓名
exports.getUserName= function (userId,callback) {
  db.User.find({
    _id:userId
  },callback)
}
//获取用户通过分析师编号
exports.getUserByAnalystId= function (data,callback) {
  async.parallel([
        function(done) {
          db.User.find({
            _id: data._analystId
          }, function(err, users) {
            done(err, users)
          })
        },
        function(done) {
          db.AnalystMessage.find(
          {"room_id":data.key}
          ,function(err, message) {
            done(err, message)
          })
        },
        function(done) {
          db.AnalystMessage.find(
              {"creator._id":data._analystId,"message_id":data.userId}
              ,function(err, messages) {
                done(err, messages)
              })
        }
      ],
      function(err, results) {
        if (err) {
          callback(err)
        } else {
          var user={
            user:results[0],
            messages:results[1],
            analystMessages:results[2]
          }

          callback(null, user)
        }
      }
  );
}
//加入聊天
exports.joinChat = function (join, callback) {
  db.User.findOne({
    _id: join.user._id
  }, callback)
}
//下线更新状态
exports.offline1 = function (_userId, callback) {
  db.User.findOneAndUpdate({
    name: _userId
  }, {
    $set: {
      online: false
    }
  }, callback)
}
//收藏房间
exports.collectRoom=function (room,callback) {
  db.User.findOneAndUpdate({
    _id: room.collector_id
  }, {
    $pushAll: {
      collectRoom:[{room_id:room.room_id,room_name:room.room_name}]
    }
  },callback)
}
//验证用户
exports.findUserByName = function (_userId, callback) {
  db.User.findOne({
    name: _userId
  }, callback)
}
//分析师上线开启房间
exports.RoomStatusOn = function (creatorName, callback) {
  db.Room.update({
    creator_name: creatorName
  }, {
    $set: {
      online: true
    }
  }, {'multi': true}, callback)
}
// 下线关闭房间
exports.RoomStatusOff = function (creatorName, callback) {
  db.Room.update({
    creator_name: creatorName
  }, {
    $set: {
      online: false
    }
  }, {'multi': true}, callback)
}
//用户上线更新状态
exports.onlineEmit = function (_userId, callback) {
  db.User.findOneAndUpdate({
    name: _userId
  }, {
    $set: {
      online: true
    }
  }, callback)
}
//用户下线更新状态
exports.offlineEmit = function (_userId, callback) {
  db.User.findOneAndUpdate({
    name: _userId
  }, {
    $set: {
      online: false
    }
  }, callback)
}
//告诉分析师上线
exports.onlineToAllTech = function (_userId, callback) {
  db.User.update({
    _id: _userId[0],
    'customerList.customer_name': _userId[1]
  }, {
    $set: {
      'customerList.$.customer_online': true
    }
  }, callback)
}
//告诉邮币卡理财师上线
exports.onlineCardCustomer = function (data, callback) {
  db.User.update({
    belong_card_id: data
  }, {
    $set: {
      belong_card_online: true
    }

  }, {'multi': true}, callback)
}
//告诉贵金属理财师上线
exports.onlineMetalCustomer = function (data, callback) {
  db.User.update({
    belong_metal_id: data
  }, {
    $set: {
      belong_metal_online: true
    }

  }, {'multi': true}, callback)
}
//告诉邮币卡理财师下线
exports.onlineCardCustomerOff = function (data, callback) {
  db.User.update({
    belong_card_id: data
  }, {
    $set: {
      belong_card_online: false
    }

  }, {'multi': true}, callback)
}
//告诉贵金属理财师下线
exports.onlineMetalCustomerOff = function (data, callback) {
  db.User.update({
    belong_metal_id: data
  }, {
    $set: {
      belong_metal_online: false
    }

  }, {'multi': true}, callback)
}
//告诉分析师下线
exports.offlineToAllTech = function (_userId, callback) {
  db.User.update({
    _id: _userId[0],
    'customerList.customer_name': _userId[1]
  }, {
    $set: {
      'customerList.$.customer_online': false
    }
  }, callback)
}
// 理财师登录
exports.findAstByCardID = function (data, callback) {
  db.User.find({
    name: data.cardID,
    password: data.passWord
  }, callback)
}
//根据用户编号更新用户
exports.updateUserById = function (data, callback) {
  db.User.update({
    _id: data.id
  }, {
    $set: {
      password: data.after
    }
  }, callback)
}

/**
 * 收藏沙龙房间
 * @param room
 * @param callback
 */
//判断是否收藏沙龙
exports.judgeCollectHistory = function (room, callback) {
  db.User.find({
    "_id": room.collector_id,
    "collectRoom.room_id": room.room_id
  }, callback)
}
//更新收藏记录
exports.updateCollectHistory = function (room, callback) {
  db.User.findOneAndUpdate({
    _id: room.collector_id
  }, {
    $set: {
      time: new Date()
    }
  }, callback)
}
//添加收藏
exports.collectRoom = function (room, callback) {
  db.User.findOneAndUpdate({
    _id: room.collector_id
  }, {
    $pushAll: {
      collectRoom: [{room_id: room.room_id, room_name: room.room_name}]
    }
  }, callback)
}
//取消收藏
exports.cancelCollectRoom = function (room, callback) {
  db.User.update({
    _id: room.collector_id
  }, {
    $pull: {
      'collectRoom': {'room_id': room.room_id}
    }
  }, callback)
}

/**
 * 绑定理财师模块
 */
//通过邀请码查找绑定理财师
exports.getUserByCode = function (code, callback) {
  db.User.findOne({
    number: code.bindCode,
    level: code.product
  }, callback)
}
//绑定理财师
exports.bindAnalyst = function (bind, callback) {
  console.log(bind + '开始绑定')

  if (bind.product == '2') {
    db.User.findOneAndUpdate({
      _id: bind._id

    }, {
      $set: {
        belong_metal_id: bind.bindUserId,
        belong_metal_name: bind.bindUserName,
        belong_metal_nick: bind.bindUserNickName,
        belong_metal_online: true,
        metalNumber: bind.number
      }
    }, callback)

  } else {
    db.User.findOneAndUpdate({
      _id: bind._id
    }, {
      $set: {
        belong_card_id: bind.bindUserId,
        belong_card_name: bind.bindUserName,
        belong_card_nick: bind.bindUserNickName,
        belong_card_online: true,
        number: bind.number
      }
    }, callback)
  }
}
//重新添加客户信息
exports.updateAnalystCustomerList = function (bind, callback) {
  db.User.findOneAndUpdate({
    '_id': bind.ast._id,
  }, {
    $pushAll: {
      'customerList': [{
        '_id': bind.customer._id,
        "customer_name": bind.customer.nick_name,
        "bind_status": true,
        "customer_account": bind.customer.name,
        "customer_online": bind.customer.online
      }]
    }
  }, callback)
}

exports.insertLoginUserById = function (info, callback) {

     var Num = "";
     for (var i = 0; i < 6; i++) {
         Num += Math.floor(Math.random() * 10);
     }

     if(info.status=='ast'){
          //分析师
         var user = new db.User
         user.name = info.cardID
         user.nick_name = info.detail.StaffName
         user.password = '123456'
         user.avatarUrl = "../images/tech.svg"
         user.level = "66"
         user.level_name = "分析师"
         user._roomId = null
         user.online = true
         user.user_type = '0'
         user.number = Num
         user.bindNumber = []
         user.history = []
         user.collectRoom = []
         user.customerList = []
         user.update_time = new Date()
         user.save(callback)
     }else{
        var user = new db.User
        user.name = info.cardID
        user.nick_name = info.detail.StaffName
        user.password = '123456'
        user.avatarUrl = "../images/tech.svg"
        user.level = "1"
        user.level_name = "邮币卡理财师"
        user._roomId = null
        user.online = true
        user.user_type = '0'
        user.number = Num
        user.bindNumber = []
        user.history = []
        user.collectRoom = []
        user.customerList = []
        user.update_time = new Date()
        user.save(callback)
     }


 }

/**
* 注册模块
*/
exports.regValidate = function (name, callback) {
    db.User.find({
        name: name,
        level: '0'
    }, callback)
}

exports.register = function (userInfo, callback) {
    var user = new db.User(userInfo)
    user.save(callback)
}


var Controllers = require('../controllers')
var ObjectId = require('mongoose').Schema.ObjectId
var config = require('../config')


//在线用户
global.onlineUsers = {};
//当前在线人数
global.onlineCount = 0;
exports.connect = function (socket) {
    // console.log('socket login')
    // var _userId = socket.request.session._userId
    // if (_userId) {
    //     Controllers.User.online(_userId, function (err, user) {
    //         console.log(user.name + "上线")
    //         if (err) {
    //             socket.emit('err', {
    //                 msg: err
    //             })
    //         } else {
    //
    //             //分析师与客户建立连接
    //             if (user.level == 66) {
    //                 Controllers.User.findUserByAnalystId(_userId, function (err, analyst_user) {
    //
    //                     analyst_user.forEach(function (users) {
    //                         var uniqueId = user._id + users._id + "analyst"
    //                         socket.join(uniqueId)
    //                     })
    //
    //                 })
    //             }
    //
    //             if (user.level == 1) {
    //                 Controllers.User.findUserByCardId(_userId, function (err, card_user) {
    //                     card_user.forEach(function (users) {
    //                         var uniqueId = user._id + users._id + "card"
    //                         console.log('xiaoliu' + uniqueId)
    //                         socket.join(uniqueId)
    //                     })
    //                 })
    //             }
    //
    //             if (user.level == 2) {
    //                 Controllers.User.findUserByMetalId(_userId, function (err, metal_user) {
    //
    //                     metal_user.forEach(function (users) {
    //                         var uniqueId = user._id + users._id + "metal"
    //                         socket.join(uniqueId)
    //                     })
    //
    //                 })
    //             }
    //
    //             //online push
    //             //socket.emit('technode', {
    //             //  action: 'getOnlineUser',
    //             //  data: {
    //             //    onlineUser:user,
    //             //    userId:_userId,
    //             //    push:true
    //             //  }
    //             //})
    //
    //             //判断是否为普通会员
    //             //if(user.level==0){
    //             //  //通知分析师会员上线
    //             //  if(user.belong_analyst_id){
    //             //    var uniqueId=user.belong_analyst_id+user._id+"analyst"
    //             //    console.log(uniqueId)
    //             //    socket.join(uniqueId)
    //             //    socket['in'](uniqueId).broadcast.emit('technode', {
    //             //      action: 'online',
    //             //      data: {
    //             //        user: user,
    //             //        uniqueId:uniqueId
    //             //      }
    //             //    })
    //             //  }
    //             //  //通知金属理财师会员上线
    //             //  if(user.belong_metal_id){
    //             //    var uniqueId=user.belong_metal_id+user._id+"metal"
    //             //    console.log(uniqueId)
    //             //    socket.join(uniqueId)
    //             //    socket['in'](uniqueId).broadcast.emit('technode', {
    //             //      action: 'online',
    //             //      data: {
    //             //        user: user,
    //             //        uniqueId:uniqueId
    //             //      }
    //             //    })
    //             //  }
    //             //  //通知邮币卡理财师会员上线
    //             //  if(user.belong_card_id){
    //             //    var uniqueId=user.belong_card_id+user._id+"card"
    //             //    console.log(uniqueId)
    //             //    socket.join(uniqueId)
    //             //    socket['in'](uniqueId).broadcast.emit('technode', {
    //             //      action: 'online',
    //             //      data: {
    //             //        user: user,
    //             //        uniqueId:uniqueId
    //             //      }
    //             //    })
    //             //  }
    //             //}
    //
    //             if (user._roomId) {
    //                 socket.join(user._roomId)
    //                 socket['in'](user._roomId).broadcast.emit('technode', {
    //                     action: 'joinRoom',
    //                     data: {
    //                         user: user
    //                     }
    //                 })
    //                 socket.emit('technode', {
    //                     action: 'joinRoom',
    //                     data: {
    //                         user: user
    //                     }
    //                 })
    //                 socket['in'](user._roomId).broadcast.emit('technode', {
    //                     action: 'createMessage',
    //                     data: {
    //                         content: user.name + '进入了聊天室',
    //                         creator: config.robot,
    //                         createAt: new Date(),
    //                         _roomId: user._roomId,
    //                         _id: ObjectId()
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // }
}

exports.disconnect = function (socket) {
    // var _userId = socket.request.session._userId
    // console.log('disconnect' + "下线")
    // if (_userId) {
    //     Controllers.User.offline(_userId, function (err, user) {
    //         if (err) {
    //             socket.emit('err', {
    //                 mesg: err
    //             })
    //         } else {
    //
    //             //offline push
    //             socket.emit('technode', {
    //                 action: 'getOfflineUser',
    //                 data: {
    //                     offlineUser: user,
    //                     userId: _userId,
    //                     push: true
    //                 }
    //             })
    //
    //             if (user._roomId) {
    //                 socket['in'](user._roomId).broadcast.emit('technode', {
    //                     action: 'leaveRoom',
    //                     data: {
    //                         user: user,
    //                         room: {
    //                             _id: user._roomIds
    //                         }
    //                     }
    //                 })
    //                 socket['in'](user._roomId).broadcast.emit('technode', {
    //                     action: 'createMessage',
    //                     data: {
    //                         content: user.name + '离开了聊天室',
    //                         creator: config.robot,
    //                         createAt: new Date(),
    //                         _roomId: user._roomId,
    //                         _id: ObjectId()
    //                     }
    //                 })
    //                 Controllers.User.leaveRoom({
    //                     user: user
    //                 }, function () {
    //                 })
    //             }
    //
    //         }
    //     })
    // }
}

//登陆
exports.emitLogin = function (obj, socket) {
    console.log(obj.userName + '登陆')
    //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
    //手机号
    socket.name = obj.userName;
    //检查在线列表，如果不在里面就加入
    if (!global.onlineUsers.hasOwnProperty(obj.userName)) {
        global.onlineUsers[obj.userName] = {
            name: obj.userName,
            pwd: obj.pwd
        };
        //在线人数+1
        global.onlineCount++;
    }

    console.log(global.onlineCount)

    Controllers.User.onlineEmit(obj.userName, function (err, user) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            if (user) {
                if (user.level == "66") {
                    Controllers.User.RoomStatusOn(user.nick_name, function (err, roomStatus) {
                        console.log(roomStatus.online)
                    })
                    //分析师登录
                    socket.broadcast.emit('technode', {
                        action: 'getRoom',
                        onFlag: true,
                        data: user.nick_name
                    })
                }

                if (user.level == '0') {
                    //用户登录
                    socket.broadcast.emit('technode', {
                        action: 'getRoom',
                        userOnline: true,
                        data: user.nick_name
                    })
                }
                console.log('2222' + user)
                if (user.level == '1' || user.level == '2') {
                    //理财师登录
                    socket.broadcast.emit('technode', {
                        action: 'getRoom',
                        saleOnline: true,
                        data: user.nick_name
                    })
                }

                //告诉所有分析师和理财师上线
                Controllers.User.onlineToAllTech([user.belong_analyst_id, user.nick_name], function (err, data) {

                })
                Controllers.User.onlineToAllTech([user.belong_metal_id, user.nick_name], function (err, data) {

                })
                Controllers.User.onlineToAllTech([user.belong_card_id, user.nick_name], function (err, data) {
                })
                //告诉所以客户理财师上线
                Controllers.User.onlineCardCustomer(user._id, function (err, data) {

                })
                Controllers.User.onlineMetalCustomer(user._id, function (err, data) {
                })
                // 沙龙广播请求
                if (user._roomId) {
                    socket.join(user._roomId)
                    socket['in'](user._roomId).broadcast.emit('technode', {
                        action: 'joinRoom',
                        data: {
                            user: user
                        }
                    })
                    // socket.emit('technode', {
                    //     action: 'joinRoom',
                    //     data: {
                    //         user: user
                    //     }
                    // })
                    socket['in'](user._roomId).broadcast.emit('technode', {
                        action: 'createMessage',
                        data: {
                            content: user.level_name + user.name + '进入了聊天室',
                            creator: config.robot,
                            createAt: new Date(),
                            _roomId: user._roomId,
                            _id: ObjectId()
                        }
                    })
                }
            }
        }
    })
}
//退出
exports.emitLoginOut = function (obj, socket) {
    console.log(obj.userName + '退出');
    //将退出的用户从在线列表中删除
    if (onlineUsers.hasOwnProperty(obj.userName)) {
        //退出用户的信息
        var obj = {name: obj.userName};
        //删除
        delete onlineUsers[obj.name];
        //在线人数-1
        onlineCount--;

        console.log(onlineCount);
        // 向所有客户端广播用户退出
        Controllers.User.offlineEmit(obj.name, function (err, user) {
            if (err) {
                socket.emit('err', {
                    message: err
                })
            } else {
                console.log(user.level)
                console.log(user.nick_name)
                if (user.level == "66") {
                    console.log('666' + user.nick_name)
                    Controllers.User.RoomStatusOff(user.nick_name, function (err, roomStatus) {
                        console.log(roomStatus.online)
                    })

                    socket.broadcast.emit('technode', {
                        action: 'getRoom',
                        outFlag: true,
                        data: user.nick_name

                    })
                }

                if (user.level == '0') {
                    socket.broadcast.emit('technode', {
                        action: 'getRoom',
                        userOutFlag: true,
                        data: user.nick_name

                    })
                }

                if (user.level == '1' || user.level == '2') {
                    //理财师登录
                    socket.broadcast.emit('technode', {
                        action: 'getRoom',
                        saleOutline: true,
                        data: user.nick_name
                    })
                }
                //告诉所有分析师和理财师下线
                Controllers.User.offlineToAllTech([user.belong_analyst_id, user.nick_name], function (err, data) {

                })
                Controllers.User.offlineToAllTech([user.belong_metal_id, user.nick_name], function (err, data) {

                })
                Controllers.User.offlineToAllTech([user.belong_card_id, user.nick_name], function (err, data) {
                })

                //告诉所以客户理财师上线
                Controllers.User.onlineCardCustomerOff(user._id, function (err, data) {

                })
                Controllers.User.onlineMetalCustomerOff(user._id, function (err, data) {
                })

                // 向所有沙龙房间广播退出
                if (user._roomId) {
                    socket['in'](user._roomId).broadcast.emit('technode', {
                        action: 'leaveRoom',
                        data: {
                            user: user,
                            room: {
                                _id: user._roomIds
                            }
                        }
                    })
                    socket['in'](user._roomId).broadcast.emit('technode', {
                        action: 'createMessage',
                        data: {
                            content: user.nick_name + '离开了聊天室',
                            creator: config.robot,
                            createAt: new Date(),
                            _roomId: user._roomId,
                            _id: ObjectId()
                        }
                    })
                    Controllers.User.leaveRoom({
                        user: user
                    }, function () {
                    })
                }

            }
        })

    }
}

exports.createMessage = function (message, socket) {
    Controllers.Message.create(message, function (err, message) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            console.log(message)
            socket['in'](message._roomId).broadcast.emit('technode', {
                action: 'createMessage',
                data: message
            })
            socket.emit('technode', {
                action: 'createMessage',
                data: message
            })
        }
    })
}

exports.createRoom = function (room, socket, io) {
    Controllers.Room.create(room, function (err, room) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            room = room.toObject()
            room.users = []
            io.sockets.emit('technode', {
                action: 'createRoom',
                data: room
            })
        }
    })
}

exports.getRoom = function (data, socket) {
    console.log('get room')
    if (data && data._roomId) {
        Controllers.Room.getById(data._roomId, function (err, room) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.emit('technode', {
                    action: 'getRoom',
                    _roomId: data._roomId,
                    data: room
                })
            }
        })
    } else {
        Controllers.Room.read(function (err, rooms) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.emit('technode', {
                    action: 'getRoom',
                    data: rooms
                })
            }
        })
    }
}

exports.joinRoom = function (join, socket) {
    Controllers.User.joinRoom(join, function (err, user) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            //判断是否有浏览记录
            Controllers.User.judgeRoomHistory(join, function (err, history) {
                console.log(history)
                if (err) {
                    socket.emit('err', {
                        msg: err
                    })
                } else {
                    if (history.length != 0) {
                        Controllers.User.updateRoomHistory(join, function (err, updateInfo) {
                            console.log('update history' + updateInfo.history._id)
                        })
                    } else {
                        Controllers.User.addRoomHistory(join, function (err, addInfo) {
                            //console.log('add history'+addInfo.history._id)
                        })
                    }
                }
            })
            join.user = user
            socket.join(user._roomId)
            socket.emit('technode', {
                action: 'joinRoom',
                data: join
            })
            socket['in'](user._roomId).broadcast.emit('technode', {
                action: 'createMessage',
                data: {
                    content: user.name + '进入了聊天室',
                    creator: config.robot,
                    createAt: new Date(),
                    _roomId: user._roomId,
                    _id: ObjectId()
                }
            })
            socket['in'](user._roomId).broadcast.emit('technode', {
                action: 'joinRoom',
                data: join
            })
        }
    })

}

exports.leaveRoom = function (leave, socket) {
    Controllers.User.leaveRoom(leave, function (err) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            socket['in'](leave.room._id).broadcast.emit('technode', {
                action: 'createMessage',
                data: {
                    content: leave.user.name + '离开了聊天室',
                    creator: config.robot,
                    createAt: new Date(),
                    _roomId: leave.room._id,
                    _id: ObjectId()
                }
            })
            socket['in'](leave.room._id).broadcast.emit('technode', {
                action: 'leaveRoom',
                data: leave
            })
            socket.emit('technode', {
                action: 'leaveRoom',
                data: leave
            })
            socket.leave(leave.room._id)
        }
    })
}

exports.getOnlineUser = function (data, socket) {
    if (data) {
        Controllers.User.getOnlineById(data, function (err, allUser) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.emit('technode', {
                    action: 'getOnlineUser',
                    data: {
                        onlineUser: allUser,
                        type: true  //show type online
                    }
                })
            }
        })
    } else {
    }
}

exports.getOfflineUser = function (data, socket) {
    if (data) {
        Controllers.User.getOfflineById(data, function (err, allUser) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                console.log("log:" + allUser)
                socket.emit('technode', {
                    action: 'getOfflineUser',
                    data: {
                        offlineUser: allUser,
                        type: true   //show get offline action
                    }
                })
            }
        })
    } else {
    }
}

exports.getUserName = function (data, socket) {
    if (data) {
        Controllers.User.getUserName(data, function (err, user) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                console.log('已有的收藏房间' + user[0].collectRoom)
                socket.emit('technode', {
                    action: 'getUserName',
                    data: user
                })

                socket.emit('technode', {
                    action: 'singleCollectRoom',
                    data: user[0].collectRoom
                })
            }
        })
    }
}

exports.joinChat = function (join, socket) {
    Controllers.User.joinChat(join, function (err, user) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            join.user = user
            socket.join(user._roomId)
            socket.emit('technode', {
                action: 'joinRoom',
                data: join
            })
            socket['in'](user._roomId).broadcast.emit('technode', {
                action: 'joinRoom',
                data: join
            })
        }
    })
}

exports.getAnalystRoom = function (data, socket) {
    if (data && data._analystId) {
        Controllers.User.getUserByAnalystId(data, function (err, user) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.join(data._analystId + data.userId)
                socket.emit('technode', {
                    action: 'getAnalystRoom',
                    _analystId: data.key,
                    data: user
                })
            }
        })
    }
}

exports.createChatMessages = function (message, socket) {
    Controllers.AnalystRoom.ChatCreate(message, function (err, messages) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            //emit chat room
            console.log(messages)
            var index_id = null
            if (messages.creator.level != 0) {
                index_id = messages.message_id + messages.creator._id
            } else {
                index_id = messages.creator._id + messages.message_id
            }

            console.log(index_id + 'hererrererer')
            socket.join(index_id)
            socket['in'](index_id).broadcast.emit('technode', {
                action: 'createChatMessage',
                data: messages
            })
            socket.emit('technode', {
                action: 'createChatMessage',
                data: messages
            })
        }
    })
}

exports.collectRoom = function (room, socket) {
    // Controllers.User.collectRoom(room,function (err,info) {
    //     if (err) {
    //         socket.emit('err', {
    //             msg: err
    //         })
    //     }else{
    //         console.log(info)
    //         socket.emit('technode', {
    //             action: 'collectRoom',
    //             data: info
    //         })
    //     }
    // })
    //判断是否有浏览记录
    Controllers.User.judgeCollectHistory(room, function (err, history) {
        console.log(history)
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            if (history.length != 0) {
                Controllers.User.updateCollectHistory(room, function (err, updateInfo) {
                    console.log('update collect' + updateInfo.collectRoom.room_name)
                })
            } else {
                Controllers.User.collectRoom(room, function (err, info) {
                    console.log('add collect' + info.collectRoom.room_name)
                    if (err) {
                        socket.emit('err', {
                            msg: err
                        })
                    } else {
                        console.log(info)
                        Controllers.User.findUserById(room.collector_id, function (err, user) {
                            if (err) {
                                socket.emit('err', {
                                    msg: err
                                })
                            } else {
                                socket.emit('technode', {
                                    action: 'collectRoom',
                                    user: user,
                                    data: info
                                })
                            }
                        })

                    }
                })
            }
        }
    })
}

exports.cancelCollectRoom = function (room, socket) {
    Controllers.User.cancelCollectRoom(room, function (err, history) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            Controllers.User.findUserById(room.collector_id, function (err, user) {
                if (err) {
                    socket.emit('err', {
                        msg: err
                    })
                } else {
                    socket.emit('technode', {
                        action: 'cancelCollectRoom',
                        user: user,
                        data: history
                    })
                }
            })

        }
    })
}

exports.bindSaleMan = function (bind, socket) {
    var bindCode = {
        bindCode: bind.number,
        product: bind.product
    }
    console.log(bind)
    Controllers.User.getUserByCode(bindCode, function (err, user) {
        if (err) {
            socket.emit('err', {
                msg: err
            })
        } else {
            console.log(user)
            var newBind = {
                number: bind.number,
                _id: bind._id,
                product: bind.product,
                customerName: bind.nick_name,
                bindUserName: user.name,
                bindUserId: user._id,
                bindUserNickName: user.nick_name
            }

            // Controllers.User.updateAnalyst(newBind, function (err, data111) {
            //     if (err) {
            //         socket.emit('err', {
            //             msg: err
            //         })
            //     } else {
            //     }
            // })
            // Controllers.User.deleteHistoryBind(newBind, function (err, deleteInfo) {
            //     if (err) {
            //         socket.emit('err', {
            //             msg: err
            //         })
            //     } else {
            //     }
            // })
            //客户表中插入理财师信息
            Controllers.User.bindAnalyst(newBind, function (err, data) {
                if (err) {
                    socket.emit('err', {
                        msg: err
                    })
                } else {
                    var bind = {
                        customer: data,
                        ast: user
                    }

                    console.log(bind)
                    //理财师表中插入客户信息
                    Controllers.User.updateAnalystCustomerList(bind, function (err, ast) {
                        console.log('绑定理财师成功' + ast)
                    })
                    socket.emit('technode', {
                        action: 'bindAnalyst',
                        data: data
                    })
                }
            })
        }
    })

}

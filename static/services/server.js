angular.module('techNodeApp').factory('server', ['$cacheFactory', '$q', '$http', 'socket', function ($cacheFactory, $q, $http, socket) {
    var cache = window.cache = $cacheFactory('technode')
    socket.on('technode', function (data) {
        switch (data.action) {
            case 'getRoom':
                if (data._roomId) {
                    // console.log(data.data)
                    angular.extend(cache.get(data._roomId), data.data)
                } else {
                    if (data.outFlag) {
                        //分析师退出
                        var userInfo = data.data
                        // cache.get('rooms').splice(0, cache.get('rooms').length)
                        cache.get('rooms').forEach(function (room) {
                            if (room.creator_name == userInfo) {
                                room.online = false
                            }
                        })
                        cache.get('user').belong_analyst_online = false
                    } else if (data.saleOnline) {
                        var saleName = data.data
                        cache.get('user').belong_card_online = true
                        if (cache.get('user').belong_card_nick == saleName) {
                            cache.get('user').belong_card_online = true
                        } else if (cache.get('user').belong_metal_nick == saleName) {
                            cache.get('user').belong_metal_online = true
                        }
                    } else if (data.saleOutline) {
                        var saleName = data.data
                        if (cache.get('user').belong_card_nick == saleName) {
                            cache.get('user').belong_card_online = false
                        } else if (cache.get('user').belong_metal_nick == saleName) {
                            cache.get('user').belong_metal_online = false
                        }
                    } else if (data.onFlag) {
                        //分析师登录
                        var name = data.data
                        // cache.get('rooms').splice(0, cache.get('rooms').length)
                        cache.get('rooms').forEach(function (room) {
                            if (room.creator_name == name) {
                                console.log(room.creator_name == name)
                                room.online = true
                            }
                        })

                        cache.get('user').belong_analyst_online = true

                    } else if (data.userOnline) {
                        // 用户登录
                        var userName = data.data
                        cache.get('user').customerList.forEach(function (user) {
                            if (user.customer_name == userName) {
                                user.customer_online = true
                            }
                        })
                    } else if (data.userOutFlag) {
                        var userName = data.data
                        cache.get('user').customerList.forEach(function (user) {
                            if (user.customer_name == userName) {
                                user.customer_online = false
                            }
                        })


                    } else {
                        // console.log('获取所有房间')
                        cache.get('rooms').splice(0, cache.get('rooms').length)
                        data.data.forEach(function (room) {
                            cache.get('rooms').push(room)
                        })
                    }
                }
                break
            case 'leaveRoom':
                var leave = data.data
                var _userId = leave.user._id
                var _roomId = leave.room._id
                cache.get(_roomId).users = cache.get(_roomId).users.filter(function (user) {
                    return user._id != _userId
                })
                cache.get('rooms') && cache.get('rooms').forEach(function (room) {
                    if (room._id === _roomId) {
                        room.users = room.users.filter(function (user) {
                            return user._id !== _userId
                        })
                    }
                })
                break
            case 'createRoom':
                cache.get('rooms').push(data.data)
                break
            case 'getOnlineUser':
                console.log(1)
                if (data.data.push && data.data.userId == data.data.onlineUser.belong_analyst) {
                    cache.get('online_users').push(data.data.onlineUser)
                } else if (data.data.type) {
                    console.log(2)
                    data.data.onlineUser.forEach(function (online) {
                        console.log(online + 'online')
                        cache.get('online_users').push(online)
                    })
                }
                break
            case 'getOfflineUser':
                if (data.data.push && data.data.userId == data.data.offlineUser.belong_analyst) {
                    cache.get('offline_users').data = cache.get('offline_users').filter(function (user) {
                        return user._id != data.offlineUser._id
                    })
                } else if (data.data.type) {
                    data.data.offlineUser.forEach(function (offline) {
                        console.log(offline + 'offline')
                        cache.get('offline_users').push(offline)
                    })
                }
                break
            case 'joinRoom':
                var join = data.data
                var _userId = join.user._id
                var _roomId = join.user._roomId
                if (!cache.get(_roomId)) {
                    cache.get('rooms').forEach(function (room) {
                        if (room._id === _roomId) {
                            cache.put(_roomId, room)
                        }
                    })
                }
                cache.get(_roomId).users.push(join.user)
                break
            case 'createMessage':
                var message = data.data
                cache.get(message._roomId).messages.push(message)
                break
            case 'collectRoom':
                angular.extend(cache.get('user'), data.user)
                cache.get('collectRooms').push(data.data)
                break
            case 'singleCollectRoom':
                data.data.forEach(function (room) {
                    cache.get("singleCollect").push(room)
                })
                break
            case 'cancelCollectRoom':


                angular.extend(cache.get('user'), data.user)
                cache.get('cancelCollectRooms').push(data.data)

                break
            case 'getUserName':
                data.data.forEach(function (room) {
                    cache.get("users").push({collect: room.collectRoom, history: room.history})
                })
                break
            case 'createChatMessage':

                var message = data.data
                var index_id = null
                if (message.creator.level != 0) {
                    index_id = message.message_id + message.creator._id
                } else {
                    index_id = message.creator._id + message.message_id
                }
                cache.get(index_id).messages.push(message)
                break
            case 'getAnalystRoom':

                if (data._analystId) {
                    angular.extend(cache.get(data._analystId), data.data)
                } else {
                    data.data.forEach(function (room) {
                        cache.get('rooms').push(room)
                    })
                }
                break
            case 'bindAnalyst':
                if (cache.get('user')._id == data.data._id) {
                    console.log(data.data)
                    angular.extend(cache.get('user'), {})
                    angular.extend(cache.get('user'), data.data)
                } else if (cache.get('user')._id == data.ast._id) {
                    angular.extend(cache.get('user'), {})
                    angular.extend(cache.get('user'), data.ast)
                }

                break
            case 'createRoom':
                  cache.get('rooms').push(data.data)
                break

        }
    })
    socket.on('err', function (data) {
        console.log(data)
    })
    return {
        validate: function () {
            var deferred = $q.defer()
            $http({
                url: '/api/validate',
                method: 'GET'
            }).success(function (user) {
                angular.extend(this.getUser(), user)
                deferred.resolve()
            }.bind(this)).error(function (data) {
                deferred.reject()
            })
            return deferred.promise
        },
        regValidate: function (data) {
            var deferred = $q.defer()
            $http({
                url: '/api/regValidate',
                method: 'POST',
                data: {
                    data: data
                }
            }).success(function (user) {
                if (user.length != 0) {
                    deferred.reject()
                } else {
                    deferred.resolve()
                }
            }).error(function () {
                deferred.reject()
            })
            return deferred.promise
        },
        validateCode: function (data) {
            var deferred = $q.defer()
            $http({
                url: '/api/codeValidate',
                method: 'POST',
                data: {
                    data: data
                }
            }).success(function (user) {
                if (user == '404') {
                    deferred.reject()
                } else {
                    deferred.resolve()
                }
            }).error(function () {
                deferred.reject()
            })
            return deferred.promise
        },
        login: function (data) {
            var newData = data
            console.log(newData)
            var deferred = $q.defer()
            //普通客户手机号码登录
            if (data[0].length == 11) {
                $http({
                    url: '/api/login',
                    method: 'POST',
                    data: {
                        data: data
                    }
                }).success(function (user) {
                    if (user != '403') {
                        angular.extend(cache.get('user'), user)
                        deferred.resolve()
                    } else {
                        deferred.reject()
                    }
                }).error(function () {
                    deferred.reject()
                })
            } else if (data[0].length == 18) {
                //获取客户接口
                var cardID = data[0]
                $http({
                    url: '/api/verifyLogin',
                    method: 'POST',
                    data: {
                        data: {
                            cardID: data[0],
                            passWord: data[1]
                        }
                    }
                }).success(function (users) {
                    if (users != '403' && users !== "null") {
                        var data = [users[0].name, users[0].password]
                        //已有理财师账号登陆
                        $http({
                            url: '/api/login',
                            method: 'POST',
                            data: {
                                data: data
                            }
                        }).success(function (user) {
                            if (user != '403') {
                                angular.extend(cache.get('user'), user)
                                deferred.resolve()
                            } else {
                                alert('11')
                            }
                        }).error(function () {
                            deferred.reject()
                        })
                    } else if (users == '403') {
                        alert('密码错误')
                    } else if (users == "null") {
                        $.ajax({
                            url: 'http://www.zizhao99.com/erpInterface.php?id=' + cardID,
                            type: 'POST',
                            dataType: "JSONP",
                            jsonp: 'jsonp',
                            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                            jsonpCallback: "success_jsonpCallback",
                            success: function (back) {
                                if (JSON.parse(back).status == "0") {
                                    alert('该账号不存在')
                                } else {
                                    var status=''
                                    if(JSON.parse(back).customerList.length==0){
                                        status='ast'
                                    }else{
                                        status='sale'
                                    }
                                    // 分析师登录
                                    $http({
                                        url: '/api/astLogin',
                                        method: 'POST',
                                        data: {
                                            data: {
                                                status:status,
                                                cardID: newData[0],
                                                passWord: newData[1],
                                                detail: JSON.parse(back)
                                            }
                                        }
                                    }).success(function (user) {
                                        angular.extend(cache.get('user'), user)
                                        deferred.resolve()
                                    }).error(function () {
                                        deferred.reject()
                                    })
                                }
                            },
                            error: function (error) {
                                alert('该用户不存在')
                            }
                        })
                    }
                }).error(function () {
                    deferred.reject()
                })
            }

            return deferred.promise
        },
        changePwd: function (data) {
            var deferred = $q.defer()
            $http({
                url: '/api/change',
                method: 'POST',
                data: {
                    data: data
                }
            }).success(function (user) {
                console.log(user)
                if (user != '403') {
                    alert('更新成功')
                    deferred.resolve()
                } else {
                    alert('原始密码输入错误')
                }
            }).error(function () {
                deferred.reject()
            })
            return deferred.promise
        },
        register: function (data) {
            var deferred = $q.defer()
            $http({
                url: '/api/register',
                method: 'POST',
                data: {
                    data: data
                }
            }).success(function (user) {
                deferred.resolve()
            }).error(function () {
                deferred.reject()
            })
            return deferred.promise
        },
        logout: function () {
            var deferred = $q.defer()
            $http({
                url: '/api/logout',
                method: 'GET'
            }).success(function () {
                var user = cache.get('user')
                for (key in user) {
                    if (user.hasOwnProperty(key)) {
                        delete user[key]
                    }
                }
                deferred.resolve()
            })
            return deferred.promise
        },
        emitLogin: function (data) {
            socket.emit('technode', {
                action: 'emitLogin',
                data: {
                    userName: data.userName,
                    pwd: data.pwd
                }
            })
        },
        emitLoginOut: function (data) {
            socket.emit('technode', {
                action: 'emitLoginOut',
                data: {
                    userName: data.userName,
                    pwd: data.pwd
                }
            })
        },
        getUser: function () {
            if (!cache.get('user')) {
                cache.put('user', {})
            }

            return cache.get('user')
        },
        getOnlineUser: function (userId) {
            if (!cache.get(userId)) {
                cache.put('online_users', [])
                socket.emit('technode', {
                    action: 'getOnlineUser',
                    data: userId
                })
            }
            return cache.get('online_users')
        },
        getOfflineUser: function (userId) {
            if (!cache.get(userId)) {
                cache.put('offline_users', [])
                socket.emit('technode', {
                    action: 'getOfflineUser',
                    data: userId
                })
            }
            return cache.get('offline_users')
        },
        getRoom: function (_roomId) {
            if (!cache.get(_roomId)) {
                cache.put(_roomId, {
                    users: [],
                    messages: []
                })
                socket.emit('technode', {
                    action: 'getRoom',
                    data: {
                        _roomId: _roomId
                    }
                })
            }
            return cache.get(_roomId)
        },
        getRooms: function () {
            if (!cache.get('rooms')) {
                cache.put('rooms', [])
                socket.emit('technode', {
                    action: 'getRoom'
                })
            }
            return cache.get('rooms')
        },
        joinRoom: function (join) {
            socket.emit('technode', {
                action: 'joinRoom',
                data: join
            })
        },
        leaveRoom: function (leave) {
            socket.emit('technode', {
                action: 'leaveRoom',
                data: leave
            })
        },
        createRoom: function (room) {
            socket.emit('technode', {
                action: 'createRoom',
                data: room
            })
        },
        createMessage: function (message) {
            socket.emit('technode', {
                action: 'createMessage',
                data: message
            })
        },
        getUserName: function (users) {
            cache.put("users", [])
            socket.emit('technode', {
                action: 'getUserName',
                data: users
            })
            return cache.get("users")

        },
        joinChat: function (join) {
            socket.emit('technode', {
                action: 'joinChat',
                data: join
            })
        },
        binding: function (info) {
            socket.emit('technode', {
                action: 'bindSaleMan',
                data: {
                    number: info[0],
                    _id: info[1],
                    product: info[2],
                    nick_name: info[3]
                }
            })
        },
        //analyst
        getAnalystRoom: function (_analystId) {
            if (!cache.get(_analystId[2])) {
                cache.put(_analystId[2], {
                    user: [],
                    messages: [],
                    analystMessages: []
                })
                socket.emit('technode', {
                    action: 'getAnalystRoom',
                    data: {
                        _analystId: _analystId[0],
                        userId: _analystId[1],
                        key: _analystId[2]
                    }
                })
            }
            return cache.get(_analystId[2])
        },
        createChatMessage: function (message) {
            socket.emit('technode', {
                action: 'createChatMessages',
                data: message
            })
        },
        collectRoom:function (room) {
            cache.put('collectRooms', [])
            socket.emit('technode',{
                action:'collectRoom',
                data:room
            })
        },
        cancelCollectRoom: function (room) {
            cache.put('cancelCollectRooms', [])
            socket.emit('technode', {
                action: 'cancelCollectRoom',
                data: room
            })
            return cache.get("cancelCollectRooms")
        },
        singleCollectRoom: function (room) {
            cache.put('singleCollect', [])
            socket.emit('technode', {
                action: 'getUserName',
                data: room
            })
            return cache.get("singleCollect")
        }

    }
}])
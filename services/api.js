var Controllers = require('../controllers')
var crypto = require('crypto');
var formidable = require('formidable');
var fs = require('fs');

exports.login = function (req, res) {
    var data = req.body.data
    if (data) {
        Controllers.User.findByEmailOrCreate(data, function (err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
            if(user==null){
                res.json(403)
            }else{
            req.session._userId = user.name
                Controllers.User.online(user._id, function (err, user) {
                    if (err) {
                        res.json(500, {
                            msg: err
                        })
                    } else {
                        console.log(user.name+'has been login')
                        res.json(user)
                    }
                })
            }

            }
        })
    } else {
        res.json(403)
    }
}

exports.logout = function (req, res) {
    var _userId = req.session._userId
    Controllers.User.offline1(_userId, function (err, user) {
        if (err) {
            res.json(500, {
                msg: err
            })
        } else {
            res.json(200)
            req.session.destroy()
        }
    })
}

exports.astLogin = function (req, res) {
    var data = req.body.data
    //status 1 代表存在客户
    if (data.detail.status == '1') {
        Controllers.User.insertLoginUserById(data, function (err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                if (user) {
                    req.session._userId = user.name
                    Controllers.User.online(user._id, function (err, user) {
                        if (err) {
                            res.json(500, {
                                msg: err
                            })
                        } else {
                            res.json(user)
                        }
                    })
                } else {
                    res.json(403)
                }
            }
        })
    }
}

exports.regValidate = function (req, res) {
    var data = req.body.data
    if (data) {
        Controllers.User.regValidate(data, function (err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                res.json(user)
            }
        })
    } else {
        res.json(403)
    }
}

exports.codeValidate=function (req,res) {
    var data = req.body.data
    if (data) {
        Controllers.User.codeValidate(data, function (err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                console.log(user+'验证code是否存在')
                if(user != null){
                    res.json(user)
                }else {
                    res.json(404)
                }
            }
        })
    } else {
        res.json(403)
    }
}
//上传图片接口
exports.upload = function (req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'C:/livejgbPC/jgbAPP/JGBApp/static/upload/';	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function (err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.end();
            return;
        }


        var extName = '';  //后缀名
        switch (files.fulAvatar1.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.end();
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        var savePath = '/upload/' + avatarName;
        console.log(newPath)
        res.json(savePath);
        res.end();
        try {
            fs.renameSync(files.fulAvatar1.path, newPath);  //重命名
        } catch (e) {
            console.log(e);
        }

    });

    res.locals.success = '上传成功';
}

exports.validate = function (req, res) {
    var _userId = req.session._userId
    if (_userId) {
        Controllers.User.findUserByName(_userId, function (err, user) {
            if (err) {
                res.json(401, {
                    msg: err
                })
            } else {
                res.json(user)
            }
        })
    } else {
        res.status(401).json(null)
    }
}
//理财师/分析师是否存在
exports.verifyLogin = function (req, res) {
    var data = req.body.data
    if (data) {
        Controllers.User.findUserByName(data.cardID, function (err, judgeNameIsExist) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                if (judgeNameIsExist) {
                    console.log(judgeNameIsExist+'3')
                    Controllers.User.findAstByCardID(data, function (err, User) {
                        if (err) {
                            res.json(500, {
                                msg: err
                            })
                        } else {
                            console.log(User)
                            if (User.length != 0) {
                                req.session._userId = User.name
                                res.json(User)
                            } else {
                                res.json(403)   //用户密码错误
                            }
                        }
                    })
                } else {
                    console.log(judgeNameIsExist)
                    res.json(null)
                }
            }
        })

    }

}

exports.change = function (req, res) {
    var data = req.body.data
    if (data) {
        Controllers.User.findUserById(data.id, function (err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                console.log(data)
                // 和原密码相同
                if (user.password == data.before) {
                    //更新密码
                    Controllers.User.updateUserById(data, function (err, User) {
                        if (err) {
                            res.json(500, {
                                msg: err
                            })
                        } else {
                            res.json(User)
                        }
                    })
                }else{
                    res.json(403)
                }
            }
        })
    }
}

exports.register = function (req, res) {
    var data = req.body.data
    if (data) {
        Controllers.User.register(data, function (err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                console.log(user)
                res.json(user)
            }
        })
    } else {
        res.json(403)
    }
}
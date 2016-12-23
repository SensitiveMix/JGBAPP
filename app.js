var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = express()
var path = require('path')
var signedCookieParser = cookieParser('technode')
var MongoStore = require('connect-mongo')(session)
var Cookie=require('cookie')

var config = require('./config')
var api = require('./services/api')
var socketApi = require('./services/socketApi')

var sessionStore = new MongoStore({
  url: config.mongodb
}, function (e) {
        var app = express()

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
          extended: true
        }))
        app.use(cookieParser())
        app.use(session({
          secret: 'technode',
          resave: true,
          saveUninitialized: false,
          cookie: {
            maxAge: 60 * 1000 * 60
          },
          store: sessionStore
        }))

        if ('development' == app.get('env')) {
          app.set('staticPath', '/static')
        } else {
          app.set('staticPath', '/build')
        }

        app.use(express.static(__dirname + app.get('staticPath')))

        app.post('/api/login', api.login)
        app.get('/api/logout', api.logout)
        app.get('/api/validate', api.validate)
        app.post('/api/astLogin', api.astLogin)
        app.post('/api/register', api.register)
        app.post('/api/verifyLogin', api.verifyLogin)
        app.post('/api/regValidate', api.regValidate)
        app.post('/api/upload', api.upload)

        app.use(function(req, res) {
          res.sendFile(path.join(__dirname, app.get('staticPath') + '/index.html'))
        })
        var port = process.env.PORT || 82

        console.log(port)

        var server = app.listen(port, function() {
          console.log('liveJGB  is on port ' + port + '!')
        })

        var io = require('socket.io').listen(server)

        io.sockets.on('connection', function(socket) {
          socketApi.connect(socket)

          socket.on('disconnect', function() {
            socketApi.disconnect(socket)
          })

          socket.on('technode', function(request) {
            socketApi[request.action](request.data, socket, io)
          })
        })
})

module.exports = app


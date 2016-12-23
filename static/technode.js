angular.module('techNodeApp', ['ngRoute', 'angularMoment', 'ngDialog','angularFileUpload'])
    .run(['$window', '$rootScope', '$location', 'server', 'ngDialog',function ($window, $rootScope, $location, server,ngDialog) {
        $window.moment.lang('zh-cn')

        server.validate().then(function () {
            if ($location.path() === '/login') {

                $location.path('/rooms')
            }
        }, function () {
            $location.path('/login')
        })
        //初始化header foot
        $rootScope.myPosition = true;
        $rootScope.my_footer = true;
        /**
         * ftra1  行情
         * ftra2  资讯
         * ftra3  交易圈
         * ftra4  在线沙龙
         * ftra5  我的理财师
         */

        $rootScope.init_name = '我'
        $rootScope.myPosition = true

        $rootScope.ftra = function (value) {
            $rootScope.value = value
            switch (value) {
                case 1:
                    $location.path('/info')
                    break
                case 2:
                     $location.path('/price')
                    break
                case 3:
                    $location.path('/ring')
                    break
                case 4:
                    $location.path('/rooms')
                    break
                case 5:
                    if($rootScope.me.level=='0'){
                        $location.path('/customerRoom')
                    }else{
                        $location.path('/analystRoom')
                    }
                    break

            }
        }
        /**
         * 验证是否登陆
         */
        // server.validate().then(function () {
        //     if ($location.path() === '/login') {
        //         $location.path('/rooms')
        //     }
        // }, function () {
        //     $location.path('/')
        // })

        /**
         * me  当前登录用户
         */
        $rootScope.me = server.getUser()

        $rootScope.logout = function () {
            server.logout().then(function () {
                $location.path('/login')
            })

            server.emitLoginOut({
                userName: $rootScope.me.name,
                pwd: $rootScope.me.password
            })
        }
        $rootScope.getCode = function () {
                    ngDialog.open(
                        {
                            template: '<h1 style="text-align: center" >' + $rootScope.me.number + '</h1>',
                            plain: true,
                            className: 'ngdialog-theme-default'
                        });
                }


    }])
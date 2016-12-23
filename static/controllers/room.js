angular.module('techNodeApp').controller('RoomCtrl', ['$scope', '$routeParams', '$location', '$scope', 'server', '$rootScope', 'ngDialog', function ($scope, $routeParams, $location, $scope, server, $rootScope, ngDialog) {

    $scope.back = function () {
        $location.path('/rooms')
        $rootScope.my_footer = true
    }

    if($rootScope.me){
      // 隐藏导航栏
        $rootScope.my_footer = false

        $(".body-style").css("background-color", "#fff");

        // 初始化收藏图像
        var bool = 0

        $rootScope.me.collectRoom.forEach(function (room) {
            bool += Number(room.room_id == $routeParams._roomId)
        })

        if (Boolean(bool)) {
            $scope.init_collect_img = "../images/room-pic-01R.png"
            $scope.cancel = true
            $scope.collect = false
        } else {
            $scope.init_collect_img = "../images/room-pic02.png"
            $scope.cancel = false
            $scope.collect = true
        }

        /**
         *  点击收藏房间
         */
        $scope.collect = function () {
            $scope.init_collect_img = "../images/room-pic-01R.png"
            $scope.cancel = true
            $scope.collect = false
            server.collectRoom({
                room_id: $scope.room._id,
                room_name: $scope.room.name,
                collector_id: $rootScope.me._id
            })
        }

        /**
         * 取消收藏房间
         */
        $scope.cancelCollect = function () {
            $scope.init_collect_img = "../images/room-pic02.png"
            $scope.cancel = false
            $scope.collect = true
            ngDialog.open({
                template: '<h1 style="text-align: center" >取消关注成功</h1>',
                plain: true,
                className: 'ngdialog-theme-default',
                height: '200px',
                width: '265px',
                controller: 'RoomCtrl'
            });
            server.cancelCollectRoom({
                room_id: $scope.room._id,
                room_name: $scope.room.name,
                collector_id: $rootScope.me._id
            })
        }


        /**
         * 传入房间号
         * 获取在线沙龙房间信息
         */
        $scope.room = server.getRoom($routeParams._roomId)

        /**
         * 聊天信息的筛选
         * messageByMe      本人的聊天记录
         * messageByTech    分析师的聊天记录
         * messageByYK      游客的聊天记录
         * @type {Array.<T>}
         */

        $scope.techfilter = function (item) {
            return item.creator.level == "66"
        }

        $scope.ykfilter = function (item) {
            return item.creator.level != "66" && item.creator._id != $scope.me._id
        }

        $scope.mefilter = function (item) {
            return item.creator._id.indexOf($scope.me._id) > -1
        }

        server.joinRoom({
            user: $scope.me,
            room: {
                _id: $routeParams._roomId
            }
        })

        /**
         * 离开房间触发路由
         */
        $scope.$on('$routeChangeStart', function () {
            server.leaveRoom({
                user: $scope.me,
                room: $scope.room
            })
        })

        $("#onlineScroll").height($(window).height()-$('#textScroll').height()-$('#headerScroll').height()-17)

        $rootScope.$watch('room', function (newValue, oldValue, scope) {
            if (newValue == oldValue) {
                setTimeout(function () {
                    var scroll = $("#onlineScroll")[0].scrollHeight
                    $("#onlineScroll").scrollTop(scroll);
                }, 100)
            }
        })
    }

}])
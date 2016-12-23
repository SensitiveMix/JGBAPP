angular.module('techNodeApp').controller('RoomsCtrl', ['$scope', '$location', '$rootScope', 'server', function ($scope, $location, $rootScope, server) {
    //判断是否登录
    // if (!$scope.me._id) {
    //     $location.path('/login')
    // } else {

    $(".body-style").css("background-color", "#333333");

    /**
     * 获取全部房间
     */
    $scope.filteredRooms = $scope.rooms = server.getRooms()
    $rootScope.room = server.getUserName($rootScope.me._id)
    $rootScope.singleCollect = server.singleCollectRoom($rootScope.me._id)


    //返回
    $scope.back = function () {
    $location.path('/info')
     if (!$scope.me._id) {
            $rootScope.myPosition = true;
            $rootScope.my_footer = true;
         } else {

         }
    }


    $rootScope.myPosition = false;
    $rootScope.value = '4'
    /**
     * 初始化样式
     *  a1 点击收藏样式
     *  a2 点击所有样式
     *  a2()收藏沙龙房间
     */
    $scope.a1_img = "../images/room-pic05R.png"
    $scope.a1_css = "color:#ff6600;border-bottom: 2px solid #ff6600;"
    $scope.a2_img = "../images/room-pic02.png"
    $scope.a3_img = "../images/room-pic01.png"
    $scope.allRoom = "所有"
    $scope.element = true;
    $scope.a1 = function () {
        //toggle
        //$scope.filteredRooms = $scope.rooms = server.getRooms()
        $scope.element = $scope.element == false ? true : false
        $scope.a1_img = "../images/room-pic05R.png"
        $scope.a1_css = "color:#ff6600;border-bottom: 2px solid #ff6600;"
        $scope.a2_img = "../images/room-pic02.png"
        $scope.a2_css = "color:white"
        $scope.a3_img = "../images/room-pic01.png"
        $scope.a3_css = "color:white"
    }
    $scope.a2 = function () {
        $scope.a1_img = "../images/room-pic05.png"
        $scope.a1_css = "color:white"
        $scope.a2_img = "../images/room-pic-01R.png"
        $scope.a2_css = "color:#ff6600;border-bottom: 2px solid #ff6600;"
        $scope.a3_img = "../images/room-pic01.png"
        $scope.a3_css = "color:white"

        if ($rootScope.me._id) {
            var historyArr = []
            if ($rootScope.room.length > 0) {
                $rootScope.room[0].collect.forEach(function (history) {
                    var temple = $scope.rooms.filter(function (room) {
                        return room._id.indexOf(history.room_id) > -1
                    })
                    historyArr = historyArr.concat(temple)
                })
                $scope.filteredRooms = historyArr
            }
        } else {
            $location.path('/login')
        }

    }

    /**
     * 是否收藏
     * @param id
     * single collect   时时更新是否收藏
     * @returns {boolean}
     */
    $scope.display = function (id) {
        var bool = 0
        $rootScope.singleCollect.forEach(function (history) {
            var temple = id.indexOf(history.room_id) > -1
            bool += Number(temple)
        })
        return Boolean(bool)
    }

    /**
     * 所有分类
     * 默认排序
     * 贵金属
     * 邮币卡
     * 关闭按钮
     */
    $scope.salon_default = function () {
        $scope.allRoom = "所有"
        $scope.filteredRooms = $scope.rooms = server.getRooms()
        $scope.element = $scope.element == false ? true : false
    }
    $scope.salon_metal = function () {
        $scope.allRoom = "贵金属"
        $scope.filteredRooms = $scope.rooms.filter(function (room) {
            return room.name.indexOf("贵金属") > -1
        })

        $scope.element = $scope.element == false ? true : false
    }
    $scope.salon_card = function () {
        $scope.allRoom = "邮币卡"
        var cardArr = []
        var temple = $scope.rooms.filter(function (room) {
            return room.status.indexOf("邮币卡") > -1
        })
        cardArr = cardArr.concat(temple)
        $scope.filteredRooms = cardArr
        $scope.element = $scope.element == false ? true : false
    }
    $scope.close = function () {
        $scope.element = $scope.element == false ? true : false
    }

    /**
     * 点击历史浏览
     * historyArr 数组
     */
    $scope.searchHistory = function () {
        $scope.a1_img = "../images/room-pic05.png"
        $scope.a1_css = "color:white"
        $scope.a2_img = "../images/room-pic02.png"
        $scope.a2_css = "color:white"
        $scope.a3_img = "../images/room-pic-02R.png"
        $scope.a3_css = "color:#ff6600;border-bottom: 2px solid #ff6600;"
        //$scope.filteredRooms = $scope.rooms = server.getRooms()
        var historyArr = []
        $scope.me.history.forEach(function (history) {
            var temple = $scope.rooms.filter(function (room) {
                return room._id.indexOf(history._id) > -1
            })
            historyArr = historyArr.concat(temple)
        })
        $scope.filteredRooms = historyArr

    }

    /**
     * 搜索房间
     * searchKey
     */
    $scope.searchRoom = function () {
        if ($scope.searchKey) {
            $scope.filteredRooms = $scope.rooms.filter(function (room) {
                return room.name.indexOf($scope.searchKey) > -1
            })
        } else {
            $scope.filteredRooms = $scope.rooms
        }

    }

    /**
     * 添加房间
     */
    $scope.createRoom = function () {
        server.createRoom({
            name: $scope.searchKey,
            creator_id: $scope.me._id,
            creator_name: $scope.me.name
        })
    }

    /**
     * 进入房间
     * room 房间信息
     * @param room
     */
    $scope.enterRoom = function (room) {
        if (!$scope.me._id) {
            $(".body-style").css("background-color", "#fff");
            $location.path('/login')
        } else {
            $location.path('/rooms/' + room._id)
        }

    }


    /**
     * 监听房间搜索
     */
    $scope.$watchCollection('rooms', function () {
        $scope.searchRoom()
    });
    // }
}])
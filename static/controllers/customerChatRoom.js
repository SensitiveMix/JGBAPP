angular.module('techNodeApp').controller('CustomerChatRoomCtrl', ['$scope', '$routeParams', '$scope', 'server','$rootScope','$location', function($scope, $routeParams,$scope, server,$rootScope,$location) {

    //返回
    $scope.back = function () {
        $location.path('/customerRoom')
        $rootScope.myPosition = false;
        $rootScope.my_footer = true;
    }

    $rootScope.value = '5'
    $(".body-style").css("background-color", "#fff");

    $rootScope.myPosition = false;
    $rootScope.my_footer = false;
    $scope.users= server.getUserName($routeParams._statusId)

    var index_id=$scope.me._id+ $routeParams._statusId
    var data=[$routeParams._statusId,$scope.me._id,index_id];

    $scope.room = server.getAnalystRoom(data)

    $rootScope.$watch('room', function (newValue, oldValue, scope) {
        if (newValue == oldValue) {
            setTimeout(function () {
                var scroll = $("#online_ast")[0].scrollHeight
                $("#online_ast").scrollTop(scroll);
            }, 100)
        }
    })


}])
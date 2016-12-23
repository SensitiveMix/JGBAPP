angular.module('techNodeApp').controller('AnalystChatRoomCtrl', ['$scope', '$routeParams', '$scope', 'server','$rootScope', '$location',function($scope, $routeParams,$scope, server,$rootScope,$location) {


      //返回
    $scope.back = function () {
      $location.path('/analystRoom')
      $rootScope.myPosition = false;
      $rootScope.my_footer = true;
    }

    $rootScope.myPosition = false;
    $rootScope.my_footer = false;
    $rootScope.value = '5'
    $(".body-style").css("background-color", "#fff");


    var index_id=$routeParams.userId+$scope.me._id

    var data=[$routeParams.userId,$scope.me._id,index_id];


    $scope.room = server.getAnalystRoom(data)


    $rootScope.$watch('room', function (newValue, oldValue, scope) {
        if (newValue == oldValue) {
            setTimeout(function () {
                var scroll = $("#analystArea")[0].scrollHeight
                $("#analystArea").scrollTop(scroll);
            }, 100)
        }

    })

}])
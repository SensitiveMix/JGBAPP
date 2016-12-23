angular.module('techNodeApp').controller('MessageCreatorCtrl', ['$scope', 'server', function($scope, server) {
  $scope.createMessage = function() {

    server.createMessage({
      content: $scope.newMessage,
      creator: $scope.me,
      _roomId: $scope.room._id
    })

    $scope.newMessage = ''

    setTimeout(function () {
        var scroll = $("#onlineScroll")[0].scrollHeight
        $("#onlineScroll").scrollTop(scroll);
    }, 100)

  }
}])
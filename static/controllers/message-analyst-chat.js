angular.module('techNodeApp').controller('MessageAnalystChatCtrl', ['$scope','$routeParams',  'server', function($scope,$routeParams, server) {
    $scope.createMessage = function() {
        console.log($routeParams.userId)
        server.createChatMessage({
            content: $scope.newMessage,
            creator: $scope.me,
            room_id:$routeParams.userId+$scope.me._id,
            message_id: $routeParams.userId
        })

        $scope.newMessage = ''
        setTimeout(function () {
            var scroll = $("#analystArea")[0].scrollHeight
            $("#analystArea").scrollTop(scroll);
        }, 100)
    }
}])
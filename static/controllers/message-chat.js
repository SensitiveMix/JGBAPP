angular.module('techNodeApp').controller('MessageChatCtrl', ['$scope','$routeParams',  'server', function($scope,$routeParams, server) {
    $scope.createMessage = function() {
        console.log($routeParams._statusId)
        server.createChatMessage({
            content: $scope.newMessage,
            creator: $scope.me,
            room_id:$scope.me._id+ $routeParams._statusId,
            message_id: $routeParams._statusId
        })

        $scope.newMessage = ''
        $(".online_ast").height($(window).height()-$('#header_ast').height()-$('#text_ast').height())
        setTimeout(function () {
            var scroll = $("#online_ast")[0].scrollHeight
            $("#online_ast").scrollTop(scroll);
        }, 100)
    }
}])
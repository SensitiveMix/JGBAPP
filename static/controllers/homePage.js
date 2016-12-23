angular.module('techNodeApp').controller('HomeCtrl', ['$scope', '$location', 'server', function($scope, $location, server) {
    $scope.login= function () {
        if($scope.id){
            $location.path('/login')
        }
    }
}])
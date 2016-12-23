/**
 * Created by sunNode on 16/8/4.
 * 绑定第四步
 */
angular.module('techNodeApp').controller('bindingOverCtrl', ['$scope', '$location', '$rootScope', 'server', function ($scope, $location, $rootScope, server) {
    //返回
    $scope.back = function () {
        $location.path('/bindingNum')
        $rootScope.myPosition = false;
        $rootScope.my_footer = true;
    }
    $rootScope.myPosition = false;
    $rootScope.my_footer = true;

    // server.getCurrentUser($rootScope.me._id)
    // server.getUser()
    $scope.next = function () {
        $rootScope.dpdn_css = {'display': 'block'}
        $location.path('/customerRoom')
    }
}])

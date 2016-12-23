/**
 * Created by sunNode on 16/8/4.
 * 绑定第一步选择产品
 */
angular.module('techNodeApp').controller('bindingCPCtrl', ['$scope', '$location', '$rootScope', 'server', 'ngDialog', function ($scope, $location, $rootScope, server, ngDialog) {

    //返回
    $scope.back = function () {
        $location.path('/info')
        $rootScope.myPosition = true;
        $rootScope.my_footer = true;
    }
    
    $rootScope.myPosition = false;
    $rootScope.value='5'

    $scope.metal_on = 'off'
    $scope.card_on = 'off'
    $scope.statusCard = function () {
        $scope.card_on = 'on'
        $scope.metal_on = 'off'
    }
    $scope.statusMetal = function () {
        $scope.metal_on = 'on'
        $scope.card_on = 'off'
    }

    $scope.next = function () {
        var data
        if ($scope.metal_on == 'off' && $scope.card_on == 'off') {
            ngDialog.open(
                {
                    template: '<h1 style="text-align: center" >请选择产品</h1>',
                    plain: true,
                    className: 'ngdialog-theme-default',
                    controller: 'bindingCPCtrl'
                });
        } else {
            if ($scope.metal_on == 'on') {
                data = '2'
                if ($rootScope.me.belong_metal_id) {
                    ngDialog.open(
                        {
                            template: '<h1 style="text-align: center" >已绑定</h1>',
                            plain: true,
                            className: 'ngdialog-theme-default',
                            controller: 'bindingCPCtrl'
                        });
                } else {
                    ngDialog.open(
                        {
                            template: '<h1 style="text-align: center" >暂未开放</h1>',
                            plain: true,
                            className: 'ngdialog-theme-default',
                            controller: 'bindingCPCtrl'
                        });
                    // $location.path('/bindingNum/' + data)
                }
            } else {
                data = '1'
                if ($rootScope.me.belong_card_id) {
                    ngDialog.open(
                        {
                            template: '<h1 style="text-align: center" >已绑定</h1>',
                            plain: true,
                            className: 'ngdialog-theme-default',
                            controller: 'bindingCPCtrl'
                        });
                } else {
                    $location.path('/bindingNum/' + data)
                }
            }
        }
    }
}])

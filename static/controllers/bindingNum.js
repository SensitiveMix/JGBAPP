/**
 * Created by sunNode on 16/8/4.
 * 绑定第三步输入邀请码
 */
angular.module('techNodeApp').controller('bindingNumCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'server', function ($scope, $location, $rootScope, $routeParams, server) {
    /**
     * 发送验证码,需要加密
     * 获取所绑定业务员唯一编号_id
     * customerID       客户编号
     * bindCode         邀请码
     * productStatus    产品种类 1贵金属 2邮币卡
     *
     *
     */

    //返回
    $scope.back = function () {
        $location.path('/bindingCP')
        $rootScope.myPosition = false;
        $rootScope.my_footer = true;
    }
    $rootScope.myPosition = false;
    $rootScope.my_footer = true;

    var _Id = '57a1e4046067f3040ac49ab8'
    var productStatus = $routeParams.productStatus
    var customerID = $rootScope.me._id
    var customerNickName = $rootScope.me.nick_name

    var bindCode = ''

    $scope.next = function () {
        for (var i = 1; i <= 6; i++) {
            var query = '#ol' + i;
            bindCode += $(query).val()
        }
        console.log(bindCode)

        var data = [bindCode, customerID, productStatus, customerNickName]
         server.binding(data)

        bindCode=''
        $location.path('/bindingOver')
    }

    $scope.getNumber = function () {
        $(".yqa").click(function () {
            $('.bdpf').css("display", "block");
        });
        // $location.path('/bindingAT/' + productStatus)
    }

    $scope.close = function () {
        $(".close").click(function () {
            $('.bdpf').css("display", "none");
        });
    }

}])


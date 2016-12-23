/**
 * Created by sunNode on 16/7/29.
 * 注册模块
 */

angular.module('techNodeApp').controller('registerCtrl', ['$scope','$rootScope', '$location', 'server','ngDialog', function($scope,$rootScope, $location, server,ngDialog) {
    $rootScope.myPosition=false;
    $scope.back=function () {
        $location.path('/info')
    }
   $scope.validate=function (name) {
        if(name==''){
            alert('请输入手机号')
        }else{
            server.regValidate(name).then(function () {
            },function () {
                alert('该手机号已被注册')
                $scope.name=''
            })
        }
    }
    //用户注册
    $scope.register = function () {
        data = {
            name: $scope.name,
            nick_name: $scope.nick_name,
            password: $scope.password,
            avatarUrl: "../images/vip.svg",
            level: '0',
            level_name: '会员',
            user_type: '0',
            online: false,
            belong_analyst_id: null,
            belong_analyst_name: null,
            analyst_intro: "",
            belong_metal_id: null,
            belong_metal_name: "",
            belong_card_id: null,
            belong_card_name: "",
            history: [],
            belong_metal_nick: "",
            number: "",
            belong_card_nick: "",
            collectRoom: []
        }
        server.register(data).then(function () {
            ngDialog.open({
                template: '<div style="text-align: center"><span>注册成功</span></div>',
                plain: true,
                className: 'ngdialog-theme-default',
                height: '200px',
                width: '200px',
                controller: 'registerCtrl'
            });
            $location.path('/login')
        }, function () {
            console.log('error')
            $scope.status = true
            $location.path('/login')
        })
    }
}])


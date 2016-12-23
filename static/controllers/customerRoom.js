angular.module('techNodeApp').controller('CustomerCtrl', ['$scope', '$location', '$scope', 'server','$rootScope', function ($scope, $location, $scope, server,$rootScope) {


    //返回
    $scope.back = function () {
        $location.path('/info')
        $rootScope.myPosition = true;
        $rootScope.my_footer = true;
    }
    $rootScope.value = '5'
    if (!$scope.me._id) {
        $location.path('/login')
        $(".body-style").css("background-color", "#fff");
    } else {
        //判断邮币卡理财师是否在线
        if($rootScope.me.belong_card_online==false){
            $scope.className=false
            $scope.online_name='离线'
        }else{
            $scope.className=true
            $scope.online_name='在线'
        }

        //判断分析师是否在线
        if($rootScope.me.belong_analyst_online==false){
            $scope.className_ast=false
            $scope.online_ast_name='离线'
        }else{
            $scope.className_ast=true
            $scope.online_ast_name='在线'
        }


        $(".body-style").css("background-color", "#fff");
        if ($scope.me.level == '0') {
            if (!$scope.me.belong_metal_id || !$scope.me.belong_card_id || !$scope.me.belong_analyst_id) {
                $location.path('/bindingCP')

            } else {
                $(".body-style").css("background-color", "#333333");
                $rootScope.myPosition = false;
                $rootScope.my_footer = true;
                $scope.user = $scope.me

                $scope.enterMetal = function (me) {

                    $location.path('/customerRoom/' + me.belong_metal_id)
                }
                $scope.enterCard = function (me) {

                    $location.path('/customerRoom/' + me.belong_card_id)
                }
                $scope.enterAnalyst = function (me) {

                    $location.path('/customerRoom/' + me.belong_analyst_id)
                }
            }
        }


    }
}])
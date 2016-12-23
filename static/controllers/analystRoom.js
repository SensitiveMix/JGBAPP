angular.module('techNodeApp').controller('AnalystCtrl', ['$scope','$location','$scope', 'server', '$rootScope',function($scope, $location, $scope, server,$rootScope) {

          //返回
          $scope.back = function () {
              $location.path('/info')
              $rootScope.myPosition = true;
              $rootScope.my_footer = true;
          }

            if (!$scope.me._id) {
                $location.path('/login')
                $(".body-style").css("background-color", "#fff");
            } else {
             $(".body-style").css("background-color", "#333333");
                      $rootScope.myPosition = false;
                      $rootScope.my_footer = true;
                      $rootScope.value = '5'
                      $rootScope.init_name = '我的客户'

                      $scope.enterOnline = function (id) {

                        var index_id = id + $rootScope.me._id

                        var data = [id, $rootScope.me._id, index_id];
                        $rootScope.customerRoom = server.getAnalystRoom(data)


                        $rootScope.value = id

                        $location.path('/analystRoom/' + id)
                    }

                    $scope.display=function(){
                        if($rootScope.me.customerList.length==0){
                            return true
                        }else{
                            return false
                        }
                    }
            }

}])
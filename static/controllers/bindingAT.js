/**
 * Created by sunNode on 16/8/4.
 * 绑定第二步选择理财师
 */
angular.module('techNodeApp').controller('bindingATCtrl', ['$scope', '$location','$rootScope','$routeParams', 'server', function($scope, $location, $rootScope,$routeParams,server) {
        // 获取产品类别
        var productId=$routeParams.productID
        //根据类型选择相应理财师
        $scope.analyst={'_id':'57a1e4046067f3040ac49ab8','name':'孙老师'}

      
        $scope.analyst_name=$scope.analyst.name
       


        var data=$scope.analyst._id

        $scope.next=function () {
              $location.path('/bindingNum/'+data)
        }
}])

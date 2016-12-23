angular.module('techNodeApp').controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'server','ngDialog', function ($scope, $location, $rootScope, server,ngDialog) {

    $rootScope.myPosition = false;
    $scope.placeholders = "请输入手机号"
    $scope.loginName = "用户登录"
    $scope.f1 = 'f1'
    $scope.f2 = 'f2'
    $scope.f1_img = "../images/form-pic01.png"
    $scope.f2_img = "../images/form-pic02.png"
    $scope.status = "normal"
    $(".body-style").css("background-color", "#fff");

    /**
     * getData 登录对象选择
     * value
     * 0       普通用户
     * 1       理财师
     * 2       分析师
     * @type {$scope.getValue}
     */
    var data
    var getData = $scope.getValue = function (value) {
        data = value
        if (value == 0) {
            $scope.placeholders = "请输入手机号"
            $scope.loginName = "用户登录"
            $scope.f1 = 'f1'
            $scope.f2 = 'f2'
            $scope.f1_img = "../images/form-pic01.png"
            $scope.f2_img = "../images/form-pic02.png"
            $scope.exist = true
            data = value
        } else if (value == 1) {
            $scope.placeholders = "请输入身份证"
            $scope.loginName = "老师登录"
            $scope.f1 = 'f4'
            $scope.f2 = 'f2'
            $scope.f1_img = "../images/form-pic05.svg"
            $scope.f2_img = "../images/form-pic02.png"
            data = value

        } else if (value == 2) {
            $scope.placeholders = "请输入身份证"
            $scope.loginName = "分析师登录"
            $scope.f1 = 'f4'
            $scope.f2 = 'f2'
            $scope.f1_img = "../images/form-pic05.svg"
            $scope.f2_img = "../images/form-pic02.png"
            data = value
        }
        return data
    }
    $scope.login = function () {
        var status = $('input[name="status"]:checked').val()
        if(status==null){
            $scope.error='请选择登录身份'
        }
        var name = $scope.name
        var lgh = name.length
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        var card = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
        var next = function () {
            var data = [$scope.name, $scope.password]

            server.login(data).then(function () {
                server.emitLogin({
                    userName: $scope.name,
                    pwd: $scope.password
                })
                switch ($rootScope.me.level) {
                    case "0":
                        $rootScope.init_name = '我的理财师'
                        break
                    default:
                        $rootScope.init_name = '我的客户'
                        break
                }
                $scope.error=''
                // $location.path('/info')
                $location.path('/rooms')
            }, function () {
                console.log('error')
                $scope.error='用户名或密码错误'
                $scope.status = true
                $location.path('/login')
            })

        }
        switch (status) {
            case "normal":
                if (!myreg.test(name)) {
                    alert('请输入合法的手机号')
                } else {
                    next()
                }
                break
            case "analyst":
                if (!card.test(name)) {
                    alert("请输入正确的身份证号")
                } else {
                    next()
                }
                break
            case "saleMan":
                if (!card.test(name)) {
                    alert("请输入正确的身份证号")
                } else {
                    next()
                }
                break
            default:
                break
        }
    }
    $scope.back = function () {
        $location.path('/info')
    }
}])
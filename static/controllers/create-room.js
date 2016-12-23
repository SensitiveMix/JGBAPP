/**
 * Created by sunNode on 16/8/9.
 */
angular.module('techNodeApp').controller('createRoomCtrl', ['$scope', '$q', '$location', '$rootScope', 'server', 'fileReader', '$upload', 'ngDialog', function ($scope, $q, $location, $rootScope, server, fileReader, $upload, ngDialog) {

    //返回
    $scope.back = function () {
      $location.path('/rooms')
      $rootScope.myPosition = false;
      $rootScope.my_footer = true;
    }
    $rootScope.myPosition = false;
    $rootScope.my_footer = false;

    /**
     * 文件上传
     * @param files
     */

    $rootScope.value = '4'
    $(".body-style").css("background-color", "#fff");

    $scope.imageSrc = "  ../images/salong-pic01.png"
    $scope.onFileSelect = function (files) {
        var fileIn = files[0];

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            $scope.upload = $upload.upload({
                url: 'server/upload/url', //upload.php script, node.js route, or servlet url
                method: 'POST',
                headers: {'header-key': 'header-value'},
                //withCredentials: true,
                // data: {myObj: $scope.myModelObj},
                file: file, // or list of files ($files) for html5 only
                fileName: 'doc.jpg'
                // to modify the name of the file(s)
                // customize file formData name ('Content-Disposition'), server side file variable name.
                //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                //formDataAppender: function(formData, key, val){}
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            });
            //.error(...)
            //.then(success, error, progress);
            // access or attach event listeners to the underlying XMLHttpRequest.
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        }

        var img = new Image();
        var fileType = fileIn.name.substring(fileIn.name.lastIndexOf(".") + 1, fileIn.name.length);
        if (fileIn.size > 5242880) {//单位是B，此处不允许超过5M
            alert("图片不能超过5M")
            return;
        }
        if (fileType == 'JPG' || fileType == 'PNG' || fileType == 'JPEG ' || fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {


        } else {
            alert("图片格式只支持:JPG,PNG,JPEG")
            return;
        }


        fileReader.readAsDataUrl(fileIn, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
                console.log(img.width);
            });
    }

    var data

    /**
     * 获取房间类别
     * @param value
     * @returns {*}
     */
    $scope.getRoom = function (value) {
        if (value == "贵金属") {
            $scope.metal = 'on'
            $scope.card = ''
            data = "贵金属"
        } else {
            $scope.card = 'on'
            $scope.metal = ''
            data = "邮币卡"
        }
        return data
    }

    /**
     * 添加房间
     */
    $scope.create = function () {
        server.createRoom({
            name: $scope.name,
            creator_id: $scope.me._id,
            creator_name: $scope.me.nick_name,
            creator_avatarUrl: $('#logoimg1')[0].src,
            intro: $scope.intro,
            status: data,
            online: true
        })

        $location.path('/rooms')
    }
    
    $scope.uploadLogo=function () {
        var formData = new FormData($("#form-signin1")[0]);
        $.ajax({
            url: '/api/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $("#logoimg1").attr("src", data);
            },
            error: function (returndata) {
                alert('上传失败，请检查文件后缀名是否正确！');
            }
        });
    }
    
    $scope.doUpload=function () {
        ngDialog.open({
            template: 'templateId.html',
            className: 'ngdialog-theme-default',
            controller: 'createRoomCtrl'
        });
    }
}])
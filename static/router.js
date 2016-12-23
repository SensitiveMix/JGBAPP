angular.module('techNodeApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
  when('/rooms', {
    templateUrl: '/pages/rooms.html',
    controller: 'RoomsCtrl'
  }).when('/createRoom', {
             templateUrl: '/pages/createRoom.html',
             controller: 'createRoomCtrl'
  }).
  when('/rooms/:_roomId', {
    templateUrl: '/pages/room.html',
    controller: 'RoomCtrl'
  }).
  when('/analystRoom',{
     templateUrl:'/pages/analystRoom.html',
     controller:'AnalystCtrl'
  }).
   when('/analystRoom/:userId',{
      templateUrl:'/pages/analystChatRoom.html',
      controller:'AnalystChatRoomCtrl'
   }).
  when('/customerRoom',{
      templateUrl:'/pages/customerRoom.html',
      controller:'CustomerCtrl'
  }).
  when('/customerRoom/:_statusId',{
      templateUrl:'/pages/customerChatRoom.html',
      controller:'CustomerChatRoomCtrl'
   }).
  when('/login', {
    templateUrl: '/pages/login.html',
    controller: 'LoginCtrl'
  }).
  when('/',{
    templateUrl: '/pages/homePage.html',
    controller: 'HomeCtrl'
      }).
  when('/info',{
    templateUrl: '/pages/info.html',
    controller: 'infoCtrl'
  }
  ).
  when('/price',{
      templateUrl: '/pages/price.html',
      controller: 'priceCtrl'
    }
    ).
    when('/ring',{
        templateUrl: '/pages/ring.html',
        controller: 'ringCtrl'
      }
      ).
  when('/register',{
          templateUrl: '/pages/register.html',
          controller: 'registerCtrl'
      }
  ).when('/bindingCP', {
          templateUrl: '/pages/binding_CP.html',
          controller: 'bindingCPCtrl'
      }
  ).when('/bindingOver', {
          templateUrl: '/pages/binding_over.html',
          controller: 'bindingOverCtrl'
      }
  ).when('/bindingAT/:productID', {
          templateUrl: '/pages/binding_AT.html',
          controller: 'bindingATCtrl'
      }
  ).when('/bindingNum/:productStatus', {
          templateUrl: '/pages/binding_number.html',
          controller: 'bindingNumCtrl'
      }
  ).when('/change', {
          templateUrl: '/pages/changePassword.html',
          controller: 'changePwdCtrl'
      }
  ).
  otherwise({
    redirectTo: '/login'
  })
}])

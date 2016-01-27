angular.module('chartApp', [
  'chart.js',
  'btford.socket-io',
  'ui.router'
])

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '/templates/home.html'
      })
      .state('guide', {
        url: '/guide',
        templateUrl: '/templates/guide.html'
      })
      .state('members', {
        url: '/members',
        templateUrl: '/templates/members.html'
      })
      .state('attackRanking', {
        url: '/attackRanking',
        templateUrl: '/templates/attackRanking.html'
      })
      .state('troops', {
        url: '/troops',
        templateUrl: '/templates/troops.html'
      })
      .state('activityRecord', {
        url: '/activityRecord',
        templateUrl: '/templates/activityRecord.html'
      })
      .state('trophyRecord', {
        url: '/trophyRecord',
        templateUrl: '/templates/trophyRecord.html'
      })
      .state('clanwars', {
        url: '/clanwars',
        templateUrl: '/templates/clanwars.html'
      })
  })


  .controller('mainCtrl', function ($scope, Socket) {
    Socket.connect();

    Socket.on('hello', function (data) {
      console.log(data.msg);
      Socket.emit('hello', "hello from client");
    });
  })

  .controller('chartCtrl', function ($scope, Socket) {
    Socket.emit('initRequest', {});

    Socket.on('initResponse', function (response) {
      $scope.labels = response.labels;
      $scope.data = response.data;
    });

    Socket.on('vote', function (data) {
      $scope.data = data.votes;
    });

    $scope.vote = function(label){
      Socket.emit('vote', {vote: label});
    };

    $scope.reset = function(){
      Socket.emit('reset', {});
    };
  });

var myApp = angular.module('myAngularJSApp', ['ngMessages', 'ngResource', 'ngRoute']);




myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            requireLogin: false
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController',
            requireLogin: false
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController',
            requireLogin: true
        })
        .when('/second/:num', {
            templateUrl: 'pages/second.html',
            controller: 'secondController',
            requireLogin: true
        });
}]);

myApp.service('nameService', function() {
    var self = this;
    
    self.name = "Donato Baonguis";
    self.nameLength = function() {
        return self.name.length;
    };
});



myApp.controller('homeController', ['$scope', '$timeout', '$log', '$filter', '$resource', '$http', 'nameService', function($scope, $timeout, $log, $filter, $resource, $http, nameService) {
    
    $scope.handle = '';
    $scope.characters = 5;
    $scope.rules = [
        {rulename: "Must be 5 characters"},
        {rulename: "Must be unique"},
        {rulename: "Must be cool"}
    ];
    $scope.name = 'WTF!';
    $scope.partners = [];

    $scope.alertClick = function() {
        alert('Clicked from AngularJS!');
    };

    $scope.getLowerCaseHandle = function() {
        return $filter('lowercase')($scope.handle);
    };

    $http.get('http://localhost:8080/partner/list')
        .then(function successCallback(response) {
            $scope.partners = response.data;
            $log.info( $scope.partners );
        }, function errorCallback(response) {
            $log.info( response.status );
        });
        /*.success(function(result) {
            $scope.partners = result;
        })
        .error(function(data, status) {
            $log.error(data);
        });
        */

    $scope.savePartner = function() {
        var partner = {
            'id' : $scope.partner_id,
            'description': $scope.partner_description
        };

        $http.post('http://localhost:8080/partner/add', partner)
            .then(function successCallback(response) {
                $log.info(response);
            }, function errorCallback(response) {
                $log.info(response);
            });
    };

    
    $scope.serviceName = nameService.name;
    $scope.serviceNameLength = nameService.nameLength();
    $scope.$watch('serviceName', function() {
        nameService.name = $scope.serviceName;
    });
    
    $log.info($scope.rules);
    
    
}]);

myApp.controller('loginController', ['$scope', '$log', '$resource', '$http', '$routeParams', 'nameService', function($scope, $log, $resource, $http, $routeParams, nameService) {
    
}]);


myApp.controller('secondController', ['$scope', '$log', '$resource', '$http', '$routeParams', 'nameService', function($scope, $log, $resource, $http, $routeParams, nameService) {
    $scope.name = 'Second!'
    $scope.num = $routeParams.num;
    
    $scope.serviceName = nameService.name;
    $scope.serviceNameLength = nameService.nameLength();
    $scope.$watch('serviceName', function() {
        nameService.name = $scope.serviceName;
    });
}]);
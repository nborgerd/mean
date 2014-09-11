'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.menus = [];
    
    $http.get('/menu')
    .then(function(result) {
        $scope.menus = result.data;
    });

  // $(document).ready(function() {});
    $scope.isCollapsed = false;
}]);
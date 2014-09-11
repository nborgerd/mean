'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.users').factory('Users', ['$resource', function($resource) {
    return $resource('users/all/:userId', {
    	user: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
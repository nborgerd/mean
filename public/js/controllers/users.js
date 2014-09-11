'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', '$modal', function ($scope, $stateParams, $location, Global, Users, $modal) {
    $scope.global = Global;
    $scope.selectedUser = null;
    $scope.sortField = undefined;
    $scope.reverse = false;
   
    $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            user: function () {
              return $scope.selectedUser;
            }
          }
        });

        modalInstance.result.then(function (action) {
        	switch (action) 
        	{
        	case "save":
        		$scope.alert = true;
        		$scope.find();
   			    break;
        	case "remove":
        		$scope.alert = true;
        	 	$scope.find();
   			    break;
        	case "cancel":
        	//	$scope.alert = true;
        	 	$scope.find();
        	 	break;
        	}
        	 
			 $scope.selectedUser = null;
			 
        }, function () {
    //      $log.info('Modal dismissed at: ' + new Date());
        });
      };

    $scope.sort = function (fieldName){
		if ($scope.sortField === fieldName)
		{
			 $scope.reverse = !$scope.reverse;
		 }
		 else
		 {
			 $scope.sortField = fieldName;
			 $scope.reverse = false;
		 }
    };
    
    $scope.isSortUp = function (fieldName)
    {
	  return $scope.sortField === fieldName && !$scope.reverse;
    };
    
    $scope.isSortDown = function (fieldName)
    {
  	  return $scope.sortField === fieldName && $scope.reverse;
    };
    
    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });
    };
    
    $scope.selectUser = function(user) 
	{
	  $scope.selectedUser = user;
	  $scope.alert = false;
	  $scope.open('lg');
	};
	
	$scope.isSelected = function(user) 
	{
		return $scope.selectedUser === user;
	};
	    
    $scope.kill = function() {
    	$scope.alert = false;
     };

}]).controller('ModalInstanceCtrl', function ($scope, $modalInstance, user) {

	  $scope.selectedUser = angular.copy(user);
	
	  $scope.save = function () {
	//	  var user = $scope.selectedUser;
			if (confirm('Are you sure you want to save this user?')) {
				var user = $scope.selectedUser;
				user.$update(function(response) {
				    $scope.alert = true;
				    $scope.selectedUser = null;
				    });
	    	} 
			else
		    {
				$scope.selectedUser = null;
		    }
	     $modalInstance.close("save");
	  };
	  $scope.remove = function() {

	    	if (confirm('Are you sure you want to delete this user?')) {
	    		user = $scope.selectedUser;
	        	user.$remove();
	    	} 
	    	
	        $modalInstance.close("remove");
	  };
	  $scope.cancel = function () {
		  $modalInstance.close("cancel");
	//      $modalInstance.dismiss('cancel');
	  };
});

/*Old Code Examples located in the UsersControll
/*	$scope.save = function() {
var user = $scope.selectedUser;
if (confirm('Are you sure you want to save this user?')) {
	user.$update(function(response) {
	    $scope.alert = true;
	    $scope.selectedUser = null;
	    });
}  

}; */

/*  $scope.remove = function() {

if (confirm('Are you sure you want to delete this user?')) {
	user = $scope.selectedUser;
	user.$remove();
	$scope.find(); 
	$scope.selectedUser = null;
}  
}; */
/* $scope.cancel = function() {

$scope.selectedUser = null;
$location.path('users/all');
}; */

/* var ModalInstanceCtrl = function ($scope, $modalInstance, user) {

$scope.selectedUser = user;

$scope.save = function () {
	  var user = $scope.selectedUser;
		if (confirm('Are you sure you want to save this user?')) {
			user.$update(function(response) {
			    $scope.alert = true;
			    $scope.selectedUser = null;
			    });
  	}  
   $modalInstance.close("save");
};
$scope.remove = function() {

  	if (confirm('Are you sure you want to delete this user?')) {
  		user = $scope.selectedUser;
      	user.$remove();
  	}  
      $modalInstance.close("remove");
};
$scope.cancel = function () {
    $modalInstance.dismiss('cancel');
};
};  */
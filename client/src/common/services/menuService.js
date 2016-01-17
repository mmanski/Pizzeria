(function () {
	'use strict';

	function menuService($resource, $q) {
		return {
			getMenu: function () {
				var deferred=$q.defer();
				$resource('/menu', {}, {'get': {method: 'GET', isArray: true}}).get().$promise.then(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		};
	}

	angular.module('common.services.menu', ['ngResource'])
			.factory('menuService', menuService);
})();

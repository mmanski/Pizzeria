(function () {
	'use strict';

	function orderService($resource, $q) {
		return {
			postOrder: function (reqBody) {
				var deferred=$q.defer();
				$resource('/order', {}, {'save': {method: 'POST'}}).save(reqBody).$promise.then(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			getOrderInfo: function(id) {
				var deferred=$q.defer();
				$resource('/order/'+id, {}, {'get': {method: 'GET'}}).get().$promise.then(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
			
		};
	}

	angular.module('common.services.order', ['ngResource'])
			.factory('orderService', orderService);
})();

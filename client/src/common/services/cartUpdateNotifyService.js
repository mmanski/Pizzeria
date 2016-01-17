(function () {
	'use strict';

	function cartNotifyService($rootScope) {
		return {
			subscribe: function (scope, callback) {
				var handler = $rootScope.$on('cart-changed-event', callback);
				scope.$on('$destroy', handler);
			},
			notify: function () {
				$rootScope.$emit('cart-changed-event');
			}
		};
	}

	angular.module('common.services.notify.cart', [])
			.factory('cartNotifyService', cartNotifyService);
})();
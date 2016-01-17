(function () {
	'use strict';
	
	function config($stateProvider) {
		$stateProvider
				.state('root.order', {
					url: '/',
					views: {
						'@': {
							templateUrl: 'src/app/order/order.tpl.html',
							controller: 'OrderController'
						}
					}
				});
	}

	function OrderCtrl($scope, cartService, orderService, $state, cartNotifyService) {
		$scope.order = function () {
			var reqBody = JSON.stringify(cartService.getProducts());
			orderService.postOrder(reqBody).then(function (data) {
				cartService.clearCart();
				cartNotifyService.notify();
				$state.go('root.order.details', {id: data.id});
			});
		};
	}

	angular.module('order', [])
			.config(config)
			.controller('OrderController', OrderCtrl);
})();

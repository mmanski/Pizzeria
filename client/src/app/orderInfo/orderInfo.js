(function () {
	'use strict';

	function config($stateProvider) {
		$stateProvider
				.state('root.order.details', {
					url: 'order/:id',
					views: {
						'@': {
							templateUrl: 'src/app/orderInfo/orderInfo.tpl.html',
							controller: 'OrderDetailsController'
						}
					}
				});
	}

	function OrderDetailsCtrl($scope, cartService, orderService, $state, $interval) {
		$scope.estimated = {};
		$scope.timeLeft = {};
		orderService.getOrderInfo($state.params.id).then(function (data) {
			$scope.estimated = new Date(data.estimated);
		});

		$interval(function () {
			var now = new Date();
			var hoursLeft = $scope.estimated.getHours() - now.getHours();
			var minutesLeft = $scope.estimated.getMinutes() - now.getMinutes();
			if (minutesLeft > 0 || hoursLeft > 0) {
				if (isNaN(hoursLeft) || hoursLeft <= 0) {
					$scope.status = 'Twoje jedzonko będzie u Ciebie za ' + minutesLeft + ' minut!';
				} else {
					$scope.status = 'Twoje jedzonko będzie u Ciebie za ' + -hoursLeft + ' godz. i ' + minutesLeft + ' minut!';
				}
			} else {
				$scope.status = 'Dostarczono !';
			}
		}, 1000);
	}
	angular.module('orderDetails', [])
			.config(config)
			.controller('OrderDetailsController', OrderDetailsCtrl);
})();

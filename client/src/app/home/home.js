(function () {
	'use strict';

	function config($stateProvider) {
		$stateProvider
				.state('root.home', {
					url: '/',
					views: {
						'@': {
							templateUrl: 'src/app/home/home.tpl.html',
							controller: 'HomeCtrl',
						}
					}
				});
	}

	function HomeCtrl($scope, ngDialog, menuService, cartService, cartNotifyService) {
		menuService.getMenu().then(function (data) {
			$scope.menu = data;
		});

		$scope.cart = {};
		$scope.cart.quantity = 1;

		$scope.itemsAddedToCart = [];
		$scope.selectedItem;

		$scope.recalculatePrice = function () {
			$scope.price = ($scope.selectedItem.price * ($scope.cart.quantity || 1)).toFixed(2);
		};


		$scope.addToCart = function (item) {
			$scope.selectedItem = item;
			$scope.price = item.price.toFixed(2);
			ngDialog.open({template: 'src/app/home/cart/addToCart.tpl.html', className: 'ngdialog-theme-default', scope: $scope});
		};

		$scope.addItemsToCart = function () {
			var items = [];
			$scope.selectedItem.quantity = $scope.cart.quantity;
			items.push(JSON.parse(JSON.stringify($scope.selectedItem)));
			var result = cartService.addProducts(items);
			if (result.status === "Error") {
				this.cartAdditionForm.quantity.$error.max = {};
				this.cartAdditionForm.quantity.$error.max.message = result.message;
			} else {
				cartNotifyService.notify();
				ngDialog.close();
				$scope.cart.quantity = 1;
			}
		};


	}

	angular.module('home', [])
			.config(config)
			.controller('HomeCtrl', HomeCtrl);


})();

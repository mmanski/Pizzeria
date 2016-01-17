(function () {
	'use strict';

	function headerCtrl($scope, cartService, cartNotifyService, ngDialog, $state) {
		$scope.cart = {};

		$scope.update = function () {
			var itemsQuantity = 0;
			cartService.getProducts().forEach(function (item) {
				itemsQuantity += item.quantity;
			});
			if (itemsQuantity >= 0) {
				$scope.items = itemsQuantity;
				$scope.price = cartService.getPrice() || 0;
				$scope.cart.price = cartService.getPrice();
				$scope.cart.spaceLeft = (cartService.getMaximumCartItemsQuantity() - cartService.getCartItemsQuantity()) > 0
						? cartService.getMaximumCartItemsQuantity() - cartService.getCartItemsQuantity()
						: 0;
			}
			$scope.cart.items = cartService.getProducts();
			$scope.cart.quantity = $scope.items;
			$scope.cart.price = cartService.getPrice() || 0;
		};

		$scope.update();




		cartNotifyService.subscribe($scope, function cartChanged() {
			$scope.update();
		});

		$scope.delete = function (item) {
			cartService.removeProduct(item);
			$scope.update();
		};

		$scope.openCart = function () {
			ngDialog.open({template: 'src/app/home/cart/cartView.tpl.html', className: 'ngdialog-theme-default', scope: $scope});
		};

		$scope.order = function () {
			ngDialog.close();
			$state.go('root.order');
		};



	}

	angular.module('common.header', [])
			.controller('HeaderCtrl', headerCtrl);
})();

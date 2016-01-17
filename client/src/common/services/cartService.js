(function () {
	'use strict';
	function cartService() {
		var cartItems = [];
		var maxOrderQuantity = 20;
		var cartItemsQuantity = 0;

		var calculatePrice = function () {
			var currentPrice = 0.0;
			var currentQuantity = 0;
			cartItems.forEach(function (product) {
				currentPrice += product.quantity * product.price;
				currentQuantity += product.quantity;
			});

			cartItemsQuantity = currentQuantity;
			return currentPrice;
		};

		return {
			addProducts: function (products) {
				var cartOperation = {};
				var productsQuantity = 0;
				products.forEach(function (item) {
					productsQuantity += item.quantity;
				});
				if (productsQuantity + cartItemsQuantity > maxOrderQuantity) {
					cartOperation.status = "Error";
					cartOperation.message = "Zbyt dużo elementów w koszyku. W celu złożenia dużego zamówienia, prosimy skontaktować się telefonicznie";
				} else {
					for (var i = 0; i < products.length; i++) {
						var currentProductQuantity = products[i].quantity;
						var overallQuantity = currentProductQuantity;
						for (var j = 0; j < cartItems.length; j++) {
							if (cartItems[j].id === products[i].id) {
								overallQuantity = currentProductQuantity + cartItems[j].quantity;
								cartItems[j].quantity = JSON.parse(JSON.stringify(overallQuantity));
							}
						}
						if (currentProductQuantity === overallQuantity) {
							cartItems.push(products[i]);
						}
					}
					calculatePrice();
				}
				return cartOperation;
			},
			getProducts: function () {
				return cartItems;
			},
			clearCart: function () {
				cartItems = [];
			},
			getPrice: function () {
				return calculatePrice().toFixed(2);
			},
			removeProduct: function (item) {
				var index = cartItems.indexOf(item);
				if (index >= 0) {
					cartItems.splice(index, 1);
				}
			},
			getCartItemsQuantity: function () {
				return cartItemsQuantity;
			},
			getMaximumCartItemsQuantity: function () {
				return maxOrderQuantity;
			}

		};
	}

	angular.module('common.services.cart', [])
			.factory('cartService', cartService);
})();

(function () {
	'use strict';

	angular.element(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});

	function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/');
		$logProvider.debugEnabled(true);
		$httpProvider.interceptors.push('httpInterceptor');
		$stateProvider
				.state('root', {
					views: {
						'header': {
							templateUrl: 'src/common/header.tpl.html',
							controller: 'HeaderCtrl'
						},
						'footer': {
							templateUrl: 'src/common/footer.tpl.html',
							controller: 'FooterCtrl'
						}
					}
				});
	}

	function MainCtrl($log) {
		$log.debug('MainCtrl laoded!');
	}

	function run($log) {
		$log.debug('App is running!');
	}

	angular.module('app', [
		'ui.router',
		'home',
		'order',
		'orderDetails',
		'common.header',
		'common.footer',
		'common.services.menu',
		'common.services.order',
		'common.services.cart',
		'common.filters.uppercase',
		'common.interceptors.http',
		'common.services.notify.cart',
		'templates',
		'ngResource',
		'ngDialog'
	])
			.config(config)
			.run(run)
			.controller('MainCtrl', MainCtrl)
			.value('version', '1.1.0');
})();

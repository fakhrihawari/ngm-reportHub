/**
 * @ngdoc overview
 * @name ngmReportHubApp
 * @description
 * # ngmReportHubApp
 *
 * Main module of the application.
 */
angular
	.module('ngmIMO', [
	])
	.config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {



		// https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476#.ufea9sjt1
		$compileProvider.debugInfoEnabled(false)

		// app routes with access rights
		$routeProvider
			// iMMAP
			.when('/immap/reporting', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoHomeCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/login', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardLoginCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAnonymous();
					}],
				}
			})
			// MY DASHBOARD
			.when('/immap/reporting/dashboard', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoDashboardCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// MY DASHBOARD other user
			.when('/immap/reporting/dashboard/:username', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoDashboardCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// MY PROFILE
			.when('/immap/reporting/profile', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoProfileCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// MY PROFILE other user
			.when('/immap/reporting/profile/:username', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoProfileCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/team/license', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoTeamLicenseCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/license', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoLicenseCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/license/:username', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoLicenseCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/report', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoReportListCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/report/:report_id', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoReportCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
			// project list
			.when('/immap/reporting/dashboard-team', {
				redirectTo: '/immap/reporting/dashboard-team/all/all/all/all/all/2018-01-01/' + moment().format('YYYY-MM-DD')
			})
			.when('/immap/reporting/dashboard-team/:admin0pcode/:project/:product_sector_id/:product_type_id/:email/:start_date/:end_date', {
				reloadOnSearch: false,
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoTeamDashboardCtrl',
				resolve: {
					access: ['ngmAuth', function (ngmAuth) {
						return ngmAuth.isAuthenticated();
					}],
				}
			})
	}]);

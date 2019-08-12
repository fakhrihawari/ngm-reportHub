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
		this.page = {
			start_date: function () {
				var date;
				if (moment.utc().date() <= 20) {
					date = moment.utc().startOf('M').subtract(1, 'M').format('YYYY-MM-DD')
				} else {
					date = moment.utc().startOf('M').format('YYYY-MM-DD');
				}
				return date;
			},
			end_date: function () {
				var date;
				if (moment.utc().date() <= 20) {
					date = moment.utc().endOf('M').subtract(1, 'M').format('YYYY-MM-DD')
				} else {
					date = moment.utc().endOf('M').format('YYYY-MM-DD');
				}
				return date;
			},
		}
		// app routes with access rights
		$routeProvider
			// iMMAP
			.when('/immap/reporting', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoHomeCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/register', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoRegisterCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAnonymous();
					}],
				}
			})
			.when('/immap/reporting/login', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoLoginCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAnonymous();
					}],
				}
			})
			.when('/immap/reporting/activation', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoActivationCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAnonymous();
					}],
				}
			})
			// MY DASHBOARD
			.when('/immap/reporting/dashboard', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoDashboardCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			// MY DASHBOARD other user
			.when('/immap/reporting/dashboard/:username', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoDashboardCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			// MY PROFILE
			.when('/immap/reporting/profile', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoProfileCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			// MY PROFILE other user
			.when('/immap/reporting/profile/:username', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoProfileCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/team',{
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoTeamCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/team/license', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoTeamLicenseCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/license', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoLicenseCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/license/:username', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoLicenseCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/report', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoReportListCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/report/:report_id', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoReportCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			// project list
			.when('/immap/reporting/dashboard-team', {
				// redirectTo: '/immap/reporting/dashboard-team/all/all/all/all/all/2018-01-01/' + moment().format('YYYY-MM-DD')
				redirectTo: '/immap/reporting/dashboard-team/all/all/all/all/all/all/' + this.page.start_date() + '/' + this.page.end_date()
			})
			// .when('/immap/reporting/dashboard-team/:admin0pcode/:project/:product_sector_id/:product_type_id/:email/:start_date/:end_date', {
			.when('/immap/reporting/dashboard-team/:sector/:area/:type/:partner/:person_user/:email/:start_date/:end_date', {
				reloadOnSearch: false,
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoTeamDashboardCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
			.when('/immap/reporting/dashboard-team/:sector/:area/:type/:partner/:person_user/:email/:start_date/:end_date/:sub_area', {
				reloadOnSearch: false,
				templateUrl: '/views/app/dashboard.html',
				controller: 'ImoTeamDashboardCtrl',
				resolve: {
					access: ['ngmImoAuth', function (ngmImoAuth) {
						return ngmImoAuth.isAuthenticated();
					}],
				}
			})
	}]);

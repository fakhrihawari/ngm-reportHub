/**
 * @ngdoc function
 * @name ngmReportHubApp.ImoHomeCtrl
 * @description
 * # DashboardEthAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoHomeCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, $translate, $filter) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		// report object
		$scope.imo = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),

			// init()
			init: function () {

				// report dashboard model
				$scope.model = {
					name: 'immap_home',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.imo.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.imo.ngm.style.defaultPrimaryColor,
							title: 'iMMAP | ' + $scope.imo.user.admin0name
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							title: $filter('translate')('please_select_from_the_options_below')
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'white grey-text text-darken-2',
								style: 'padding: 0px;',
								config: {
									user: $scope.imo.user,
									templateUrl: '/scripts/modules/imo-immap/views/imo.home.html',
								}
							}]
						}]
					}, {
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'card-panel',
								style: 'padding:0px; height: 90px; padding-top:10px;',
								config: {
									html: $scope.imo.ngm.footer
								}
							}]
						}]
					}]
				}

				// assign to ngm app scope
				$scope.imo.ngm.dashboard.model = $scope.model;
			}

		}

		// set page
		$scope.imo.init();

	}]);

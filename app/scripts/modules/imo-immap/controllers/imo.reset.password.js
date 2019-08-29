/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:DashboardLoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoResetCtrl', ['$scope', '$route', '$translate', function ($scope, $route, $translate) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// assign to ngm app scope
		$scope.model = $scope.$parent.ngm.dashboard.model;

		// login object
		$scope.dashboard = {

			// parent
			ngm: $scope.$parent.ngm,

			// email token for reset
			token: $route.current.params.token ? $route.current.params.token : false

		}

		// padding
		$scope.dashboard.ngm.style.paddingHeight = 20;

		// dews dashboard model
		var model = {
			name: 'imo_reset_password',
			header: {
				div: {
					'class': 'col s12 m12 l12 report-header',
					style: 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
				},
				title: {
					'class': 'col s12 m12 l12 report-title truncate',
					style: 'color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
					title: 'Reset Password'
				},
				subtitle: {
					'class': 'col s12 m12 l12 report-subtitle',
					html: true,
					title: 'Complete below<span class="hide-on-small-only"> to reset your password',
				}
			},
			rows: [{
				columns: [{
					styleClass: 's12 m12 l8 offset-l2',
					widgets: [{
						type: 'imo.authentication',
						card: 'card-panel z-depth-2',
						style: 'padding:0px;',
						config: {
							token: $scope.dashboard.token,
							style: $scope.dashboard.ngm.style,
							templateUrl: '/scripts/widgets/ngm-html/template/imo.reset.password.html'
						}
					}]
				}]
			}]
		};

		// assign model to scope
		$scope.model = model;

		// assign to ngm app scope
		$scope.dashboard.ngm.dashboard = $scope.model;

	}]);
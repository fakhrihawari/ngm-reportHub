/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectSummaryCtrl
 * @description
 * # ClusterProjectSummaryCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ClusterSyriaDashboard', ['$scope', '$route', '$http', '$location', 'ngmAuth', 'ngmData', 'ngmUser', function ($scope, $route, $http, $location, ngmAuth, ngmData, ngmUser) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// init empty model
		$scope.model = $scope.$parent.ngm.dashboard.model;

		// report object
		$scope.report = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),

			// set summary
			init: function(){
				
				// report dashboard model
				$scope.model = {
					name: 'cluster_syria_dashboard',
					header: {
						// div: {
						// 	'class': 'col s12 m12 l12'
						// }
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'color: ' + $scope.report.ngm.style.defaultPrimaryColor,
							title: 'SYR | FSAC'
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle truncate hide-on-small-only',
							'title': 'Overview for Syria'
						}
					},
					menu: [{
						'id': 'back-home',
						'icon': 'keyboard_return',
						'title': 'Back Home',
						'class': 'teal lighten-1 white-text',
						'href': '/desk/#/cluster/organization'
					}],
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'white grey-text text-darken-2',
								style: 'padding: 0px;',
								config: {
									project: $scope.report.project,
									user: $scope.report.user,
									templateUrl: '/scripts/modules/cluster/views/cluster.syria.dashboard.html',
								}
							}]
						}]
					},{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'card-panel',
								style: 'padding:0px; height: 90px; padding-top:10px;',
								config: {
									// html: $scope.report.ngm.footer
									templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
									lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
									defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
								}
							}]
						}]
					}]
				};

				// assign to ngm app scope
				$scope.report.ngm.dashboard.model = $scope.model;
				$('.fixed-action-btn').floatingActionButton({ direction: 'left' });

			}

		}

		$scope.report.init();

		// timeout
		setTimeout(function(){
			$('#back-home').on('click', function(){
				console.log('hello')
				$location.path( '/cluster/organization' );
			})
		}, 2000);
		
	}]);
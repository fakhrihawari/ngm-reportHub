/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ImoReportListCtrl
 * @description
 * # ClusterProjectReportsListCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoReportListCtrl', ['$scope', '$route', '$location', '$anchorScroll', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', function ($scope, $route, $location, $anchorScroll, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// init empty model
		$scope.model = $scope.$parent.ngm.dashboard.model;

		// empty Project
		$scope.report = {
			// ngm
			ngm: $scope.$parent.ngm,

			// user
			user: ngmUser.get(),

			init: function () {

				// report dashboard model
				$scope.model = {
					name: 'cluster_project_list',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m9 l9 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.report.ngm.style.defaultPrimaryColor,
							title: 'Monthly Report List',
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							title: 'Monthly Report List'
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'white grey-text text-darken-2',
								style: 'padding: 20px;',
								config: {
									html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="#/immap/reporting"><i class="material-icons left">keyboard_return</i>' + $filter('translate')('back_to_organization') + '</a><a class="waves-effect waves-light btn right" href="' + $scope.report.newProjectUrl + '"><i class="material-icons left">add_circle_outline</i>' + $filter('translate')('add_new_project') + '</a>'
								}
							}]
						}]
					}, {
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'list',
								card: 'white grey-text text-darken-2',
								config: {
									titleIcon: 'alarm_on',
									// color: 'teal lighten-4',
									color: 'blue lighten-1',
									textColor: 'white-text',
									title: $filter('translate')('active_projects'),
									icon: 'edit',
									request: {
										method: 'POST',
										url: 'http://192.168.33.16:80/api/cluster/project/getProjectsList',
										data: {
											filter: {
												organization_id: '56cd8cde0765b9215e67acb7',
												project_status: 'active'
											}
										}
									}
								}
							}]
						}]
					}, {
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'list',
								card: 'white grey-text text-darken-2',
								config: {
									titleIcon: 'done_all',
									// color: 'lime lighten-4',
									color: 'blue lighten-1',
									textColor: 'white-text',
									title: $filter('translate')('completed_projects'),
									icon: 'done',
									request: {
										method: 'POST',
										url: 'http://192.168.33.16:80/api/cluster/project/getProjectsList',
										data: { 
											filter:{
												organization_id: '56cd8cde0765b9215e67acb7',
												project_status: 'complete' 
											}
										}
									}
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
									html: $scope.report.ngm.footer
								}
							}]
						}]
					}]
				};

				// assign to ngm app scope
				$scope.report.ngm.dashboard.model = $scope.model;

			}

		}

		$scope.report.init()
	}]);
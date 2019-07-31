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
			newProjectUrl:'#/immap/reporting/report/new',
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
									html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="#/immap/reporting"><i class="material-icons left">keyboard_return</i>' + 'back to home' + '</a><a class="waves-effect waves-light btn right" href="' + $scope.report.newProjectUrl + '" style="background-color: #be2126"><i class="material-icons left">add_circle_outline</i>' + 'ADD NEW REPORT' + '</a>'
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
									title: 'To Do',
									icon: 'edit',
									templateUrl:'/scripts/widgets/ngm-list/template/imo_report.html',
									request: {
										method: 'POST',
										url: 'http://192.168.33.16:80/api/immap/report/getReportsList',
										data: {
											status:'todo'
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
									title:'Complete',
									icon: 'done',
									templateUrl: '/scripts/widgets/ngm-list/template/imo_report.html',
									request: {
										method: 'POST',
										url: 'http://192.168.33.16:80/api/immap/report/getReportsList',
										data: { 
											status:'complete'
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
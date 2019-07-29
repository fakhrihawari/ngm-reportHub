/**
 * @ngdoc function
 * @name ngmReportHubApp.ImoTeamLicenseCtrl
 * @description
 * # ImmapTeamCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoTeamLicenseCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, $translate, $filter) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		// report object
		$scope.dashboard = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),
			getLicenseRequest: function () {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/getOrganizationIndicator',
					data: {
						indicator: 'list',
						status: 'active',
						admin0pcode: 'all',
						organization_tag: 'immap',
						project: 'all',
						cluster_id: 'all'
					}
				}
			},
			// init()
			init: function () {

				// report dashboard model
				$scope.model = {
					name: 'imo-licence-single',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
							title: 'iMMAP | Team | License'
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							style: 'font-size:20px',
							title: 'All License of The Team'
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12',
							widgets: [{
								type: 'table',
								card: 'panel',
								style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
								config: {
									style: $scope.dashboard.ngm.style,
									headerClass: 'collection-header lighten-2',
									headerStyle: 'background-color:' + $scope.dashboard.ngm.style.defaultPrimaryColor,
									headerText: 'white-text',
									headerIcon: 'done_all',
									headerTitle: 'Active List License',
									templateUrl: '/scripts/modules/imo-immap/views/imo.license-team.html',
									tableOptions: {
										count: 10,
										sorting: { updatedAt: "desc" }
									},
									request: $scope.dashboard.getLicenseRequest(),
								}
							}]
						}]
					},{
							columns: [{
								styleClass: 's12',
								widgets: [{
									type: 'table',
									card: 'panel',
									style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
									config: {
										style: $scope.dashboard.ngm.style,
										headerClass: 'collection-header lighten-2',
										headerStyle: 'background-color:#f0ad4e',
										headerText: 'white-text',
										headerIcon: 'help_outline',
										headerTitle: 'Propose List License',
										templateUrl: '/scripts/modules/imo-immap/views/imo.license-team.html',
										tableOptions: {
											count: 10,
											sorting: { updatedAt: "desc" }
										},
										request: $scope.dashboard.getLicenseRequest(),
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12',
								widgets: [{
									type: 'table',
									card: 'panel',
									style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
									config: {
										style: $scope.dashboard.ngm.style,
										headerClass: 'collection-header lighten-2',
										headerStyle: 'background-color:#d6d6d6',
										headerText: 'white-text',
										headerIcon: 'highlight_off',
										headerTitle: 'Expired List License',
										templateUrl: '/scripts/modules/imo-immap/views/imo.license-team.html',
										tableOptions: {
											count: 10,
											sorting: { updatedAt: "desc" }
										},
										request: $scope.dashboard.getLicenseRequest(),
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
									html: $scope.dashboard.ngm.footer
								}
							}]
						}]
					}]
				}

				// assign to ngm app scope
				$scope.dashboard.ngm.dashboard.model = $scope.model;
			}

		}
		// set page
		$scope.dashboard.init();

	}]);
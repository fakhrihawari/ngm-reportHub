/**
 * @ngdoc function
 * @name ngmReportHubApp.ImoLicenseCtrl
 * @description
 * # ImmapTeamCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoLicenseCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', 'ngmImoAuth', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, $translate, $filter, ngmImoAuth) {
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
			username: $route.current.params.username,
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
			openModal: function (modal) {
				$('#' + modal).openModal({ dismissible: false });
				console.log("MODAL")
			},
			// init()
			init: function (user) {

				// report dashboard model
				$scope.model = {
					name: 'imo-licence-single',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m9 l9 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
							title: 'iMMAP | ' + user.username + ' | License'
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							style: 'font-size:20px',
							title: 'License list '
						},
						download: {
								'class': 'col s12 m3 l3 hide-on-small-only',
								downloads: [{
									type: 'zip',
									color: 'blue lighten-2',
									icon: 'folder',
									hover: 'Download License',
									request: {
										method: 'GET',
										// url: ngmAuth.LOCATION + '/api/getReportDocuments/' + $scope.report.definition.id,
									},
									metrics: {
										method: 'POST',
										url: ngmImoAuth.LOCATION + '/api/metrics/set',
										data: {
											username: $scope.dashboard.user.username,
											email: $scope.dashboard.user.email,
											dashboard: 'license',
											theme: 'cluster_report_documents',
											format: 'zip',
											url: $location.$$path
										}
									}
							}]
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
									html: '<div class="row hide-on-small-only">'
					+ '<div class="col s12 m12 l12">'
					+ '<div>'
					+ '<a class="btn-flat waves-effect waves-teal" href="#/immap/reporting/">'
					+ '<i class="material-icons left">keyboard_return</i> BACK HOME'
					+ '</a>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
								}
							}]
						}]
					},{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'license.form',
								config: {
									style: $scope.dashboard.ngm.style,
									request: {method: 'POST',
														url: ngmImoAuth.LOCATION + '/api/immap/report/getLicenseDummyList'}
								}
							}]
						}]
					},
					// 	{
					// 	columns: [{
					// 		styleClass: 's12',
					// 		widgets: [{
					// 			type: 'table',
					// 			card: 'panel',
					// 			style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
					// 			config: {
					// 				style: $scope.dashboard.ngm.style,
					// 				headerClass: 'collection-header lighten-2',
					// 				headerStyle: 'background-color:' + $scope.dashboard.ngm.style.defaultPrimaryColor,
					// 				headerText: 'white-text',
					// 				headerIcon: 'group',
					// 				headerTitle: 'List License',
					// 				openModal: function(modal){$scope.dashboard.openModal(modal)},
					// 				templateUrl: '/scripts/modules/imo-immap/views/imo.license.html',
					// 				tableOptions: {
					// 					count: 10,
					// 					sorting: { updatedAt: "desc" }
					// 				},
					// 				request: $scope.dashboard.getLicenseRequest(),
					// 			}
					// 		}]
					// 	}]
					// }, 
					{
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
		if ($scope.dashboard.username &&
			($scope.dashboard.username !== $scope.dashboard.user.username)) {

			// get use
			ngmData
				.get({ method: 'GET', url: ngmAuth.LOCATION + '/api/immap/getUserByUsername?username=' + $scope.dashboard.username })
				.then(function (user) {
					// should get from api
					var license = []
					// load with user profile
					$scope.dashboard.init(user);
				});

		} else {			
			$scope.dashboard.init($scope.dashboard.user);
			

		}

	}]);
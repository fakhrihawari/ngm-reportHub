/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectReportCtrl
 * @description
 * # ClusterProjectReportCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoReportCtrl', [
		'$scope',
		'$route',
		'$q',
		'$http',
		'$location',
		'$anchorScroll',
		'$timeout',
		'ngmAuth',
		'ngmData',
		'ngmUser', '$translate', '$filter',
		function ($scope, $route, $q, $http, $location, $anchorScroll, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter) {
			this.awesomeThings = [
				'HTML5 Boilerplate',
				'AngularJS',
				'Karma'
			];

			// init empty model
			$scope.model = $scope.$parent.ngm.dashboard.model;

			// empty Project
			$scope.report = {

				// parent
				ngm: $scope.$parent.ngm,

				// placeholder
				project: {},

				// placeholder
				definition: {},

				// location_group
				location_group: $route.current.params.location_group,

				// current user
				user: ngmUser.get(),

				// report name placeholder (is updated below)
				report: 'monthly_report',

				// get project
				getProject: $http({
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/cluster/project/getProject',
					data: {
						id: '5b84a43aaee28ca23024ca36'
					}
				}),

				// get report
				getReport: $http({
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/cluster/report/getReport',
					data: {
						report_id: '5c01eb22c7eb9d9a24107166',
					}
				}),

				// set project details
				setProjectDetails: function (data) {

					// project
					$scope.report.project = data[0].data;

					// report
					$scope.report.definition = data[1].data;

					// set report for downloads
					$scope.report.report = $scope.report.project.organization + '_' + $scope.report.project.cluster + '_' + $scope.report.project.project_title.replace(/\ /g, '_') + '_extracted-' + moment().format('YYYY-MM-DDTHHmm');

					// add project code to subtitle?
					var text = $filter('translate')('actual_monthly_progress_for') + ' ' + moment.utc($scope.report.definition.reporting_period).format('MMMM, YYYY');

					var subtitle = 'Report Your Monthly Activities'

					// report dashboard model
					$scope.model = {
						name: 'cluster_project_report',
						header: {
							div: {
								'class': 'col s12 m12 l12 report-header',
								style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
							},
							title: {
								'class': 'col s12 m9 l9 report-title truncate',
								style: 'font-size: 3.4rem; color: ' + $scope.report.ngm.style.defaultPrimaryColor,
								title: ' iMMAP | ' + ngmUser.get().admin0name + ' | Monthly Report'
							},
							subtitle: {
								'class': 'col s12 m12 l12 report-subtitle truncate hide-on-small-only',
								'title': subtitle
							},
							// download: {
							// 	'class': 'col s12 m3 l3 hide-on-small-only',
							// 	downloads: [{
							// 		type: 'csv',
							// 		color: 'blue lighten-2',
							// 		icon: 'assignment',
							// 		hover: $filter('translate')('download_monthly_activity_report_as_csv'),
							// 		request: {
							// 			method: 'POST',
							// 			url: ngmAuth.LOCATION + '/api/cluster/report/getReportCsv',
							// 			data: {
							// 				report: $scope.report.report,
							// 				report_type: 'activity',
							// 				report_id: $scope.report.definition.id
							// 			}
							// 		},
							// 		metrics: {
							// 			method: 'POST',
							// 			url: ngmAuth.LOCATION + '/api/metrics/set',
							// 			data: {
							// 				organization: $scope.report.user.organization,
							// 				username: $scope.report.user.username,
							// 				email: $scope.report.user.email,
							// 				dashboard: $scope.report.project.project_title,
							// 				theme: 'cluster_project_report_' + $scope.report.user.cluster_id,
							// 				format: 'csv',
							// 				url: $location.$$path
							// 			}
							// 		}
							// 	}, {
							// 		type: 'zip',
							// 		color: 'blue lighten-2',
							// 		icon: 'folder',
							// 		hover: $filter('translate')('download_all_report_documents'),
							// 		request: {
							// 			method: 'GET',
							// 			url: ngmAuth.LOCATION + '/api/getReportDocuments/' + $scope.report.definition.id,
							// 		},
							// 		metrics: {
							// 			method: 'POST',
							// 			url: ngmAuth.LOCATION + '/api/metrics/set',
							// 			data: {
							// 				organization: $scope.report.user.organization,
							// 				username: $scope.report.user.username,
							// 				email: $scope.report.user.email,
							// 				dashboard: $scope.report.project.project_title,
							// 				theme: 'cluster_report_documents',
							// 				format: 'zip',
							// 				url: $location.$$path
							// 			}
							// 		}
							// 	}]
							// }
						},
						rows: [{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'imo.report',
									config: {
										style: $scope.report.ngm.style,
										project: $scope.report.project,
										report: $scope.report.definition,
										imo_report: $scope.data,
										location_group: $scope.report.location_group
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
										html: $scope.report.ngm.footer
									}
								}]
							}]
						}]
					}

					// hide download 
					const canDownload = ngmAuth.canDo('DASHBOARD_DOWNLOAD', {
						adminRpcode: $scope.report.project.adminRpcode,
						admin0pcode: $scope.report.project.admin0pcode,
						cluster_id: $scope.report.project.cluster_id,
						organization_tag: $scope.report.project.organization_tag
					});
					// remove download button
					if (!canDownload) {
						$scope.model.header.download.class += ' hide';
					}
					// assign to ngm app scope
					$scope.report.ngm.dashboard.model = $scope.model;

				}

			}

			// assign to ngm app scope
			$scope.report.ngm.dashboard.model = $scope.model;
			if($route.current.params.report_id !==  'new'){
				console.log($route.current.params);
				$scope.data = {
					support_partner: [{
						area_activity_id: "01",
						area_activity_name: "Information Management",
						category_id: "01",
						category_name: " Management",
						collab_id: "02",
						collab_name: "CC",
						narative_activity_id: "01",
						narative_activity_name: "Information Management Narative",
						number_products: 10,
						partner: " ORGA",
						partner_id: "02",
						product_id: "01",
						product_name: "Infographic"
					}], planed_activity: [{
						area_activity_id: "01",
						area_activity_name: "Information Management",
						category_id: "01",
						category_name: " Management",
						narative_activity_id: "01",
						narative_activity_name: "Information Management Narative",
						number_products: 10,
						partner: " ORGA",
						partner_id: "02",
						product_id: "01",
						product_name: "Infographic"
					}],
					rating:5,
					notes:'SWAG',
					month_date:'2019-06-21',
					month:'1'
				}
			}else{
				$scope.data = {
					support_partner: [], planed_activity: []
					
				};
			}

			// taost for user

			$timeout(function () { Materialize.toast($filter('translate')('loading_monhtly_progress_report'), 4000, 'success'); }, 400);

			// send request
			$q.all([$scope.report.getProject, $scope.report.getReport]).then(function (results) {

				// remove toast
				$('.toast').remove();

				// assign
				$scope.report.setProjectDetails(results);

			});

		}]);
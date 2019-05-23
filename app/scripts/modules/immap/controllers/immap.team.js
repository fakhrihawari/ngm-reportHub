/**
 * @ngdoc function
 * @name ngmReportHubApp.ImmapTeamCtrl
 * @description
 * # ImmapTeamCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImmapTeamCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, $translate, $filter) {
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
			// dummy
			getRequest: function (obj) {
				var request = {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/cluster/indicator',
					data: {
						adminRpcode: 'hq',
						admin0pcode: 'all',
						admin1pcode: 'all',
						admin2pcode: 'all',
						cluster_id: 'all',
						activity_type_id: 'all',
						organization_tag: 'all',
						beneficiaries: ['all'],
						start_date: moment('2018').format('YYYY-MM-DD'),
						end_date: moment().format('YYYY-MM-DD')
					}
				}

				request.data = angular.merge(request.data, obj);

				return request;
			},
			getTeamRequest:function(){
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
					name: 'immap_home',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'font-size: 3.4rem;font-weight:600; color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
							title: 'iMMAP | ' + $scope.dashboard.user.admin0name +' | iMMAP Team'
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							style: 'font-weight:500; font-size:20px',
							title: 'Check Your Team Member and Team Status'
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
									headerIcon: 'group',
									headerTitle: 'Active',
									templateUrl: '/scripts/modules/immap/views/immap.team.html',
									tableOptions: {
										count: 10,
										sorting: { updatedAt: "desc" }
									},
									request: $scope.dashboard.getTeamRequest(),
								}
							}]
						}]
					},{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'card-panel',
								style: 'padding:0px;',
								config: {
									html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 10px; font-size: 3.0rem; font-weight:300; color: #959595; border-bottom: 3px #A72824 solid;">Partner Based Statistics</h2>'
								}
							}]
						}]
					}, {
							columns: [{
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Area of Activity',
										request: $scope.dashboard.getRequest({ indicator: 'organizations' })
									}
								}]
							}, {
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Supported Partner',
										request: $scope.dashboard.getRequest({ indicator: 'projects' })
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Infographics',
										request: $scope.dashboard.getRequest({ indicator: 'households_population' })
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Dashboard Map',
										request: $scope.dashboard.getRequest({ indicator: 'beneficiaries_population' })
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Maps',
										request: $scope.dashboard.getRequest({ indicator: 'beneficiaries' })
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'World Healt Organization',
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('children'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'children' })
											}]
										}
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'Health Cluster'
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('adult'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'adult' })
											}]
										}
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'OCHA'
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('elderly'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'elderly' })
											}]
										}
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 10px; font-size: 3.0rem; font-weight:300; color: #959595; border-bottom: 3px #A72824 solid;">Area of Activity Based Statistics</h2>'
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Area of Activity',
										request: $scope.dashboard.getRequest({ indicator: 'organizations' })
									}
								}]
							}, {
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Supported Partner',
										request: $scope.dashboard.getRequest({ indicator: 'projects' })
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Infographics',
										request: $scope.dashboard.getRequest({ indicator: 'households_population' })
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Dashboard Map',
										request: $scope.dashboard.getRequest({ indicator: 'beneficiaries_population' })
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Maps',
										request: $scope.dashboard.getRequest({ indicator: 'beneficiaries' })
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'World Healt Organization',
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('children'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'children' })
											}]
										}
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'Health Cluster'
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('adult'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'adult' })
											}]
										}
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'OCHA'
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('elderly'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'elderly' })
											}]
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
									style: 'padding:0px;',
									config: {
										html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 10px; font-size: 3.0rem; font-weight:300; color: #959595; border-bottom: 3px #A72824 solid;">Product Based Statistics</h2>'
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Area of Activity',
										request: $scope.dashboard.getRequest({ indicator: 'organizations' })
									}
								}]
							}, {
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Supported Partner',
										request: $scope.dashboard.getRequest({ indicator: 'projects' })
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Infographics',
										request: $scope.dashboard.getRequest({ indicator: 'households_population' })
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Dashboard Map',
										request: $scope.dashboard.getRequest({ indicator: 'beneficiaries_population' })
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: 'Maps',
										request: $scope.dashboard.getRequest({ indicator: 'beneficiaries' })
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'World Healt Organization',
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('children'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'children' })
											}]
										}
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'Health Cluster'
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('adult'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'adult' })
											}]
										}
									}
								}]
							}, {
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: 'OCHA'
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0, 0, 0, 0],
													spacing: [0, 0, 0, 0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
												text: '',
												margin: 0
											},
											plotOptions: {
												pie: {
													shadow: false
												}
											},
											series: [{
												name: $filter('translate')('elderly'),
												size: '100%',
												innerSize: '80%',
												showInLegend: false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'elderly' })
											}]
										}
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

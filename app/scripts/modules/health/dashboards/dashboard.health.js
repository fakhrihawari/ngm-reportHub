/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:DashboardDewsCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('DashboardHealthProjectsCtrl', ['$scope', '$http', '$location', '$route', '$window', '$timeout', 'ngmUser', 'ngmModal', 
		function ($scope, $http, $location, $route, $window, $timeout, ngmUser, ngmModal) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// create dews object
		$scope.dashboard = {
			
			// parent
			ngm: $scope.$parent.ngm,
			
			// current user
			user: ngmUser.get(),
			
			// report start
			// startDate: moment($route.current.params.start).format('YYYY-MM-DD'),

			// report end
			// endDate: moment($route.current.params.end).format('YYYY-MM-DD'),
			
			// current report
			report: 'report' + $location.$$path.replace(/\//g, '_') + '-extracted-' + moment().format('YYYY-MM-DDTHH'),

		}

		// set dashboard params
		$scope.dashboard.title = 'Health Cluster 3W';
		$scope.dashboard.subtitle = 'Health Cluster 3W dashboard for all health projects in Afghanistan';

		// dews dashboard model
		$scope.model = {
			name: 'health_3w_dews_dashboard',
			header: {
				div: {
					'class': 'col s12 m12 l12 report-header',
					'style': 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
				},
				title: {
					'class': 'col s12 m8 l8 report-title',
					'style': 'color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
					'title': $scope.dashboard.title,
				},
				subtitle: {
					'class': 'col hide-on-small-only m8 l9 report-subtitle',
					'title': $scope.dashboard.subtitle,
				},
				download: {
					'class': 'col s12 m4 l4 hide-on-small-only',
					downloads: [{
						type: 'pdf',
						color: 'blue lighten-1',
						icon: 'picture_as_pdf',
						hover: 'Download Report as PDF',
						request: {
							method: 'POST',
							url: 'http://' + $location.host() + '/api/print',
							data: {
								report: $scope.dashboard.report,
								printUrl: $location.absUrl(),
								downloadUrl: 'http://' + $location.host() + '/report/',
								token: 'public',
								pageLoadTime: 4600
							}
						},						
						metrics: {
							method: 'POST',
							url: 'http://' + $location.host() + '/api/metrics/set',
							data: {
								organization: 'public',
								username: 'public',
								email: 'public',
								dashboard: 'health_3w',
								theme: 'health_3w',
								format: 'pdf',
								url: $location.$$path
							}
						}
					}]
				}
			},
			rows: [{
				columns: [{
					styleClass: 's12 m12 l4',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Organizations',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'organizations',
								}
							}
						}
					}]
				},{
					styleClass: 's12 m12 l4',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Projects',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'projects',
								}
							}
						}
					}]
				},{
					styleClass: 's12 m12 l4',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Locations',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'locations',
								}
							}
						}
					}]
				}]
			},{
				columns: [{
					styleClass: 's12 m12 l12',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Total Beneficiaries',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'beneficiaries',
								}
							}
						}
					}]					
				}]
			},{
				columns: [{
					styleClass: 's12 m12 l3',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Under 5 Male',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'under5male',
								}
							}
						}
					}]
				},{
					styleClass: 's12 m12 l3',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Under 5 Female',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'under5female',
								}
							}
						}
					}]
				},{
					styleClass: 's12 m12 l3',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Over 5 Male',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'over5male',
								}
							}
						}
					}]
				},{
					styleClass: 's12 m12 l3',
					widgets: [{
						type: 'stats',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: 'Over 5 Female',
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/total',
								data: {
									indicator: 'over5female',
								}
							}
						}
					}]
				}]
			},{
				columns: [{
					styleClass: 's12 m12 l12',
					widgets: [{
						type: 'leaflet',
						card: 'card-panel',
						style: 'padding:0px;',
						config: {
							height: '520px',
							display: {
								type: 'marker',
							},
							defaults: {
								zoomToBounds: true
							},
							layers: {
								baselayers: {
									osm: {
										name: 'Mapbox',
										type: 'xyz',
										url: 'https://b.tiles.mapbox.com/v3/aj.um7z9lus/{z}/{x}/{y}.png?',
										layerOptions: {
											continuousWorld: true
										}
									}
								},								
								overlays: {
									health: {
										name: 'Health',
										type: 'markercluster',
										visible: true,
										layerOptions: {
												maxClusterRadius: 90
										}
									}
								}
							},				
							request: {
								method: 'POST',
								url: 'http://' + $location.host() + '/api/health/markers',
								data: {}
							}
						}
					}]
				}]				
			}]
		};

		// assign to ngm app scope (for menu)
		$scope.dashboard.ngm.dashboard.model = $scope.model;
		
	}]);
/**
 * @ngdoc function
 * @name ngmReportHubApp.ImoTeamLicenseCtrl
 * @description
 * # ImmapTeamCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoTeamLicenseCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmImoAuth', 'ngmData', 'ngmUser', '$translate', '$filter', function ($scope, $location, $route, ngmAuth, ngmImoAuth, ngmData, ngmUser, $translate, $filter) {
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
			getLicenseRequest: function (status) {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/immap/report/getTeamLicenseDummyList',
					data: {
						// indicator: 'list',
						status: status,
						// admin0pcode: 'all',
						// organization_tag: 'immap',
						// project: 'all',
						// cluster_id: 'all'
					}
				}
			},
			getMenu: function () {
				type = [{ id: 'current', name: 'CURRENT' },{ id: 'active', name: 'ACTIVE' }, { id: 'requested', name: 'REQUESTED' }, { id: 'terminated', name: 'TERMINATED' }]
				typeRows = [{
					'title': 'ALL',
					'param': 'status',
					'active': 'all',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': '#/immap/reporting/team/license' +'/all'
				}];
				angular.forEach(type, function (t, i) {
					typeRows.push({
						'title': t.name,
						'param': 'status',
						'active': t.id,
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '#/immap/reporting/team/license'+'/'+t.id
					})
				})
				var type = {
					'search': true,
					'id': 'search-type',
					'icon': 'autorenew',
					'title': 'Status',
					'class': 'teal lighten-1 white-text',
					'rows': typeRows
				};
				return type
			},
			getRow: function(){
				var origin = [{
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
				}, {
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
									request: $scope.dashboard.getLicenseRequest('active'),
								}
							}]
						}]
					}, {
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
									headerTitle: 'Requested List License',
									templateUrl: '/scripts/modules/imo-immap/views/imo.license-team.html',
									tableOptions: {
										count: 10,
										sorting: { updatedAt: "desc" }
									},
									request: $scope.dashboard.getLicenseRequest('request'),
								}
							}]
						}]
					}, {
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
									headerTitle: 'Terminated List License',
									templateUrl: '/scripts/modules/imo-immap/views/imo.license-team.html',
									tableOptions: {
										count: 10,
										sorting: { updatedAt: "desc" }
									},
									request: $scope.dashboard.getLicenseRequest('terminated'),
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
					}];
				var row = [];
				if ($route.current.params.status ==='requested'){
					row.push(origin[0],origin[2],origin[4])
				}
				if ($route.current.params.status === 'active'){
					row.push(origin[0], origin[1], origin[4])
				}
				if ($route.current.params.status === 'current') {
					row.push(origin[0], origin[1],origin[2], origin[4])
				}
				if ($route.current.params.status === 'terminated') {
					row.push(origin[0], origin[3], origin[4])
				}
				if ($route.current.params.status === 'all') {
					return origin
				}
				return row;
			},
			getSubtitle: function(){
				string= $route.current.params.status;
				string = string.charAt(0).toUpperCase() + string.slice(1);
				return string
			},
			getMetrics: function(status){
				var request = {
					method: 'POST',
					url: ngmImoAuth.LOCATION + '/api/metrics/set',
					data: {
						organization: $scope.dashboard.user.organization,
						username: $scope.dashboard.user.username,
						email: $scope.dashboard.user.email,
						dashboard: 'license_' + status,
						theme: 'license_' + status ,
						format: 'csv',
						url: $location.$$path
					}
				}
				return request;
			},
			getDownloads:function(){
				var all_download =[
					{
						type: 'zip',
						color: 'blue lighten-2',
						icon: 'keyboard_return',
						hover: 'Download License Requested',
						request: {
							method: 'GET',
							// url: ngmAuth.LOCATION + '/api/getReportDocuments/' + $scope.report.definition.id,
						},
						metrics: $scope.dashboard.getMetrics('request')
					},
					{
						type: 'zip',
						color: 'blue lighten-2',
						icon: 'autorenew',
						hover: 'Download License Active',
						request: {
							method: 'GET',
							// url: ngmAuth.LOCATION + '/api/getReportDocuments/' + $scope.report.definition.id,
						},
						metrics: $scope.dashboard.getMetrics('active')
					},
					{
						type: 'zip',
						color: 'blue lighten-2',
						icon: 'folder',
						hover: 'Download License Terminated',
						request: {
							method: 'GET',
							// url: ngmAuth.LOCATION + '/api/getReportDocuments/' + $scope.report.definition.id,
						},
						metrics: $scope.dashboard.getMetrics('terminated')
					},
					
				];
				var downloads =[]
				if ($route.current.params.status === 'all') {
					return all_download;
				}
				if ($route.current.params.status === 'active') {
					downloads.push(all_download[1])
				}
				if ($route.current.params.status === 'requested') {
					downloads.push(all_download[0]);
				}
				if ($route.current.params.status === 'current') {
					downloads.push(all_download[0],all_download[1])
				}
				if ($route.current.params.status === 'terminated') {
					downloads.push(all_download[2])
				}

				return downloads
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
							'class': 'col s12 m9 l9 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
							title: 'iMMAP | Team | License'
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							style: 'font-size:20px',
							title: $scope.dashboard.getSubtitle() +' License of The Team'
						},
						download: {
							'class': 'col s12 m3 l3 hide-on-small-only',
							downloads: $scope.dashboard.getDownloads()
						}
					},
					menu:[],
					rows:[]
				}

				// assign to ngm app scope
				$scope.dashboard.ngm.dashboard.model = $scope.model;
				$scope.dashboard.ngm.dashboard.model.rows = $scope.dashboard.getRow();
				$scope.dashboard.ngm.dashboard.model.menu.push($scope.dashboard.getMenu());
			}

		}
		// set page
		$scope.dashboard.init();

	}]);
/**
 * @ngdoc function
 * @name ngmReportHubApp.MasterListAdminCtrl
 * @description
 * # DashboardDroughtAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('MasterListAdminCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterLists',
	// 'ngmMasterListHelper', 
	function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterLists
		// ngmMasterListHelper
	) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		// report object
		$scope.master = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),

			// 
			init: function () {

				// report dashboard model
				$scope.model = {
					name: 'cluster_master_list',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.master.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.master.ngm.style.defaultPrimaryColor,
							title: $scope.master.user.roles.indexOf("SUPERADMIN") > -1 ? 'ALL | LISTS ' : $scope.master.user.admin0pcode + '| LISTS '
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							title: 'IMMAP Overview for ' + $scope.master.user.admin0name
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'white grey-text text-darken-2',
								style: 'padding: 0px;',
								config: {
									urlForResponseList:function(){return $scope.master.setResponseListUrl()},
									showMasterlist: function(){return $scope.master.showMasterlist()},
									templateUrl: '/scripts/modules/cluster/views/cluster.master.list.html',
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
									html: $scope.master.ngm.footer
								}
							}]
						}]
					}]
				}
				$scope.model.menu=[];
				// $scope.master.setMenu();
				// assign to ngm app scope
				$scope.master.ngm.dashboard.model = $scope.model;
			},
			setMenu:function(){
				if ($scope.master.user.roles.indexOf('CLUSTER') > -1 ){
					var country = [{
						'title': 'Democratic Republic of Congo',
						'param': 'admin0pcode',
						'active': 'cd',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cd' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Ethiopia',
						'param': 'admin0pcode',
						'active': 'et',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'et' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Nigeria',
						'param': 'admin0pcode',
						'active': 'ng',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ng' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'South Sudan',
						'param': 'admin0pcode',
						'active': 'ss',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ss' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Afghanistan',
						'param': 'admin0pcode',
						'active': 'af',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'af' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Somalia',
						'param': 'admin0pcode',
						'active': 'so',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'so' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Syria',
						'param': 'admin0pcode',
						'active': 'sy',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'sy' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Yemen',
						'param': 'admin0pcode',
						'active': 'ye',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ye' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Bangladesh',
						'param': 'admin0pcode',
						'active': 'bd',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'bd' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Cox Bazar',
						'param': 'admin0pcode',
						'active': 'cb',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cb' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Colombia',
						'param': 'admin0pcode',
						'active': 'col',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'col' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}]
					$scope.model.menu.push({
						'id': 'search-country',
						'icon': 'person_pin',
						'title': 'Country',
						'class': 'teal lighten-1 white-text',
						'rows': country
					});

				}
				if ( $scope.master.user.roles.indexOf('COUNTRY') > -1){
					var clusters = ngmClusterLists.getClusters(ngmUser.get().admin0pcode);
					var cluster_rows = [];
					for (i = 0; i < clusters.length; i++) {
						var clusterName = clusters[i].cluster;
						var clusterId = clusters[i].cluster_id
						cluster_rows.push({
							'title': clusterName,
							'param': 'cluster_id',
							'active': clusterId,
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + clusterId + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						});
					};

					$scope.model.menu.push({
						'id': 'search-cluster',
						'icon': 'person_pin',
						'title': 'Cluster',
						'class': 'teal lighten-1 white-text',
						'rows': cluster_rows
					});
				}
				if ($scope.master.user.roles.indexOf('SUPERADMIN')>-1){
					$scope.masterList=true;
					var country = [{
						'title': 'Democratic Republic of Congo',
						'param': 'admin0pcode',
						'active': 'cd',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cd' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Ethiopia',
						'param': 'admin0pcode',
						'active': 'et',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'et' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Nigeria',
						'param': 'admin0pcode',
						'active': 'ng',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ng' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'South Sudan',
						'param': 'admin0pcode',
						'active': 'ss',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ss' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Afghanistan',
						'param': 'admin0pcode',
						'active': 'af',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'af' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Somalia',
						'param': 'admin0pcode',
						'active': 'so',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'so' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Syria',
						'param': 'admin0pcode',
						'active': 'sy',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'sy' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Yemen',
						'param': 'admin0pcode',
						'active': 'ye',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ye' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Bangladesh',
						'param': 'admin0pcode',
						'active': 'bd',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'bd' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Cox Bazar',
						'param': 'admin0pcode',
						'active': 'cb',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cb' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
						'title': 'Colombia',
						'param': 'admin0pcode',
						'active': 'col',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'col' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}]
					$scope.model.menu.push({
						'id': 'search-country',
						'icon': 'person_pin',
						'title': 'Country',
						'class': 'teal lighten-1 white-text',
						'rows':country});

					var clusters = ngmClusterLists.getClusters('all');
					var cluster_rows =[];
					for (i = 0; i < clusters.length; i++) {
						var clusterName = clusters[i].cluster;
						var clusterId = clusters[i].cluster_id
						cluster_rows.push({
							'title': clusterName,
							'param': 'cluster_id',
							'active': clusterId,
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							// 'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + clusterId + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						});
					};

					$scope.model.menu.push({
						'id': 'search-cluster',
						'icon': 'camera',
						'title': 'Sector',
						'class': 'teal lighten-1 white-text',
						'rows': cluster_rows
					});
					
				}
				// if ($scope.master.user.roles.indexOf('SUPERADMIN') > -1 || $scope.master.user.roles.indexOf('COUNTRY') > -1){
				// 	$scope.model.menu.push(ngmMasterListHelper.getClusterRows($scope.master.user.admin0pcode));
				// }
			},
			setResponseListUrl:function(){
				if ($scope.master.user.roles.indexOf('CLUSTER') > -1){
					string = '/' + $route.current.params.admin0pcode +'/'+$scope.master.user.cluster_id;
				}
				if ($scope.master.user.roles.indexOf('COUNTRY') > -1) {
					string = '/' + $scope.master.user.admin0pcode + '/' + $route.current.params.cluster_id;
				}
				if ($scope.master.user.roles.indexOf('SUPERADMIN') > -1){
					if ($route.current.params.admin0pcode && $route.current.params.cluster_id ){
						string = '/' + $route.current.params.admin0pcode + '/' + $route.current.params.cluster_id;
					}
					if ($route.current.params.admin0pcode && !$route.current.params.cluster_id){
						string = '?admin0pcode=' + $route.current.params.admin0pcode
					}
					if (!$route.current.params.admin0pcode && $route.current.params.cluster_id) {
						string = '?cluster_id=' + $route.current.params.cluster_id
					}
				}
				return string
			},
			showMasterlist:function(){
				if ($scope.master.user.roles.indexOf('SUPERADMIN') > -1) {
					return true
				}
				return false
			}

		}

		// set page
		$scope.master.init();
		$scope.master.setMenu();
		$scope.master.setResponseListUrl()

	}]);
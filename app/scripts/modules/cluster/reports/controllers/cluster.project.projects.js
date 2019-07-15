/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectProjectsCtrl
 * @description
 * # ClusterProjectProjectsCtrl
 * Controller of the ngmReportHub
 */
angular.module( 'ngmReportHub' )
	.controller( 'ClusterProjectProjectsCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper','$translate','$filter', function ( $scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterHelper,$translate, $filter ) {
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

			// user
			user: ngmUser.get(),

			userMenuItems: ngmAuth.getMenuParams('PROJECT'),
			// form to add new project
			newProjectUrl: '#/cluster/projects/details/new',

			// report download title
			report_title: ngmUser.get().organization_tag  +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ),

			// title
			title: ngmUser.get().organization + ' | ' + ngmUser.get().admin0name.toUpperCase().substring( 0, 3 ) + ' | '+$filter('translate')('projects_mayus1'),

			// subtitle
			subtitle: $filter('translate')('projects_for_mayus1')+' ' + ngmUser.get().organization + ' ' + ngmUser.get().admin0name,

			// get url
			getMenuUrl: function( cluster_id ){

				// default
				var url = '/desk/#/cluster/projects';
				
				// // if org
				// if ($route.current.params.organization_id && !$route.current.params.admin0pcode ) {
				// 	url += '/organization/' + $route.current.params.organization_id;
				// }
				// if country
				// if($route.current.params.admin0pcode){
				// 	'/cluster/projects/country/:admin0pcode/:organization_id/:cluster_id'
				// 	url += '/country/' + $route.current.params.adminRpcode +'/'+ $route.current.params.admin0pcode + '/' + $route.current.params.organization_id;
				// }
				url += '/' + $route.current.params.adminRpcode + '/' + $route.current.params.admin0pcode + '/' + $route.current.params.organization_id + '/' + cluster_id;

				// url += '/' + cluster_id;
				
				return url;
			},

			// organization
			getOrganizationHref: function() {
				var href = '#/cluster/organization';
				if ( $route.current.params.organization_id ) { href += '/' + $route.current.params.organization_id }
				return href;
			},

			// get organization
			getOrganization: function( organization_id ){

				// return http
				var request = {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/getOrganization',
					data: {
						'organization_id': organization_id
					}
				}

				// return
				return request;
			},

			// set the header titles
			setTitles: function(){
				
				// if org_id, get org data
				// if ( $route.current.params.organization_id ) {
					
				// 	// fetch org data
					
				// 	ngmData
				// 		.get( $scope.report.getOrganization( $scope.report.organization_id ) )
				// 		.then( function( organization ){
								
				// 			// set titles
				// 			$scope.model.header.download.downloads[0].request.data.report = organization.organization_tag  +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' );
				// 			$scope.model.header.title.title = organization.organization + ' | ' + organization.admin0name.toUpperCase().substring( 0, 3 ) + ' | '+$filter('translate')('projects_mayus1');
				// 			$scope.model.header.subtitle.title = $filter('translate')('projects_for_mayus1')+' ' + organization.organization + ' ' + organization.admin0name;
				// 			$scope.report.title = organization.organization + ' | ' + organization.admin0name.toUpperCase().substring(0, 3) + ' | ' + $filter('translate')('projects_mayus1');
				// 		});
					

					
				// }
				var countrylist = {
					af: 'Afghanistan', bd: 'Bangladesh', cb: 'Cox Bazar',
					cd: 'Democratic Republic of Congo', et: 'Ethiopia',
					so: 'Somalia', ss: 'South Sudan', sy: 'Syria', ua: 'Ukraine',
					ye: 'Yemen', ng: 'Nigeria', col: 'Colombia'
				};
				if ($route.current.params.organization_id && $route.current.params.organization_id !=='all') {
					// fetch org data
					ngmData
						.get($scope.report.getOrganization($scope.report.organization_id))
						.then(function (organization) {
								
							// set titles
							$scope.model.header.download.downloads[0].request.data.report = organization.organization_tag //+ '_projects-extracted-' + moment().format('YYYY-MM-DDTHHmm');
							$scope.model.header.title.title = organization.organization + ' | ' + organization.admin0name.toUpperCase().substring(0, 3) //+ ' | ' + $filter('translate')('projects_mayus1');
							$scope.model.header.subtitle.title = $filter('translate')('projects_for_mayus1') + ' ' + organization.organization + ' ' + organization.admin0name;
							$scope.report.title = organization.organization + ' | ' + organization.admin0name.toUpperCase().substring(0, 3) //+ ' | ' + $filter('translate')('projects_mayus1');

							if ($route.current.params.cluster_id !== 'all'){
								$scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + $scope.report.cluster_id
								$scope.model.header.title.title = $scope.model.header.title.title +" | "+ $scope.report.cluster_id.toUpperCase()
								$scope.model.header.subtitle.title = $scope.model.header.subtitle.title +' Cluster '+ $scope.report.cluster_id
								$scope.report.title = $scope.report.title +" | " + $scope.report.cluster_id.toUpperCase()
							}
							$scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + '_projects-extracted-' + moment().format('YYYY-MM-DDTHHmm');
							$scope.model.header.title.title = $scope.model.header.title.title + ' | ' + $filter('translate')('projects_mayus1');
							$scope.model.header.subtitle.title = $scope.model.header.subtitle.title
							$scope.report.title = $scope.report.title + " | " + $scope.report.cluster_id.toUpperCase() + ' | ' + $filter('translate')('projects_mayus1');
						});
					

				} else if ($route.current.params.adminRpcode || $route.current.params.admin0pcode){
					$scope.model.header.download.downloads[0].request.data.report = ''
					$scope.model.header.title.title = '' ;
					$scope.model.header.subtitle.title = ''
					$scope.report.title = '';
					if ($route.current.params.adminRpcode && $route.current.params.admin0pcode === 'all' ){
						$scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report +'_'+$scope.report.adminRpcode
						$scope.model.header.title.title =  $scope.report.adminRpcode.toUpperCase()
						$scope.model.header.subtitle.title = 'All '+$filter('translate')('projects_for_mayus1') +' Region '+ $scope.report.adminRpcode.toUpperCase()
						$scope.report.title =  $scope.report.adminRpcode.toUpperCase
					}
					if ($route.current.params.adminRpcode && $route.current.params.admin0pcode !== 'all') {
						$scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + '_' + $scope.report.admin0pcode
						$scope.model.header.title.title = (countrylist[$scope.report.admin0pcode]).toUpperCase().substring(0, 3)
						$scope.model.header.subtitle.title = 'All '+ $filter('translate')('projects_for_mayus1') +' ' +(countrylist[$scope.report.admin0pcode])
						$scope.report.title = (countrylist[$scope.report.admin0pcode]).toUpperCase().substring(0, 3)
					}
					
					if ($route.current.params.cluster_id !== 'all') {
						$scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + $scope.report.cluster_id
						$scope.model.header.title.title = $scope.model.header.title.title + " | " + $scope.report.cluster_id.toUpperCase()
						$scope.model.header.subtitle.title = $scope.model.header.subtitle.title + $scope.report.cluster_id
						$scope.report.title = $scope.report.title + " | " + $scope.report.cluster_id.toUpperCase()
					}
					$scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + '_projects-extracted-' + moment().format('YYYY-MM-DDTHHmm');
					$scope.model.header.title.title = $scope.model.header.title.title + ' | ' + $filter('translate')('projects_mayus1');
					$scope.report.title = $scope.report.title + " | " + $scope.report.cluster_id.toUpperCase() + ' | ' + $filter('translate')('projects_mayus1');
				}
			},
			setRegionMenu:function (params) {
				// url = '/desk/#/cluster/projects/country';
				url = '/desk/#/cluster/projects';
				var region={
					'id': 'search-region',
						'icon': 'person_pin',
							'title': $filter('translate')('region'),
								'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'HQ',
										'param': 'adminRpcode',
										'active': 'all',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': url+'/all/all/all/all',
									}, {
										'title': 'AFRO',
										'param': 'adminRpcode',
										'active': 'afro',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': url+'/afro/all/all/all'
									}, {
										'title': 'AMER',
										'param': 'adminRpcode',
										'active': 'amer',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': url+'/amer/all/all/all'
									}, {
										'title': 'EMRO',
										'param': 'adminRpcode',
										'active': 'emro',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': url+'/emro/all/all/all'
									}, {
										'title': 'SEARO',
										'param': 'adminRpcode',
										'active': 'searo',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': url+'/searo/all/all/all'
									}, {
										'title': 'EURO',
										'param': 'adminRpcode',
										'active': 'euro',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': url+'/euro/all/all/all'
									}
									]
				}
				$scope.model.menu.push(region);
			},
			setCountryMenu: function (region) {
				// var url = '/desk/#/cluster/projects/country/';
				var url = '/desk/#/cluster/projects/';
				// if($route.current.params.adminRpcode){
				// 	url = '/desk/#/cluster/projects/region/';
				// }
				var menu = {
					'all': {
						'id': 'search-country',
						'icon': 'location_on',
						'title': $filter('translate')('country_mayus'),
						'class': 'teal lighten-1 white-text',
						'rows': [{
							'title': 'Afghanistan',
							'param': 'admin0pcode',
							'active': 'af',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/af/all/all',
						}, {
							'title': 'Bangladesh',
							'param': 'admin0pcode',
							'active': 'bd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'searo/bd/all/all',
						}, {
							'title': 'Cox Bazar',
							'param': 'admin0pcode',
							'active': 'cb',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'searo/cb/all/all',
						}, {
							'title': 'Democratic Republic of Congo',
							'param': 'admin0pcode',
							'active': 'cd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url+'afro/cd/all/all'
						}, {
							'title': 'Ethiopia',
							'param': 'admin0pcode',
							'active': 'et',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/et/all/all',
						}, {
							'title': 'Somalia',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/so/all/all',
						}, {
							'title': 'South Sudan',
							'param': 'admin0pcode',
							'active': 'ss',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/ss/all/all',
						}, {
							'title': 'Syria',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/sy/all/all',
						}, {
							'title': 'Ukraine',
							'param': 'admin0pcode',
							'active': 'ua',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'euro/ua/all/all',
						}, {
							'title': 'Yemen',
							'param': 'admin0pcode',
							'active': 'ye',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/ye/all/all',
						}, {
							'title': 'Nigeria',
							'param': 'admin0pcode',
							'active': 'ng',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/ng/all/all',
						},
						{
							'title': 'Colombia',
							'param': 'admin0pcode',
							'active': 'col',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'amer/col/all/all',
						}]
					},
					'afro': {
						'id': 'search-country',
						'icon': 'person_pin',
						'title': $filter('translate')('country_mayus'),
						'class': 'teal lighten-1 white-text',
						'rows': [{
							'title': 'Democratic Republic of Congo',
							'param': 'admin0pcode',
							'active': 'cd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/cd/all/all'
						}, {
							'title': 'Ethiopia',
							'param': 'admin0pcode',
							'active': 'et',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/et/all/all',
						}, {
							'title': 'Nigeria',
							'param': 'admin0pcode',
							'active': 'ng',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/ng/all/all',
						}, {
							'title': 'South Sudan',
							'param': 'admin0pcode',
							'active': 'ss',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'afro/ss/all/all',
						}]
					},
					'emro': {
						'id': 'search-country',
						'icon': 'person_pin',
						'title': $filter('translate')('country_mayus'),
						'class': 'teal lighten-1 white-text',
						'rows': [{
							'title': 'Afghanistan',
							'param': 'admin0pcode',
							'active': 'af',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/af/all/all',
						}, {
							'title': 'Somalia',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/so/all/all',
						}, {
							'title': 'Syria',
							'param': 'admin0pcode',
							'active': 'sy',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/sy/all/all',
						}, {
							'title': 'Yemen',
							'param': 'admin0pcode',
							'active': 'ye',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'emro/ye/all/all',
						}]
					},
					'searo': {
						'id': 'search-country',
						'icon': 'person_pin',
						'title': $filter('translate')('country_mayus'),
						'class': 'teal lighten-1 white-text',
						'rows': [{
							'title': 'Bangladesh',
							'param': 'admin0pcode',
							'active': 'bd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'searo/bd/all/all',
						}, {
							'title': 'Cox Bazar',
							'param': 'admin0pcode',
							'active': 'cb',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'searo/cb/all/all',
						}]
					},
					'euro': {
						'id': 'search-country',
						'icon': 'person_pin',
						'title': $filter('translate')('country_mayus'),
						'class': 'teal lighten-1 white-text',
						'rows': [{
							'title': 'Ukraine',
							'param': 'admin0pcode',
							'active': 'ua',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'euro/ua/all/all'
						},]
					},
					'amer': {
						'id': 'search-country',
						'icon': 'person_pin',
						'title': $filter('translate')('country_mayus'),
						'class': 'teal lighten-1 white-text',
						'rows': [{
							'title': 'Colombia',
							'param': 'admin0pcode',
							'active': 'col',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url+'amer/col/all/all'
						},]
					}
				}
				$scope.model.menu.push(menu[region]);
			},
			setOrgMenu:function(){
				// organization Menu
				
				var filterOrg;
				var region = $route.current.params.adminRpcode ? $route.current.params.adminRpcode : ngmUser.get().adminRpcode;
				var country = $route.current.params.admin0pcode ? $route.current.params.admin0pcode : ngmUser.get().admin0pcode;
				var cluster = $route.current.params.cluster_id ? $route.current.params.cluster_id : ngmUser.get().cluster_id;
				if ($route.current.params.admin0pcode !== 'all' && $route.current.params.cluster_id !== 'all') {
					
					filterOrg = {
						adminRpcode: region,
						admin0pcode: country,
						cluster_id: cluster, 
					}
					// 
					if ($route.current.params.admin0pcode==='af'){
						delete filterOrg.cluster_id
					}
				}
				if ($route.current.params.admin0pcode !== 'all' && $route.current.params.cluster_id === 'all') {
					filterOrg = {
						adminRpcode: region,
						admin0pcode: country,
					}
				}
				if ($route.current.params.adminRpcode !== 'all' && $route.current.params.admin0pcode === 'all') {
					filterOrg = {
						adminRpcode: region
					}
				}
				if ($route.current.params.adminRpcode === 'all') {
					filterOrg = {};
				}
				
				var req = {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/getOrganizationByCountry',
					data: { filter: filterOrg }
				};
				ngmData.get(req).then(function (org) {
					// var urlOrganization = '/desk/#/cluster/projects/organization/';
					// if ($route.current.params.admin0pcode) {
					// 	var urlOrganization = '/desk/#/cluster/projects/country/' + $route.current.params.adminRpcode + '/' + $route.current.params.admin0pcode + '/';
					// }
					var urlOrganization = '/desk/#/cluster/projects/' + $route.current.params.adminRpcode + '/' + $route.current.params.admin0pcode + '/';
					// if ($route.current.params.adminRpcode) {
					// 	var urlOrganization = '/desk/#/cluster/projects/region/' + $route.current.params.adminRpcode + '/' + $route.current.params.admin0pcode + '/';
					// }
					listOrg = [{
						'title': $filter('translate')('all_min1'),
						'param': 'organization_id',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': urlOrganization + 'all/' + $route.current.params.cluster_id
					}]
					angular.forEach(org, function (o, i) {
						listOrg.push({
							'title': o.organization + (o.cluster ? '-'+o.cluster : '') + ($route.current.params.admin0pcode === 'all' ? '-'+o.admin0name : ''),
							'param': 'organization_id',
							'active': o.id,
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': urlOrganization + o.id + '/' + $route.current.params.cluster_id
						});
					})
					orgMenu = {
						'id': 'search-sector',
						'icon': 'people',
						'title': 'Organization',
						'class': 'teal lighten-1 white-text',
						'rows': listOrg
					};
					$scope.model.menu.push(orgMenu);
					});		
			},
			setClusterMenu: function () {				
				ngmData
					.get(request = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/project/getProjectSectors',
						data: { organization_id: $scope.report.organization_id }
					})
					.then(function (sectors) {
						sectorRows = [{
							'title': $filter('translate')('all_min1'),
							'param': 'cluster_id',
							'active': 'all',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': $scope.report.getMenuUrl('all')
						}];
						// for each sector
						angular.forEach(sectors, function (d, i) {
							sectorRows.push({
								'title': (($scope.report.user.admin0pcode.toLowerCase()!=='col' && d.cluster_id === 'health')?'Health':d.cluster),
								'param': 'cluster_id',
								'active': d.cluster_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': $scope.report.getMenuUrl(d.cluster_id)
							});
						});
						var cluster = {
							// 'search': true,
							'id': 'search-sector',
							'icon': 'camera',
							'title': 'Sector',
							'class': 'teal lighten-1 white-text',
							'rows': sectorRows
						}
						$scope.model.menu.push(cluster);
					});
			},
			// set menu
			setMenu: function(userMenuItems){
				
				if (userMenuItems.includes('adminRpcode')) {
					$scope.report.setRegionMenu();
				}
				if (userMenuItems.includes('admin0pcode')) { 
					$scope.report.setCountryMenu($scope.report.adminRpcode.toLowerCase());
				}
				if (userMenuItems.includes('cluster_id')){
					$scope.report.setClusterMenu();
				}

				if (userMenuItems.includes('organization_tag')){
					$scope.report.setOrgMenu();
				}	
						
				
			},

			// fetches request for project list
			getProjectRequest: function( project_status ) {

				// filter
				var filter = {
						organization_id: $scope.report.organization_id,
						project_status: project_status
					}

				
				if ($route.current.params.admin0pcode && $route.current.params.admin0pcode !== 'all'){
					filter = {
						adminRpcode: $scope.report.adminRpcode,
						admin0pcode: $scope.report.admin0pcode,
						project_status: project_status
					}
				}
				if ($route.current.params.adminRpcode !== 'all' && $route.current.params.admin0pcode ==='all'){
					filter = {
						adminRpcode: $scope.report.adminRpcode,
						project_status: project_status
					}
				}
				if($route.current.params.adminRpcode === 'all'){
					filter = { project_status: project_status}
				}
				// addOrganization
				if (!$route.current.params.organization_id) {
					filter = angular.merge(filter, { organization_id: $scope.report.organization_id });
				}
				if ($route.current.params.organization_id && $route.current.params.organization_id !=='all'){
					filter = angular.merge(filter, { organization_id: $scope.report.organization_id });
				}
				// add cluster
				if ( $scope.report.cluster_id !== 'all' ) {
					filter = angular.merge( filter, { cluster_id: $scope.report.cluster_id } );
				}
				if(role === 'CLUSTER'){					
					filter = angular.merge(filter, { cluster_id: $scope.report.user.cluster_id });
				}
				if(role === 'COUNTRY' || role === 'COUNTRY_ADMIN'){					
					filter = angular.merge(filter, { admin0pcode: $scope.report.user.admin0pcode });
				}
				if(role === 'REGION_ORG'){				
					filter = angular.merge(filter, { adminRpcode: $scope.report.user.adminRpcode, organization_id: $scope.report.user.organization_id });
				}
				if (role === 'REGION') {					
					filter = angular.merge(filter, { adminRpcode: $scope.report.user.adminRpcode});
				}
				if(role === 'HQ_ORG'){
					filter = angular.merge(filter, { organization_id: $scope.report.user.organization_id });
				}

				var admin_org = ["OCHA", "iMMAP"];
				if ($scope.report.user.roles.find(rol => rol === "COUNTRY") &&
					$scope.report.user.admin0pcode === "COL" && //delete to enable for all countries
					admin_org.includes($scope.report.user.organization)) {

					filter = {
						project_status: project_status,
						admin0pcode: $scope.report.user.admin0pcode
					};
				}
				
				// get projects
				var request = {
							method: 'POST',
							url: ngmAuth.LOCATION + '/api/cluster/project/getProjectsList',
							data: { filter: filter }
						}
				
				// return
				return request;

			},

			// init
			init: function() {

				// org id
				$scope.report.organization_id =
						$route.current.params.organization_id ? $route.current.params.organization_id : ngmUser.get().organization_id;

				// org tag
				$scope.report.organization_tag =
						$route.current.params.organization_tag ? $route.current.params.organization_tag : ngmUser.get().organization_tag;

				// sector
				$scope.report.cluster_id = 
						$route.current.params.cluster_id ? $route.current.params.cluster_id : ngmUser.get().cluster_id;
				// country
				$scope.report.admin0pcode = $route.current.params.admin0pcode ? $route.current.params.admin0pcode : ngmUser.get().admin0pcode;

				// region
				$scope.report.adminRpcode = $route.current.params.adminRpcode ? $route.current.params.adminRpcode : ngmUser.get().adminRpcode;

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
							title: $scope.report.title
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							title: $scope.report.subtitle
						},
						download: {
							'class': 'col s12 m3 l3 hide-on-small-only',
							downloads: [{
								type: 'csv',
								color: 'blue lighten-2',
								icon: 'assignment',
								hover: $filter('translate')('download_project_summaries_as_csv'),
								request: {
									method: 'POST',
									url: ngmAuth.LOCATION + '/api/cluster/project/getProjects',
									data: {
										details: 'projects',
										report: $scope.report.report_title +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ),
										query: { organization_id: $scope.report.organization_id },
										csv:true
									}
								},
								metrics: {
									method: 'POST',
									url: ngmAuth.LOCATION + '/api/metrics/set',
									data: {
										organization: $scope.report.user.organization,
										username: $scope.report.user.username,
										email: $scope.report.user.email,
										dashboard: 'projects list',
										theme: 'organization_projects_details',
										format: 'csv',
										url: $location.$$path

									}
								}
							}]

						}
					},
					menu:[],
					// menu:[{
					// 	// 'search': true,
					// 	'id': 'search-sector',
					// 	'icon': 'camera',
					// 	'title': 'Sector',
					// 	'class': 'teal lighten-1 white-text',
					// 	'rows': [{
					// 		'title': $filter('translate')('all_min1'),
					// 		'param': 'cluster_id',
					// 		'active': 'all',
					// 		'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					// 		'href': $scope.report.getMenuUrl( 'all' )
					// 	}]
					// }],
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'white grey-text text-darken-2',
								style: 'padding: 20px;',
								config: {
									html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="' + $scope.report.getOrganizationHref() + '"><i class="material-icons left">keyboard_return</i>'+$filter('translate')('back_to_organization')+'</a><a class="waves-effect waves-light btn right" href="' + $scope.report.newProjectUrl + '"><i class="material-icons left">add_circle_outline</i>'+$filter('translate')('add_new_project')+'</a>'
								}
							}]
						}]
					},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'list',
									card: 'white grey-text text-darken-2',
									config: {
										titleIcon: 'alarm_on',
										// color: 'teal lighten-4',
										color: 'orange lighten-1',
										textColor: 'white-text',
										title: 'Plan',
										icon: 'edit',
										request: $scope.report.getProjectRequest('plan'),
										templateUrl: '/scripts/widgets/ngm-list/template/hide_list.html',
									}
								}]
							}]
						},{
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
									request: $scope.report.getProjectRequest( 'active' )
								}
							}]
						}]
					},{
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
									request: $scope.report.getProjectRequest( 'complete' )
								}
							}]
						}]
					},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'list',
									card: 'white grey-text text-darken-2',
									config: {
										titleIcon: 'alarm_on',
										// color: 'teal lighten-4',
										color: 'grey lighten-1',
										textColor: 'white-text',
										title: 'Not Implemented',
										icon: 'edit',
										request: $scope.report.getProjectRequest('not_implemented'),
										templateUrl: '/scripts/widgets/ngm-list/template/hide_list.html',
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
				};

				// assign to ngm app scope
				$scope.report.ngm.dashboard.model = $scope.model;

				// set title
				$scope.report.setMenu($scope.report.userMenuItems);
				$scope.report.setTitles();
				
				// set menus
				// $scope.report.setOrgMenu()

			}

		}
		var role = ngmAuth.userPermissions().reduce(function (max, role) { return role.LEVEL > max.LEVEL ? role : max })['ROLE'];
		// init
		$scope.report.init();
		
	}]);

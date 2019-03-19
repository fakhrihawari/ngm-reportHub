/**
 * @name ngmReportHub.factory:ngmDroughtHelper
 * @description
 * # ngmDroughtHelper
 */
angular.module('ngmReportHub')
	.factory('ngmUploadHelper', ['$location', '$q', '$http', '$filter', '$timeout', 'ngmAuth', 'ngmClusterLists', function ($location, $q, $http, $filter, $timeout, ngmAuth, ngmClusterLists) {

		var dashboard = {

			// admin1 ( with admin0 filter from API )
			admin1: localStorage.getObject('lists').admin1List.filter(function (row) { return !row.inactive }),

			// admin2 ( with admin0 filter from API )
			admin2: localStorage.getObject('lists').admin2List.filter(function (row) { return !row.inactive }),

		};

		return {

			setParams: function (params) {
				dashboard = angular.merge({}, dashboard, params);
				console.log(dashboard);
				console.log(dashboard.user);
			},

			// get http request --change add month and cluster
			getRequest: function () {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/cluster/admin/indicator',
					data: {
						indicator: 'organizations',
						list: true,
						adminRpcode: dashboard.adminRpcode,
						admin0pcode: dashboard.admin0pcode,
						report_type: 'activity',
						activity_type_id: 'all',
						cluster_id: dashboard.cluster_id,
						organization_tag: dashboard.organization_tag,
						start_date: dashboard.startDate,
						end_date: dashboard.endDate,
					}
				}
			},
			getLatestUpdate: function (url) {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/' + url,
					data: {
						status_plan: dashboard.statusPlan,
					}
				}
			},

			// get http request
			getMetrics: function (theme, format) {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/metrics/set',
					data: {
						organization: dashboard.user.organization,
						username: dashboard.user.username,
						email: dashboard.user.email,
						dashboard: 'drought_dashboard',
						theme: theme,
						format: format,
						url: $location.$$path
					}
				}
			},

			// default menu
			getMenu: function () {

				// rows
				var rows = [];

				return {
					'id': 'drought-dashboard-year',
					'icon': 'search',
					'title': 'Year',
					'class': 'teal lighten-1 white-text',
					'rows': [{
						'title': '2018',
						'param': 'year',
						'active': '2018',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + '/' + dashboard.statusPlan + '/2018/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
					}, {
						'title': '2019',
						'param': 'year',
						// 'active': '2019',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + '/' + dashboard.statusPlan + '/2019/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
					}]
				}
					;

			},

			// region
			getRegion: function(){
				var rows= [{
					'title': 'HQ',
					'param': 'adminRpcode',
					'active': 'all',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/all' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'AFRO',
					'param': 'adminRpcode',
					'active': 'afro',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'AMER',
					'param': 'adminRpcode',
					'active': 'amer',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/amer' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'EMRO',
					'param': 'adminRpcode',
					'active': 'emro',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'SEARO',
					'param': 'adminRpcode',
					'active': 'searo',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/searo' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}];
				return {
					'id': 'search-region',
					'icon': 'person_pin',
					'title': 'Region',
					'class': 'teal lighten-1 white-text',
					'rows': rows
				}
			},

			// country
			getCountry: function(){
				var country = {
					'all': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					},{
						'title': 'Democratic Republic of Congo',
						'param': 'admin0pcode',
						'active': 'cd',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cd' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Ethiopia',
							'param': 'admin0pcode',
							'active': 'et',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'et' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Nigeria',
							'param': 'admin0pcode',
							'active': 'ng',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ng' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'South Sudan',
							'param': 'admin0pcode',
							'active': 'ss',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ss' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Afghanistan',
							'param': 'admin0pcode',
							'active': 'af',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'af' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Somalia',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'so' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Syria',
							'param': 'admin0pcode',
							'active': 'sy',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'sy' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Yemen',
							'param': 'admin0pcode',
							'active': 'ye',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ye' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Bangladesh',
							'param': 'admin0pcode',
							'active': 'bd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'bd' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Cox Bazar',
							'param': 'admin0pcode',
							'active': 'cb',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cb' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Colombia',
							'param': 'admin0pcode',
							'active': 'col',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'col' + '/'+dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'afro': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Democratic Republic of Congo',
							'param': 'admin0pcode',
							'active': 'cd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cd' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Ethiopia',
							'param': 'admin0pcode',
							'active': 'et',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'et' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Nigeria',
							'param': 'admin0pcode',
							'active': 'ng',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ng' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'South Sudan',
							'param': 'admin0pcode',
							'active': 'ss',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ss' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'emro': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Afghanistan',
							'param': 'admin0pcode',
							'active': 'af',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'af' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Somalia',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'so' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Syria',
							'param': 'admin0pcode',
							'active': 'sy',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'sy' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Yemen',
							'param': 'admin0pcode',
							'active': 'ye',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ye' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'searo': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Bangladesh',
							'param': 'admin0pcode',
							'active': 'bd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'bd' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Cox Bazar',
							'param': 'admin0pcode',
							'active': 'cb',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cb' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'amer': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Colombia',
							'param': 'admin0pcode',
							'active': 'col',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'col' + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}]
				}

				return {
					'id': 'search-country',
					'icon': 'person_pin',
					'title': 'Country',
					'class': 'teal lighten-1 white-text',
					'rows':country[dashboard.adminRpcode]}			
				
			},

			// province rows
			// getProvinceRows: function () {

			// 	// rows
			// 	var rows = [{
			// 		'title': 'All',
			// 		'param': 'province',
			// 		'active': 'all',
			// 		'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 		'href': dashboard.url + '/' + dashboard.statusPlan + '/' + dashboard.year + '/' + dashboard.cluster + '/' + 'all' + '/' + 'all' + '/' + 'all' + '/' + dashboard.month + '/2018-01-01/' + moment().format('YYYY-MM-DD')
			// 	}];

			// 	angular.forEach(dashboard.admin1, function (d, i) {

			// 		rows.push({
			// 			'title': d.admin1name,
			// 			'param': 'province',
			// 			'active': d.admin1pcode,
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': dashboard.url + '/' + dashboard.statusPlan + '/' + dashboard.year + '/' + dashboard.cluster + '/' + d.admin1pcode + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		});
			// 	});

			// 	// push to menu
			// 	return {
			// 		'id': 'drought-admin-province',
			// 		'icon': 'location_on',
			// 		'title': 'Province',
			// 		'class': 'teal lighten-1 white-text',
			// 		'rows': rows
			// 	};

			// },

			// // province rows
			// getDistrictRows: function () {

			// 	// rows
			// 	var rows = [{
			// 		'title': 'All',
			// 		'param': 'district',
			// 		'active': 'all',
			// 		'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 		'href': dashboard.url + '/' + dashboard.statusPlan + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + 'all' + '/' + 'all' + '/' + dashboard.month + '/2018-01-01/' + moment().format('YYYY-MM-DD')
			// 	}];

			// 	angular.forEach(dashboard.admin2, function (d, i) {

			// 		if (dashboard.province !== 'all' && d.admin1pcode === dashboard.province) {

			// 			rows.push({
			// 				'title': d.admin2name,
			// 				'param': 'district',
			// 				'active': d.admin2pcode,
			// 				'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 				'href': dashboard.url + '/' + dashboard.statusPlan + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + d.admin2pcode + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 			});
			// 		}
			// 	});

			// 	// push to menu
			// 	return {
			// 		'id': 'drought-province',
			// 		'icon': 'location_on',
			// 		'title': 'District',
			// 		'class': 'teal lighten-1 white-text',
			// 		'rows': rows
			// 	};

			// },

			getOrganizationRows: function (organizations) {

				var orgRows = [];

				// for each
				organizations.forEach(function (d, i) {

					// menu rows
					orgRows.push({
						'title': d.organization,
						'param': 'organization_tag',
						'active': d.organization_tag,
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + d.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type
					});

				});

				// menu
				return {
					'search': true,
					'id': 'search-cluster-organization',
					'icon': 'supervisor_account',
					'title': 'Organization',
					'class': 'teal lighten-1 white-text',
					'rows': orgRows
				}
			},


			getMonthRows: function () {
				// rows
				var rows = [{
					'title': 'All',
					'param': 'month',
					'active': 'all',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/2019-01-01/' + moment().format('YYYY-MM-DD') + '/' + dashboard.adminRpcode + '/' + start_date + '/' + end_date + '/monthly',
				}];

				// for each month
				for (i = 0; i < 12; i++) {
					var monthName = moment.months(i).format('MMM')
					var start_date = moment().year(2019).month(i).startOf('month').format('YYYY-MM-DD')
					var end_date = moment().year(2019).month(i).endOf('month').format('YYYY-MM-DD');
					rows.push({
						'title': monthName,
						'param': 'start_date',
						'active': i,
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + start_date + '/' + end_date + '/monthly',
					});
				}
				return {
					'id': 'drought-admin-month',
					'icon': 'date_range',
					'title': 'Report Monthly',
					'class': 'teal lighten-1 white-text',
					'rows': rows
				};

			},

			getClusterRows: function (admin0pcode) {
				// rows
				var clusters = ngmClusterLists.getClusters(admin0pcode);
				// return clusters
				var rows = [{
					'title': 'All',
					'param': 'cluster_id',
					'active': 'all',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + 'all/all/all/all/all/all/all/all/all' 
				}];

				for (i = 0; i < clusters.length; i++) {
					var clusterName = clusters[i].cluster;
					var clusterId = clusters[i].cluster_id
					rows.push({
						'title': clusterName,
						'param': 'cluster_id',
						'active': clusterId,
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id+'/'+ dashboard.report_id+'/'+dashboard.organization_tag+'/'+clusterId+'/'+dashboard.admin0pcode+'/'+dashboard.adminRpcode+'/'+dashboard.startDate+'/'+dashboard.endDate+'/'+dashboard.type, 
					});
				}
				return {
					'id': 'drought-cluster',
					'icon': 'camera',
					'title': 'Clusters',
					'class': 'teal lighten-1 white-text',
					'rows': rows
				};

			},
			getTypeRows: function () {
				var rows = [
					{
						'title': 'All',
						'param': 'type',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + 'all/all/all/all/all/all/all/all/all'
					},
					{
						'title': 'Monthly',
						'param': 'type',
						'active': 'monthly',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/monthly',
					},
					{
						'title': 'Weekly',
						'param': 'type',
						'active': 'weekly',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/weekly',
					},
					{
						'title': 'Custom',
						'param': 'type',
						'active': 'custom',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/custom',
					},
					{
						'title': 'Project',
						'param': 'type',
						'active': 'project',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/project',
					},
				];

				return {
					'id': 'drought-response',
					'icon': 'compare_arrows',
					'title': 'Document Type',
					'class': 'teal lighten-1 white-text',
					'rows': rows
				};

			},
			// getPlanRows: function (response) {
			// 	var all = [
			// 		{
			// 			'title': 'All',
			// 			'param': 'status_plan',
			// 			'active': 'all',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/all/all' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 		{
			// 			'title': 'Displaced',
			// 			'param': 'status_plan',
			// 			'active': 'drought_affected_displaced',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/all/drought_affected_displaced' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 		{
			// 			'title': 'Non-Displaced',
			// 			'param': 'status_plan',
			// 			'active': 'drought_affected_non_displaced',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/all/drought_affected_non_displaced' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 		{
			// 			'title': 'Natural Disaster',
			// 			'param': 'status_plan',
			// 			'active': 'natural_disaster_affected_drought',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/all/natural_disaster_affected_drought' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 	];
			// 	var emergency = [
			// 		{
			// 			'title': 'All',
			// 			'param': 'status_plan',
			// 			'active': 'all',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/emergency/all' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 		{
			// 			'title': 'Displaced',
			// 			'param': 'status_plan',
			// 			'active': 'drought_affected_displaced',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/emergency/drought_affected_displaced' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 		{
			// 			'title': 'Non-Displaced',
			// 			'param': 'status_plan',
			// 			'active': 'drought_affected_non_displaced',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/emergency/drought_affected_non_displaced' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 	];
			// 	var non_emergency = [
			// 		{
			// 			'title': 'All',
			// 			'param': 'status_plan',
			// 			'active': 'all',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/non_emergency/all' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 		{
			// 			'title': 'Natural Disaster',
			// 			'param': 'status_plan',
			// 			'active': 'natural_disaster_affected_drought',
			// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
			// 			'href': '#/response/afghanistan/drought/dashboard/non_emergency/natural_disaster_affected_drought' + '/' + dashboard.year + '/' + dashboard.cluster + '/' + dashboard.province + '/' + dashboard.district + '/' + dashboard.organization + '/' + dashboard.month + '/' + dashboard.startDate + '/' + dashboard.endDate
			// 		},
			// 	];

			// 	if (response == 'all') {
			// 		rows = all;
			// 	} else if (response == 'emergency') {
			// 		rows = emergency;
			// 	} else {
			// 		rows = non_emergency;
			// 	}

			// 	return {
			// 		'id': 'drought-plan',
			// 		'icon': 'recent_actors',
			// 		'title': 'Population Type',
			// 		'class': 'teal lighten-1 white-text',
			// 		'rows': rows
			// 	};

			// },
			getTitle: function () {
				var title="";
				if(dashboard.adminRpcode === 'all' && dashboard.admin0pcode === 'all'){
					title += 'HQ'
				} else if (dashboard.adminRpcode !== 'all' && dashboard.admin0pcode === 'all'){
					title += dashboard.adminRpcode.toUpperCase()
				} else if (dashboard.admin0pcode !== 'all'){
					title += dashboard.admin0pcode.toUpperCase()
				}

				if (dashboard.cluster_id !== 'all'){
					title += ' | ' + dashboard.cluster_id.toUpperCase()
				}
				if(dashboard.organization_tag !== 'all'){
					title += ' | ' + dashboard.organization_tag.toUpperCase()
				}
				return title;
			},

		}

	}]);
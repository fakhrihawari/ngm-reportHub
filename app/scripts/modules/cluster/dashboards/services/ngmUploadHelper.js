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
						adminRpcode: 'all',
						admin0pcode: 'all',
						report_type: 'activity',
						activity_type_id: 'all',
						cluster_id: 'all',
						organization_tag: 'all',
						start_date: '2019-01-01',
						end_date: moment().format('YYYY-MM-DD')
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
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/all' + '/all' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'AFRO',
					'param': 'adminRpcode',
					'active': 'afro',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/all' + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'AMER',
					'param': 'adminRpcode',
					'active': 'amer',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/all' + '/amer' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'EMRO',
					'param': 'adminRpcode',
					'active': 'emro',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/all' + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
				}, {
					'title': 'SEARO',
					'param': 'adminRpcode',
					'active': 'searo',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/all' + '/searo' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
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
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/all'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					},{
						'title': 'Democratic Republic of Congo',
						'param': 'admin0pcode',
						'active': 'cd',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cd' + '/afro' +'/'+ dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Ethiopia',
							'param': 'admin0pcode',
							'active': 'et',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'et' + '/afro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Nigeria',
							'param': 'admin0pcode',
							'active': 'ng',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ng' + '/afro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'South Sudan',
							'param': 'admin0pcode',
							'active': 'ss',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ss' + '/afro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Afghanistan',
							'param': 'admin0pcode',
							'active': 'af',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'af' + '/emro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Somalia',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'so' + '/emro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Syria',
							'param': 'admin0pcode',
							'active': 'sy',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'sy' + '/emro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Yemen',
							'param': 'admin0pcode',
							'active': 'ye',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ye' + '/emro'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Bangladesh',
							'param': 'admin0pcode',
							'active': 'bd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'bd' + '/searo'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Cox Bazar',
							'param': 'admin0pcode',
							'active': 'cb',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cb' + '/searo'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Colombia',
							'param': 'admin0pcode',
							'active': 'col',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'col' + '/amer'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'afro': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Democratic Republic of Congo',
							'param': 'admin0pcode',
							'active': 'cd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cd' + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Ethiopia',
							'param': 'admin0pcode',
							'active': 'et',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'et' + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Nigeria',
							'param': 'admin0pcode',
							'active': 'ng',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ng' + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'South Sudan',
							'param': 'admin0pcode',
							'active': 'ss',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ss' + '/afro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'emro': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Afghanistan',
							'param': 'admin0pcode',
							'active': 'af',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'af' + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Somalia',
							'param': 'admin0pcode',
							'active': 'so',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'so' + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Syria',
							'param': 'admin0pcode',
							'active': 'sy',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'sy' + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Yemen',
							'param': 'admin0pcode',
							'active': 'ye',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'ye' + '/emro' + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'searo': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/searo'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Bangladesh',
							'param': 'admin0pcode',
							'active': 'bd',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'bd' + '/searo'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}, {
							'title': 'Cox Bazar',
							'param': 'admin0pcode',
							'active': 'cb',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'cb' + '/searo'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}],
					'amer': [{
						'title': 'All',
						'param': 'admin0pcode',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'all' + '/amer'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
					}, {
							'title': 'Colombia',
							'param': 'admin0pcode',
							'active': 'col',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + 'col' + '/amer'+ '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type,
						}]
				}

				return {
					'id': 'search-country',
					'icon': 'person_pin',
					'title': 'Country',
					'class': 'teal lighten-1 white-text',
					'rows':country[dashboard.adminRpcode]}			
				
			},

			// organization rows
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

			// month rows
			getMonthRows: function () {
				// rows
				var rows = [{
					'title': 'All',
					'param': 'start_date',
					'active': '2019-01-01',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.adminRpcode  + '/2019-01-01/' + moment().format('YYYY-MM-DD') + '/monthly',
				}];

				// for each month
				for (i = 0; i < 12; i++) {
					var monthName = moment.months(i).format('MMM')
					var start_date = moment().year(2019).month(i).startOf('month').format('YYYY-MM-DD')
					var end_date = moment().year(2019).month(i).endOf('month').format('YYYY-MM-DD');
					rows.push({
						'title': monthName,
						'param': 'start_date',
						'active': start_date,
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + start_date + '/' + end_date + '/monthly',
					});
				}
				return {
					'id': 'upload-admin-month',
					'icon': 'date_range',
					'title': 'Report Monthly',
					'class': 'teal lighten-1 white-text',
					'rows': rows
				};

			},

			// week rows
			getWeekRows: function () {
				// rows
				var rows = [{
					'title': 'All',
					'param': 'week',
					'active': 'all',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/2019-01-01/'+ moment().format('YYYY - MM - DD') + '/weekly',
				}];

				// for each week
				for (i = 1; i < 54; i++) {

					// set dates to week
					var week = i < 10 ? 'W0' + i : 'W' + i;
					var start_date_week = moment().year(2019).week(i).format('YYYY-MM-DD');
					var end_date_week = moment().year(2019).week(i).subtract(1, 'd').add(1, 'w').format('YYYY-MM-DD');;

					rows.push({
						'title': week,
						'param': 'start_date',
						'active': start_date_week,
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + start_date_week + '/' + end_date_week + '/weekly',
					});
				}

				// push to menu
				return {
					'id': 'upload-admin-week',
					'icon': 'date_range',
					'title': 'Report Week',
					'class': 'teal lighten-1 white-text',
					'rows': rows
				};

			},

			// cluster rows
			getClusterRows: function (admin0pcode) {
				// rows
				var clusters = ngmClusterLists.getClusters(admin0pcode);
				// return clusters
				var rows = [{
					'title': 'All',
					'param': 'cluster_id',
					'active': 'all',
					'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + 'all' + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/' + dashboard.type, 
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

			// type rows
			getTypeRows: function () {
				var rows = [
					{
						'title': 'All',
						'param': 'type',
						'active': 'all',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': dashboard.url + dashboard.project_id + '/' + dashboard.report_id + '/' + dashboard.organization_tag + '/' + dashboard.cluster_id + '/' + dashboard.admin0pcode + '/' + dashboard.adminRpcode + '/' + dashboard.startDate + '/' + dashboard.endDate + '/all'
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

			// set title
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

			// set upload param
			setUploadParam: function(param,type_upload){
				console.log(type_upload);
				selected_param ={
					adminRpcode: param.adminRpcode,
					admin0pcode: param.admin0pcode,
					username: dashboard.user.username,
					cluster_id: param.cluster_id
				}
				if(type_upload ==='report'){
					selected_param.report_id = param.report_id;
				}
				if(type_upload ==='project'){
					selected_param.project_id = param.project_id;
				}
				return selected_param;
			}

		}

	}]);
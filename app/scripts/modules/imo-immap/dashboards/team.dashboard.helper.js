/**
 * @name ngmReportHub.factory:ngmClusterHelper
 * @description
 * # ngmClusterHelper
 * Manages browser local storage
 *
 */
angular.module('ngmReportHub')
	.factory('dashboardImoStatHelper',
		['$location',
			'$q',
			'$http',
			'$filter',
			'$timeout',
			'ngmAuth',
			'ngmClusterLists',
			'ngmClusterLocations', '$translate', '$filter',
			function ($location,
				$q,
				$http,
				$filter,
				$timeout,
				ngmAuth,
				ngmClusterLists,
				ngmClusterLocations, $translate, $filter) {

				var dashboardImoStatHelper = {
					parameter:{},
					setParam:function(param){
						dashboardImoStatHelper.parameter = param;
					},
					// get Menu Country
					getSectorMenu: function (url) {						
						sectorRows=[];
						angular.forEach(['a'],function(s,i){
							sectorRows.push({
								'title':'ALL',
								'param':'sector',
								'active':'all',
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.sector 
								+ '/' + s 
								+ '/' + dashboardImoStatHelper.parameter.type 
								+ '/' + dashboardImoStatHelper.parameter.partner 
								+ '/' + dashboardImoStatHelper.parameter.person_user 
								+ '/' + dashboardImoStatHelper.parameter.email 
								+ '/' + dashboardImoStatHelper.parameter.start_date 
								+ '/' + dashboardImoStatHelper.parameter.end_date
							})
						})
						var sector = {
							'search': true,
							'id': 'search-sector',
							'icon': 'donut_large',
							'title': 'Sector',
							'class': 'teal lighten-1 white-text',
							'rows': sectorRows
						};
						return sector
					},
					// get Menu Region 
					getAreaMenu: function (url,area) {
						areaRows = [{
							'title': 'ALL',
							'param': 'area',
							'active': 'all',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url + '/' + dashboardImoStatHelper.parameter.sector
								+ '/all'
								+ '/' + dashboardImoStatHelper.parameter.type
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/' + dashboardImoStatHelper.parameter.person_user
								+ '/' + dashboardImoStatHelper.parameter.email
								+ '/' + dashboardImoStatHelper.parameter.start_date
								+ '/' + dashboardImoStatHelper.parameter.end_date
						}];
						console.log(areaRows[0].href)
						angular.forEach(area, function (a,i) {
							areaRows.push({
								'title': a.area_name,
								'param': 'area',
								'active': a.area_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.sector
									+ '/' + a.area_id
									+ '/' + dashboardImoStatHelper.parameter.type
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.person_user
									+ '/' + dashboardImoStatHelper.parameter.email
									+ '/' + dashboardImoStatHelper.parameter.start_date
									+ '/' + dashboardImoStatHelper.parameter.end_date
							})
						})
						var area = {
							'search': true,
							'id': 'search-area',
							'icon': 'map',
							'title': 'Area',
							'class': 'teal lighten-1 white-text',
							'rows': areaRows
						};
						return area
					},
					// sub Area
					getSubAreaMenu: function (url, area) {
						subareaRows = [];
						var sub_area = $filter('filter')(area, { area_id: dashboardImoStatHelper.parameter.area }, true);
						angular.forEach(sub_area, function (sa, i) {
							subareaRows.push({
								'title': sa.subarea_name,
								'param': 'area',
								'active': sa.subarea_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.sector
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.person_user
									+ '/' + dashboardImoStatHelper.parameter.email
									+ '/' + dashboardImoStatHelper.parameter.start_date
									+ '/' + dashboardImoStatHelper.parameter.end_date
									+ '/' + sa.subarea_id
							})
						})
						var subarea = {
							'search': false,
							'id': 'search-sub-area',
							'icon': 'map',
							'title': 'Sub-area',
							'class': 'teal lighten-1 white-text',
							'rows': subareaRows
						};
						console.log(dashboardImoStatHelper.parameter.area)
						
						return subarea
					},
					// get Type Menu
					getTypeMenu: function (url,type) {
						typeRows = [{
							'title': 'ALL',
							'param': 'type',
							'active': 'all',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url + '/' + dashboardImoStatHelper.parameter.sector
								+ '/' + dashboardImoStatHelper.parameter.area
								+ '/all'
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/' + dashboardImoStatHelper.parameter.person_user
								+ '/' + dashboardImoStatHelper.parameter.email
								+ '/' + dashboardImoStatHelper.parameter.start_date
								+ '/' + dashboardImoStatHelper.parameter.end_date
						}];
						angular.forEach(type, function (t,i) {
							typeRows.push({
								'title': t.product_name,
								'param': 'type',
								'active': t.product_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.sector
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + t.product_id
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.person_user
									+ '/' + dashboardImoStatHelper.parameter.email
									+ '/' + dashboardImoStatHelper.parameter.start_date
									+ '/' + dashboardImoStatHelper.parameter.end_date
							})
						})
						var type = {
							'search': true,
							'id': 'search-type',
							'icon': 'text_fields',
							'title': 'Type',
							'class': 'teal lighten-1 white-text',
							'rows': typeRows
						};
						return type
					},
					getPartnerMenu: function (url) {
						partnerRows = [];
						angular.forEach(['a'], function (p,i) {
							partnerRows.push({
								'title': 'ALL',
								'param': 'partner',
								'active': 'all',
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.sector
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
									+ '/' + p
									+ '/' + dashboardImoStatHelper.parameter.person_user
									+ '/' + dashboardImoStatHelper.parameter.email
									+ '/' + dashboardImoStatHelper.parameter.start_date
									+ '/' + dashboardImoStatHelper.parameter.end_date
							})
						})
						var partner = {
							'search': true,
							'id': 'search-partner',
							'icon': 'compare_arrows',
							'title': 'Partner',
							'class': 'teal lighten-1 white-text',
							'rows': partnerRows
						};
						return partner
					},
					getUserMenu: function (url) {
						userRows = [];
						angular.forEach(['a'], function (u,i) {
							userRows.push({
								'title': 'ALL',
								'param': 'user',
								'active': 'all',
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.sector
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + u
									+ '/' + dashboardImoStatHelper.parameter.email
									+ '/' + dashboardImoStatHelper.parameter.start_date
									+ '/' + dashboardImoStatHelper.parameter.end_date
							})
						})
						var user = {
							'search': true,
							'id': 'search-user',
							'icon': 'account_circle',
							'title': 'User',
							'class': 'teal lighten-1 white-text',
							'rows': userRows
						};
						return user
					},
					

				};

				return dashboardImoStatHelper;

			}]);
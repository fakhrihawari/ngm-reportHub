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
					// :country/:partner_category/:partner/:area/:type/:user/:email/:start_date/:end_date
					// get Menu Country
					getCountryMenu: function (url,country) {
						sectorRows = [{
							'title': 'ALL',
							'param': 'country',
							'active': 'all',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url + '/all'
								+ '/' + dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/' + dashboardImoStatHelper.parameter.area
								+ '/' + dashboardImoStatHelper.parameter.type
								+ '/' + dashboardImoStatHelper.parameter.person_user
								+ '/' + dashboardImoStatHelper.parameter.email
								+ '/' + dashboardImoStatHelper.parameter.start_date
								+ '/' + dashboardImoStatHelper.parameter.end_date
						}];
						angular.forEach(country, function (s, i) {
							sectorRows.push({
								'title': s.admin0name,
								'param': 'country',
								'active': s.admin0pcode,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + s.admin0pcode
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
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
							'title': 'Country',
							'class': 'teal lighten-1 white-text',
							'rows': sectorRows
						};
						return sector
					},
					getSectorMenu: function (url) {						
						sectorRows=[{
								'title':'ALL',
								'param':'sector',
								'active':'all',
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
					getPartnerCategoryMenu: function (url,partner_category) {
						sectorRows = [{
							'title': 'ALL',
							'param': 'partner_category',
							'active': 'all',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url + '/' + dashboardImoStatHelper.parameter.country
								+ '/all'
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/' + dashboardImoStatHelper.parameter.area
								+ '/' + dashboardImoStatHelper.parameter.type
								+ '/' + dashboardImoStatHelper.parameter.person_user
								+ '/' + dashboardImoStatHelper.parameter.email
								+ '/' + dashboardImoStatHelper.parameter.start_date
								+ '/' + dashboardImoStatHelper.parameter.end_date
						}];
						angular.forEach(partner_category, function (pc, i) {
							sectorRows.push({
								'title': pc.partner_category_name,
								'param': 'partner_category',
								'active': pc.partner_category_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.country
									+ '/' + pc.partner_category_id
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
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
							'title': 'Partner Category',
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
							'href': url + '/'+dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/all'
								+ '/' + dashboardImoStatHelper.parameter.type
								+ '/' + dashboardImoStatHelper.parameter.person_user
								+ '/' + dashboardImoStatHelper.parameter.email
								+ '/' + dashboardImoStatHelper.parameter.start_date
								+ '/' + dashboardImoStatHelper.parameter.end_date  
						}];
						
						angular.forEach(area, function (a,i) {
							console.log(a)
							areaRows.push({
								'title': a.area_name,
								'param': 'area',
								'active': a.area_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url +'/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + a.area_id
									+ '/' + dashboardImoStatHelper.parameter.type
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
								'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
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
							'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/' + dashboardImoStatHelper.parameter.area
								+ '/all'
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
								'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + t.product_id
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
					getPartnerMenu: function (url,partner) {
						partnerRows = [{
								'title': 'ALL',
								'param': 'partner',
								'active': 'all',
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/all'
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
									+ '/' + dashboardImoStatHelper.parameter.person_user
									+ '/' + dashboardImoStatHelper.parameter.email
									+ '/' + dashboardImoStatHelper.parameter.start_date
									+ '/' + dashboardImoStatHelper.parameter.end_date
							}];
						angular.forEach(partner, function (p,i) {
							partnerRows.push({
								'title':  p.partner,
								'param': 'partner',
								'active': p.partner_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + p.partner_id
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
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
					getUserMenu: function (url,user) {
						userRows = [{
							'title': 'ALL',
							'param': 'person_user',
							'active': 'all',
							'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner_category
								+ '/' + dashboardImoStatHelper.parameter.partner
								+ '/' + dashboardImoStatHelper.parameter.area
								+ '/' + dashboardImoStatHelper.parameter.type
								+ '/all'
								+ '/' + dashboardImoStatHelper.parameter.email
								+ '/' + dashboardImoStatHelper.parameter.start_date
								+ '/' + dashboardImoStatHelper.parameter.end_date
						}];
						angular.forEach(user, function (u,i) {
							console.log(u)
							userRows.push({
								'title': u.name,
								'param': 'person_user',
								'active': u.username,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': url + '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner_category
									+ '/' + dashboardImoStatHelper.parameter.partner
									+ '/' + dashboardImoStatHelper.parameter.area
									+ '/' + dashboardImoStatHelper.parameter.type
									+ '/' + u.username
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
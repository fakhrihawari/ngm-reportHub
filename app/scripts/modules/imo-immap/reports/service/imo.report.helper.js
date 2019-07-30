/**
 * @name ngmReportHub.factory:ngmClusterHelper
 * @description
 * # ngmClusterHelper
 * Manages browser local storage
 *
 */
angular.module('ngmReportHub')
	.factory('imoReportHelper',
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

				var imoReportHelper = {

					// get a new project
					getNewForm: function (user) {

						// copy user and remove conflicts
						var u = angular.copy(user);
						var user = {
							username : u.username,
							name: u.name,
							email:u.email,
							phone:u.phone,
							position:u.position,
						}

						var report = { support_partner: [], planed_activity: [], report_status: 'new', report_submit:false}
						report = angular.merge({},user,report);

						// return
						return report;
					},

				};

				return imoReportHelper;

			}]);

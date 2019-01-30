/**
 * @ngdoc function
 * @name ngmReportHubApp.MasterListAdminCtrl
 * @description
 * # DashboardDroughtAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('MasterListAdminCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmMasterListHelper', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmMasterListHelper) {
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
				$scope.master.setMenu();
				// assign to ngm app scope
				$scope.master.ngm.dashboard.model = $scope.model;
			},
			setMenu:function(){
				if ($scope.master.user.roles.indexOf('SUPERADMIN')>-1){
					$scope.model.menu.push(ngmMasterListHelper.getCountry());
					
				}
				if ($scope.master.user.roles.indexOf('SUPERADMIN') > -1 || $scope.master.user.roles.indexOf('COUNTRY') > -1){
					$scope.model.menu.push(ngmMasterListHelper.getClusterRows($scope.master.user.admin0pcode));
				}
			}

		}

		// set page
		$scope.master.init();
		// $scope.master.setMenu();
		console.log($scope.master.user);

	}]);
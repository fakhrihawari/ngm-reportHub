/**
 * @ngdoc function
 * @name ngmReportHubApp.MasterActivitiyListCtrl
 * @description
 * # DashboardDroughtAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('MasterActivitiyListCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterLists', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterLists) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.master = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),

			addList: function () {				
			},
			// 
			init: function () {

				// master list model
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
							title: $route.current.params.admin0pcode ? $route.current.params.admin0pcode + ' | ACTIVITIES ' + '| LISTS ' : 'MASTER | '+' ACTIVITIES ' + '| LISTS '
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							title: 'IMMAP Overview for Activitiy list of ' + $scope.master.user.admin0name
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'white grey-text text-darken-2',
								style: 'padding: 20px;padding-left: 0px;padding-bottom: 10px;',
								config: {
									addList:function(){$scope.master.addList()},
									modal: function (modal) {
										$('#' + modal).openModal();
									},
									templateUrl:'/scripts/widgets/ngm-html/template/master.activity.html',
									// html: '<a class="btn-flat waves-effect waves-teal hide-on-small-only" href="#/cluster/admin/lists"><i class="material-icons left">keyboard_return</i>Back to List</a><a class="waves-effect waves-light btn-floating right"><i class="material-icons">add</i></a>'
								}
							}]
						}]
					},
					{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'list',
								config: {
									style: $scope.master.ngm.style,
									templateUrl: '/scripts/widgets/ngm-list/template/master.list.activities.html',
								}
							}]
						}]
					},
					{
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
				// assign to ngm app scope
				$scope.master.ngm.dashboard.model = $scope.model;
			},
		}
		$scope.master.init();
		console.log($scope.master.addList());
	}]);
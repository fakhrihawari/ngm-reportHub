/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectFormReportCtrl
 * @description
 * # ClusterProjectFormReportCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.license.form', ['ngm.provider'])
	.config(function (dashboardProvider) {
		dashboardProvider
			.widget('license.form', {
				title: 'Imo License Form',
				description: 'Imo License Form',
				controller: 'ImoLicenseFormCtrl',
				templateUrl: '/scripts/modules/imo-immap/license/license.form.html',
				resolve: {
					data: function (ngmData, config) {						
						return ngmData.get(config.request);
					}
				}
			});
	})
	.controller('ImoLicenseFormCtrl', [
		'$scope',
		'$location',
		'$timeout',
		'$filter',
		'$q',
		'$http',
		'data',
		'$route',
		'ngmUser',
		'ngmAuth',
		'ngmData',
		'ngmClusterHelper',
		'ngmClusterLists',
		'config',
		'$translate',
		function ($scope, $location, $timeout, $filter, $q, $http, data, $route, ngmUser, ngmAuth, ngmData, ngmClusterHelper, ngmClusterLists, config, $translate) {

			// project

			//budget_funds



			$scope.project = {

				// user
				user: ngmUser.get(),

				// app style
				style: config.style,

				// project
				definition: config.project,
				license: data?data:[],

				// last update
				// updatedAt: moment(config.project.updatedAt).format('DD MMMM, YYYY @ h:mm:ss a'),

				// // templates
				// templatesUrl: '/scripts/modules/cluster/views/forms/financials/',
				// templatesUrl: '/scripts/modules/imo-immap/license/license.form.html',
				licenseUrl:'/scripts/modules/imo-immap/license/views/license.html',
				// //financialsUrl: 'financials.html',
				// financialsUrl: financial_html,

				// notesUrl: 'notes.html',

				// canEdit: ngmAuth.canDo('EDIT', { adminRpcode: config.project.adminRpcode, admin0pcode: config.project.admin0pcode, cluster_id: config.project.cluster_id, organization_tag: config.project.organization_tag }),

				// // placeholder bydget activity
				// lists: {
				// 	reported_on_fts: [{ reported_on_fts_id: 'yes', reported_on_fts_name: $filter('translate')('yes') }, { reported_on_fts_id: 'no', reported_on_fts_name: 'No' }],
				// 	//budget_funds: [ { budget_funds_id: 'financial', budget_funds_name: $filter('translate')('financial') }, { budget_funds_id: 'inkind',budget_funds_name: $filter('translate')('inkind') } ],
				// 	budget_funds: budget_funds,
				// 	financial_programming: [{
				// 		financial_programming_id: 'non_cash', financial_programming_name: $filter('translate')('non_cash')
				// 	}, {
				// 		financial_programming_id: 'restricted_cash', financial_programming_name: $filter('translate')('restricted_cash')
				// 	}, {
				// 		financial_programming_id: 'unrestricted_cash', financial_programming_name: $filter('translate')('unrestricted_cash')
				// 	}],
				// 	multi_year_funding: [{ multi_year_funding_id: 'yes', multi_year_funding_name: $filter('translate')('yes') }, { multi_year_funding_id: 'no', multi_year_funding_name: 'No' }],
				// 	activity_type: angular.copy(config.project.activity_type),
				// 	currencies: ngmClusterLists.getCurrencies(config.project.admin0pcode),
				// 	activity_descriptions: angular.copy(config.project.target_beneficiaries),
				// 	activity_descriptions2: [],

				// },
				license_list: [
					{ id: 'adobe_reader', name: 'Adobe Reader' },
					{ id: 'adobe_photoshop', name: 'Adobe Photoshop' },
					{ id: 'adobe_indesign', name: 'Adobe Indesign' },
					{ id: 'adobe_xd', name: 'Adobe XD' },
					{ id: 'microsoft_word', name: 'Microsoft Word' },
					
				],
				status: ['ACTIVE','REQUESTED','TERMINATED'],
				// datepicker
				datepicker: {
					maxDate: moment().format('YYYY-MM-DD'),
					onClose: function ($license,date) {
						// format date on selection
						if(date==='start'){
							$license.start_date =
								moment(new Date($license.start_date)).format('YYYY-MM-DD');
							$license.expired_date = moment(new Date($license.start_date)).format('YYYY-MM-DD');
						}else{
							console.log("s")
							$license.expired_date = moment(new Date($license.expired_date)).format('YYYY-MM-DD');
						}

					}
				},

				// cancel
				cancel: function () {
					$timeout(function () {
						$location.path('/cluster/projects/summary/' + $scope.project.definition.id);
					}, 400);
				},

				addLicense: function(){
					$scope.inserted = {
						license_id:'',
						start_date: moment().format('YYYY-MM-DD'),
						expired_date: moment().format('YYYY-MM-DD'),
						status:''
					};
					length = $scope.project.license.length
					if (length<1){
						user = angular.copy($scope.project.user);
						user_info = { admin0name :user.admin0name,
													admin0pcode: user.admin0pcode,
													adminRpcode: user.adminRpcode,
													email: user.email,
													name: user.name,
													username: user.username,
													organization: user.organization,
													organization_tag: user.organization_tag													
												};
						$scope.inserted=angular.merge({},user_info,$scope.inserted);
						// console.log(x,user_info);
						$scope.project.license.push($scope.inserted);
					}else{
						_copy=angular.copy($scope.project.license[length-1])
						$scope.inserted.license_id = _copy.license_id
						$scope.inserted.license_name = _copy.license_name
						$scope.inserted.start_date = _copy.start_date
						$scope.inserted.expired_date= _copy.expired_date
						$scope.inserted.status = _copy.status
						console.log($scope.inserted);
						$scope.project.license.push($scope.inserted)
					}
				},
				displayLicense: function (project, $data, $license) {
					var selected = [];
					$license.license_id = $data;
					selected = $filter('filter')(project.license_list, { id: $license.license_id }, true);
					console.log(selected);
					if (selected && selected.length) {
						$license.license_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayStatus: function (project, $data, $license) {
					var selected = [];
					console.log($data)
					$license.status = $data;
					
					console.log($license.status)
					return $license.status ? $license.status : '-';
				},
				cancelEdit: function ($index) {
					if (!$scope.project.license[$index].id) {
						$scope.project.license.splice($index, 1);
					}
				},
				removeLicense:function(){
					if (!$scope.project.license[$index].id) {
						$scope.project.license.splice($index, 1);
					}else{
						var id = $scope.project.license[$index].id;
						$scope.project.license.splice($index, 1);
						// remove on server 
					}
				},




				save: function () {
					console.log($scope.project.license);
					// Update License
					
					// ngmData.get({
					// 	method: 'POST',
					// 	url: ngmAuth.LOCATION + '/api/cluster/project/setProject',
					// 	data: {
					// 		project: $scope.project.definition
					// 	}
					// }).then(function (license) {

					// 	// set project definition
					// 	// $scope.project.definition = project;
					// 	$scope.project.license = license;

					// 	// on success
					// 	Materialize.toast($filter('translate')('project_budget_item_added') + '!', 3000, 'success');
					// });
				}

			}


		}

	]);


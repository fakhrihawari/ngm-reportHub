/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ProjectFinancialsCtrl
 * @description
 * # ProjectFinancialsCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.imo.authentication', ['ngm.provider'])
	.config(function (dashboardProvider) {
		dashboardProvider
			.widget('imo.authentication', {
				title: 'Imo Authentication Form',
				description: 'Imo Authentication Form',
				controller: 'ImoAuthenticationFormCtrl',
				templateUrl: '/scripts/app/views/view.html'
			});
	})
	.controller('ImoAuthenticationFormCtrl', [
		'$scope',
		'$http',
		'$location',
		'$timeout',
		'$filter',
		'$q',
		'ngmAuth',
		'ngmImoAuth',
		'ngmUser',
		'ngmData',
		'ngmClusterLists',
		'config',
		'$translate',
		function ($scope, $http, $location, $timeout, $filter, $q, ngmAuth, ngmImoAuth, ngmUser, ngmData, ngmClusterLists, config, $translate) {


			// if($location.$$host === "192.168.33.16" || $location.$$host === "35.229.43.63" || $location.$$host === "192.168.33.16" ){
			// if ($location.$$host === "4wplus.org" || $location.$$host === "35.229.43.63") {

			// 	var4wplusrh = "4wPlus";

			// } else {
			// 	var4wplusrh = "ReportHub"
			// }

			// project
			$scope.panel = {

				err: false,

				// var4wplusrh: var4wplusrh,

				date: new Date(),

				user: ngmUser.get(),

				btnDisabled: false,

				btnActivate: config.user && config.user.status === 'deactivated' ? true : false,

				btnDeactivate: config.user && config.user.status === 'active' ? true : false,

				// adminRegion
				adminRegion: [
					{ adminRpcode: 'EMRO', adminRname: 'EMRO', admin0pcode: 'AF', admin0name: 'Afghanistan' },
					// { adminRpcode: 'SEARO', adminRname: 'SEARO', admin0pcode: 'BD', admin0name: 'Bangladesh' },
					{ adminRpcode: 'AMER', adminRname: 'AMER', admin0pcode: 'COL', admin0name: 'Colombia' },
					{ adminRpcode: 'SEARO', adminRname: 'SEARO', admin0pcode: 'CB', admin0name: 'Cox Bazar' },
					{ adminRpcode: 'AFRO', adminRname: 'AFRO', admin0pcode: 'CD', admin0name: 'Democratic Republic of Congo' },
					{ adminRpcode: 'AFRO', adminRname: 'AFRO', admin0pcode: 'ET', admin0name: 'Ethiopia' },
					{ adminRpcode: 'EMRO', adminRname: 'EMRO', admin0pcode: 'IQ', admin0name: 'Iraq' },
					{ adminRpcode: 'AFRO', adminRname: 'AFRO', admin0pcode: 'KE', admin0name: 'Kenya' },
					{ adminRpcode: 'AFRO', adminRname: 'AFRO', admin0pcode: 'NG', admin0name: 'Nigeria' },
					{ adminRpcode: 'EMRO', adminRname: 'EMRO', admin0pcode: 'SO', admin0name: 'Somalia' },
					{ adminRpcode: 'AFRO', adminRname: 'AFRO', admin0pcode: 'SS', admin0name: 'South Sudan' },
					{ adminRpcode: 'EMRO', adminRname: 'EMRO', admin0pcode: 'SY', admin0name: 'Syria' },
					{ adminRpcode: 'EURO', adminRname: 'EURO', admin0pcode: 'UA', admin0name: 'Ukraine' },
					{ adminRpcode: 'EMRO', adminRname: 'EMRO', admin0pcode: 'UR', admin0name: 'Uruk' },
					{ adminRpcode: 'EMRO', adminRname: 'EMRO', admin0pcode: 'YE', admin0name: 'Yemen' }

				],

				// programme
				// programme: [
				// 	{ programme_id: 'DRCWHOPHISP1', programme_name: 'DRCWHOPHISP1' },
				// 	{ programme_id: 'ETWHOIMOSUPPORTP1', programme_name: 'ETWHOIMOSUPPORTP1' },
				// 	{ programme_id: 'ETWHOIMOSUPPORTP2', programme_name: 'ETWHOIMOSUPPORTP2' },
				// 	{ programme_id: 'ETUSAIDOFDAIMOSUPPORTP1', programme_name: 'ETUSAIDOFDAIMOSUPPORTP1' },
				// 	{ programme_id: 'WWCDCCOOPERATIVEAGREEMENTP11', programme_name: 'WWCDCCOOPERATIVEAGREEMENTP11' },
				// 	{ programme_id: 'WWCDCCOOPERATIVEAGREEMENTP12', programme_name: 'WWCDCCOOPERATIVEAGREEMENTP12' },
				// ],

				// duty stations
				// dutyStations: localStorage.getObject('dutyStations'),

				// cluster
				// cluster: {
				// 	'col': {
				// 		'education': { cluster: 'Educación en Emergencias (EeE)' },
				// 		'albergues': { cluster: 'Albergues' },
				// 		'san': { cluster: 'Seguridad Alimentaria y Nutrición (SAN' },
				// 		'health': { cluster: 'Salud' },
				// 		'recuperacion_temprana': { cluster: 'Recuperación Temprana' },
				// 		'protection': { cluster: 'Protección' },
				// 		'wash': { cluster: 'Wash' },
				// 		'undaf': { cluster: 'UNDAF' }
				// 	},
				// 	'other': {
				// 		'cvwg': { cluster: 'MPC' },
				// 		'agriculture': { cluster: 'Agriculture' },
				// 		'cccm_esnfi': { cluster: 'CCCM - Shelter' },
				// 		'cwcwg': { cluster: 'CwCWG' },
				// 		'coordination': { cluster: 'Coordination' },
				// 		'education': { cluster: 'Education' },
				// 		'eiewg': { cluster: 'EiEWG' },
				// 		'emergency_telecommunications': { cluster: 'Emergency Telecommunications' },
				// 		'esnfi': { cluster: 'ESNFI' },
				// 		'fsac': { cluster: 'FSAC' },
				// 		'fss': { cluster: 'Food Security' },
				// 		'health': { cluster: 'Health' },
				// 		'logistics': { cluster: 'Logistics' },
				// 		'smsd': { cluster: 'Site Management and Site Development' },
				// 		'nutrition': { cluster: 'Nutrition' },
				// 		'protection': { cluster: 'Protection' },
				// 		'rnr_chapter': { cluster: 'R&R Chapter' },
				// 		'wash': { cluster: 'WASH' }
				// 	}
				// },
				// clusters: ngmClusterLists.getClusters('all').filter(cluster => cluster.registration !== false),
				// clusterByCountry: function () {
				// 	country = $scope.panel.user.admin0pcode ? $scope.panel.user.admin0pcode : 'all';
				// 	$scope.panel.clusters = ngmClusterLists.getClusters(country).filter(cluster => cluster.registration !== false);
				// },

				// // editable role array:
				// editRoleUrl: '/scripts/app/views/authentication/edit-role.html',

				// login fn
				login: function (ngmLoginForm) {
					// if invalid
					if (ngmLoginForm.$invalid) {
						// set submitted for validation
						ngmLoginForm.$setSubmitted();
					} else {
						// login
						ngmImoAuth
							.login({ user: $scope.panel.user }).success(function (result) {

								// db error!
								if (result.err || result.summary) {
									var msg = result.summary ? result.summary : result.msg;
									Materialize.toast(msg, 6000, 'error');
								}

								// success
								if (!result.err && !result.summary) {

									// go to default org page
									$location.path('/immap/reporting');
									$timeout(function () {

										Materialize.toast($filter('translate')('welcome_back') + ' ' + result.username + '!', 6000, 'note');
									}, 2000);
								}

							});

					}
				},



				// open modal by id 
				openModal: function (modal) {
					$('#' + modal).openModal({ dismissible: false });
				},

				// deactivate 
				updateStatus: function (status) {
					// set status
					$scope.panel.user.status = status;
					$scope.panel.update(true);

				},

				// delete user!
				delete: function () {

					// disable btns
					$scope.panel.btnDisabled = true;

					// return project
					ngmData.get({
						method: 'POST',
						url: ngmImoAuth.LOCATION + '/api/immap/delete',
						data: {
							user: $scope.panel.user
						}
					}).then(function (data) {

						if (data.success) {
							// success message
							Materialize.toast($filter('translate')('success') + ' ' + $filter('translate')('user_deleted'), 6000, 'success');
							$timeout(function () {
								var path = (ngmUser.get().organization === 'iMMAP' && (ngmUser.get().admin0pcode === 'CD' || ngmUser.get().admin0pcode === 'ET')) ? '/immap/team' : '/team';
								$location.path(path);
							}, 1000);
						} else {
							Materialize.toast($filter('translate')('error_try_again'), 6000, 'error');
						}

					});
				},

				// update profile
				update: function (reload) {

					// message
					$timeout(function () { Materialize.toast($filter('translate')('processing') + '...', 6000, 'note'); }, 200);

					// disable btns
					$scope.panel.btnDisabled = true;

					// merge adminRegion
					// $scope.panel.user = angular.merge({}, $scope.panel.user,
					// 	$filter('filter')($scope.panel.adminRegion, { admin0pcode: $scope.panel.user.admin0pcode }, true)[0],
					// 	$filter('filter')($scope.panel.programme, { programme_id: $scope.panel.user.programme_id }, true)[0]);

					// if immap and ET || CD
					if ($scope.panel.user.site_name) {
						var dutyStation = $filter('filter')($scope.panel.dutyStations, { site_name: $scope.panel.user.site_name }, true)[0];
						delete dutyStation.id;
						// merge duty station
						$scope.panel.user = angular.merge({}, $scope.panel.user, dutyStation);
					}
					console.log($scope.panel.user);

					// register
					ngmImoAuth
						.updateProfile({ user: $scope.panel.user }).success(function (result) {

							// db error!
							if (result.err || result.summary) {
								var msg = result.msg ? result.msg : 'error!';
								Materialize.toast(msg, 6000, msg);
							}

							// success
							if (result.success) {
								// set user and localStorage (if updating own profile)
								if ($scope.panel.user.username === ngmUser.get().username) {
									$scope.panel.user = angular.merge({}, $scope.panel.user, result.user);
									ngmUser.set($scope.panel.user);
								}
								// success message

								$timeout(function () {

									// 
									Materialize.toast($filter('translate')('success') + ' ' + $filter('translate')('profile_updated'), 6000, 'success');

									// activate btn
									$scope.panel.btnDisabled = false;

									// redirect to team view and page refresh
									if (reload) {
										var path = (ngmUser.get().organization === 'iMMAP' && (ngmUser.get().admin0pcode === 'CD' || ngmUser.get().admin0pcode === 'ET')) ? '/immap/team' : '/team';
										$location.path(path);
									}
								}, 200);
							}

						});
				},

				// register fn
				register: function () {
					$scope.panel.user = angular.merge({}, $scope.panel.user,
						$filter('filter')($scope.panel.adminRegion, { admin0pcode: $scope.panel.user.admin0pcode }, true)[0],						
						);
					// register
					ngmImoAuth
						.register({ user: $scope.panel.user }).success(function (result) {

							// db error!
							if (result.err || result.summary) {
								var msg = result.summary ? result.summary : result.msg;
								Materialize.toast(msg, 6000, 'error');
							}

							// success
							if (!result.err && !result.summary) {
								// go to default org page
								$location.path('/immap/reporting/activation')
								$timeout(function () {
									Materialize.toast('Register Success !', 6000, 'success');
								}, 2000);
							}

						});

				},

				// register fn
				passwordResetSend: function (ngmResetForm) {

					// if $invalid
					if (ngmResetForm.$invalid) {
						// set submitted for validation
						ngmResetForm.$setSubmitted();
					} else {

						// user toast msg
						$timeout(function () {

							Materialize.toast($filter('translate')('your_email_is_being_prepared'), 6000, 'note');
						}, 400);

						// resend password email
						ngmImoAuth.passwordResetSend({
							user: $scope.panel.user,
							url: ngmImoAuth.LOCATION + '/desk/#/cluster/find/'
						}).success(function (result) {

							// go to password reset page
							$('.carousel').carousel('next');

							// user toast msg
							$timeout(function () {

								Materialize.toast($filter('translate')('email_sent_please_check_your_inbox'), 6000, 'success');
							}, 400);

						}).error(function (err) {

							// set err
							$scope.panel.err = err;

							// update
							$timeout(function () {
								Materialize.toast(err.msg, 6000, 'error');
							}, 400);
						});
					}

				},

				// register fn
				passwordReset: function (imoResetPasswordForm, token) {

					// if $invalid
					if (imoResetPasswordForm.$invalid) {
						// set submitted for validation
						imoResetPasswordForm.$setSubmitted();
					} else {
						console.log(token, imoResetPasswordForm, "as",$scope.panel.user)
						// register
						ngmImoAuth.passwordReset({ reset: $scope.panel.user, token: token })
							.success(function (result) {
								
								// go to default org page
								$location.path('/immap/reporting');

								// user toast msg
								$timeout(function () {

									Materialize.toast($filter('translate')('welcome_back') + ' ' + + result.username + '!', 6000, 'note');
								}, 2000);


							}).error(function (err) {
								// update
								$timeout(function () {
									Materialize.toast(err.msg, 6000, 'error');
								}, 1000);
							});
					}

				},

				// RnR chapter validation
				organizationDisabled: function () {

					var disabled = true;
					if ($scope.panel.user && $scope.panel.user.admin0pcode && $scope.panel.user.cluster_id && $scope.panel.user.organization_name) {
						// not R&R Chapter
						if ($scope.panel.user.cluster_id !== 'rnr_chapter') {
							disabled = false;
						} else {
							if ($scope.panel.user.organization === 'UNHCR' || $scope.panel.user.organization === 'IOM') {
								disabled = false;
							} else {
								disabled = true;
							}
						}
					}
					return disabled;
				},

				// select org
				onOrganizationSelected: function () {
					// filter
					$scope.select = $filter('filter')($scope.panel.organizations, { organization: $scope.panel.user.organization }, true);
					// merge org
					var org = angular.copy($scope.select[0]);
					delete org.id;
					delete org.admin0pcode;
					angular.merge($scope.panel.user, org);

					// update home page for iMMAP Ethiopia
					if ($scope.panel.user.organization === 'iMMAP') {
						// add defaults as admin
						// $scope.panel.user.app_home = '/immap/';
						$scope.panel.user.app_home = '/cluster/admin/' + $scope.panel.user.adminRpcode.toLowerCase() + '/' + $scope.panel.user.admin0pcode.toLowerCase();
						$scope.panel.user.roles = ['COUNTRY_ADMIN', 'USER'];

					} else {
						delete $scope.panel.user.app_home;
					}

					// validate
					if ($scope.panel.user && $scope.panel.user.organization_name) {
						// not R&R Chapter
						if ($scope.panel.user.cluster_id !== 'rnr_chapter') {
							// update icon
							$('.organization_symbol').css({ 'color': 'teal' });
							// toast
							Materialize.toast(org.organization + '<br/>' + org.organization_name + ' ' + $filter('translate')('selected'), 4000, 'note');
						} else {
							if ($scope.panel.user.organization === 'UNHCR' || $scope.panel.user.organization === 'IOM') {
								// update icon
								$('.organization_symbol').css({ 'color': 'teal' });
								// toast
								Materialize.toast(org.organization + '<br/>' + org.organization_name + ' ' + $filter('translate')('selected'), 4000, 'note');
							} else {
								Materialize.toast('Only UNHCR or IOM Can Register in R&R Chapter!', 6000, 'error');
							}
						}

						//Colombia Clusters
						// if (var4wplusrh === "4wPlus") {

						// 	$scope.panel.cluster = {
						// 		'cvwg': { cluster: 'MPC' },
						// 		//'agriculture': { cluster: 'Agricultura' },
						// 		'albergues': { cluster: 'Albergues' },
						// 		//'cwcwg': { cluster: 'CwCWG' },
						// 		//'coordination': { cluster: 'Coordinación' },
						// 		'education': { cluster: 'Educación en Emergencias (EeE)' },
						// 		//'eiewg': { cluster: 'EiEWG' },
						// 		//'emergency_telecommunications': { cluster: 'Emergencia de Telecomunicaciones' },
						// 		//'esnfi': { cluster: 'ESNFI' },
						// 		//'fsac': { cluster: 'FSAC' },
						// 		'san': { cluster: 'Seguridad Alimentaria y Nutrición (SAN)' },
						// 		'health': { cluster: 'Salud' },
						// 		//'logistics': { cluster: 'Logísticas' },
						// 		//'smsd': { cluster: 'Sitio de Administración y Sitio de Desarrollo' },
						// 		//'nutrition': { cluster: 'Nutrición' },
						// 		'protection': { cluster: 'Protección' },
						// 		//'rnr_chapter': { cluster: 'R&R Chapter' },
						// 		'wash': { cluster: 'WASH' },
						// 		'recuperacion_temprana': { cluster: 'Recuperación Temprana' },
						// 		'undaf': { cluster: 'UNDAF' }

						// 	}

						// }

					}

				},



				//manage user access
				manageUserAccess: function (id) {

					if (document.getElementById(id).checked) {
						var values = document.getElementById(id).value;
						if ($scope.panel.user.roles.indexOf(values) === -1) {
							$scope.panel.user.roles.push(values);
							// set landing page to admin
							if (user.roles.length > 1) {
								user.app_home = '/cluster/admin/';
							}
							// set landing page to org
							if (user.roles.length === 1 && user.roles.indexOf('USER') !== -1) {
								user.app_home = '/cluster/organization/';
							}
						}
					} else {
						var values = document.getElementById(id).value;
						if ($scope.panel.user.roles.indexOf(values) > -1) {
							var index = $scope.panel.user.roles.indexOf(values);
							$scope.panel.user.roles.splice(index, 1);
							// set landing page to org
							if (user.roles.length === 1 && user.roles.indexOf('USER') !== -1) {
								user.app_home = '/cluster/organization/';
							}
						}
					}
				},

				// manage user cluster
				manageUserCluster: function (id) {
					if (document.getElementById(id).checked) {
						var values = document.getElementById(id).value;
						$scope.panel.user.cluster_id = values;
						$scope.panel.user.cluster = $scope.panel.cluster[values].cluster;
					} else {
						document.getElementById(id).checked = true;
					}
				},
				// manage user country
				manageUserCountry: function (id) {
					if (document.getElementById(id).checked) {
						var values = document.getElementById(id).value;
						$scope.panel.user.admin0name = $scope.panel.adminRegion[values].admin0name
						$scope.panel.user.admin0pcode = $scope.panel.adminRegion[values].admin0pcode
						$scope.panel.user.adminRname = $scope.panel.adminRegion[values].adminRname
						$scope.panel.user.adminRpcode = $scope.panel.adminRegion[values].adminRpcode
					} else {
						document.getElementById(id).checked = true;
					}
				}
			}

			// fetch duty stations
			if (!localStorage.getObject('dutyStations')) {
				// activities list
				var getDutyStations = {
					method: 'GET',
					url: ngmAuth.LOCATION + '/api/list/getDutyStations'
				}
				// send request
				$q.all([$http(getDutyStations)]).then(function (results) {
					localStorage.setObject('dutyStations', results[0].data);
					$scope.panel.dutyStations = results[0].data;
				});

			}

			// if config user
			if (config.user) {
				$scope.panel.user = {};
				$scope.panel.roles = ngmAuth.getEditableRoles();
			}

			//adminRpcode only Colombia

			// if (var4wplusrh === "4wPlus") {
			// 	$scope.panel.adminRegion = [

			// 		{ adminRpcode: 'AMER', adminRname: 'AMER', admin0pcode: 'COL', admin0name: 'Colombia' },


			// 	];
			// }

			// merge defaults with config
			$scope.panel = angular.merge({}, $scope.panel, config);
			// get organizations
			// if ( !localStorage.getObject( 'organizations') ){

			// set
			$http.get(ngmAuth.LOCATION + '/api/list/organizations').then(function (organizations) {
				localStorage.setObject('organizations', organizations.data);
				$scope.panel.organizations = organizations.data;


				// if (var4wplusrh === "4wPlus") {

				// 	$scope.panel.organizations = $filter('filter')($scope.panel.organizations,
				// 		{ admin0pcode: 'COL' }, true);



				// };

				$timeout(function () {
					$('select').material_select();
				}, 400);
			});





			// } else {

			// set
			// $scope.panel.organizations = localStorage.getObject( 'organizations');
			// $timeout(function() {
			//   $( 'select' ).material_select();
			// }, 100);

			// }

			// on page load
			angular.element(document).ready(function () {

				// give a few seconds to render
				$timeout(function () {

					// on change update icon color
					$('#ngm-country').on('change', function () {
						if ($(this).find('option:selected').text()) {
							$('.country').css({ 'color': 'teal' });
							$('select').material_select();
						}
					});

					// on change update icon color
					$('#ngm-cluster').on('change', function () {
						if ($(this).find('option:selected').text()) {
							$('.cluster').css({ 'color': 'teal' });
						}
					});

				}, 900);



			});



		}


	]);
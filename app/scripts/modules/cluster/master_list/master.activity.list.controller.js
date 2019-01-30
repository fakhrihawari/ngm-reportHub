/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectFormReportCtrl
 * @description
 * # ClusterProjectFormReportCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.master.activity', ['ngm.provider'])
	.config(function (dashboardProvider) {
		dashboardProvider
			.widget('master.activity', {
				title: 'Cluster Master Activity',
				description: 'Cluster Reports Form',
				controller: 'ClusterMasterActivityListCtrl',
				templateUrl: '/scripts/modules/cluster/views/cluster.master.activity.list.html'
			});
	})
	.controller('ClusterMasterActivityListCtrl', [
		'$scope',
		'$location',
		'$timeout',
		'$filter',
		'$q',
		'$http',
		'$route',
		'ngmUser',
		'ngmAuth',
		'ngmData',
		'ngmClusterHelper',
		'ngmClusterLists',
		'config',
		function (
			$scope,
			$location,
			$timeout,
			$filter,
			$q,
			$http,
			$route,
			ngmUser,
			ngmAuth,
			ngmData,
			ngmClusterHelper,
			ngmClusterLists,
			config) {

			// this should be a directive - sorry Steve Jobs!
			$scope.scope = $scope;
			$scope.ngmClusterLists = ngmClusterLists;
			// project
			$scope.master = {

				// defaults
				user: ngmUser.get(),
				style: config.style,
				clusters: ngmClusterLists.getClusters('all'),


				/**** TEMPLATES ****/

				// url
				// templatesUrl: '/scripts/modules/cluster/views/forms/report/',
				// templates
				// locationsUrl: 'location/locations.html',
				// addLocationUrl: 'location/add.location.html',
				// beneficiariesTrainingUrl: 'beneficiaries/2016/beneficiaries-training.html',
				// beneficiariesDefaultUrl: 'beneficiaries/2016/beneficiaries-health-2016.html',
				// template_distribution_date: 'beneficiaries/ET/distribution_date.html',
				// template_partial_kits: 'beneficiaries/ET/partial_kits.html',
				// template_kit_details: 'beneficiaries/ET/kit_details.html',
				// notesUrl: 'notes.html',

				// init lists
				init: function () {

				},
				check:function(a){
					// $timeout(function () {

					// 	if ($scope.master.activities.map(function (e) { return e.cluster_id; }).indexOf(a)>-1){
					// 		return true
					// 	} else{
					// 		return false
					// 	}
					// },400)
					console.log(a);
				},
				addNewTypeActivity:function(a,b,c){
					var temp = {};
					temp.admin0pcode = $scope.master.user.admin0pcode;
					temp.cluster_id = a;
					temp.cluster = b;
					temp.activity_type_name = $scope.master.originType.activity_type_name;
					temp.activity_type_id = $scope.master.originType.activity_type_name.toLowerCase().replace(/ /g, "_");
					temp.activity_description_name='';
					temp.activity_description_id = '';
					temp.activity_detail_id='';
					temp.activity_detail_name='';
					temp.indicator_id='';
					temp.indicator_name='';
					$scope.master.activities.push(temp);
					$scope.master.activity_type.push(temp);
					// after push
					$scope.master.originType.activity_type_name='';
				},
				addNewDescOfTypeActivity:function(a){
					var x = angular.copy(a);
					x.activity_description_name = $scope.master.originType.activity_description_name;
					x.activity_description_id = $scope.master.originType.activity_description_name.toLowerCase().replace(/ /g, "_")
					$scope.master.activities.push(x);
					// after push
					$scope.master.originType.activity_description_name = '';

				},
				openModal: function (modal) {
					$('#' + modal).openModal({ dismissible: false });
				},
				// process adding previous report data
				addPrevReport: function (prev_report) {
					angular.forEach(prev_report.locations, function (l, i) {

						var project_id = l.project_id; site_id = l.site_id; site_name = l.site_name; admin1pcode = l.admin1pcode; admin2pcode = l.admin2pcode;

						var $loc = $scope.project.report.locations.find(function (l) {
							return (l.site_id === site_id) && (l.project_id === project_id) && (l.site_name === site_name) && (l.admin1pcode === admin1pcode) && (l.admin2pcode === admin2pcode);
						})

						if ($loc !== undefined) {

							angular.forEach(l.beneficiaries, function (b, i) {
								$scope.insertedBeneficiary = ngmClusterHelper.getCleanBeneficiaryforCopy(b, $loc, $scope.project.report);
								$scope.project.report.locations.find(function (l) {
									return (l.site_id === site_id) && (l.project_id === project_id) && (l.site_name === site_name) && (l.admin1pcode === admin1pcode) && (l.admin2pcode === admin2pcode);
								}).beneficiaries.push($scope.insertedBeneficiary);
							})

							angular.forEach(l.trainings, function (t, j) {
								$scope.insertedTraining = ngmClusterHelper.getCleanTrainingsforCopy(t, $loc, $scope.project.report);
								$scope.project.report.locations.find(function (l) {
									return (l.site_id === site_id) && (l.project_id === project_id) && (l.site_name === site_name) && (l.admin1pcode === admin1pcode) && (l.admin2pcode === admin2pcode);
								}).trainings.push($scope.insertedTraining);
							})

						} else {
							new_location = ngmClusterHelper.getCleanCopyLocation(l, $scope.project.report);
							$scope.project.report.locations.push(new_location);
						}
					})
				},

				// entry copy previous report
				copyPrevReport: function () {
					Materialize.toast('Getting Data...', 1500, 'note');
					$scope.deactivedCopybutton = true;
					$scope.addBeneficiaryDisable = true;
					var setParam = {}
					if (config.report.report_month < 1) {
						setParam = {
							id: $route.current.params.report,
							project_id: $route.current.params.project,
							month: 11,
							year: config.report.report_year - 1,
							previous: true
						}
					} else {
						setParam = {
							id: $route.current.params.report,
							project_id: $route.current.params.project,
							month: config.report.report_month - 1,
							// month: config.report.report_month,							
							year: config.report.report_year,
							previous: true
						}
					}


					var getPrevReport = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/report/getReport',
						data: setParam
					}

					ngmData.get(getPrevReport).then(function (prev_report) {

						var brows = 0;
						var trows = 0;
						var info = "Save to apply changes"
						angular.forEach(prev_report.locations, function (l) {
							brows += l.beneficiaries.length;
							trows += l.trainings.length;
						})

						if (!brows && !trows) {
							if (Object.keys(prev_report).length) {
								var msg = "No data in previous report";
								typ = 'success';
							} else {
								var msg = "No previous report";
								typ = 'success';
							}
							$scope.deactivedCopybutton = false;

							Materialize.toast(msg, 3000, typ);

						} else {
							Materialize.toast('Copying ...', 1500, 'note');
							if (!brows && trows > 0) {
								var msg = 'Copied Trainings ' + trows + ' rows';
								typ = 'success';
							} else if (brows > 0 && !trows) {
								var msg = "Copied Beneficiaries " + brows + ' rows';
								typ = 'success';
							} else {
								var msg = 'Copied beneficiaries ' + brows + ' rows' + " and " + 'trainings ' + trows + ' rows';
								typ = 'success';
							}

							$scope.project.addPrevReport(prev_report);
							$timeout(function () {
								countNewLocation = 0;
								angular.forEach($scope.project.report.locations, function (loc) {
									if (!loc.id) {
										countNewLocation += 1;
									}
								})
								if (countNewLocation > 0) {
									msg += " and " + countNewLocation + " location"
								}
								Materialize.toast(msg, 4000, typ);
								Materialize.toast(info, 4500, 'note');
							}, 1500);
						}
						$scope.addBeneficiaryDisable = false;

					}).catch(function (e) {
						Materialize.toast("Error, Not copied", 3000, 'error');
						$scope.addBeneficiaryDisable = false;
						$scope.deactivedCopybutton = false;
					})
				},

				// active deactivate copy previoust month
				activePrevReportButton: function () {

					$scope.beneficiariesCount = 0;
					$scope.trainingsCount = 0;
					$scope.project.report.locations.forEach(function (l) {
						$scope.beneficiariesCount += l.beneficiaries.length;
						if (l.trainings) {
							$scope.trainingsCount += l.trainings.length;
						}
					})

					if ($scope.project.report.report_status !== 'todo' || (($scope.beneficiariesCount > 0) || ($scope.trainingsCount > 0))) {
						$scope.deactivedCopybutton = true;
						return $scope.deactivedCopybutton
					} else {
						$scope.deactivedCopybutton = false;
						return $scope.deactivedCopybutton;
					}

				},


				// save
				save: function (complete, display_modal) {

					// if textarea
					$('textarea[name="notes"]').removeClass('ng-untouched').addClass('ng-touched');
					$('textarea[name="notes"]').removeClass('invalid').addClass('valid');

					// report
					// $scope.project.report.submit = true;
					$scope.project.report.report_status = complete ? 'complete' : 'todo';
					$scope.project.report.report_submitted = moment().format();

					// update project details of report + locations + beneficiaries
					$scope.project.report =
						ngmClusterHelper.getCleanReport($scope.project.definition, $scope.project.report);

					// msg
					Materialize.toast('Processing Report...', 3000, 'note');

					// setReportRequest
					var setReportRequest = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/report/setReport',
						data: { report: $scope.project.report }
					}

					// set report
					$http(setReportRequest).success(function (report) {

						if (report.err) {
							// update
							Materialize.toast('Error! Please correct the ROW and try again', 6000, 'error');
						}

						if (!report.err) {

							// updated report
							$scope.project.report = report;
							$scope.project.report.submit = false;

							// user msg
							var msg = 'Project Report for  ' + moment.utc($scope.project.report.reporting_period).format('MMMM, YYYY') + ' ';
							msg += complete ? 'Submitted!' : 'Saved!';

							// msg
							$timeout(function () { Materialize.toast(msg, 3000, 'success'); }, 600);

							// set trigger
							$('.modal-trigger').leanModal();

							// Re-direct to summary
							if ($scope.project.report.report_status !== 'complete') {

								// notification modal
								if (display_modal) {
									$timeout(function () {
										$location.path('/cluster/projects/report/' + $scope.project.definition.id);
									}, 400);
								}

							} else {
								$timeout(function () {
									$location.path('/cluster/projects/report/' + $scope.project.definition.id);
								}, 400);
							}
						}
					}).error(function (err) {
						// update
						Materialize.toast('Error!', 6000, 'error');
					});;

				}

			}

			// init project

			// $scope.master.activePrevReportButton();
			var getActivities= {
				method: 'GET',
					url: ngmAuth.LOCATION + '/api/cluster/list/activities'
			};

			$http(getActivities).success(function (act) {
				$scope.master.activities = act;
				$scope.master.activity_type= ngmClusterLists.filterDuplicates(act, 'activity_type_name')
				$scope.master.originType = {
					cluster:'',
					cluster_id:'',
					activity_description_id:'',
					activity_description_name:'',
					activity_type_id:'',
					activity_type_name: '',
				};
				$scope.master.init();
				console.log($scope.master.user.roles);
				
				if ($scope.master.user.roles.indexOf('SUPERADMIN')>-1){
					$scope.master.role='super';
					console.log($scope.master.role, $scope.master.activities)
				}
				// INPUT NEW DATA
				$scope.activeNewTypeForm = Array($scope.master.clusters.length).fill(false);
				$scope.activeNewDescForm = Array($scope.master.activity_type).fill(false);
				$scope.onOff = function (index) {
					$scope.activeNewTypeForm[index] = true;
				}
				$scope.ofOff = function (index) {
					$scope.activeNewTypeForm[index] = false;
					$scope.master.originType.activity_type_name = '';
				}
				$scope.onOffD = function (index) {
					$scope.activeNewDescForm[index] = true;
				}
				$scope.ofOffD = function (index) {
					$scope.activeNewDescForm[index] = false;
					$scope.master.originType.activity_description_name = '';
				}
			})

		}

	]);

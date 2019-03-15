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


				// init lists
				init: function (data) {
					$scope.master.activities = data;
					$scope.master.activity_type = ngmClusterLists.filterDuplicates(data, 'activity_type_name');
					$scope.master.originType = Array($scope.master.activity_type.length).fill({
						cluster: '',
						cluster_id: '',
						activity_description_id: '',
						activity_description_name: '',
						activity_type_id: '',
						activity_type_name: '',
						detail: 0,
						indicator: 0,
						category_type_id: 0,
						delivery_type_id: 0,
						mpc_delivery_type_id: 0,
						mpc_mechanism_type_id: 0,
						package_type_id: 0,
						units: 0,
						unit_type_id: 0,
						transfer_type_id: 0,
						households: 0,
						families: 0,
						boys: 0,
						girls: 0,
						men: 0,
						women: 0,
						elderly_men: 0,
						elderly_women: 0,

					});					
					$scope.master.templateAddDescription = {
						cluster: '',
						cluster_id: '',
						activity_description_id: '',
						activity_description_name: '',
						activity_type_id: '',
						activity_type_name: '',
						detail: 0,
						indicator: 0,
						category_type_id: 0,
						delivery_type_id: 0,
						mpc_delivery_type_id: 0,
						mpc_mechanism_type_id: 0,
						package_type_id: 0,
						units: 0,
						unit_type_id: 0,
						transfer_type_id: 0,
						households: 0,
						families: 0,
						boys: 0,
						girls: 0,
						men: 0,
						women: 0,
						elderly_men: 0,
						elderly_women: 0,

					}
					$scope.master.templateAddType ={
						activity_type_id:'',
						activity_type_name:''
					}
					$scope.fields={
						detail:'Detail',
						indicator:'Indicator',
						category_type_id: 'Category',
						delivery_type_id: 'Delivery',
						mpc_delivery_type_id:'MPC Delivery',
						mpc_mechanism_type_id:'Mechanism',
						package_type_id:'Package',
						unit_type_id:'Unit Type',
						units:'Unit',
						transfer_type_id:'Transfer',
						families:'Families',
						boys:'Boys',
						girls:'Girls',
						men:'Men',
						women:'Women',
						elderly_men:'Elderly Men',
						elderly_women:'Elderly Women'
					}
					$scope.master.resetOrigin = angular.copy($scope.master.originType[0])
				},
				check:function(a){
					// $timeout(function () {

					// 	if ($scope.master.activities.map(function (e) { return e.cluster_id; }).indexOf(a)>-1){
					// 		return true
					// 	} else{
					// 		return false
					// 	}
					// },400)
					// console.log(a);
				},
				addNewTypeActivity:function(a,b,c){
					var temp = {};
					temp.admin0pcode = $scope.master.user.admin0pcode;
					temp.cluster_id = a;
					temp.cluster = b;
					temp.activity_type_name = $scope.master.templateAddType.activity_type_name;
					temp.activity_type_id = $scope.master.templateAddType.activity_type_name.toLowerCase().replace(/ /g, "_");
					temp.activity_description_name='';
					temp.activity_description_id = '';
					temp.activity_detail_id='';
					temp.activity_detail_name='';
					temp.indicator_id='';
					temp.indicator_name='';
					temp.detail = 0;
					temp.indicator= 0;
					temp.category_type_id = 0,
					temp.delivery_type_id =0,
					temp.mpc_delivery_type_id=0,
					temp.mpc_mechanism_type_id=0,
					temp.package_type_id=0,
					temp.units=0,
					temp.unit_type_id=0,
					temp.transfer_type_id=0,
					temp.households=0,
					temp.families=0,
					temp.boys=0,
					temp.girls=0,
					temp.men=0,
					temp.women=0,
					temp.elderly_men=0,
					temp.elderly_women=0
					$scope.master.activities.push(temp);
					$scope.master.activity_type.push(temp);
					// after push
					$scope.master.reset();
				},
				addNewTypeActivityModal:function(){
					var temp = {};
					temp.admin0pcode = $scope.master.user.admin0pcode;
					temp.cluster_id = $scope.addClusterId;
					temp.cluster = $scope.addClusterName;
					temp.activity_type_name = $scope.master.templateAddType.activity_type_name;
					temp.activity_type_id = $scope.master.templateAddType.activity_type_name.toLowerCase().replace(/ /g, "_");
					temp.activity_description_name='';
					temp.activity_description_id = '';
					temp.activity_detail_id='';
					temp.activity_detail_name='';
					temp.indicator_id='';
					temp.indicator_name='';
					temp.detail = 0;
					temp.indicator= 0;
					temp.category_type_id = 0,
					temp.delivery_type_id =0,
					temp.mpc_delivery_type_id=0,
					temp.mpc_mechanism_type_id=0,
					temp.package_type_id=0,
					temp.units=0,
					temp.unit_type_id=0,
					temp.transfer_type_id=0,
					temp.households=0,
					temp.families=0,
					temp.boys=0,
					temp.girls=0,
					temp.men=0,
					temp.women=0,
					temp.elderly_men=0,
					temp.elderly_women=0
					$scope.master.activities.push(temp);
					$scope.master.activity_type.push(temp);
					// after push
					$scope.master.reset();
				},
				changeActField:function(field,index){
					if ($scope.master.originType[field][index]==0){
						$scope.master.originType[field][index] = 1;
					} else{
						$scope.master.originType[field][index] = 0;
					}
					return $scope.master.originType[field][index];
				},
				setFieldDesc:function(field){
					var idEl= field+'-desc-'+$scope.addId;
					if (document.getElementById(idEl).checked) {
						$scope.master.originType[$scope.addId][field] = 1;

					} else {
						$scope.master.originType[$scope.addId][field] = 0;
						
					}
				},
				setFieldDescModal: function (field) {
					var idEl = field + '-add';
					
					if (document.getElementById(idEl).checked) {
						$scope.master.templateAddDescription[field] = 1;
						
					} else {
						$scope.master.templateAddDescription[field] = 0;
						
					}
				},
				editFieldDescModal: function (field) {
					var idEl = field + '-edit';
					if (document.getElementById(idEl).checked) {
						$scope.master.activities[$scope.editedId][field] = 1;

					} else {
						$scope.master.activities[$scope.editedId][field] = 0;

					}
				},
				setClusterType:function(cluster,clusterId){
					$scope.addClusterName=cluster;
					$scope.addClusterId= clusterId;
				},
				addNewDescOfTypeActivity:function(a,index){
					var x = angular.copy(a);
					delete x.id;
					x.activity_description_name = $scope.master.originType[index].activity_description_name;
					x.activity_description_id = $scope.master.originType[index].activity_description_name.toLowerCase().replace(/ /g, "_")
					x.admin0pcode = $scope.master.user.admin0pcode;
					x.detail = $scope.master.originType[index].detail;
					x.indicator = $scope.master.originType[index].indicator;
					x.category_type_id = $scope.master.originType[index].category_type_id,
					x.delivery_type_id = $scope.master.originType[index].delivery_type_id,
					x.mpc_delivery_type_id = $scope.master.originType[index].mpc_delivery_type_id,
					x.mpc_mechanism_type_id = $scope.master.originType[index].mpc_mechanism_type_id,
					x.package_type_id = $scope.master.originType[index].package_type_id,
					x.units = $scope.master.originType[index].units,
					x.unit_type_id = $scope.master.originType[index].unit_type_id,
					x.transfer_type_id = $scope.master.originType[index].transfer_type_id,
					x.households = $scope.master.originType[index].households,
					x.families = $scope.master.originType[index].families,
					x.boys = $scope.master.originType[index].boys,
					x.girls = $scope.master.originType[index].girls,
					x.men = $scope.master.originType[index].men,
					x.women = $scope.master.originType[index].women,
					x.elderly_men = $scope.master.originType[index].elderly_men,
					x.elderly_women = $scope.master.originType[index].elderly_women,
					$scope.master.activities.push(x);
					$scope.master.temp.push(x);
					// // after push
					$scope.master.reset(index);

				},
				addNewDescOfTypeActivityModal: function () {
					var index = $scope.addId;
					var x = angular.copy($scope.master.activity_type[index]);
					delete x.id;
					x.activity_description_name = $scope.master.templateAddDescription.activity_description_name;
					x.activity_description_id = $scope.master.templateAddDescription.activity_description_name.toLowerCase().replace(/ /g, "_")
					x.admin0pcode = $scope.master.user.admin0pcode;
					x.detail = $scope.master.templateAddDescription.detail;
					x.indicator = $scope.master.templateAddDescription.indicator;
					x.category_type_id = $scope.master.templateAddDescription.category_type_id,
						x.delivery_type_id = $scope.master.templateAddDescription.delivery_type_id,
						x.mpc_delivery_type_id = $scope.master.templateAddDescription.mpc_delivery_type_id,
						x.mpc_mechanism_type_id = $scope.master.templateAddDescription.mpc_mechanism_type_id,
						x.package_type_id = $scope.master.templateAddDescription.package_type_id,
						x.units = $scope.master.templateAddDescription.units,
						x.unit_type_id = $scope.master.templateAddDescription.unit_type_id,
						x.transfer_type_id = $scope.master.templateAddDescription.transfer_type_id,
						x.households = $scope.master.templateAddDescription.households,
						x.families = $scope.master.templateAddDescription.families,
						x.boys = $scope.master.templateAddDescription.boys,
						x.girls = $scope.master.templateAddDescription.girls,
						x.men = $scope.master.templateAddDescription.men,
						x.women = $scope.master.templateAddDescription.women,
						x.elderly_men = $scope.master.templateAddDescription.elderly_men,
						x.elderly_women = $scope.master.templateAddDescription.elderly_women,
						console.log(x);
						$scope.master.activities.push(x);
					$scope.master.temp.push(x);
					// // after push
					$scope.master.reset(index);

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

				//edit,remove,activate
				modifRecord:function(record){
					var index = $scope.master.activities.findIndex(function (x) { return x.activity_description_id == record.activity_description_id} );
					$scope.editedId = index;
				},

				activatedActInCluster:function(){
					$scope.master.activities[$scope.editedId].admin0pcode = $scope.master.activities[$scope.editedId].admin0pcode + ', ' + $scope.master.user.admin0pcode;
				},

				deactivatedActInCluster:function () {
					var change = new RegExp($scope.master.user.admin0pcode,"g")
					$scope.master.activities[$scope.editedId].admin0pcode=$scope.master.activities[$scope.editedId].admin0pcode.replace(change, ' ')
					var clean = new RegExp(' ,',"g");
					$scope.master.activities[$scope.editedId].admin0pcode = $scope.master.activities[$scope.editedId].admin0pcode.replace(clean, '')

				},

				editAct:function(){
					var id =$scope.master.activities[$scope.editedId]//.activity_description_name//.toLowerCase().replace(/[()]/g, "").replace(/ /g,"_")
				},

				removeAct:function(){
					$scope.master.activities.splice($scope.editedId,1);
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
				reset:function(index){
					$scope.master.originType[index]=$scope.master.resetOrigin;
					$scope.master.templateAddDescription = {
						cluster: '',
						cluster_id: '',
						activity_description_id: '',
						activity_description_name: '',
						activity_type_id: '',
						activity_type_name: '',
						detail: 0,
						indicator: 0,
						category_type_id: 0,
						delivery_type_id: 0,
						mpc_delivery_type_id: 0,
						mpc_mechanism_type_id: 0,
						package_type_id: 0,
						units: 0,
						unit_type_id: 0,
						transfer_type_id: 0,
						households: 0,
						families: 0,
						boys: 0,
						girls: 0,
						men: 0,
						women: 0,
						elderly_men: 0,
						elderly_women: 0,
					};
					$scope.master.templateAddType = {
						activity_type_id: '',
						activity_type_name: ''
					} ;
				},
				setAdd:function(index){
					$scope.addId = index;
				},


				// save
				save: function (complete, display_modal) {
					// console.log($scope.master.temp);
					// if textarea
					// $('textarea[name="notes"]').removeClass('ng-untouched').addClass('ng-touched');
					// $('textarea[name="notes"]').removeClass('invalid').addClass('valid');

					// report
					// $scope.project.report.submit = true;
					// $scope.project.report.report_status = complete ? 'complete' : 'todo';
					// $scope.project.report.report_submitted = moment().format();

					// update project details of report + locations + beneficiaries
					// $scope.project.report =
					// 	ngmClusterHelper.getCleanReport($scope.project.definition, $scope.project.report);

					// msg
					Materialize.toast('Processing...', 3000, 'note');

					// setReportRequest
					var setReportRequest = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/list/setActivities',
						data: { activities: $scope.master.temp }
					}

					// set report
					// $http(setReportRequest).success(function (activies) {

					// 	if (activies.err) {
					// 		// update
					// 		Materialize.toast('Error! Please correct the ROW and try again', 6000, 'error');
					// 	}

					// 	if (!activies.err) {


					// 		// msg
					// 		$timeout(function () { Materialize.toast("sukses", 3000, 'success'); }, 600);

					// 		// set trigger
					// 		$('.modal-trigger').leanModal();

					// 	}
					// }).error(function (err) {
					// 	// update
					// 	Materialize.toast('Error!', 6000, 'error');
					// });

				}

			}

			// init project

			// $scope.master.activePrevReportButton();
			var getActivities= {
				method: 'GET',
					url: ngmAuth.LOCATION + '/api/cluster/list/activities'
			};

			$http(getActivities).success(function (act) {
				// $scope.master.activities = act
				// $scope.master.activity_type= ngmClusterLists.filterDuplicates(act, 'activity_type_name')
				// $scope.master.originType = Array($scope.master.activity_type.length).fill({
				// 	cluster:'',
				// 	cluster_id:'',
				// 	activity_description_id:'',
				// 	activity_description_name:'',
				// 	activity_type_id:'',
				// 	activity_type_name: '',
				// 	detail:0,
				// 	indicator:0,
				// 	category_type_id:0,
				// 	delivery_type_id:0,
				// 	mpc_delivery_type_id:0,
				// 	mpc_mechanism_type_id:0,
				// 	package_type_id:0,
				// 	units:0,
				// 	unit_type_id:0,
				// 	transfer_type_id:0,
				// 	households:0,
				// 	families:0,
				// 	boys:0,
				// 	girls:0,
				// 	men:0,
				// 	women:0,
				// 	elderly_men:0,
				// 	elderly_women:0,

				// });
				// $scope.master.resetOrigin = angular.copy($scope.master.originType[0])
				$scope.master.temp=[];
				$scope.master.init(act);				
				
				if ($scope.master.user.roles.indexOf('SUPERADMIN')>-1){
					$scope.master.role='super';					
				}
				// INPUT NEW DATA
				$scope.clusterCard = Array($scope.master.clusters.length).fill(false);
				$scope.activeNewTypeForm = Array($scope.master.clusters.length).fill(false);
				// $scope.activeNewDescForm = Array($scope.master.activity_type.length).fill(false);
				$scope.openCluster= function(index){
					$scope.clusterCard[index] = true;
				};
				$scope.closeCluster = function (index) {
					$scope.clusterCard[index] = false;
				}
				// $scope.onOff = function (index) {
				// 	$scope.activeNewTypeForm[index] = true;
				// }
				// $scope.ofOff = function (index) {
				// 	$scope.activeNewTypeForm[index] = false;
				// 	$scope.master.originType.activity_type_name = '';
				// }
				// $scope.onOffD = function (index) {
				// 	$scope.activeNewDescForm[index] = true;
				// }
				// $scope.ofOffD = function (index) {
				// 	$scope.activeNewDescForm[index] = false;
				// 	$scope.master.originType.activity_description_name = '';
				// }
			})

		}

	]);


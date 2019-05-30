/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectFormReportCtrl
 * @description
 * # ClusterProjectFormReportCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.imo.report', ['ngm.provider'])
	.config(function (dashboardProvider) {
		dashboardProvider
			.widget('imo.report', {
				title: 'Imo Reports Form',
				description: 'Imo Reports Form',
				controller: 'ImoFormReportCtrl',
				templateUrl: '/scripts/modules/imo-immap/reports/views/imo.form.report.html'
			});
	})
	.controller('ImoFormReportCtrl', [
		'$scope',
		'$location',
		'$timeout',
		'$filter',
		'$q',
		'$http',
		'$route',
		'$sce',
		'ngmUser',
		'ngmAuth',
		'ngmData',
		'ngmClusterHelper',
		'ngmClusterLists',
		'ngmClusterLocations',
		'ngmClusterBeneficiaries',
		'ngmClusterTrainings',
		'ngmClusterValidation',
		'ngmClusterHelperAf',
		'ngmClusterHelperNgWash',
		'ngmClusterHelperNgWashLists',
		'ngmClusterHelperNgWashValidation',
		'ngmClusterHelperCol',
		'ngmCbBeneficiaries',
		'ngmClusterDocument',
		// 'NgTableParams',
		'config', '$translate', '$filter',

		function (
			$scope,
			$location,
			$timeout,
			$filter,
			$q,
			$http,
			$route,
			$sce,
			ngmUser,
			ngmAuth,
			ngmData,
			ngmClusterHelper,
			ngmClusterLists,
			ngmClusterLocations,
			ngmClusterBeneficiaries,
			ngmClusterTrainings,
			ngmClusterValidation,
			ngmClusterHelperAf,
			ngmClusterHelperNgWash,
			ngmClusterHelperNgWashLists,
			ngmClusterHelperNgWashValidation,
			ngmClusterHelperCol,
			ngmCbBeneficiaries,
			ngmClusterDocument,
			// NgTableParams,
			config, $translate, $filter) {


			/**** TRAINING SERVICE ****/

			// link for ngmClusterTrainings service directly into the template
			// this should be a directive - sorry Steve Jobs!
			$scope.scope = $scope;
			$scope.ngmClusterLists = ngmClusterLists;
			$scope.ngmClusterLocations = ngmClusterLocations;
			$scope.ngmClusterBeneficiaries = ngmClusterBeneficiaries;
			$scope.ngmClusterTrainings = ngmClusterTrainings;
			$scope.ngmClusterValidation = ngmClusterValidation;
			$scope.ngmClusterHelperNgWash = ngmClusterHelperNgWash;
			$scope.ngmClusterHelperNgWashLists = ngmClusterHelperNgWashLists;
			$scope.ngmClusterHelperNgWashValidation = ngmClusterHelperNgWashValidation;
			$scope.ngmClusterHelperCol = ngmClusterHelperCol;
			$scope.ngmCbBeneficiaries = ngmCbBeneficiaries;
			$scope.ngmClusterDocument = ngmClusterDocument;
			$scope.deactivedCopybutton = false;

			// project
			$scope.project = {

				// defaults
				user: ngmUser.get(),
				style: config.style,
				imo_report:config.imo_report,
				newProject: $route.current.params.id === 'new' ? true : false,
				definition: config.project,
				report: config.report,
				location_group: config.location_group,
				canEdit: ngmAuth.canDo('EDIT', { adminRpcode: config.project.adminRpcode, admin0pcode: config.project.admin0pcode, cluster_id: config.project.cluster_id, organization_tag: config.project.organization_tag }),
				updatedAt: moment(config.report.updatedAt).format('DD MMMM, YYYY @ h:mm:ss a'),
				monthlyTitleFormat: moment.utc([config.report.report_year, config.report.report_month, 1]).format('MMMM, YYYY'),
				monthNameFormat: moment.utc([config.report.report_year, config.report.report_month, 1]).format('MMM'),
				previousMonth: moment.utc([config.report.report_year, config.report.report_month, 1]).subtract(1, 'month').format("MMMM, YYYY"),

				// lists ( project, mpc transfers )
				lists: ngmClusterLists.setLists(config.project, 10),


				/**** TEMPLATES ****/

				// url
				// templatesUrl: '/scripts/modules/cluster/views/forms/report/',
				templatesUrl:'/scripts/modules/imo-immap/reports/views/',
				// templates
				partnerUrl:'partner.html',
				plannedUrl:'planned_activity.html',

				// init lists
				init: function () {
					// usd default currency
					if (!$scope.project.definition.project_budget_currency) {
						$scope.project.definition.project_budget_currency = 'usd';
					}
					// sort locations
					$scope.project.report.locations = $filter('orderBy')($scope.project.report.locations, ['site_type_name', 'admin1name', 'admin2name', 'admin3name', 'site_name']);
					// set org users
					ngmClusterLists.setOrganizationUsersList($scope.project.lists, config.project);
					// set form on page load
					ngmClusterHelper.setForm($scope.project.definition, $scope.project.lists);
					// set columns / rows
					ngmClusterBeneficiaries.setLocationsForm($scope.project.lists, $scope.project.report.locations);
					// $scope.project.setTokenUpload();
				},

				// beneficairies template
				// cancel monthly report
				cancel: function () {
					$timeout(function () {
						if ($scope.project.location_group) {
							$location.path('/cluster/projects/group/' + $scope.project.definition.id + '/' + $scope.project.report.id);
						} else {
							$location.path('/cluster/projects/report/' + $scope.project.definition.id);
						}
					}, 400);
				},

				// save form on enter
				keydownSaveForm: function () {
					$timeout(function () {
						$('.editable-input').keydown(function (e) {
							var keypressed = e.keyCode || e.which;
							if (keypressed == 13) {
								$('.save').trigger('click');
							}
						});
					}, 0);
				},


				// ################################STARt HERe
				// dummy-date
				partnerCategory: [{ id: '01', name: ' Management' }, { id: '02', name: 'Coordination' }, { id: '03', name: 'data' }],
				partner: [{ id: '02', category_id: '01', name: ' ORGA' }, { id: '02', category_id: '02', name: 'ORGB' }, { id: '03', category_id: '03', name: 'ORGC' }],
				areaActivity: [{ id: '01', name: 'Information Management' }, { id: '02', name: 'Coordination' }, { id: '03',name: 'DRR' }],
				narativeActivity: [{ id: '01', name: 'Information Management Narative' }, { id: '02', name: 'Coordination Narative' }, { id: '03', name: 'DRR Narative' }],
				products: [{ id: '01', name: 'Infographic' }, { id: '02', name: 'Map' }, { id: '03', name: 'other' }],
				collab: [{ id: '01', name: 'YY' }, { id: '02', name: 'CC' }, { id: '03', name: 'AA' }],
				rating:[1,2,3,4,5],

				// display
				displayPartnerCategory: function (project, $data, $partner) {
					var selected = [];
					$partner.category_id = $data;
					selected = $filter('filter')(project.partnerCategory, { id: $partner.category_id }, true);
					if (selected && selected.length) {
						$partner.category_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPartner: function (project, $data, $partner) {
					var selected = [];
					$partner.partner_id = $data;
					selected = $filter('filter')(project.partner, { id: $partner.partner_id }, true);
					if (selected && selected.length) {
						$partner.partner = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayAreaActivity:function(project,$data, $partner){
					var selected = [];
					$partner.area_activity_id = $data;					
					selected = $filter('filter')(project.areaActivity, { id: $partner.area_activity_id }, true);
					if (selected && selected.length) {
						$partner.area_activity_name = selected.length?selected[0].name:'-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayNarativeActivity: function (project, $data, $partner) {
					var selected = [];
					$partner.narative_activity_id = $data;
					selected = $filter('filter')(project.narativeActivity, { id: $partner.narative_activity_id }, true);
					if (selected && selected.length) {
						$partner.narative_activity_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayProducts: function (project, $data, $partner) {
					var selected = [];
					$partner.product_id = $data;
					selected = $filter('filter')(project.products, { id: $partner.product_id }, true);
					if (selected && selected.length) {
						$partner.product_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayCollab: function (project, $data, $partner) {
					var selected = [];
					$partner.collab_id = $data;
					selected = $filter('filter')(project.collab, { id: $partner.collab_id }, true);
					if (selected && selected.length) {
						$partner.collab_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPlannedAreaActivity: function (project, $data, $planned) {
					var selected = [];
					$planned.area_activity_id = $data;
					selected = $filter('filter')(project.areaActivity, { id: $planned.area_activity_id }, true);
					if (selected && selected.length) {
						$planned.area_activity_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPlannedNarativeActivity: function (project, $data, $planned) {
					var selected = [];
					$planned.narative_activity_id = $data;
					selected = $filter('filter')(project.narativeActivity, { id: $planned.narative_activity_id }, true);
					if (selected && selected.length) {
						$planned.narative_activity_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPlannedProducts: function (project, $data, $planned) {
					var selected = [];
					$planned.product_id = $data;
					selected = $filter('filter')(project.products, { id: $planned.product_id }, true);
					if (selected && selected.length) {
						$planned.product_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				updateInputProduct:function($data,$partner){
					$partner.number_products= $data;
				},
				updatePlannedInputProduct: function ($data, $partner) {
					$partner.number_products = $data;
				},
				
				// add beneficiary
				addPartner: function () {
					$scope.inserted = {
						file:[],
						category_id: '',
						partner_id: '',
						area_activity_id:'',
						narative_activity_id:'',
						product_id:'',
						collab_id:'',
						number_products:0};
					var length = $scope.project.imo_report.support_partner.length;
					if(length<1){
						$scope.project.imo_report.support_partner.push($scope.inserted);
					}else{
						_copy = angular.copy($scope.project.imo_report.support_partner[length - 1]);
						$scope.inserted.category_id = _copy.category_id;
						$scope.inserted.partner_id = _copy.partner_id;
						$scope.inserted.area_activity_id = _copy.area_activity_id;
						$scope.inserted.narative_activity_id = _copy.narative_activity_id;
						$scope.inserted.product_id = _copy.product_id;
						$scope.inserted.number_products = _copy.number_products;
						$scope.inserted.collab_id = _copy.collab_id;
						$scope.project.imo_report.support_partner.push($scope.inserted);
					}
				},
				addPlanned: function () {
					$scope.inserted = {
						category_id:'',
						partner_id:'',
						area_activity_id: '',
						narative_activity_id: '',
						product_id: '',
						number_products: 0 };
					var length = $scope.project.imo_report.planed_activity.length;
					if (length < 1) {
						$scope.project.imo_report.planed_activity.push($scope.inserted);
					} else {
						_copy=angular.copy($scope.project.imo_report.planed_activity[length - 1]);
						$scope.inserted.category_id= _copy.category_id;
						$scope.inserted.partner_id= 						_copy.partner_id;
						$scope.inserted.area_activity_id= _copy.area_activity_id;
						$scope.inserted.narative_activity_id= _copy.narative_activity_id;
						$scope.inserted.product_id= _copy.product_id;
						$scope.inserted.number_products= _copy.number_products;
						$scope.project.imo_report.planed_activity.push($scope.inserted);
					}
				},

				setRate:function(value){
					$scope.project.imo_report.rating = value;
				},
				// datepicker
				datepicker: {
					maxDate: moment().format('YYYY-MM-DD'),
					onClose: function ($imo) {
						// format date on selection
						$imo.month_date = moment(new Date($imo.month)).format('YYYY-MM-DD');
						$imo.month = moment(new Date($imo.month)).format('M');
					}
				},

				// cek partner row
				supportPartnerFormComplete: function (support_partners) {
					var partners = support_partners.length;
					var rowComplete = 0;
					angular.forEach(support_partners, function (p) {
						if (!$scope.project.rowSaveDisabled(p,'partner')) {
							rowComplete++;
						}
					});
					// return
					if (rowComplete >= partners) {  return true; } else {  return false; }
				},
				plannedFormComplete: function (planed_activity){
					var plan = planed_activity.length;
					var rowComplete = 0;
					angular.forEach(planed_activity, function (p) {
						if (!$scope.project.rowSaveDisabled(p, 'planned')) {
							rowComplete++;
						}
					});
					// return
					if (rowComplete >= plan) { return true; } else { return false; }
				},
				rowSaveDisabled: function ($data,row_type) {
					var disabled = true;
					
					if (row_type === 'partner') {
						
						// if ($data.fileid && $data.category_id &&
						// 	$data.partner_id &&
						// 	$data.area_activity_id &&
						// 	$data.narative_activity_id &&
						// 	$data.collab_id &&
						// 	$data.product_id &&
						// 	$data.number_products >= 0) {
						// 	disabled = false;
						// 	console.log(false);
						// }
						if ($data.file.length && $data.category_id &&
							$data.partner_id &&
							$data.area_activity_id &&
							$data.narative_activity_id &&
							$data.collab_id &&
							$data.product_id &&
							$data.number_products >= 0) {
							disabled = false;
							console.log(false);
						}
					}	
						if(row_type ==='planned'){
								if ($data.category_id &&
										$data.partner_id &&
										$data.area_activity_id &&
										$data.narative_activity_id &&
										$data.product_id &&
										$data.number_products >= 0) {
											disabled =false;
									}
							}								
				return disabled
							
				},
				cancelEdit: function (array, $index) {
					if (!$scope.project.imo_report[array][$index].id) {
						$scope.project.imo_report[array].splice($index, 1);
					}
				},
				removeSupport: function ($index){
					if (!$scope.project.imo_report.support_partner[$index].id) {
						$scope.project.imo_report.support_partner.splice($index, 1);
					}else{
						var id = $scope.project.imo_report.support_partner[$index].id;
						// $http({
						// 	method: 'POST',
						// 	url: ngmAuth.LOCATION + '/api/cluster/report/removeBeneficiary',
						// 	data: { id: id }
						// }).success(function (result) {
						// 	if (result.err) { Materialize.toast('Error! Please correct the ROW and try again', 6000, 'error'); }
						// 	if (!result.err) { $scope.project.saveImoReport(false); }
						// }).error(function (err) {
						// 	Materialize.toast('Error!', 6000, 'error');
						// });
					}
				},
				removePlanned: function ($index) {
					if (!$scope.project.imo_report.planed_activity[$index].id) {
						$scope.project.imo_report.planed_activity.splice($index, 1);
					} else {
						var id = $scope.project.imo_report.planed_activity[$index].id;
						// $http({
						// 	method: 'POST',
						// 	url: ngmAuth.LOCATION + '/api/cluster/report/removeBeneficiary',
						// 	data: { id: id }
						// }).success(function (result) {
						// 	if (result.err) { Materialize.toast('Error! Please correct the ROW and try again', 6000, 'error'); }
						// 	if (!result.err) { $scope.project.saveImoReport(false); }
						// }).error(function (err) {
						// 	Materialize.toast('Error!', 6000, 'error');
						// });
					}
				},
				saveImoReport: function (complete){
					$scope.project.imo_report.report_status = complete ? 'complete' : 'todo';
					$scope.project.imo_report.submit = false;
					if ($scope.project.imo_report.created){
						$scope.project.imo_report.created = moment().format();
					}

					if(complete){
						$scope.project.imo_report.report_status = true;
					}
					console.log("SHOW",$scope.project.imo_report);
				},
				setRowFileId:function(id){
					$scope.setRowFile = id;
				},
				setTokenUpload: function () {
					ngmClusterDocument.setParam($scope.project.user.token);
				},
				uploadDocument: ngmClusterDocument.uploadDocument({
					project_id: 'pln123lstrk456coba78',
					report_id: 'fkhrhwrrfn123test02',
					username: ngmUser.get().username,
					organization_tag: config.report.organization_tag,
					cluster_id: config.report.cluster_id,
					admin0pcode: config.report.admin0pcode,
					adminRpcode: config.report.adminRpcode,
					reporting_period: config.report.reporting_period,
					project_start_date: config.project.project_start_date,
					project_end_date: config.project.project_end_date
				}),
				getDocument: function () {
					ngmData.get({
						method: 'GET',
						url: ngmAuth.LOCATION + '/api/listReportDocuments/fkhrhwrrfn123test02'
					}).then(function (data) {
						l=data.length
						$scope.dummy = data;
						console.log(data, $scope.setRowFile,l);
						// set one row one file
						if ($scope.setRowFile>=0){
							// $scope.project.imo_report.support_partner[$scope.setRowFile].fileid = data[l-1].fileid
							// $scope.project.imo_report.support_partner[$scope.setRowFile].filename = data[l-1].filename
							// $scope.project.imo_report.support_partner[$scope.setRowFile].filename_extension = data[l-1].filename_extension;
							f = data[l - 1];
							$scope.project.imo_report.support_partner[$scope.setRowFile].file.push(f)
							console.log($scope.project.imo_report.support_partner[$scope.setRowFile])
						}
						
					});
				},
			}

			// init project
			$scope.project.init();
			$scope.project.getDocument()
			$scope.$on('refresh:listUpload', function () {
				$scope.project.getDocument();
			})
		}

	]);

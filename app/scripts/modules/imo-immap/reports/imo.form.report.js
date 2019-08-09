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
		'ngmClusterDocument',
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
			ngmClusterDocument,
			config, $translate, $filter) {


			/**** TRAINING SERVICE ****/

			// link for ngmClusterTrainings service directly into the template
			// this should be a directive - sorry Steve Jobs!
			$scope.scope = $scope;
			$scope.ngmClusterLists = ngmClusterLists;
			$scope.ngmClusterDocument = ngmClusterDocument;
			$scope.deactivedCopybutton = false;

			// project
			$scope.report = {

				// defaults
				user: ngmUser.get(),
				style: config.style,
				imo_report:config.imo_report,
				newProject: $route.current.params.id === 'new' ? true : false,
				


				/**** TEMPLATES ****/

				// url
				// templatesUrl: '/scripts/modules/cluster/views/forms/report/',
				templatesUrl:'/scripts/modules/imo-immap/reports/views/',
				// templates
				partnerUrl:'partner.html',
				plannedUrl:'planned_activity.html',

				// init lists
				init: function () {
				},

				// beneficairies template
				// cancel monthly report
				cancel: function () {
					var msg = $scope.report.imo_report.report_status === 'new' ? "Report Canceled" : "Report Not Updated";
					$timeout(function () { Materialize.toast(msg, 4000, 'note'); }, 400);
					$timeout(function () {						
						$location.path('/immap/reporting/report/');						
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
				partnerCategory:[
					{ id: 'humanitarian_partner', name: 'Humanitarian Partner'},
					{ id: 'development_partner', name: 'Development Partner' },
					{ id: 'united_nations_agency', name: 'United Nations Agency' },
					{ id: 'government_institution', name: 'Government Institution' },
					{ id: 'humanitarian_partner', name: 'Cluster, Sub-Cluster or Working Group' },
					{ id: 'other', name: 'Other' },
				],
				partner: [{ id: '02', category_id: 'development_partner', name: ' ORGA' }, { id: '02', category_id: 'humanitarian_partner', name: 'ORGB' }, { id: '03', category_id: 'united_nations_agency', name: 'ORGC' }],
				areaActivity: [{ id: 'information_management_coordination', name:'Information Management and Coordination Support'},
											 {id:'drr',name:'DRR'}],
				narativeActivity: [{ id: '01', name: 'Information Management Narative' }, { id: '02', name: 'Coordination Narative' }, { id: '03', name: 'DRR Narative' }],
				products:[{id:'static_infographic',name:'Static Infographic'},
									{id:'dynamic_infographic',name:'Dynamic Infographic'},
									{id:'training',name:'Training'},
									{id:'map',name:'Map'},
									{id:'printed_product',name:'Printed Product'},
									{id:'meeting',name:'Meeting'}],
				collab: [{ id: '01', name: 'YY' }, { id: '02', name: 'CC' }, { id: '03', name: 'AA' }],
				rating:[1,2,3,4,5],

				// display
				displayPartnerCategory: function (report, $data, $partner) {
					var selected = [];
					// $partner.category_id = $data;
					// selected = $filter('filter')(report.partnerCategory, { id: $partner.category_id }, true);
					// if (selected && selected.length) {
					// 	$partner.category_name = selected.length ? selected[0].name : '-';
					// }
					$partner.partner_category_id = $data;
					selected = $filter('filter')(report.partnerCategory, { id: $partner.partner_category_id }, true);
					if (selected && selected.length) {
						$partner.category_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPartner: function (report, $data, $partner) {
					var selected = [];
					$partner.partner_id = $data;
					selected = $filter('filter')(report.partner, { id: $partner.partner_id }, true);
					if (selected && selected.length) {
						$partner.partner = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayAreaActivity:function(report,$data, $partner){
					var selected = [];
					// $partner.area_activity_id = $data;					
					// selected = $filter('filter')(report.areaActivity, { id: $partner.area_activity_id }, true);
					// if (selected && selected.length) {
					// 	$partner.area_activity_name = selected.length?selected[0].name:'-';
					// }
					$partner.area_id = $data;
					selected = $filter('filter')(report.areaActivity, { id: $partner.area_id }, true);
					if (selected && selected.length) {
						$partner.area_name = selected.length ? selected[0].name : '-';
						console.log($partner.area_name);
					}
					return selected.length ? selected[0].name : '-';
				},
				displayNarativeActivity: function (report, $data, $partner) {
					var selected = [];
					$partner.narative_activity_id = $data;
					selected = $filter('filter')(report.narativeActivity, { id: $partner.narative_activity_id }, true);
					if (selected && selected.length) {
						$partner.narative_activity_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayNarativeActivityText: function ($data, $planned) {
					if ($data) { $planned.narative_activity_id = $data; }
					return $planned.narative_activity_id ? $planned.narative_activity_id : '';
				},
				displayProducts: function (report, $data, $partner) {
					var selected = [];
					$partner.product_id = $data;
					selected = $filter('filter')(report.products, { id: $partner.product_id }, true);
					if (selected && selected.length) {
						$partner.product_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayCollab: function (report, $data, $partner) {
					var selected = [];
					$partner.collab_id = $data;
					selected = $filter('filter')(report.collab, { id: $partner.collab_id }, true);
					if (selected && selected.length) {
						$partner.collab_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPlannedAreaActivity: function (report, $data, $planned) {
					var selected = [];
					// $planned.area_activity_id = $data;
					// selected = $filter('filter')(report.areaActivity, { id: $planned.area_activity_id }, true);
					// if (selected && selected.length) {
					// 	$planned.area_activity_name = selected.length ? selected[0].name : '-';
					// }
					$planned.area_id = $data;
					selected = $filter('filter')(report.areaActivity, { id: $planned.area_activity_id }, true);
					if (selected && selected.length) {
						$planned.area_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPlannedNarativeActivity: function (report, $data, $planned) {
					var selected = [];
					$planned.narative_activity_id = $data;
					selected = $filter('filter')(report.narativeActivity, { id: $planned.narative_activity_id }, true);
					if (selected && selected.length) {
						$planned.narative_activity_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPlannedNarativeActivityText: function ($data, $planned) {
					if ($data) { $planned.narative_activity_id = $data; }
					return $planned.narative_activity_id ? $planned.narative_activity_id : '';
				},
				displayPlannedProducts: function (report, $data, $planned) {
					var selected = [];
					$planned.product_id = $data;
					selected = $filter('filter')(report.products, { id: $planned.product_id }, true);
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
					var length = $scope.report.imo_report.support_partner.length;
					if(length<1){
						$scope.report.imo_report.support_partner.push($scope.inserted);
					}else{
						_copy = angular.copy($scope.report.imo_report.support_partner[length - 1]);
						$scope.inserted.category_id = _copy.category_id;
						$scope.inserted.partner_id = _copy.partner_id;
						$scope.inserted.area_activity_id = _copy.area_activity_id;
						$scope.inserted.narative_activity_id = _copy.narative_activity_id;
						$scope.inserted.product_id = _copy.product_id;
						$scope.inserted.number_products = _copy.number_products;
						$scope.inserted.collab_id = _copy.collab_id;
						$scope.report.imo_report.support_partner.push($scope.inserted);
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
					var length = $scope.report.imo_report.planed_activity.length;
					if (length < 1) {
						$scope.report.imo_report.planed_activity.push($scope.inserted);
					} else {
						_copy=angular.copy($scope.report.imo_report.planed_activity[length - 1]);
						$scope.inserted.category_id= _copy.category_id;
						$scope.inserted.partner_id= 						_copy.partner_id;
						$scope.inserted.area_activity_id= _copy.area_activity_id;
						$scope.inserted.narative_activity_id= _copy.narative_activity_id;
						$scope.inserted.product_id= _copy.product_id;
						$scope.inserted.number_products= _copy.number_products;
						$scope.report.imo_report.planed_activity.push($scope.inserted);
					}
				},

				setRate:function(value){
					$scope.report.imo_report.rating = value;
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
					if(partners>0){
						angular.forEach(support_partners, function (p) {
							if (!$scope.report.rowSaveDisabled(p,'partner')) {
								rowComplete++;
							}
						});
						// return
						if (rowComplete >= partners) {  return true; } else {  return false; }
					}else{
						return false
					}
				},
				plannedFormComplete: function (planed_activity){
					var plan = planed_activity.length;
					var rowComplete = 0;
					angular.forEach(planed_activity, function (p) {
						if (!$scope.report.rowSaveDisabled(p, 'planned')) {
							rowComplete++;
						}
					});
					// return
					if (rowComplete >= plan) { return true; } else { return false; }
				},
				reportFormComplete:function(imo){
					var disabled = true
					if ($scope.report.supportPartnerFormComplete(imo.support_partner) && $scope.report.plannedFormComplete(imo.planed_activity) && imo.rating){						
						disabled= false
					}
					
					return disabled;

				},
				rowSaveDisabled: function ($data,row_type) {
					var disabled = true;
					
					if (row_type === 'partner') {
												
						if ($data.file.length && $data.category_id &&
							$data.partner_id &&
							$data.area_activity_id &&
							$data.narative_activity_id &&
							$data.collab_id &&
							$data.product_id &&
							$data.number_products >= 0) {
							disabled = false;
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
					if (!$scope.report.imo_report[array][$index].id) {
						$scope.report.imo_report[array].splice($index, 1);
					}
				},
				removeSupport: function ($index){
					if (!$scope.report.imo_report.support_partner[$index].id) {
						$scope.report.imo_report.support_partner.splice($index, 1);
					}else{
						var id = $scope.report.imo_report.support_partner[$index].id;
						// $http({
						// 	method: 'POST',
						// 	url: ngmAuth.LOCATION + '/api/cluster/report/removeBeneficiary',
						// 	data: { id: id }
						// }).success(function (result) {
						// 	if (result.err) { Materialize.toast('Error! Please correct the ROW and try again', 6000, 'error'); }
						// 	if (!result.err) { $scope.report.saveImoReport(false); }
						// }).error(function (err) {
						// 	Materialize.toast('Error!', 6000, 'error');
						// });
					}
				},
				removePlanned: function ($index) {
					if (!$scope.report.imo_report.planed_activity[$index].id) {
						$scope.report.imo_report.planed_activity.splice($index, 1);
					} else {
						var id = $scope.report.imo_report.planed_activity[$index].id;
						// $http({
						// 	method: 'POST',
						// 	url: ngmAuth.LOCATION + '/api/cluster/report/removeBeneficiary',
						// 	data: { id: id }
						// }).success(function (result) {
						// 	if (result.err) { Materialize.toast('Error! Please correct the ROW and try again', 6000, 'error'); }
						// 	if (!result.err) { $scope.report.saveImoReport(false); }
						// }).error(function (err) {
						// 	Materialize.toast('Error!', 6000, 'error');
						// });
					}
				},
				saveImoReport: function (complete){
					$scope.report.imo_report.report_status = complete ? 'complete' : 'todo';
					$scope.report.imo_report.report_submit = false;
					if ($scope.report.imo_report.created){
						$scope.report.imo_report.created = moment().format();
					}

					if(complete){
						$scope.report.imo_report.report_submit = true;
					}
					console.log("SHOW",$scope.report.imo_report);
				},
				setRowFileId:function(id){
					$scope.setRowFile = id;
				},
				setTokenUpload: function () {
					ngmClusterDocument.setParam($scope.report.user.token);
				},
				setRemoveRowFile: function ($index, id) {
					$scope.removeFileRow = $index;
					$scope.removeFileId = id;
				},
				uploadDocument: ngmClusterDocument.uploadDocument({
					project_id: 'pln123lstrk456coba78',
					report_id: 'fkhrhwrrfn123test021',
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
						url: ngmAuth.LOCATION + '/api/listReportDocuments/fkhrhwrrfn123test021'
					}).then(function (data) {
						l=data.length
						$scope.dummy = data;
						data = data.slice($scope.file_uploaded);
						data.forEach(element => {
							$scope.report.imo_report.support_partner[$scope.setRowFile].file.push(element)
						});
						
					});
				},
				removeFile:function(){
					$scope.report.imo_report.support_partner[$scope.removeFileRow].file.forEach((el,i)=>{
						if (el.fileid=== $scope.removeFileId){
							$scope.report.imo_report.support_partner[$scope.removeFileRow].file.splice(i,1);
						}
					})
				}
			}

			// init project
			$scope.report.init();
			// $scope.report.getDocument()
			$scope.$on('refresh:listUpload', function (event, args) {
				$scope.report.getDocument();
				$scope.file_uploaded = -Math.abs(args.uploaded_file);
			})
		}

	]);

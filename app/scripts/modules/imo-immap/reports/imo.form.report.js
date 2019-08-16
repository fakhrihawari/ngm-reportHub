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
				newProject: $route.current.params.report_id === 'new' ? true : false,
				


				/**** TEMPLATES ****/

				// url
				// templatesUrl: '/scripts/modules/cluster/views/forms/report/',
				templatesUrl:'/scripts/modules/imo-immap/reports/views/',
				// templates
				partnerUrl:'partner.html',
				plannedUrl:'planned_activity.html',

				// init lists
				init: function () {
					$scope.reportMonth =[];					
					var todo = $http({
						method: 'POST',
						url: 'http://192.168.33.16:80/api/immap/report/getReportsList',
						data: {
							status: 'todo'}
					});
					var complete = $http({
						method: 'POST',
						url: 'http://192.168.33.16:80/api/immap/report/getReportsList',
						data: {
							status: 'complete'
						}
					});
					function pushToArray(arrayOrigin, property1,property2,arrayToPut) {
						angular.forEach(arrayOrigin, function (element) {
							var year = moment(new Date(element[property2])).format('YYYY');
							var month = element[property1];
							arrayToPut.push(year+month)
						})
					}
					// to check the new report has different month than report in report list
					if($scope.report.newProject){
						$q.all([todo, complete]).then(function (results) {
							angular.forEach(results, function (report) {							
								pushToArray(report.data,'report_month','report_date',$scope.reportMonth)
							});
							
						});
					}else{
						$scope.openFormReport = true;
					};

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
						$partner.partner_category_name = selected.length ? selected[0].name : '-';
					}
					return selected.length ? selected[0].name : '-';
				},
				displayPartner: function (report, $data, $partner) {
					var selected = [];
					$partner.partner_id = $data;
					selected = $filter('filter')(report.partner, { id: $partner.partner_id }, true);
					if (selected && selected.length) {
						$partner.partner_name = selected.length ? selected[0].name : '-';
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
				displayNarativeActivityText: function ($data, $partner) {
					if ($data) { $planned.narative_activity_id = $data; }
					return $planned.narative_activity_id ? $planned.narative_activity_id : '';
				},
				displayNarativeText: function ($data, $partner) {
					if ($data) { $partner.narative = $data }
					return $partner.narative ? $partner.narative : '';
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
				displayPlannedNarativeText:function($data, $planned){
					if ($data) { $planned.narative = $data; }
					return $planned.narative ? $planned.narative : '';
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
						// category_id: '',
						partner_category_id:'',
						partner_id: '',
						narative:'',
						// area_activity_id:'',
						// narative_activity_id:'',
						product_id:'',
						collab_id:'',
						number_products:0
					};
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
						// category_id:'',
						partner_category_id: '',
						partner_id:'',
						narative: '',
						// area_activity_id: '',
						// narative_activity_id: '',
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
						// $imo.month_date = moment(new Date($imo.month)).format('YYYY-MM-DD');
						// $imo.month = moment(new Date($imo.month)).format('M');
						$imo.report_date = moment(new Date($imo.report_month)).format('YYYY-MM-DD');
						$imo.report_month = moment(new Date($imo.report_month)).format('M');
						$scope.report.openReport($imo.report_month,$imo.report_date);
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
												
						// if ($data.file.length && $data.category_id &&
						// 	$data.partner_id &&
						// 	$data.area_activity_id &&
						// 	$data.narative_activity_id &&
						// 	$data.collab_id &&
						// 	$data.product_id &&
						// 	$data.number_products >= 0) {
						// 	disabled = false;
						// }
						if ($data.file.length && $data.partner_category_id &&
							$data.partner_id &&
							$data.area_id &&
							$data.narative &&
							$data.collab_id &&
							$data.product_id &&
							$data.number_products >= 0) {
							disabled = false;
						}
					}	
					if(row_type ==='planned'){
							// if ($data.category_id &&
							// 		$data.partner_id &&
							// 		$data.area_activity_id &&
							// 		$data.narative_activity_id &&
							// 		$data.product_id &&
							// 		$data.number_products >= 0) {
							// 				disabled =false;
							// 		}
						if ($data.partner_category_id &&
							$data.partner_id &&
							$data.area_id &&
							$data.narative &&
							$data.product_id &&
							$data.number_products >= 0) {
							disabled = false;
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
					var msg = $scope.report.imo_report.report_status === 'new' ? "Report Created" : "Report Updated";
					Materialize.toast('Processing...', 400, 'note');
					$timeout(function () {
						$location.path('/immap/reporting/report/');
						Materialize.toast(msg, 4000, 'note');
					}, 400);
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
					report_id: config.imo_report.upload_id,
					username: ngmUser.get().username,
				}),
				getDocument: function () {
					$timeout(function (params) {
						ngmData.get({
							method: 'GET',
							// url: ngmAuth.LOCATION + '/api/listReportDocuments/fkhrhwrrfn123test021'
							url: ngmAuth.LOCATION + '/api/listReportDocuments/' + config.imo_report.upload_id
						}).then(function (data) {
							l = data.length
							$scope.dummy = data;
							data = data.slice($scope.file_uploaded);
							data.forEach(element => {
								$scope.report.imo_report.support_partner[$scope.setRowFile].file.push(element)
							});

						});
					},50)
					
				},
				removeFile:function(){
					$scope.report.imo_report.support_partner[$scope.removeFileRow].file.forEach((el,i)=>{
						if (el.fileid=== $scope.removeFileId){
							$scope.report.imo_report.support_partner[$scope.removeFileRow].file.splice(i,1);
						}
					})
				},
				// cek report exist or not
				openReport:function(reportMonth,reportDate){			
					report =$scope.reportMonth.filter(function(el){
						el.report_month
						var year = moment(new Date(reportDate)).format('YYYY');
						return year+reportMonth  === el})
					if(report.length<1){
						$scope.openFormReport = true;
					}else{
						$scope.openFormReport = false;
						var msg = 'Report For ' + moment(new Date($scope.report.imo_report.report_date)).format('MMMM,YYYY')+' Exist!';
						delete $scope.report.imo_report.report_date;
						delete $scope.report.imo_report.report_month;
						Materialize.toast(msg, 4000, 'error')
						Materialize.toast('Please Select Another Month', 4000, 'note')
					}
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

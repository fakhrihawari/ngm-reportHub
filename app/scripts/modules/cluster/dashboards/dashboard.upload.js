/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:DashboardClusterUploadCtrl
 * @description
 * # ClusterProjectDetailsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('DashboardClusterUploadCtrl', ['$scope', '$rootScope', '$route', '$location', '$anchorScroll', '$timeout', '$sce', '$http', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmUploadHelper', function ($scope, $rootScope, $route, $location, $anchorScroll, $timeout, $sce, $http, ngmAuth, ngmData, ngmUser, ngmUploadHelper) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// init empty model
		$scope.model = {
			rows: [{}]
		}
		$scope.getRequest = function (param) {
			// param is object
			var string = "";
			// for (x in param) {
			// 	temp = x + '=' + param[x] + '&';
			// 	string += temp;
			// }
			// string = string.slice(0, -1);
			// var param = {
			// 	adminRpcode: $route.current.params.adminRpcode,
			// 	admin0pcode: $route.current.params.admin0pcode,
			// 	cluster_id: $route.current.params.cluster_id,
			// 	organization_tag: $route.current.params.organization_tag,
			// 	start_date: $route.current.params.start,
			// 	end_date: $route.current.params.end,
			// 	type: 'monthly'
			// }
			// request_query = $.param(param)
			// return request_query
			// console.log(string);
			// string = {type:$route.current.params};
			string = $.param({type:$route.current.params.type});
			string = $.param($route.current.params)
			return string
		};
		// empty Project
		$scope.report = {

			// parent
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),
			// report start
			startDate: moment().startOf('year').format('YYYY-MM-DD'),

			// report end
			endDate: moment().format('YYYY-MM-DD'),
			// placeholders
			title: '',
			subtitle: '',
			type: $route.current.params.cluster_id,

			// get organization
			// getOrganization: function (organization_id) {

			// 	// return http
			// 	return {
			// 		method: 'POST',
			// 		url: ngmAuth.LOCATION + '/api/getOrganization',
			// 		data: {
			// 			'organization_id': ngmUser.get().organization_id
			// 		}
			// 	}
			// },
			setParams:function(){
				ngmUploadHelper.setParams({

					url: '#/cluster/admin/upload/',
					admin0pcode:$route.current.params.admin0pcode,
					adminRpcode:$route.current.params.adminRpcode,
					cluster_id: $route.current.params.cluster_id,
					organization_tag: $route.current.params.organization_tag,
					project_id: $route.current.params.project_id,
					report_id: $route.current.params.report_id,
					startDate: $route.current.params.start_date,
					endDate: $route.current.params.end_date,
					type: $route.current.params.type,
					user: ngmUser.get()
				});
			},

			// setFilter
			setFilter:function(){
				ngmData.get(ngmUploadHelper.getRequest()).then(function(organization){
					if ($scope.report.user.roles.indexOf('SUPERADMIN') > -1
						|| $scope.report.user.roles.indexOf('HQ') > -1
						|| $scope.report.user.roles.indexOf('HQ_ORG') > -1
						|| $scope.report.user.roles.indexOf('REGION') > -1
						|| $scope.report.user.roles.indexOf('REGION_ORG') > -1
						|| $scope.report.user.roles.indexOf('COUNTRY_ADMIN') > -1
						|| $scope.report.user.roles.indexOf('COUNTRY') > -1
						|| $scope.report.user.roles.indexOf('CLUSTER') > -1) {
							$scope.model.menu.push(ngmUploadHelper.getOrganizationRows(organization));
						}
					$scope.model.menu.push(ngmUploadHelper.getTypeRows());
					if ($route.current.params.type === 'monthly') {
						$scope.model.menu.push(ngmUploadHelper.getMonthRows());
					}
					if ($route.current.params.type === 'weekly') {
						$scope.model.menu.push(ngmUploadHelper.getWeekRows())
					}
					if ($route.current.params.type === 'project') {
						// console.log("P") for project
					}
					if ($route.current.params.type === 'custom') {
						// console.log("C") for custom
					}
					$scope.model.menu.push({
						'id': 'search-country',
						'icon': 'refresh',
						'title': 'Reset',
						'class': 'teal lighten-1 white-text',
						'rows': [{
						'title': 'Reset',
						'param': 'admin0pcode',
						'active': 'reset',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '#/cluster/admin/upload/all/all/all/all/all/all/2019-01-01/' + moment().format('YYYY-MM-DD') +'/all',
					}]})
				})
				if ($scope.report.user.roles.indexOf('SUPERADMIN')>-1 
				|| $scope.report.user.roles.indexOf('HQ')>-1 
				|| $scope.report.user.roles.indexOf('HQ_ORG')>-1)
				{
					$scope.model.menu.push(ngmUploadHelper.getRegion());
				}
				if ($scope.report.user.roles.indexOf('SUPERADMIN') > -1
					|| $scope.report.user.roles.indexOf('HQ') > -1
					|| $scope.report.user.roles.indexOf('HQ_ORG') > -1
					|| $scope.report.user.roles.indexOf('REGION') > -1
					|| $scope.report.user.roles.indexOf('REGION_ORG') > -1){
						$scope.model.menu.push(ngmUploadHelper.getCountry());
					}
				if ($scope.report.user.roles.indexOf('SUPERADMIN') > -1
					|| $scope.report.user.roles.indexOf('HQ') > -1
					|| $scope.report.user.roles.indexOf('HQ_ORG') > -1
					|| $scope.report.user.roles.indexOf('REGION') > -1
					|| $scope.report.user.roles.indexOf('REGION_ORG') > -1
					|| $scope.report.user.roles.indexOf('COUNTRY_ADMIN') > -1
					|| $scope.report.user.roles.indexOf('COUNTRY') > -1
					|| $scope.report.user.roles.indexOf('ORG') > -1){

						$scope.model.menu.push(ngmUploadHelper.getClusterRows('all'));
					}
				
				// getMonthRows()
			},
			getPath: function (start,end) {

				var path = '/cluster/admin/upload/' 
				+$route.current.params.project_id+'/'
				+$route.current.params.report_id+'/'
				+$route.current.params.organization_tag+'/'
				+$route.current.params.cluster_id+'/'
				+$route.current.params.admin0pcode+'/'
				+$route.current.params.adminRpcode
				+'/'+start+'/'+end
				+'/all'

				return path;
			},

			// set project details
			setUpload: function () {
				// report dashboard model
				$scope.model = {
					name: 'cluster_admin_documents',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m9 l9 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.report.ngm.style.defaultPrimaryColor,
							title: ngmUploadHelper.getTitle()+' | Documents'
						},
						subtitle: {
							'class': 'col hide-on-small-only m8 l9 report-subtitle truncate hide-on-small-only',
							'title': $scope.report.subtitle
						},
						datePicker: {
							'class': 'col s12 m4 l3',
							dates: [{
								style: 'float:left;',
								label: 'from',
								format: 'd mmm, yyyy',
								min: '2017-01-01',
								max: $route.current.params.end_date,
								currentTime: $route.current.params.start_date,
								onClose: function () {
									// set date
									var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD');
									if (date !== $route.current.params.start_date) {
										// set new date
										var path = $scope.report.getPath(date,$route.current.params.end_date);
										// update new date
										$location.path(path);

									}
								}
							}, {
								style: 'float:right',
								label: 'to',
								format: 'd mmm, yyyy',
								min: $route.current.params.start_date,
								currentTime: $route.current.params.end_date,
								onClose: function () {
									// set date
									var date = moment.utc(new Date(this.currentTime)).format('YYYY-MM-DD')
									if (date !== $route.current.params.end_date) {
										// set new date
										var path = $scope.report.getPath($route.current.params.start_date,date);										
										// update new date
										$location.path(path);	
									}
								}
							}]
						},
						download: {
							'class': 'col s12 m3 l3',
							downloads: [{
								type: 'zip',
								color: 'blue lighten-2',
								icon: 'assignment',
								hover: 'Download all document project ',
								request: {
									method: 'GET',
									url: ngmAuth.LOCATION + '/api/listDocuments?' + $scope.getRequest($route.current.params)
								},
								metrics: {
									method: 'POST',
									url: ngmAuth.LOCATION + '/api/metrics/set',
									data: {
										organization: $scope.report.user.organization,
										username: $scope.report.user.username,
										email: $scope.report.user.email,
										// dashboard: $scope.report.project.project_title,
										theme: 'cluster_project_documents',
										format: 'zip',
										url: $location.$$path
									}
								}
							}]
						}
					},
					menu: [],
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [
							// 	{
							// 	type: 'html',
							// 	card: 'white grey-text text-darken-2',
							// 	style: 'margin:15px; padding-bottom:30px;',
							// 	config: {
							// 		uploadDocProject:function(){
							// 			$('#upload-file-project').openModal({ dismissible: false });
							// 			$scope.params= 'a';
							// 		},
							// 		uploadDocReport: function () {
							// 			$('#upload-file-report').openModal({ dismissible: false });
							// 			$scope.params='b';
							// 		},
							// 		templateUrl: '/scripts/widgets/ngm-html/template/cluster.admin.upload.html'
							// 	}
							// }
						]
						}]
					},{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'dropzone',
								config: {
									params: ngmUploadHelper.setUploadParam($route.current.params,'project'),//{ project_id: 'all', username: $scope.report.user.username, organization_tag: $scope.report.user.organization_tag, admin0pcode: $scope.report.user.admin0pcode },
									templateUrl: '/scripts/widgets/ngm-dropzone/template/upload.admin.project.html',
									openModal: function (modal) {
										$('#' + modal).openModal({ dismissible: false });
									},
									closeModal: function (modal) {
										$('#upload-file-project').closeModal({ dismissible: true });
										// myDropzone.removeAllFiles(true);
										Materialize.toast("Cancel to upload file", 2000, "note");
									},
									previewTemplate: `	<div class="dz-preview dz-processing dz-image-preview dz-success dz-complete">
																			<div class="dz-image">
																				<img data-dz-thumbnail>
																			</div>
																			<div class="dz-details">
																				<div class="dz-size">
																					<span data-dz-size>
																				</div>
																				<div class="dz-filename">
																					<span data-dz-name></span>
																				</div>
																			</div>
																			<div data-dz-remove class=" remove-upload btn-floating red" style="margin-left:35%; "><i class="material-icons">clear</i></div> 
																		</div>`,
									completeMessage: '<i class="medium material-icons" style="color:#009688;">cloud_done</i><br/><h5 style="font-weight:300;">Complete!</h5><br/><h5 style="font-weight:100;"><div id="add_doc" class="btn"><i class="small material-icons">add_circle</i></div></h5></div>',
									url: ngmAuth.LOCATION + '/api/uploadGDrive',
									acceptedFiles: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/zip,.zip,text/plain,text/csv,video/mp4,application/mp4',
									maxFiles: 3,
									parallelUploads: 3,
									accept: function (file, done) {
										var ext = file.name.split('.').pop();
										if (file.type.indexOf('image') < 0
											&& file.type.indexOf('officedocument') < 0
											&& file.type !== 'application/msword'
											&& file.type !== 'application/vnd.ms-excel'
											&& file.type !== 'application/vnd.ms-powerpoint'
											&& file.type !== 'application/pdf'
											&& ext !== 'mp4'
											&& ext !== 'zip'
											&& ext !== 'txt'
											&& ext !== 'csv'
										) {
											this.removeFile(file);
											if (this.getQueuedFiles().length > 0) {
												$('.dz-default.dz-message').show();
												$timeout(function () {
													$('.dz-default.dz-message').hide();
												}, 2000)
											}
											$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Not supported file type !');
											$timeout(function () {
												$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload');
											}, 2000)
										} else {
											done();
										}
									},
									addRemoveLinks: false,
									autoProcessQueue: false,
									headers: { 'Authorization': 'Bearer ' + $scope.report.user.token },
									successMessage: false,
									dictDefaultMessage:
										`<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload `,
									process: {
									},
									setRedirect: function () {
										// set redirect link
										// console.log("redirect")
									},
									init: function () {
										myDropzone = this;
										$("#upload_doc_pro").attr("disabled", true);
										$("#delete_doc_pro").attr("disabled", true);

										document.getElementById('upload_doc_pro').addEventListener("click", function () {
											// enable auto process queue after uploading started
											myDropzone.autoProcessQueue = true;
											myDropzone.processQueue(); // Tell Dropzone to process all queued files.																						
										});

										document.getElementById('delete_doc_pro').addEventListener("click", function () {
											myDropzone.removeAllFiles(true);
										});

										this.on("addedfile", function (file) {
											document.querySelector(".dz-default.dz-message").style.display = 'none';
											var ext = file.name.split('.').pop();
											if (ext == 'pdf') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/pdfm.png");
											}
											if (ext == 'doc' || ext == 'docx') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/docm.png");
											}
											if (ext == 'xls' || ext == 'xlsx') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/xls.png");
											}
											if (ext == 'ppt' || ext == 'pptx') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/ppt.png");
											}
											if (ext == 'zip') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/zipm.png");
											}
											if (ext == 'txt') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/txtm.png");
											}
											if (ext == 'mp4') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/mp4m.png");
											}
											if (ext !== 'pdf' && ext !== 'doc'
												&& ext !== 'docx' && ext !== 'doc'
												&& ext !== 'xls' && ext !== 'xlsx'
												&& ext !== 'ppt' && ext !== 'pptx'
												&& ext !== 'png' && ext !== 'zip'
												&& ext !== 'txt' && ext !== 'mp4') {
												$(file.previewElement).find(".dz-image img").attr("src", "images/elsedoc.png");
											}

											// chek filesize if more than 15MB
											if (file.size > 15000000) {
												$('.dz-default.dz-message').show();
												$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br />File too large, Please remove the file');
												$("#upload_doc_pro").attr("disabled", true);
												document.getElementById("upload_doc_pro").style.pointerEvents = "none";
												$("#delete_doc_pro").attr("disabled", true);
												document.getElementById("delete_doc_pro").style.pointerEvents = "none";
												$('#too-large-file').openModal({ dismissible: false });
											} else {
												$("#upload_doc_pro").attr("disabled", false);
												$("#delete_doc_pro").attr("disabled", false);
											}
										});

										this.on("maxfilesexceeded", function (file) {
											$('.dz-default.dz-message').hide();
											$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Exceed file upload, Please remove one of your file');
											$('.dz-default.dz-message').show();
											Materialize.toast("Too many file to upload", 3000, "error")
											$("#upload_doc_pro").attr("disabled", true);
											document.getElementById("upload_doc_pro").style.pointerEvents = "none";
											$("#delete_doc_pro").attr("disabled", true);
											document.getElementById("delete_doc_pro").style.pointerEvents = "none";
										});

										this.on("removedfile", function (file) {
											var bigFile = 0
											if (myDropzone.files.length < 1) {
												$("#upload_doc_pro").attr("disabled", true);
												$("#delete_doc_pro").attr("disabled", true);
												$('.dz-default.dz-message').show();
												$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload');
											}

											if (myDropzone.files.length <= 3 && myDropzone.files.length > 0) {
												$('.dz-default.dz-message').hide();
												$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload');
												myDropzone.files.forEach((i) => {
													if (i.size > 15000000) {
														bigFile += 1
													}
												})
												// check if in files there are file have more than 8MB after remove
												if (bigFile > 0) {
													$("#upload_doc_pro").attr("disabled", true);
													$("#delete_doc_pro").attr("disabled", true);
													$('.dz-default.dz-message').show();
													$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>File too large, Please remove the file');
												} else {
													document.getElementById("upload_doc_pro").style.pointerEvents = 'auto';
													document.getElementById("delete_doc_pro").style.pointerEvents = 'auto';
													$("#upload_doc_pro").attr("disabled", false);
													$("#delete_doc_pro").attr("disabled", false);
												}

											}
										});

										this.on("reset", function () {
											$(".progress").show()
											document.getElementById("upload_doc_pro").style.pointerEvents = 'auto';
											document.getElementById("delete_doc_pro").style.pointerEvents = 'auto';
										});

										myDropzone.on("uploadprogress", function (file, progress, bytesSent) {
											// hide preview file upload 
											var previews = document.querySelectorAll(".dz-preview");
											previews.forEach(function (preview) {
												preview.style.display = 'none';
											})

											$('.dz-default.dz-message').hide();
											$('.percent-upload').show()
											$(".percentage").html('<div style="font-size:32px;">Uploading....! </div>');
											// uncomment  this code below, if the write to server and gdrive is work well 
											// progress = Math.round(progress)
											// $(".percentage").text(progress + '%');											

											// if(progress== 100){												
											// 	$timeout(function () {
											// 		$(".percentage").html('<i class="medium material-icons" style="color:#009688;margin-left: 38%;">check_circle_outline</i><div style="font-size:32px;">Upload Success ! </div>');
											// 		$(".progress").hide()
											// 	},1000)
											// }
										})

										myDropzone.on('sending', function (file) {
											if (this.getUploadingFiles().length == 1) {
												Materialize.toast('Uploading...', 3000, 'note');
											}
											$("#upload_doc_pro").attr("disabled", true);
											// $("#delete_doc").attr("disabled", true);
										})


										myDropzone.on("complete", function (file) {
											if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
												myDropzone.removeAllFiles(true);
											}

										});
									},
									success: function () {
										if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
											msg = "File Uploaded!";
											typ = 'success';
											Materialize.toast(msg, 2000, typ);

											$('.percent-upload').hide();
											$('.dz-default.dz-message').show();
											$('#upload-file-project').closeModal({ dismissible: true });
											$rootScope.$broadcast('refresh:doclist');
										}
									},
									error: function (file, response) {
										$('.percent-upload').hide();
										$('.dz-default.dz-message').show();

										if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
											myDropzone.removeAllFiles(true);
											$timeout(function () {

												typ = 'error';
												Materialize.toast(response, 2000, typ);
												if (response.indexOf('canceled') < 0) {
													Materialize.toast('Upload canceled', 2000, typ);
												}
											}, 500);
										}
									}
								}
							}]
						}]
						}, {
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'dropzone',
									config: {
										params: ngmUploadHelper.setUploadParam($route.current.params, 'report'),//{ report_id: 'all', username: $scope.report.user.username, organization_tag: $scope.report.user.organization_tag, admin0pcode: $scope.report.user.admin0pcode },
										templateUrl: '/scripts/widgets/ngm-dropzone/template/upload.admin.report.html',
										openModal: function (modal) {
											$('#' + modal).openModal({ dismissible: false });
										},
										closeModal: function (modal) {
											$('#upload-file-report').closeModal({ dismissible: true });
											// myDropzone.removeAllFiles(true);
											Materialize.toast("Cancel to upload file", 2000, "note");
										},
										previewTemplate: `	<div class="dz-preview dz-processing dz-image-preview dz-success dz-complete">
																			<div class="dz-image">
																				<img data-dz-thumbnail>
																			</div>
																			<div class="dz-details">
																				<div class="dz-size">
																					<span data-dz-size>
																				</div>
																				<div class="dz-filename">
																					<span data-dz-name></span>
																				</div>
																			</div>
																			<div data-dz-remove class=" remove-upload btn-floating red" style="margin-left:35%; "><i class="material-icons">clear</i></div> 
																		</div>`,
										completeMessage: '<i class="medium material-icons" style="color:#009688;">cloud_done</i><br/><h5 style="font-weight:300;">Complete!</h5><br/><h5 style="font-weight:100;"><div id="add_doc" class="btn"><i class="small material-icons">add_circle</i></div></h5></div>',
										url: ngmAuth.LOCATION + '/api/uploadGDrive',
										acceptedFiles: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/zip,.zip,text/plain,text/csv,video/mp4,application/mp4',
										maxFiles: 3,
										parallelUploads:3,
										accept: function (file, done) {
											var ext = file.name.split('.').pop();
											if (file.type.indexOf('image') < 0
												&& file.type.indexOf('officedocument') < 0
												&& file.type !== 'application/msword'
												&& file.type !== 'application/vnd.ms-excel'
												&& file.type !== 'application/vnd.ms-powerpoint'
												&& file.type !== 'application/pdf'
												&& ext !== 'mp4'
												&& ext !== 'zip'
												&& ext !== 'txt'
												&& ext !== 'csv'
											) {
												this.removeFile(file);
												if (this.getQueuedFiles().length > 0) {
													$('.dz-default.dz-message').show();
													$timeout(function () {
														$('.dz-default.dz-message').hide();
													}, 2000)
												}
												$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Not supported file type !');
												$timeout(function () {
													$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload');
												}, 2000)
											} else {
												done();
											}
										},
										addRemoveLinks: false,
										autoProcessQueue: false,
										headers: { 'Authorization': 'Bearer ' + $scope.report.user.token },
										successMessage: false,
										dictDefaultMessage:
											`<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload `,
										process: {
										},
										setRedirect: function () {
											// set redirect link
											// console.log("redirect")
										},
										init: function () {
											myDropzone = this;
											$("#upload_doc_repo").attr("disabled", true);
											$("#delete_doc_repo").attr("disabled", true);

											document.getElementById('upload_doc_repo').addEventListener("click", function () {
												// enable auto process queue after uploading started
												myDropzone.autoProcessQueue = true;
												myDropzone.processQueue(); // Tell Dropzone to process all queued files.																						
											});

											document.getElementById('delete_doc_repo').addEventListener("click", function () {
												myDropzone.removeAllFiles(true);
											});

											myDropzone.on("addedfile", function (file) {
												$('.dz-default.dz-message').hide();
												var ext = file.name.split('.').pop();
												if (ext == 'pdf') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/pdfm.png");
												}
												if (ext == 'doc' || ext == 'docx') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/docm.png");
												}
												if (ext == 'xls' || ext == 'xlsx') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/xls.png");
												}
												if (ext == 'ppt' || ext == 'pptx') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/ppt.png");
												}
												if (ext == 'zip') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/zipm.png");
												}
												if (ext == 'txt') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/txtm.png");
												}
												if (ext == 'mp4') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/mp4m.png");
												}
												if (ext !== 'pdf' && ext !== 'doc'
													&& ext !== 'docx' && ext !== 'doc'
													&& ext !== 'xls' && ext !== 'xlsx'
													&& ext !== 'ppt' && ext !== 'pptx'
													&& ext !== 'png' && ext !== 'zip'
													&& ext !== 'txt' && ext !== 'mp4') {
													$(file.previewElement).find(".dz-image img").attr("src", "images/elsedoc.png");
												}

												// chek filesize if more than 15MB
												if (file.size > 15000000) {
													$('.dz-default.dz-message').show();
													$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br />File too large, Please remove the file');
													$("#upload_doc_repo").attr("disabled", true);
													document.getElementById("upload_doc_repo").style.pointerEvents = "none";
													$("#delete_doc_repo").attr("disabled", true);
													document.getElementById("delete_doc_repo").style.pointerEvents = "none";
													// $('#too-large-file').openModal({ dismissible: false });
												} else {
													$("#upload_doc_repo").attr("disabled", false);
													$("#delete_doc_repo").attr("disabled", false);
												}
											});

											this.on("maxfilesexceeded", function (file) {
												$('.dz-default.dz-message').hide();
												$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Exceed file upload, Please remove one of your file');
												$('.dz-default.dz-message').show();
												Materialize.toast("Too many file to upload", 3000, "error")
												$("#upload_doc_repo").attr("disabled", true);
												document.getElementById("upload_doc_repo").style.pointerEvents = "none";
												$("#delete_doc_repo").attr("disabled", true);
												document.getElementById("delete_doc_repo").style.pointerEvents = "none";
											});

											this.on("removedfile", function (file) {
												var bigFile = 0
												if (myDropzone.files.length < 1) {
													$("#upload_doc_repo").attr("disabled", true);
													$("#delete_doc_repo").attr("disabled", true);
													bigFile = 0;
													$('.dz-default.dz-message').show();
													$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload');
												}

												if (myDropzone.files.length <= 3 && myDropzone.files.length > 0) {
													$('.dz-default.dz-message').hide();
													$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload');
													myDropzone.files.forEach((i) => {
														if (i.size > 15000000) {
															bigFile += 1
														}
													})
													// check if in files there are file have more than 8MB after remove
													if (bigFile > 0) {
														$("#upload_doc_repo").attr("disabled", true);
														$("#delete_doc_repo").attr("disabled", true);
														$('.dz-default.dz-message').show();
														$('.dz-default.dz-message').html('<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>File too large, Please remove the file');
													} else {
														document.getElementById("upload_doc_repo").style.pointerEvents = 'auto';
														document.getElementById("delete_doc_repo").style.pointerEvents = 'auto';
														$("#upload_doc_repo").attr("disabled", false);
														$("#delete_doc_repo").attr("disabled", false);
													}

												}
											});

											this.on("reset", function () {
												$(".progress").show()
												document.getElementById("upload_doc_repo").style.pointerEvents = 'auto';
												document.getElementById("delete_doc_repo").style.pointerEvents = 'auto';
											});

											myDropzone.on("uploadprogress", function (file, progress, bytesSent) {
												// hide preview file upload 
												var previews = document.querySelectorAll(".dz-preview");
												previews.forEach(function (preview) {
													preview.style.display = 'none';
												})

												$('.dz-default.dz-message').hide();
												$('.percent-upload').show()
												$(".percentage").html('<div style="font-size:32px;">Uploading....! </div>');
											})

											myDropzone.on('sending', function (file) {
												if (this.getUploadingFiles().length == 1) {
													Materialize.toast('Uploading...', 3000, 'note');
												}
												$("#upload_doc_repo").attr("disabled", true);
											})


											myDropzone.on("complete", function (file) {
												if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
													myDropzone.removeAllFiles(true);
												}

											});
										},
										success: function () {
											if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
												msg = "File Uploaded!";
												typ = 'success';
												Materialize.toast(msg, 2000, typ);

												$('.percent-upload').hide();
												$('.dz-default.dz-message').show();
												$('#upload-file-report').closeModal({ dismissible: true });
												$rootScope.$broadcast('refresh:doclist');
											}
										},
										error: function (file, response) {
											$('.percent-upload').hide();
											$('.dz-default.dz-message').show();
											if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
												myDropzone.removeAllFiles(true);
												$timeout(function () {

													typ = 'error';
													Materialize.toast(response, 2000, typ);
													if (response.indexOf('canceled') < 0) {
														Materialize.toast('Upload canceled', 2000, typ);
													}
												}, 500);
											}
										}
									}
								}]
							}]
						}, 
					{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'list',
								card: 'white grey-text text-darken-2',
								config: {
									refreshEvent: 'refresh:doclist',
									titleIcon: 'alarm_on',
									color: 'blue lighten-4',
									itemsPerPage: 12,
									itemsPerPageGrid: 18,
									typeDocument: $route.current.params.type,
									firstLetterUpperCase:function(string){ return string.charAt(0).toUpperCase() + string.slice(1);},
									openModal: function (modal, link) {
										$('#' + modal).openModal({ dismissible: false });
										if (link !== '') {
											if (modal === 'close-preview-modal') {
												$scope.linkPreview = link;
											} else {
												// if its from google drive; link in here is id of google drive  file
												$scope.linkPreview = "https://drive.google.com/file/d/" + link + "/preview"
											}
										}
									},
									extentionIcon: function (text) {
										text = text.toLowerCase().replace(/\./g, '')
										if (text == 'pdf' || text == 'doc' || text == 'docx' || text == 'ppt' || text == 'pptx' || text == 'xls' || text == 'xlsx') {
											return 'insert_drive_file'
										}
										if (text == 'png' || text == 'jpg' || text == 'jpeg') {
											return 'photo_size_select_actual'
										}
										if (text == 'mp4') {
											return 'play_arrow'
										}
										return 'attach_file'
									},
									extentionColor: function (text) {
										text = text.toLowerCase().replace(/\./g, '')
										if (text == 'pdf' || text == 'doc' || text == 'docx' || text == 'ppt' || text == 'pptx' || text == 'xls' || text == 'xlsx') {
											return '#2196f3 !important'
										}
										if (text == 'png' || text == 'jpg' || text == 'jpeg') {
											return '#f44336 !important'
										}
										if (text == 'mp4') {
											return '#f44336 !important'
										}
										return '#26a69a !important'
									},
									removeFile: function () {
										// IF API READY TO USE
										Materialize.toast("Deleting...", 2000, 'note');
										$http({
											method: 'DELETE',
											url: ngmAuth.LOCATION + '/api/deleteGDriveFile/' + $scope.fileId,
											headers: { 'Authorization': 'Bearer ' + $scope.report.user.token },
										})
											.success(function (result) {
												$timeout(function () {
													msg = "File Deleted!";
													typ = 'success';
													Materialize.toast(msg, 2000, typ);
													$rootScope.$broadcast('refresh:doclist');
												}, 2000);
											})
											.error(function (err) {
												$timeout(function () {
													msg = "Error, File Not Deleted!";
													typ = 'error';
													Materialize.toast(msg, 2000, typ);
												}, 2000);
											})
									},
									setRemoveId: function (id) {
										$scope.fileId = id;
									},
									setLink: function () {
										return $sce.trustAsResourceUrl($scope.linkPreview);
									},
									setDonwloadLink: function (id) {
										var donwloadLink = "https://drive.google.com/uc?export=download&id=" + id;
										return donwloadLink;
									},
									setThumbnailfromGdrive: function (id, file_type) {
										img = "https://drive.google.com/thumbnail?authuser=0&sz=w320&id=" + id;
										return img

									},
									title: 'Upload',
									hoverTitle: 'Update',
									icon: 'edit',
									rightIcon: 'watch_later',
									templateUrl: 'scripts/widgets/ngm-list/template/admin.list.upload.html',
									request: {
										method: 'GET',
										url: ngmAuth.LOCATION + '/api/listDocuments?' + $scope.getRequest($route.current.params)
									}
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
									html: $scope.report.ngm.footer
								}
							}]
						}]
					}]
				}
				$scope.report.setFilter();
				// assign to ngm app scope
				$scope.report.ngm.dashboard.model = $scope.model;

			}

		}

		// Run page
		$scope.report.setParams();
		$scope.report.setUpload();
		// console.log(ngmUploadHelper.getClusterRows('all'));
		console.log($scope.report.user);
		// console.log(ngmUploadHelper.getRequest());
		// console.log(ngmUploadHelper.setUploadParam($route.current.params, 'report'), ngmUploadHelper.setUploadParam($route.current.params, 'project'));

	}]);

/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterOrganizationStockForm
 * @description
 * # ClusterOrganizationStockForm
 * Controller of the ngmReportHub
 */

angular.module( 'ngm.widget.organization.stock', [ 'ngm.provider' ])
  .config( function( dashboardProvider ){
    dashboardProvider
      .widget('organization.stock', {
        title: 'Cluster Stock Reports Form',
        description: 'Cluster Stock Reports Form',
        controller: 'ClusterOrganizationStockForm',
        templateUrl: '/scripts/modules/cluster/views/forms/stock/form.html'
      });
  })
  .controller( 'ClusterOrganizationStockForm', [
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
    'config','$translate',
		function ($scope, $location, $timeout, $filter, $q, $http, $route, $sce, ngmUser, ngmAuth, ngmData, ngmClusterHelper, ngmClusterLists, config,$translate ){
      
      // project
      $scope.report = {

        // user
        user: ngmUser.get(),
        // app style
        style: config.style,
        // form
        submit: true,
        // project
        organization: config.organization,
        // report
        report: config.report,
        // last update
        updatedAt: moment( config.report.updatedAt ).format( 'DD MMMM, YYYY @ h:mm:ss a' ),
        // last update
        monthlyTitleFormat: moment.utc( [ config.report.report_year, config.report.report_month, 1 ] ).format('MMMM, YYYY'),

        templatesUrl: '/scripts/modules/cluster/views/forms/stock/',
        locationsUrl: 'locations.html',
        stocksUrl: 'stocks.html',
        stockUrl: 'stock.html',
        notesUrl: 'notes.html',
				uploadUrl: 'stock-upload.html',
        canEdit: ngmAuth.canDo( 'EDIT', { adminRpcode: config.organization.adminRpcode, admin0pcode:config.organization.admin0pcode, cluster_id: ngmUser.get().cluster_id, organization_tag:config.organization.organization_tag } ),

        // lists
        lists: {
          clusters: ngmClusterLists.getClusters( config.organization.admin0pcode ),
          units: ngmClusterLists.getUnits( config.organization.admin0pcode ),
          stocks: localStorage.getObject( 'lists' ).stockItemsList,
          stock_status:[{
            stock_status_id: 'available',
            stock_status_name: 'Available'
          },{
            stock_status_id: 'reserved',
            stock_status_name: 'Reserved'
					}],
					stock_item_purpose:[{
						stock_item_purpose_id: 'prepositioned',
						stock_item_purpose_name: 'Prepositioned',
					},{
						stock_item_purpose_id: 'operational',
						stock_item_purpose_name: 'Operational',
					}],
					stock_targeted_groups: ngmClusterLists.getStockTargetedGroups()
        },

        // init
        init: function(){},

        // cancel and delete empty project
        cancel: function() {
          // update
          $timeout(function() {
            // Re-direct to summary
            var href = '/cluster/stocks';
            if ( $scope.report.user.roles.indexOf('ADMIN') !== -1 ) { href += '/' + $scope.report.organization.id }
            $location.path( href );
          }, 200);
        },

        // add stock
        addStock: function( $parent ) {
          $scope.inserted = {
            stock_item_type: null,
            stock_item_name: null,
            unit_type_id: null,
            unit_type_name: null,
						number_in_stock:0, number_in_pipeline:0, beneficiaries_covered:0,
						stock_targeted_groups_id: null,
						stock_targeted_groups_name: null,

						
          };
          // process + clean location
          $scope.inserted =
							ngmClusterHelper.getCleanStocks( $scope.report.report, $scope.report.report.stocklocations[ $parent ], $scope.inserted );
				
          $scope.report.report.stocklocations[ $parent ].stocks.push( $scope.inserted );
        },

				// remove from array if no id
        cancelEdit: function( $parent, $index ) {
						if ( !$scope.report.report.stocklocations[ $parent ].stocks[ $index ].id ) {
							$scope.report.report.stocklocations[ $parent ].stocks.splice( $index, 1 );
						}
				},

        // cluster
        showStockCluster: function( $data, $stock ){
          var selected = [];
          $stock.cluster_id = $data;
          if($stock.cluster_id) {
            selected = $filter('filter')( $scope.report.lists.clusters, { cluster_id: $stock.cluster_id }, true);
            $stock.cluster = selected[0].cluster;
          }
          return selected.length ? selected[0].cluster : $filter('translate')('no_selection')+'!';
        },

        // show stock type
        showStockType: function( $data, $stock ){
          var selected = [];
          $stock.stock_item_type = $data;
          if($stock.stock_item_type) {
            selected = $filter('filter')( $scope.report.lists.stocks, { stock_item_type: $stock.stock_item_type }, true);
            $stock.stock_item_name = selected[0].stock_item_name;
          }
          return selected.length ? selected[0].stock_item_name : $filter('translate')('no_selection')+'!';
        },

        showStockUnits: function( $data, $stock ){
          var selected = [];
          $stock.unit_type_id = $data;
          if( $stock.unit_type_id ) {
            selected = $filter('filter')( $scope.report.lists.units, { unit_type_id: $stock.unit_type_id }, true );
            if ( selected.length ){
              $stock.unit_type_name = selected[0].unit_type_name;
            }
          }
          return selected.length ? selected[0].unit_type_name : $filter('translate')('no_selection')+'!';
        },

        showStockStatus: function( $data, $stock ){
          var selected = [];
          $stock.stock_status_id = $data;
          if( $stock.stock_status_id ) {
            selected = $filter('filter')( $scope.report.lists.stock_status, { stock_status_id: $stock.stock_status_id }, true );
            if ( selected.length ){
              $stock.stock_status_name = selected[0].stock_status_name;
            }
          }
          return selected.length ? selected[0].stock_status_name : $filter('translate')('no_selection')+'!';
				},

				showStockPurpose: function( $data, $stock ){
          var selected = [];
          $stock.stock_item_purpose_id = $data;
          if( $stock.stock_item_purpose_id ) {
            selected = $filter('filter')( $scope.report.lists.stock_item_purpose, { stock_item_purpose_id: $stock.stock_item_purpose_id }, true );
            if ( selected.length ){
              $stock.stock_item_purpose_name = selected[0].stock_item_purpose_name;
            }
          }
          return selected.length ? selected[0].stock_item_purpose_name : $filter('translate')('no_selection')+'!';
				},
				showStockTargetedGroup: function($data,$stock){
					selected = [];
					$stock.stock_targeted_groups_id =$data;
					if ($stock.stock_targeted_groups_id){
						selected = $filter('filter')($scope.report.lists.stock_targeted_groups, { stock_targeted_groups_id: $stock.stock_targeted_groups_id},true);
						if(selected.length){
							$stock.stock_targeted_groups_name = selected[0].stock_targeted_groups_name;
						}
					}
					return selected.length ? selected[0].stock_targeted_groups_name : '-';
				},

        // update inidcators
        updateInput: function( $parent, $index, indicator, $data ){
          $scope.report.report.stocklocations[$parent].stocks[ $index ][ indicator ] = $data;
        },

        // disable save form
        rowSaveDisabled: function( $data ){
          var disabled = true;
          if ( $data.stock_item_type &&
                $data.unit_type_id &&
                $data.stock_status_id &&
                $data.number_in_stock >= 0 && $data.number_in_pipeline >= 0 && $data.beneficiaries_covered >= 0 ) {
              disabled = false;
          }
          return disabled;
        },

        // save form on enter
        keydownSaveForm: function(){
          setTimeout(function(){
            $('.editable-input').keydown(function (e) {
              var keypressed = e.keyCode || e.which;
              if (keypressed == 13) {
                $('.save').trigger('click');
              }
            });
          }, 0 );
        },

        // remove stocks
        removeStock: function( $parent, $index ) {
          $scope.report.report.stocklocations[ $parent ].stocks.splice( $index, 1 );
					// save
          $scope.report.save( false );
        },

        // cofirm exit if changes
        modalConfirm: function( modal ){

          // if not pristine, confirm exit
          if ( modal === 'complete-modal' ) {
            $( '#' + modal ).openModal( { dismissible: false } );
          } else {
            $scope.report.cancel();
          }

        },

        // determine if all locations containt at least one beneficiaries details
        formComplete: function() {
          var valid = true;
          angular.forEach( $scope.report.report.stocklocations, function( l ){
            angular.forEach( l.stocks, function( b ){
              if ( $scope.report.rowSaveDisabled( b ) ) {
                valid = false;
              }
            });
          });
          return valid;
        },

        // enable edit report
        editReport: function(){
          $scope.report.report.report_status = 'todo';
          $scope.report.save( false, false );
				},

				// process adding previous stock report data
				addPrevStocks: function (prev_report) {

						angular.forEach(prev_report.stocklocations, function (l, i) {
							var id = l.stock_warehouse_id;

							// uncoment if rewriting all data, comment if adding rows every time on copy
							// $scope.report.report.stocklocations
							// 			.find(function (e) {return e.stock_warehouse_id === id}).stocks = [];

							angular.forEach(l.stocks, function (s, ri) {
								$scope.inserted = {
									cluster_id: s.cluster_id,
									stock_item_type: s.stock_item_type,
									stock_item_name: s.stock_item_name,
									stock_item_purpose_id: s.stock_item_name,
									stock_item_purpose_name: s.stock_item_purpose_name,
									stock_status_id: s.stock_status_id,
									stock_status_name: s.stock_status_name,
									unit_type_id: s.unit_type_id,
									unit_type_name: s.unit_type_name,
									number_in_stock: s.number_in_stock,
									number_in_pipeline: s.number_in_pipeline,
									beneficiaries_covered: s.beneficiaries_covered
								};
								var $loc = $scope.report.report.stocklocations.find(function (l) {
									return l.stock_warehouse_id === id
								});
								var copy_report = $scope.report.report;
								$scope.inserted =
									ngmClusterHelper.getCleanStocks($scope.report.report, $loc, $scope.inserted);

								$scope.report.report.stocklocations.find(function (l) {
									return l.stock_warehouse_id === id
								}).stocks.push($scope.inserted);
							});
						});
				},

				// entry copy previous report
				copyPrevReport: function () {

					var getPrevReport = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/stock/getReport',
						data: {
							id: $route.current.params.report_id,
							previous: true
						}
					}

					ngmData.get(getPrevReport).then(function (prev_report) {

						$scope.report.addPrevStocks(prev_report);

						// toast msg n of copied rows
						var nrows = 0
						angular.forEach(prev_report.stocklocations, function (l) {
							nrows += l.stocks.length
						})
						if (!nrows) {
							if (Object.keys(prev_report).length) {
								var msg = $filter('translate')('no_data_in_previous_report'),
										typ = 'success';
							} else {
								var msg = $filter('translate')('no_previous_report'),
										typ = 'success';
							}
						} else {
								var msg = $filter('translate')('copied')+' ' + nrows + ' '+$filter('transalte')('rows'),
										typ = 'success';
						}
						Materialize.toast(msg, 3000, typ);
					}).catch(function (e) {
						Materialize.toast($filter('translate')('error_not_copied'), 3000, 'error');
					});

				},

				// upload document
				uploadDocument: {
					openModal: function (modal) {
						$('#' + modal).openModal({ dismissible: false });
					},
					closeModal: function (modal) {
						$('#' + modal).closeModal({ dismissible: true });
						myDropzone.removeAllFiles(true);
						Materialize.toast("Cancel to upload file", 2000, "note");
					},
					params: {
						organization_id:config.organization_id,
						report_id: config.report.id,
						username: ngmUser.get().username,
						organization_tag: config.report.organization_tag,
						cluster_id: config.report.cluster_id,
						admin0pcode: config.report.admin0pcode,
						adminRpcode: config.report.adminRpcode,
						reporting_period: config.report.reporting_period,
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
								document.querySelector(".dz-default.dz-message").style.display = 'block';
								$timeout(function () {
									document.querySelector(".dz-default.dz-message").style.display = 'none';
								}, 2000)
							}
							$('.dz-default.dz-message').html($scope.report.uploadDocument.notSupportedFile);
							$timeout(function () {
								$('.dz-default.dz-message').html($scope.report.uploadDocument.dictDefaultMessage);
							}, 2000)
						} else {
							done();
						}
					},
					dictDefaultMessage:
						`<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload `,
					dictMaxFilesExceeded: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Exceed file upload, Please remove one of your file `,
					tooLargeFilesSize: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>File too large, Please remove the file `,
					notSupportedFile: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Not supported file type ! `,
					errorMessage: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Error`,
					addRemoveLinks: false,
					autoProcessQueue: false,
					headers: { 'Authorization': 'Bearer ' + ngmUser.get().token },
					init: function () {
						myDropzone = this;
						$("#upload_doc").attr("disabled", true);
						$("#delete_doc").attr("disabled", true);

						document.getElementById('upload_doc').addEventListener("click", function () {
							// enable auto process queue after uploading started
							myDropzone.autoProcessQueue = true;
							myDropzone.processQueue(); // Tell Dropzone to process all queued files.																						
						});

						document.getElementById('delete_doc').addEventListener("click", function () {
							if (file.previewElement !== null){console.log('null')}
							myDropzone.removeAllFiles(true);
						});

						// when add file
						myDropzone.on("addedfile", function (file) {
							document.querySelector(".dz-default.dz-message").style.display = 'none';
							var ext = file.name.split('.').pop();
							//change preview if not image/* 
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
								document.querySelector(".dz-default.dz-message").style.display = 'block'
								$('.dz-default.dz-message').html($scope.report.uploadDocument.tooLargeFilesSize);
								$("#upload_doc").attr("disabled", true);
								document.getElementById("upload_doc").style.pointerEvents = "none";
								$("#delete_doc").attr("disabled", true);
								document.getElementById("delete_doc").style.pointerEvents = "none";
							} else {
								$("#upload_doc").attr("disabled", false);
								$("#delete_doc").attr("disabled", false);
							}
						});

						// when remove file
						myDropzone.on("removedfile", function (file) {
							var bigFile = 0
							if (myDropzone.files.length < 1) {
								$("#upload_doc").attr("disabled", true);
								$("#delete_doc").attr("disabled", true);
								bigFile = 0;
								document.querySelector(".dz-default.dz-message").style.display = 'block';
								$('.dz-default.dz-message').html($scope.report.uploadDocument.dictDefaultMessage);
							}

							if (myDropzone.files.length <= 3 && myDropzone.files.length > 0) {
								document.querySelector(".dz-default.dz-message").style.display = 'none'
								$('.dz-default.dz-message').html($scope.report.uploadDocument.dictDefaultMessage);
								myDropzone.files.forEach((i) => {
									if (i.size > 15000000) {
										bigFile += 1
									}
								})
								// check if in files there are file have more than 8MB after remove
								if (bigFile > 0) {
									$("#upload_doc").attr("disabled", true);
									$("#delete_doc").attr("disabled", true);
									document.querySelector(".dz-default.dz-message").style.display = 'block'
									$('.dz-default.dz-message').html($scope.report.uploadDocument.tooLargeFilesSize);
								} else {
									document.getElementById("upload_doc").style.pointerEvents = 'auto';
									document.getElementById("delete_doc").style.pointerEvents = 'auto';
									$("#upload_doc").attr("disabled", false);
									$("#delete_doc").attr("disabled", false);
								}

							}
						});

						// when max file exceed
						myDropzone.on("maxfilesexceeded", function (file) {
							document.querySelector(".dz-default.dz-message").style.display = 'none';
							// $('#exceed-file').openModal({ dismissible: false });
							$('.dz-default.dz-message').html($scope.report.uploadDocument.dictMaxFilesExceeded);
							document.querySelector(".dz-default.dz-message").style.display = 'block'
							Materialize.toast("Too many file to upload", 3000, "error")
							$("#upload_doc").attr("disabled", true);
							document.getElementById("upload_doc").style.pointerEvents = "none";
							$("#delete_doc").attr("disabled", true);
							document.getElementById("delete_doc").style.pointerEvents = "none";
						});

						// when uploading
						myDropzone.on("uploadprogress", function (file, progress, bytesSent) {
							// hide preview file upload 
							var previews = document.querySelectorAll(".dz-preview");
							previews.forEach(function (preview) {
								preview.style.display = 'none';
							})

							document.querySelector(".dz-default.dz-message").style.display = 'none';
							document.querySelector(".percent-upload").style.display = 'block';
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
						});

						// when sending file
						myDropzone.on('sending', function (file) {
							if (this.getUploadingFiles().length == 1) {
								Materialize.toast('Uploading...', 3000, 'note');
							}
							$("#upload_doc").attr("disabled", true);
						});

						// when complete
						myDropzone.on("complete", function (file) {
							if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
								myDropzone.removeAllFiles(true);
							}
						});

						// reset
						this.on("reset", function () {

							document.getElementById("upload_doc").style.pointerEvents = 'auto';
							document.getElementById("delete_doc").style.pointerEvents = 'auto';
						});
					},
					success: function () {
						if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
							msg = "File Uploaded!";
							typ = 'success';
							Materialize.toast(msg, 2000, typ);

							document.querySelector(".percent-upload").style.display = 'none';
							document.querySelector(".dz-default.dz-message").style.display = 'block';
							$('#upload-file').closeModal({ dismissible: true });
							// $rootScope.$broadcast('refresh:doclist');
							$scope.report.getDocument();
						}
					},
					error: function (file, response) {
						document.querySelector(".percent-upload").style.display = 'none';
						if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0 && !response.err) {
							typ = 'error';
							Materialize.toast(response, 2000, typ);
						}
						if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0 && response.err) {
							myDropzone.removeAllFiles(true);
							$timeout(function () {
								typ = 'error';
								Materialize.toast(response.err, 2000, typ);
								if (response.err.indexOf('canceled') < 0) {
									Materialize.toast('Upload canceled', 2000, typ);
								}
							}, 500);
						}
					}
				},
				manageDocument: {
					openPreview: function (modal, link) {
						$('#' + modal).openModal({ dismissible: false });
						$scope.linkPreview = "https://drive.google.com/file/d/" + link + "/preview";
					},
					setLink: function () {

						return $sce.trustAsResourceUrl($scope.linkPreview);
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
									// $rootScope.$broadcast('refresh:doclist');
									$scope.report.getDocument();
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
					setRemoveId: function (modal, id) {
						$('#' + modal).openModal({ dismissible: false });
						$scope.fileId = id;
					},
					setDonwloadLink: function (id) {
						var donwloadLink = "https://drive.google.com/uc?export=download&id=" + id;
						return donwloadLink;
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
					setThumbnailfromGdrive: function (id) {
						img = "https://drive.google.com/thumbnail?authuser=0&sz=w320&id=" + id;
						return img
					},
				},
				getDocument: function () {
					ngmData.get({
						method: 'GET',
						url: ngmAuth.LOCATION + '/api/listReportDocuments/' + $route.current.params.report_id 
					}).then(function (data) {
						// assign data
						// set for grid view						
						$scope.listUpload = data;
						$scope.listUpload.id = 'ngm-paginate-' + Math.floor((Math.random() * 1000000))
						$scope.listUpload.itemsPerPage = 12;
					});
				},
        // save
        save: function( complete, display_modal ) {

          // disable btn
          $scope.report.submit = false;

          // set to complete if "submit monthly report"
          $scope.report.report.report_status = complete ? 'complete' : 'todo';

          // time submitted
          $scope.report.report.report_submitted = moment().format();

          // msg
					Materialize.toast( $filter('translate')('processing_stock_report') , 3000, 'note');

          // setReportRequest
          var setReportRequest = {
            method: 'POST',
            url: ngmAuth.LOCATION + '/api/cluster/stock/setReport',
            data: {
              report: $scope.report.report
            }
          }

          // set report
          ngmData.get( setReportRequest ).then( function( report ){

            // enable
            $scope.report.submit = true;
						$scope.report.report = report;

            // report
            $scope.report.updatedAt = moment( report.updatedAt ).format( 'DD MMMM, YYYY @ h:mm:ss a' );

            // user msg
            var msg = $filter('translate')('stock_report_for')+' ' + $scope.report.titleFormat + ' ';
                msg += complete ? $filter('translate')('submitted')+'!' : $filter('translate')('saved_mayus1')+'!';

            // msg
            Materialize.toast( msg , 3000, 'success');
						$('.modal-trigger').leanModal();

            // Re-direct to summary
            if ( $scope.report.report.report_status !== 'complete' ) {
              if(display_modal){
                // update
                $timeout(function() {
                  // Re-direct to summary
                  $location.path( '/cluster/stocks/');
                }, 200);
              } else {
                $timeout(function() {
                  // $route.reload();
                }, 200);
              }
            } else {
              $timeout(function() {
                $location.path( '/cluster/stocks');
              }), 200;
            }

          });

        }
      }

			$scope.report.init();
			$scope.report.getDocument();

  }

]);


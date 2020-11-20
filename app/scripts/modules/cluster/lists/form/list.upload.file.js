angular.module('ngm.widget.form.upload.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.upload.list', {
                title: 'Upload Form List',
                description: 'Upload Form List',
                controller: 'UploadFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/list-upload.html'
            });
    })
    .controller('UploadFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmClusterHelper',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
        '$route',
        'listService',
        'ngmClusterImportFile',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmClusterHelper,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $filter,
            $route,
            listService,
            ngmClusterImportFile
        ) {
            $scope.ngmClusterHelper = ngmClusterHelper
            $scope.listService = listService;
            $scope.ngmClusterImportFile = ngmClusterImportFile;
            $scope.master = {
                init: function () {

                },
                uploadFileConfig: {
                    previewTemplate: ngmClusterImportFile.templatePreview(),
                    completeMessage: '<i class="medium material-icons" style="color:#009688;">cloud_done</i><br/><h5 style="font-weight:300;">' + $filter('translate')('complete') + '</h5><br/><h5 style="font-weight:100;"><div id="add_doc" class="btn"><i class="small material-icons">add_circle</i></div></h5></div>',
                    acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv',
                    maxFiles: 1,
                    parallelUploads: 1,
                    url: ngmAuth.LOCATION + '/api/uploadGDrive',
                    dictDefaultMessage:
                        `<i class="medium material-icons" style="color:#009688;">publish</i> <br/>` + $filter('translate')('drag_files_here_or_click_button_to_upload') + ' <br/> Please upload file with extention .csv or xlxs !',
                    notSupportedFile: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>` + $filter('translate')('not_supported_file_type') + ' ',
                    errorMessage: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Error`,
                    addRemoveLinks: false,
                    autoProcessQueue: false,
                    init: function () {
                        drop_zone = this;
                        // upload_file and delete_file is ID for button upload and cancel
                        $("#upload_file").attr("disabled", true);
                        $("#delete_file").attr("disabled", true);
                        var file = [];
                        document.getElementById('upload_file').addEventListener("click", function () {
                            $("#upload_file").attr("disabled", true);
                            $("#delete_file").attr("disabled", true);
                            var ext = drop_zone.getAcceptedFiles()[0].name.split('.').pop();

                            if (ext === 'csv') {
                                var file = drop_zone.getAcceptedFiles()[0],
                                    read = new FileReader();

                                read.readAsBinaryString(file);

                                read.onloadend = function () {
                                    var csv_string = read.result

                                    csv_array = Papa.parse(csv_string).data;

                                    var previews = document.querySelectorAll(".dz-preview");
                                    previews.forEach(function (preview) {
                                        preview.style.display = 'none';
                                    })
                                    document.querySelector(".percent-upload").style.display = 'block';
                                    file = ngmClusterImportFile.setCsvValueToArrayofObject(csv_array);
                                    if (file.length) {
                                        $timeout(function () {
                                            $scope.master.upload(file, true)
                                            document.querySelector(".percent-upload").style.display = 'none';
                                            drop_zone.removeAllFiles(true);
                                        }, 3000)
                                    }

                                }


                            } else {
                                file = drop_zone.getAcceptedFiles()[0]
                                const wb = new ExcelJS.Workbook();
                                drop_zone.getAcceptedFiles()[0].arrayBuffer().then((data) => {
                                    var result = []
                                    wb.xlsx.load(data).then(workbook => {
                                        const book = [];
                                        var book_obj = [];

                                        workbook.eachSheet((sheet, index) => {
                                            // get only the first sheet
                                            if (index === 1) {
                                                const sh = [];
                                                sheet.eachRow(row => {
                                                    sh.push(row.values);
                                                });
                                                book.push(sh);
                                            }
                                        });
                                        var previews = document.querySelectorAll(".dz-preview");
                                        previews.forEach(function (preview) {
                                            preview.style.display = 'none';
                                        })
                                        document.querySelector(".percent-upload").style.display = 'block';
                                        
                                        file = ngmClusterImportFile.setExcelValueToArrayofObject(book);
                                        validation = listService.validateFile(file, $route.current.params.id)
                                       
                                        // if (validation.valid) {
                                            $timeout(function () {
                                                $scope.master.upload(file, validation, $route.current.params.id)
                                                document.querySelector(".percent-upload").style.display = 'none';
                                                drop_zone.removeAllFiles(true);
                                            }, 3000)
                                        // }
                                    })
                                })
                            }
                        });

                        document.getElementById('delete_file').addEventListener("click", function () {
                            drop_zone.removeAllFiles(true);
                        });

                        // when add file
                        drop_zone.on("addedfile", function (file) {

                            document.querySelector(".dz-default.dz-message").style.display = 'none';
                            var ext = file.name.split('.').pop();
                            //change preview if not image/*
                            $(file.previewElement).find(".dz-image img").attr("src", "images/elsedoc.png");
                            $("#upload_file").attr("disabled", false);
                            $("#delete_file").attr("disabled", false);

                        });

                        // when remove file
                        drop_zone.on("removedfile", function (file) {

                            if (drop_zone.files.length < 1) {
                                // upload_file and delete_file is ID for button upload and cancel
                                $("#upload_file").attr("disabled", true);
                                $("#delete_file").attr("disabled", true);

                                document.querySelector(".dz-default.dz-message").style.display = 'block';
                                $('.dz-default.dz-message').html(`<i class="medium material-icons" style="color:#009688;">publish</i> <br/>` + $filter('translate')('drag_files_here_or_click_button_to_upload') + ' <br/> Please upload file with extention .csv or xlxs !');
                            }

                            if ((drop_zone.files.length < 2) && (drop_zone.files.length > 0)) {
                                document.querySelector(".dz-default.dz-message").style.display = 'none';
                                $("#upload_file").attr("disabled", false);
                                $("#delete_file").attr("disabled", false);
                                document.getElementById("upload_file").style.pointerEvents = "auto";
                                document.getElementById("delete_file").style.pointerEvents = "auto";

                            }
                        });

                        drop_zone.on("maxfilesexceeded", function (file) {
                            document.querySelector(".dz-default.dz-message").style.display = 'none';
                            $('.dz-default.dz-message').html(`<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>` + 'Please, import just one file at the time and remove exceeded file');
                            document.querySelector(".dz-default.dz-message").style.display = 'block'
                            // Materialize.toast("Too many file to upload", 6000, "error")
                            M.toast({ html: "Too many file to upload", displayLength: 2000, classes: 'error' });
                            $("#upload_file").attr("disabled", true);
                            document.getElementById("upload_file").style.pointerEvents = "none";
                            $("#delete_file").attr("disabled", true);
                            document.getElementById("delete_file").style.pointerEvents = "none";
                        });

                        // reset
                        this.on("reset", function () {
                            // upload_file and delete_file is ID for button upload and cancel
                            document.getElementById("upload_file").style.pointerEvents = 'auto';
                            document.getElementById("delete_file").style.pointerEvents = 'auto';
                        });

                    },

                },
                messageError:'',
                upload: function (file, validation,type) {
                    // upload file
                    if (validation.valid) {
                        url_api = '/api/admin/cluster/list/' + type + '/upload';
                        if (type === "Admin1" ||
                            type === "Admin2" ||
                            type === "Admin3" ||
                            type === "Admin4" ||
                            type === "Admin5" ||
                            type === "AdminSites"
                        ){
                            '/api/admin/cluster/adminlist/' + type + '/upload';
                        }
                        $http({
                            method: 'POST',
                            // url: ngmAuth.LOCATION + '/api/admin/cluster/list/'+type+'/upload',
                            url: ngmAuth.LOCATION + url_api,
                            data: {
                                data: file
                            }
                        }).success(function (update) {
                            M.toast({ html: "Success", displayLength: 2000, classes: 'success' });

                        }).error(function (err) {
                            M.toast({ html: "Error", displayLength: 2000, classes: 'error' });
                        })
                    }else{
                        $scope.master.messageError = validation.error;

                        $('#message-upload-file').modal({ dismissible: false });
                        $('#message-upload-file').modal('open');
                    }
                }

            }

            $scope.master.init();

        }])
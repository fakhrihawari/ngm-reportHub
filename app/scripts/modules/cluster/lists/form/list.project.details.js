angular.module('ngm.widget.form.project.detail.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.project.detail.list', {
                title: 'Project Detail Form List',
                description: 'Project Detail Form List',
                controller: 'ProjectDetailFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/project.detail.list.html'
            });
    })
    .controller('ProjectDetailFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $filter
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                project_details: config.project_details ? config.project_details : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                // editedOrg: {},
                // removeOrg: {},
                editedProjectDetail: {},
                removedProjectDetail: {},
                openAddModal: function (modal) {
                    $('#add-project_detail-modal').modal({ dismissible: false });
                    $('#add-project_detail-modal').modal('open');
                    $scope.addProjectDetail = {
                        admin0pcode: '',
                        project_detail_id: '', 
                        project_detail_name:''
                    };

                },
                // removeOrgModal: function (org) {
                //     $scope.master.removeOrg = org;
                //     $('#remove-org-modal').modal({ dismissible: false });
                //     $('#remove-org-modal').modal('open');

                // },
                removeProjectDetailkModal: function (project_detail) {
                    $scope.master.removedProjectDetail = project_detail;
                    $('#remove-project_detail-modal').modal({ dismissible: false });
                    $('#remove-project_detail-modal').modal('open');

                },
                cluster: config.cluster ? config.cluster : 'all',
                admin0pcode: config.admin0pcode ? config.admin0pcode.toUpperCase() : 'ALL',
                country: [
                    {
                        'admin0pname': 'All',
                        'admin0pcode': 'ALL',

                    },
                    {
                        'admin0pname': 'Afghanistan',
                        'admin0pcode': 'AF',

                    }, {
                        'admin0pname': 'Bangladesh',
                        'admin0pcode': 'BD',

                    }, {
                        'admin0pname': 'Cox Bazar',
                        'admin0pcode': 'CB',

                    }, {
                        'admin0pname': 'Democratic Republic of Congo',
                        'admin0pcode': 'CD',
                    }, {
                        'admin0pname': 'Ethiopia',
                        'admin0pcode': 'ET',

                    }, {
                        'admin0pname': 'Somalia',
                        'admin0pcode': 'SO',

                    }, {
                        'admin0pname': 'South Sudan',
                        'admin0pcode': 'SS',

                    }, {
                        'admin0pname': 'Syria',
                        'admin0pcode': 'SY',

                    }, {
                        'admin0pname': 'Ukraine',
                        'admin0pcode': 'UA',

                    }, {
                        'admin0pname': 'Yemen',
                        'admin0pcode': 'YE',

                    }, {
                        'admin0pname': 'Nigeria',
                        'admin0pcode': 'NG',

                    },
                    {
                        'admin0pname': 'Colombia',
                        'admin0pcode': 'COL',
                    }],
                addProjectDetail: function () {
                    if (!$scope.addProjectDetail.project_detail_id) {
                        $scope.addProjectDetail.project_detail_id = $scope.addProjectDetail.project_detail_name.split(' ').join('_').toLowerCase();
                    }
                    console.log($scope.addProjectDetail)
                    M.toast({ html: 'Adding New Project Detail...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/projectdetails',
                        data: {
                            data: $scope.addProjectDetail
                        }
                    }).success(function (new_project_detail) {
                        if (new_project_detail.err) {
                            M.toast({ html: 'Error! Project Detail Not Added </br>' + new_project_detail.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_project_detail.err) {
                            $scope.master.project_details.unshift(new_project_detail);
                            $timeout(function () {
                                $('#add-project_detail-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Project Detail ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Project Detail Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationProjectDetail: function (project_detail) {
                    valid = false;
                    if (!project_detail || project_detail.project_detail_name === '' || project_detail.admin0pcode === '') {
                        valid = false;
                    } else {
                        valid = true;
                    }
                    return valid;
                },
                updateName: function (list, key, name, item) {

                    // this approach does NOT break gulp!
                    $timeout(function () {
                        var obj = {}
                        obj[key] = item[key];
                        var select = $filter('filter')(list, obj, true);

                        // set name
                        if (select.length) {
                            // name
                            item[name] = select[0][name];
                        }
                    }, 10);
                },
                setEditedprojectDetail: function (project_detail) {
                    $scope.master.editedProjectDetail = angular.copy(project_detail);
                    $('#edit-project_detail-modal').modal({ dismissible: false });
                    $('#edit-project_detail-modal').modal('open');

                },
                editProjectDetail: function (project_detail) {

                    M.toast({ html: 'Updating Project Detail....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/projectdetails',
                        data: {
                            data: project_detail
                        }
                    }).success(function (project_detail_edited) {
                        if (project_detail_edited.err) {
                            M.toast({ html: 'Error! Project Detail not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!project_detail_edited.err) {
                            var index = $scope.master.project_details.map(x => { return x.id }).indexOf(project_detail_edited.id);
                            $scope.master.project_details[index] = project_detail_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Project Detail is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Project Detail not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.editedStock = {};
                },
                removeProjectDetail: function (id) {
                    M.toast({ html: 'Deleting Project Detail....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/projectdetails',
                        data: {
                            data: $scope.master.removedProjectDetail
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! project_details not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.project_details.map(x => { return x.id }).indexOf(id);
                                $scope.master.project_details.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete project_details ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! project_details not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {
                }
            }

            $scope.master.init();

        }])
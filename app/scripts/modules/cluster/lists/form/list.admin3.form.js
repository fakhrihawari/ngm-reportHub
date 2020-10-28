
angular.module('ngm.widget.form.admin3.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.admin3.list', {
                title: 'Admin3 Form List',
                description: 'Admin3 Form List',
                controller: 'Admin3FormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/admin3.list.html'
            });
    })
    .controller('Admin3FormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),

                admin3lists: config.admin3lists ? config.admin3lists : [],
                admin2lists: config.admin2lists,
                admin1lists: config.admin1lists,
                admin0lists: config.admin0lists,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                addAdmin3Attribute :{
                    admin0pcode: '',
                    admin1pcode: '',
                    admin2pcode: '',
                    admin3lat: 0.0,
                    admin3lng: 0.0,
                    admin3name: "",
                    admin3pcode: "",
                    admin3type_name: "",
                    admin3zoom: 12,
                    inactive: false
                },
                resetAddForm: function () {
                    var reset_form = {
                        admin0pcode: '',
                        admin1pcode: '',
                        admin2pcode: '',
                        admin3lat: 0.0,
                        admin3lng: 0.0,
                        admin3name: "",
                        admin3pcode: "",
                        admin3type_name: "",
                        admin3zoom: 12,
                        inactive: false
                    }
                    $scope.master.addAdmin3Attribute = reset_form;
                },
                editedAdmin3: {},
                removeAdmin3: {},
                openAddModal: function (modal) {
                    $('#add-admin3-modal').modal({ dismissible: false });
                    $('#add-admin3-modal').modal('open');
                },
                admin3Type: ["Nahya", "Ward", "Upazila", "Council", "Camp", "Woreda", "LLG", "Municipality"],
                removeAdmin3Modal: function (type) {
                    $scope.master.removeAdmin3 = type;
                    $('#remove-admin3-modal').modal({ dismissible: false });
                    $('#remove-admin3-modal').modal('open');

                },
                addAdmin3: function () {

                    console.log($scope.addAdmin3Attribute)
                    M.toast({ html: 'Adding New Admin3 ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin3',
                        data: {
                            data: $scope.master.addAdmin3Attribute
                        }
                    }).success(function (new_admin3) {
                        console.log(new_admin3)
                        if (new_admin3.err) {
                            M.toast({ html: 'Error! Admin3  Not Added </br>' + new_admin3.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin3.err) {
                            $scope.master.admin3lists.unshift(new_admin3);
                            $timeout(function () {
                                $('#add-admin3-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Admin3  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Admin3  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationAdmin3: function (admin) {
                    valid = false;
                    if (!admin || admin.admin1name === '' || admin.admin1pcode === '' || admin.admin2name === '' || admin.admin2pcode === '' || admin.admin3name === '' || admin.admin3pcode === '' || admin.admin3type_name === '' || !admin.admin3lat || !admin.admin3lng) {
                        valid = false;
                    } else {
                        valid = true;
                    }
                    return valid;
                },
                checkActiveDeactivedUnit: function (item) {
                },
                changeActiveDeactivedUnitByCluster: function (id) {
                },
                disabledUnit: function (item) {
                },
                setEditedAdmin3: function (admin) {
                    $scope.master.editedAdmin3 = angular.copy(admin);
                    $('#edit-admin3-modal').modal({ dismissible: false });
                    $('#edit-admin3-modal').modal('open');
                },
                editAdmin3: function (admin) {

                    M.toast({ html: 'Updating Admin3....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin3',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {
                        console.log(admin_edited)
                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Admin3 not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.admin3lists.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.admin3lists[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Admin3 is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin3 not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedAdmin3 = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'COUNTRY') {
                        return true;
                    }
                    // if organization type is international
                    if (item.organization_type === 'International NGO' || item.organization_type === 'United Nations') {
                        if (role === 'SUPERADMIN') {
                            return false;
                        }
                        return true;
                    }
                    return false;
                },
                updateAdminAttribute: function (item, level) {
                    if (level === 'admin0') {
                        item.admin1pcode = ''
                    }
                    if (level === 'admin1') {   
                        item.admin2pcode = '';
                    }
                    if (level === 'admin2') {
                        selected = $scope.master.admin2lists.filter(x => x.admin2pcode === item.admin2pcode )
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.admin3pcode = item.admin2pcode;
                            item.admin3lat = 0.0
                            item.admin3lng = 0.0
                            item.admin3type_name = ""
                        }
                    }


                    // console.log($scope.addAdmin3Attribute)
                },
                removedAdmin3: function (id) {
                    M.toast({ html: 'Deleting Admin3....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin3',
                        data: {
                            data: $scope.master.removeAdmin3
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Admin3 not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.admin3lists.map(x => { return x.id }).indexOf(id);
                                $scope.master.admin3lists.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Admin3 ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin3 not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])
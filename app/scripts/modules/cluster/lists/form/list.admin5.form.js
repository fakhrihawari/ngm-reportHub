
angular.module('ngm.widget.form.admin5.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.admin5.list', {
                title: 'Admin5 Form List',
                description: 'Admin5 Form List',
                controller: 'Admin5FormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/admin5.list.html'
            });
    })
    .controller('Admin5FormListCtrl', [
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
                admin5lists: config.admin5lists ? config.admin5lists : [],
                admin4lists: config.admin4lists,
                admin3lists: config.admin3lists,
                admin2lists: config.admin2lists,
                admin1lists: config.admin1lists,
                admin0lists: config.admin0lists,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                addAdmin5Attribute: {
                    admin0pcode: '',
                    admin1pcode: '',
                    admin2pcode: '',
                    admin3pcode:'',
                    admin5lat: 0.0,
                    admin5lng: 0.0,
                    admin5name: "",
                    admin5pcode: "",
                    admin5type_name: "",
                    admin5zoom: 16,
                    inactive: false
                },
                resetAddForm: function () {
                    var reset_form = {
                        admin0pcode: '',
                        admin1pcode: '',
                        admin2pcode: '',
                        admin3pcode: '',
                        admin5lat: 0.0,
                        admin5lng: 0.0,
                        admin5name: "",
                        admin5pcode: "",
                        admin5type_name: "",
                        admin5zoom: 16,
                        inactive: false
                    }
                    $scope.master.addAdmin5Attribute = reset_form;
                },
                editedAdmin5: {},
                removeAdmin5: {},
                openAddModal: function (modal) {
                    $('#add-admin5-modal').modal({ dismissible: false });
                    $('#add-admin5-modal').modal('open');
                },
                admin5Type: ["Union", "Settlement", "Refugee Block"],
                removeAdmin5Modal: function (type) {
                    $scope.master.removeAdmin5 = type;
                    $('#remove-admin5-modal').modal({ dismissible: false });
                    $('#remove-admin5-modal').modal('open');

                },
                addAdmin5: function () {

                    console.log($scope.addAdmin5Attribute)
                    M.toast({ html: 'Adding New Admin5 ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin5',
                        data: {
                            data: $scope.master.addAdmin5Attribute
                        }
                    }).success(function (new_admin5) {
                        console.log(new_admin5)
                        if (new_admin5.err) {
                            M.toast({ html: 'Error! Admin5  Not Added </br>' + new_admin5.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin5.err) {
                            $scope.master.admin5lists.unshift(new_admin5);
                            $timeout(function () {
                                $('#add-admin5-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Admin5  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Admin5  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationAdmin5: function (admin) {
                    valid = false;
                    if (!admin || admin.admin1name === '' || admin.admin1pcode === '' || admin.admin2name === '' || admin.admin2pcode === '' || admin.admin3name === '' || admin.admin3pcode === '' || admin.admin4name === '' || admin.admin4pcode === ''
                        || admin.admin5name === '' || admin.admin5pcode === '' || admin.admin5type_name === '' || !admin.admin5lat || !admin.admin5lng) {
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
                setEditedAdmin5: function (admin) {
                    $scope.master.editedAdmin5 = angular.copy(admin);
                    $('#edit-admin5-modal').modal({ dismissible: false });
                    $('#edit-admin5-modal').modal('open');
                },
                editAdmin5: function (admin) {

                    M.toast({ html: 'Updating Admin5....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin5',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {
                        console.log(admin_edited)
                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Admin5 not updated', displayLength: 4000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.admin5lists.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.admin5lists[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Admin5 is Updated ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin5 not updated', displayLength: 4000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedAdmin5 = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'USER') {
                        return true;
                    }
                    return false;
                },
                updateAdminAttribute: function (item, level) {
                    console.log(item, level)
                    if (level === 'admin0') {
                        item.admin1pcode = '';
                        item.admin2pcode = '';
                        item.admin3pcode = '';
                        item.admin4pcode = '';
                    }
                    if (level === 'admin1') {
                        item.admin2pcode = '';
                        item.admin3pcode = '';
                        item.admin4pcode = '';
                    }
                    if (level === 'admin2') {
                        item.admin3pcode = '';
                        item.admin4pcode = '';
                    }
                    if (level === 'admin3') {
                        item.admin4pcode = '';
                    }
                    if (level === 'admin4') {
                        selected = $scope.master.admin4lists.filter(x => x.admin4pcode === item.admin4pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.admin5pcode = item.admin4pcode;
                            item.admin5lat = 0.0
                            item.admin5lng = 0.0
                            item.admin5type_name = ""
                        }
                    }


                    console.log($scope.addAdmin5Attribute)
                },
                removedAdmin5: function (id) {
                    M.toast({ html: 'Deleting Admin5....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin5',
                        data: {
                            data: $scope.master.removeAdmin5
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Admin5 not deleted', displayLength: 4000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.admin5lists.map(x => { return x.id }).indexOf(id);
                                $scope.master.admin5lists.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Admin5 ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin5 not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {
                   
                }
            }

            $scope.master.init();

        }])
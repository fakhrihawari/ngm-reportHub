
angular.module('ngm.widget.form.admin4.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.admin4.list', {
                title: 'Admin4 Form List',
                description: 'Admin4 Form List',
                controller: 'Admin4FormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/admin4.list.html'
            });
    })
    .controller('Admin4FormListCtrl', [
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

                admin4lists: config.admin4lists ? config.admin4lists : [],
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
                addAdmin4Attribute: {
                    admin0pcode: '',
                    admin1pcode: '',
                    admin2pcode: '',
                    admin4lat: 0.0,
                    admin4lng: 0.0,
                    admin4name: "",
                    admin4pcode: "",
                    admin4type_name: "",
                    admin4zoom: 14,
                    inactive: false
                },
                editedAdmin4: {},
                removeAdmin4: {},
                openAddModal: function (modal) {
                    $('#add-admin4-modal').modal({ dismissible: false });
                    $('#add-admin4-modal').modal('open');
                },
                admin4Type: ["Union", "Settlement", "Refugee Block"],
                removeAdmin4Modal: function (type) {
                    $scope.master.removeAdmin4 = type;
                    $('#remove-admin4-modal').modal({ dismissible: false });
                    $('#remove-admin4-modal').modal('open');

                },
                addAdmin4: function () {

                    console.log($scope.addAdmin4Attribute)
                    M.toast({ html: 'Adding New Admin4 ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin4',
                        data: {
                            data: $scope.master.addAdmin4Attribute
                        }
                    }).success(function (new_admin4) {
                        console.log(new_admin4)
                        if (new_admin4.err) {
                            M.toast({ html: 'Error! Admin4  Not Added </br>' + new_admin4.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin4.err) {
                            $scope.master.admin4lists.unshift(new_admin4);
                            $timeout(function () {
                                $('#add-admin4-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Admin4  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Admin4  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationAdmin4: function (admin) {
                    valid = false;
                    if (!admin || admin.admin1name === '' || admin.admin1pcode === '' || admin.admin2name === '' || admin.admin2pcode === '' || admin.admin3name === '' || admin.admin3pcode === ''
                        || admin.admin4name === '' || admin.admin4pcode === '' || admin.admin4type_name === '' || !admin.admin4lat || !admin.admin4lng) {
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
                setEditedAdmin4: function (admin) {
                    $scope.master.editedAdmin4 = angular.copy(admin);
                    $('#edit-admin4-modal').modal({ dismissible: false });
                    $('#edit-admin4-modal').modal('open');
                },
                editAdmin4: function (admin) {

                    M.toast({ html: 'Updating Admin4....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin4',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {
                        console.log(admin_edited)
                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Admin4 not updated', displayLength: 4000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.admin4lists.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.admin4lists[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Admin4 is Updated ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin4 not updated', displayLength: 4000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedAdmin4 = {};
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
                    console.log(item,level)
                    if (level === 'admin0') {
                        item.admin1pcode = '';
                        item.admin2pcode = '';
                        item.admin3pcode = '';
                    }
                    if (level === 'admin1') {
                        item.admin2pcode = '';
                        item.admin3pcode = '';
                    }
                    if (level === 'admin2') {
                        item.admin3pcode = '';
                    }
                    if (level === 'admin3') {
                        selected = $scope.master.admin3lists.filter(x => x.admin3pcode === item.admin3pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.admin4pcode = item.admin3pcode;
                            item.admin4lat = 0.0
                            item.admin4lng = 0.0
                            item.admin4type_name = ""
                        }
                    }


                    console.log($scope.addAdmin4Attribute)
                },
                removedAdmin4: function (id) {
                    M.toast({ html: 'Deleting Admin4....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin4',
                        data: {
                            data: $scope.master.removeAdmin4
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Admin4 not deleted', displayLength: 4000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.admin4lists.map(x => { return x.id }).indexOf(id);
                                $scope.master.admin4lists.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Admin4 ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin4 not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])
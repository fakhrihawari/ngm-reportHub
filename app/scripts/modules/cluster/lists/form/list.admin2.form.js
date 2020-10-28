angular.module('ngm.widget.form.admin2.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.admin2.list', {
                title: 'Admin2 Form List',
                description: 'Admin2 Form List',
                controller: 'Admin2FormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/admin2.list.html'
            });
    })
    .controller('Admin2FormListCtrl', [
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

                admin2lists: config.admin2lists ? config.admin2lists : [],
                admin1lists: config.admin1lists,
                admin0lists: config.admin0lists,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                addAdmin2Attribute: {
                    admin0pcode: '',
                    admin2lat: 0.0,
                    admin2lng: 0.0,
                    admin2name: "",
                    admin2pcode: "",
                    admin2type_name: "",
                    admin2zoom: 10,
                    inactive: false
                },
                editedAdmin2: {},
                removeAdmin2: {},
                openAddModal: function (modal) {
                    $('#add-admin2-modal').modal({ dismissible: false });
                    $('#add-admin2-modal').modal('open');

                },
                admin2Type: ["District"],
                removeAdmin2Modal: function (type) {
                    $scope.master.removeAdmin2 = type;
                    $('#remove-admin2-modal').modal({ dismissible: false });
                    $('#remove-admin2-modal').modal('open');

                },
                addAdmin2: function () {

                    
                    M.toast({ html: 'Adding New Admin2 ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin2',
                        data: {
                            data: $scope.master.addAdmin2Attribute
                        }
                    }).success(function (new_admin2) {
                        if (new_admin2.err) {
                            M.toast({ html: 'Error! Admin2  Not Added </br>' + new_admin2.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin2.err) {
                            $scope.master.admin2lists.unshift(new_admin2);
                            $timeout(function () {
                                $('#add-admin2-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Admin2  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Admin2  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationAdmin2: function (admin) {
                    valid = false;
                    if (!admin || admin.admin1name === '' || admin.admin1pcode === '' || admin.admin2name === '' || admin.admin2pcode === '' || admin.admin2type_name === '' || !admin.admin2lat || !admin.admin2lng) {
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
                setEditedAdmin2: function (admin) {
                    $scope.master.editedAdmin2 = angular.copy(admin);
                    $('#edit-admin2-modal').modal({ dismissible: false });
                    $('#edit-admin2-modal').modal('open');
                },
                editAdmin2: function (admin) {

                    M.toast({ html: 'Updating Admin2....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin2',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {
                        console.log(admin_edited)
                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Admin2 not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.admin2lists.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.admin2lists[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Admin2 is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin2 not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedAdmin2 = {};
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
                updateAdminAttribute: function (item,level) {
                    if(level ==='admin0'){
                       item.admin1pcode =''
                    }
                    if(level ==='admin1'){
                        selected = $scope.master.admin1lists.filter(x => x.admin1pcode === item.admin1pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge( item, selected[0])
                            item.admin2pcode = item.admin1pcode;
                            item.admin2lat = 0.0
                            item.admin2lng = 0.0
                            item.admin2type_name = ""
                        }
                    }
                    

                    console.log($scope.addAdmin2Attribute)
                },
                removedAdmin2: function (id) {
                    M.toast({ html: 'Deleting Admin2....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin2',
                        data: {
                            data: $scope.master.removeAdmin2
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Admin2 not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.admin2lists.map(x => { return x.id }).indexOf(id);
                                $scope.master.admin2lists.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Admin2 ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin2 not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])
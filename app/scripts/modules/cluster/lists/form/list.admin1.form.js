angular.module('ngm.widget.form.admin1.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.admin1.list', {
                title: 'Admin1 Form List',
                description: 'Admin1 Form List',
                controller: 'Admin1FormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/admin1.list.html'
            });
    })
    .controller('Admin1FormListCtrl', [
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

                admin1lists: config.admin1lists ? config.admin1lists : [],
                admin0lists: config.admin0lists,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedAdmin1: {},
                removeAdmin1: {},
                openAddModal: function (modal) {
                    $('#add-admin1-modal').modal({ dismissible: false });
                    $('#add-admin1-modal').modal('open');
                    $scope.addAdmin1Attribute = {
                        admin0pcode:'',
                        admin1lat: 0.0,
                        admin1lng: 0.0,
                        admin1name: "",
                        admin1pcode: "",
                        admin1type_name: "",
                        admin1zoom: 8,
                        inactive : false
                    };

                },
                admin1Type: ["Governate", "Region", "Province", "County", "Mohafaza", "State", "Division", "Upazila", "Oblast", "Departamento", "Governorate"],
                removeAdmin1Modal: function (type) {
                    $scope.master.removeAdmin1 = type;
                    $('#remove-admin1-modal').modal({ dismissible: false });
                    $('#remove-admin1-modal').modal('open');

                },
                addAdmin1: function () {
                    
                    console.log($scope.addAdmin1Attribute)
                    M.toast({ html: 'Adding New Admin1 ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin1',
                        data: {
                            data: $scope.addAdmin1Attribute
                        }
                    }).success(function (new_admin1) {
                        console.log(new_admin1)
                        if (new_admin1.err) {
                            M.toast({ html: 'Error! Admin1  Not Added </br>' + new_admin1.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin1.err) {
                            $scope.master.admin1lists.unshift(new_admin1);
                            $timeout(function () {
                                $('#add-admin1-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Admin1  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Admin1  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationAdmin1: function (admin) {
                    valid = false;
                    if (!admin || admin.admin1name === '' || admin.admin1pcode === '' || admin.admin1type_name === '' || !admin.admin1lat || !admin.admin1lng) {
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
                setEditedAdmin1: function (admin) {
                    $scope.master.editedAdmin1 = angular.copy(admin);
                    $('#edit-admin1-modal').modal({ dismissible: false });
                    $('#edit-admin1-modal').modal('open');
                },
                editAdmin1: function (admin) {

                    M.toast({ html: 'Updating Admin1....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin1',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {
                        console.log(admin_edited)
                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Admin1 not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.admin1lists.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.admin1lists[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Admin1 is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin1 not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedAdmin1 = {};
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
                updateAdminAttribute:function(item){
                    
                    selected = $scope.master.admin0lists.filter(x => x.admin0pcode === item.admin0pcode)
                    if(selected[0]){
                        item = angular.merge({}, item,selected[0])
                        item.admin1pcode = item.admin0pcode;
                        item.admin1lat = 0.0
                        item.admin1lng = 0.0
                        item.admin1type_name = ""
                        item.inactive=false;

                        
                    }

                    console.log(item)
                },
                removedAdmin1: function (id) {
                    M.toast({ html: 'Deleting Admin1....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin1',
                        data: {
                            data: $scope.master.removeAdmin1
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Admin1 not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.admin1lists.map(x => { return x.id }).indexOf(id);
                                $scope.master.admin1lists.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Admin1 ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin1 not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])
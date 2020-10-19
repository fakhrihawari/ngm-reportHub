angular.module('ngm.widget.form.unit.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.unit.list', {
                title: 'Unit Form List',
                description: 'Unit Form List',
                controller: 'UnitFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/unit.list.html'
            });
    })
    .controller('UnitFormListCtrl', [
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
                units: config.units?config.units:[],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                cluster_id: config.cluster_id,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedUnit: {},
                removeUnit: {},
                openAddModal: function (modal) {
                    $('#add-unit-modal').modal({ dismissible: false });
                    $('#add-unit-modal').modal('open');
                    $scope.addUnitAttribute = {
                        cluster_id: [],
                        unit_type_id: '', 
                        unit_type_name: ''
                    };

                },
                removeUnitModal: function (org) {
                    $scope.master.removeUnit = org;
                    $('#remove-unit-modal').modal({ dismissible: false });
                    $('#remove-unit-modal').modal('open');

                },
                // admin0pcode: config.admin0pcode.toUpperCase(),
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
                addUnit: function () {
                    if (!$scope.addUnitAttribute.unit_type_id){
                        $scope.addUnitAttribute.unit_type_id = $scope.addUnitAttribute.unit_type_name.split(' ').join('_').toLowerCase()
                    }
                    console.log($scope.addUnitAttribute)
                    M.toast({ html: 'Adding New Unit...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/units',
                        data: {
                            data: $scope.addUnitAttribute
                        }
                    }).success(function (new_unit) {
                        if (new_unit.err) {
                            M.toast({ html: 'Error! Unit Not Added </br>' + new_unit.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_unit.err) {
                            $scope.master.units.unshift(new_unit);
                            $timeout(function () {
                                $('#add-unit-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Unit ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Unit Not Added </br>' + err.err , displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationUnit: function (unit) {
                    valid = false;
                    if (!unit || unit.unit_type_name === '' || !unit.cluster_id ||!unit.cluster_id.length ) {
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
                setEditedUnit: function (unit) {
                    $scope.master.editedUnit = angular.copy(unit);
                    $('#edit-unit-modal').modal({ dismissible: false });
                    $('#edit-unit-modal').modal('open');
                },
                editUnit: function (unit) {

                    M.toast({ html: 'Updating Unit....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/units',
                        data: {
                            data: unit
                        }
                    }).success(function (unit_edited) {
                        if (unit_edited.err) {
                            M.toast({ html: 'Error! Unit not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!unit_edited.err) {
                            var index = $scope.master.units.map(x => { return x.id }).indexOf(unit_edited.id);
                            $scope.master.units[index] = unit_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Unit is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Unit not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedUnit = {};
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
                editClusterUnit: function (id) {
                    if (document.getElementById('edit-' + id).checked) {
                        console.log($scope.master.editedUnit)
                        $scope.master.editedUnit.cluster_id.push(id)
                    } else {
                        var index = $scope.master.editedUnit.cluster_id.indexOf(id)
                        $scope.master.editedUnit.cluster_id.splice(index, 1)

                    }
                },
                addClusterUnit: function (id) {
                    if (document.getElementById('add-' + id).checked) {
                        $scope.addUnitAttribute.cluster_id.push(id)
                    } else {
                        var index = $scope.addUnitAttribute.cluster_id.indexOf(id)
                        $scope.addUnitAttribute.cluster_id.splice(index, 1)

                    }
                },
                removedUnit: function (id) {
                    M.toast({ html: 'Deleting Unit....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/units',
                        data: {
                            data: $scope.master.removeUnit
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Unit not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.units.map(x => { return x.id }).indexOf(id);
                                $scope.master.units.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete unit ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Unit not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                // changeListCountry: function (item) {
                // },
                // showInactive: function (org) {
                // },
                // editInactiveCountry: function (id, prefix, item) {
                // },
                init: function () {
                    $scope.master.list_cluster = [];
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    if (role === 'SUPERADMIN' || $scope.master.user.email === 'farifin@immap.org' || $scope.master.user.email === 'pfitzgerald@immap.org' || $scope.master.user.email === 'tkilkeiev@immap.org') {
                        $scope.master.list_cluster = $scope.master.clusters;
                    } else {
                        $scope.master.list_cluster = $scope.master.clusters.filter(x => x.cluster_id === $scope.master.cluster_id);
                    }

                }
            }

            $scope.master.init();

        }])
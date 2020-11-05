angular.module('ngm.widget.form.hrp.type.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.hrp.type.list', {
                title: 'HRP Type Form List',
                description: 'HRP Type Form List',
                controller: 'HrpBeneficiaryTypeFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/hrp.type.list.html'
            });
    })
    .controller('HrpBeneficiaryTypeFormListCtrl', [
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
                hrp_beneficiary_types: config.hrp_beneficiary_types ? config.hrp_beneficiary_types : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                cluster_id: config.cluster_id,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedHrpType: {},
                removeHrpType: {},
                openAddModal: function (modal) {
                    $('#add-hrp-beneficiary-type-modal').modal({ dismissible: false });
                    $('#add-hrp-beneficiary-type-modal').modal('open');
                    $scope.addHrpTypeAttribute = {
                        cluster_id: [],
                        hrp_beneficiary_type_id: '',
                        hrp_beneficiary_type_name: ''
                    };

                },
                removeHrpTypeModal: function (site) {
                    $scope.master.removeHrpType = site;
                    $('#remove-hrp-beneficiary-type-modal').modal({ dismissible: false });
                    $('#remove-hrp-beneficiary-type-modal').modal('open');

                },
                // admin0pcode: config.admin0pcode.toUpperCase(),
                country: [
                    {
                        'admin0name': 'All',
                        'admin0pcode': 'ALL',

                    },
                    {
                        'admin0name': 'Afghanistan',
                        'admin0pcode': 'AF',

                    }, {
                        'admin0name': 'Bangladesh',
                        'admin0pcode': 'BD',

                    }, {
                        'admin0name': 'Cox Bazar',
                        'admin0pcode': 'CB',

                    }, {
                        'admin0name': 'Democratic Republic of Congo',
                        'admin0pcode': 'CD',
                    }, {
                        'admin0name': 'Ethiopia',
                        'admin0pcode': 'ET',

                    }, {
                        'admin0name': 'Somalia',
                        'admin0pcode': 'SO',

                    }, {
                        'admin0name': 'South Sudan',
                        'admin0pcode': 'SS',

                    }, {
                        'admin0name': 'Syria',
                        'admin0pcode': 'SY',

                    }, {
                        'admin0name': 'Ukraine',
                        'admin0pcode': 'UA',

                    }, {
                        'admin0name': 'Yemen',
                        'admin0pcode': 'YE',

                    }, {
                        'admin0name': 'Nigeria',
                        'admin0pcode': 'NG',

                    },
                    {
                        'admin0name': 'Colombia',
                        'admin0pcode': 'COL',
                    }],
                addHrpType: function () {
                    if (!$scope.addHrpTypeAttribute.hrp_beneficiary_type_id) {
                        $scope.addHrpTypeAttribute.hrp_beneficiary_type_id = $scope.addHrpTypeAttribute.hrp_beneficiary_type_name.split(' ').join('_').toLowerCase()
                    }
                    console.log($scope.addHrpTypeAttribute)
                    M.toast({ html: 'Adding New HRP Type Beneficiary Type...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/hrpbeneficiarytypes',
                        data: {
                            data: $scope.addHrpTypeAttribute
                        }
                    }).success(function (new_hrp) {
                        if (new_hrp.err) {
                            M.toast({ html: 'Error! HRP Type Beneficiary Type Not Added </br>' + new_hrp.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_hrp.err) {
                            $scope.master.hrp_beneficiary_types.unshift(new_hrp);
                            $timeout(function () {
                                $('#add-hrp-beneficiary-type-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New HRP Type Beneficiary Type ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! HRP Type Beneficiary Type Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationHrp: function (site) {
                    valid = false;
                    if (!site || site.hrp_beneficiary_type_name === '' || !site.cluster_id || !site.cluster_id.length) {
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
                setEditedHrp: function (hrp_type) {
                    $scope.master.editedHrpType = angular.copy(hrp_type);
                    $('#edit-hrp-beneficiary-type-modal').modal({ dismissible: false });
                    $('#edit-hrp-beneficiary-type-modal').modal('open');
                },
                editHrp: function (hrp_type) {

                    M.toast({ html: 'Updating HRP Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/hrpbeneficiarytypes',
                        data: {
                            data: hrp_type
                        }
                    }).success(function (hrp_edited) {
                        if (hrp_edited.err) {
                            M.toast({ html: 'Error! HRP Type not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!hrp_edited.err) {
                            var index = $scope.master.hrp_beneficiary_types.map(x => { return x.id }).indexOf(hrp_edited.id);
                            $scope.master.hrp_beneficiary_types[index] = hrp_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'HRP Type is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! HRP Type not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedHrpType = {};
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
                editClusterHrp: function (id) {
                    if (document.getElementById('edit-' + id).checked) {
                        console.log($scope.master.editedHrpType)
                        $scope.master.editedHrpType.cluster_id.push(id)
                    } else {
                        var index = $scope.master.editedHrpType.cluster_id.indexOf(id)
                        $scope.master.editedHrpType.cluster_id.splice(index, 1)

                    }
                },
                addClusterHrp: function (id) {
                    if (document.getElementById('add-' + id).checked) {
                        $scope.addHrpTypeAttribute.cluster_id.push(id)
                    } else {
                        var index = $scope.addHrpTypeAttribute.cluster_id.indexOf(id)
                        $scope.addHrpTypeAttribute.cluster_id.splice(index, 1)

                    }
                },
                removedHrp: function (id) {
                    M.toast({ html: 'Deleting Hrp Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/hrpbeneficiarytypes',
                        data: {
                            data: $scope.master.removeHrpType
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Hrp Type not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.hrp_beneficiary_types.map(x => { return x.id }).indexOf(id);
                                $scope.master.hrp_beneficiary_types.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Hrp Type ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Hrp Type not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                // changeListCountry: function (item) {
                // },
                // showInactive: function (org) {
                // },
                // editInactiveCountry: function (id, prefix, item) {
                // },
                setCountry: function (id, item, edit) {
                    if (edit) {
                        id = 'edit-' + id
                    }
                    if (!item.admin0pcode) {
                        item.admin0pcode = '';
                    }
                    if (document.getElementById(id).checked) {
                        var values = document.getElementById(id).value;
                        if (item.admin0pcode.indexOf(values) === -1) {
                            if (item.admin0pcode === '') {
                                item.admin0pcode = values;
                            } else {
                                temp = item.admin0pcode.replace(/\s/g, '').split(',')
                                temp.push(values)
                                item.admin0pcode = temp.join(', ');
                            }
                        }
                    } else {
                        var values = document.getElementById(id).value;
                        if (item.admin0pcode.indexOf(values) > -1) {
                            temp = item.admin0pcode.replace(/\s/g, '').split(',')
                            var index = temp.indexOf(values);
                            temp.splice(index, 1)

                            if (temp.length < 1) {
                                item.admin0pcode = '';
                            } else {
                                item.admin0pcode = temp.join(', ');
                            }

                        }
                    }
                },
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
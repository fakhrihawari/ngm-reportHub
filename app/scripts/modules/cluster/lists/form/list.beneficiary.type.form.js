angular.module('ngm.widget.form.beneficiary.type.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.beneficiary.type.list', {
                title: 'Beneficiary Type Form List',
                description: 'Beneficiary Type Form List',
                controller: 'BeneficiaryTypeFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/beneficiary.type.list.html'
            });
    })
    .controller('BeneficiaryTypeFormListCtrl', [
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
                beneficiary_types: config.beneficiary_types ? config.beneficiary_types : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                cluster_id: config.cluster_id,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedBeneficiaryType: {},
                removeBeneficiaryType: {},
                openAddModal: function (modal) {
                    $('#add-beneficiary-type-modal').modal({ dismissible: false });
                    $('#add-beneficiary-type-modal').modal('open');
                    $scope.addBeneficiaryTypeAttribute = {
                        cluster_id: [],
                        beneficiary_type_id: '',
                        beneficiary_type_name: ''
                    };

                },
                removeBeneficiaryTypeModal: function (type) {
                    $scope.master.removeBeneficiaryType = type;
                    $('#remove-beneficiary-type-modal').modal({ dismissible: false });
                    $('#remove-beneficiary-type-modal').modal('open');

                },
                // admin0pcode: config.admin0pcode.toUpperCase(),
                country: [
                    // {
                    //     'admin0name': 'All',
                    //     'admin0pcode': 'ALL',

                    // },
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
                addBeneficiaryType: function () {
                    if (!$scope.addBeneficiaryTypeAttribute.beneficiary_type_id) {
                        $scope.addBeneficiaryTypeAttribute.beneficiary_type_id = $scope.addBeneficiaryTypeAttribute.beneficiary_type_name.split(' ').join('_').toLowerCase()
                    }
                    
                    M.toast({ html: 'Adding New Beneficiary Type ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/beneficiarytypes',
                        data: {
                            data: $scope.addBeneficiaryTypeAttribute
                        }
                    }).success(function (new_type) {
                        if (new_type.err) {
                            M.toast({ html: 'Error! Beneficiary Type  Not Added </br>' + new_type.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_type.err) {
                            $scope.master.beneficiary_types.unshift(new_type);
                            $timeout(function () {
                                $('#add-beneficiary-type-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Beneficiary Type  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Beneficiary Type  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationBeneficiaryType: function (site) {
                    valid = false;
                    if (!site || site.beneficiary_type_name === '' || !site.cluster_id || !site.cluster_id.length) {
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
                setEditedBeneficiaryType: function (type) {
                    $scope.master.editedBeneficiaryType = angular.copy(type);
                    $('#edit-beneficiary-type-modal').modal({ dismissible: false });
                    $('#edit-beneficiary-type-modal').modal('open');
                },
                editBeneficiaryType: function (type) {

                    M.toast({ html: 'Updating Beneficiary Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/beneficiarytypes',
                        data: {
                            data: type
                        }
                    }).success(function (type_edited) {
                        if (type_edited.err) {
                            M.toast({ html: 'Error! Beneficiary Type not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!type_edited.err) {
                            var index = $scope.master.beneficiary_types.map(x => { return x.id }).indexOf(type_edited.id);
                            $scope.master.beneficiary_types[index] = type_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Beneficiary Type is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Beneficiary Type not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedBeneficiaryType = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'USER') {
                        return true;
                    }
                    return false;
                },
                editClusterBeneficiaryType: function (id) {
                    if (document.getElementById('edit-' + id).checked) {
                        
                        $scope.master.editedBeneficiaryType.cluster_id.push(id)
                    } else {
                        var index = $scope.master.editedBeneficiaryType.cluster_id.indexOf(id)
                        $scope.master.editedBeneficiaryType.cluster_id.splice(index, 1)

                    }
                },
                addClusterBeneficiaryType: function (id) {
                    if (document.getElementById('add-' + id).checked) {
                        $scope.addBeneficiaryTypeAttribute.cluster_id.push(id)
                    } else {
                        var index = $scope.addBeneficiaryTypeAttribute.cluster_id.indexOf(id)
                        $scope.addBeneficiaryTypeAttribute.cluster_id.splice(index, 1)

                    }
                },
                removedBeneficiaryType: function (id) {
                    M.toast({ html: 'Deleting Beneficiary Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/beneficiarytypes',
                        data: {
                            data: $scope.master.removeBeneficiaryType
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Beneficiary Type not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.beneficiary_types.map(x => { return x.id }).indexOf(id);
                                $scope.master.beneficiary_types.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Beneficiary Type ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Beneficiary Type not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
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
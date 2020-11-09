angular.module('ngm.widget.form.site.type.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.site.type.list', {
                title: 'Site Type Form List',
                description: 'Site Type Form List',
                controller: 'SiteTypeFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/site.type.list.html'
            });
    })
    .controller('SiteTypeFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmClusterHelper',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmClusterHelper,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout
        ) {
            $scope.ngmClusterHelper = ngmClusterHelper

            $scope.master = {
                // current user
                user: ngmUser.get(),
                site_types: config.site_types ? config.site_types : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                cluster_id: config.cluster_id,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedSiteType: {},
                removeSiteType: {},
                openAddModal: function (modal) {
                    $('#add-site-type-modal').modal({ dismissible: false });
                    $('#add-site-type-modal').modal('open');
                    $scope.addSiteTypeAttribute = {
                        cluster_id: [],
                        site_type_id: '',
                        site_type_name: ''
                    };

                },
                removeSiteTypeModal: function (site) {
                    $scope.master.removeSiteType = site;
                    $('#remove-site-type-modal').modal({ dismissible: false });
                    $('#remove-site-type-modal').modal('open');

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
                addSiteType: function () {
                    if (!$scope.addSiteTypeAttribute.site_type_id) {
                        $scope.addSiteTypeAttribute.site_type_id = $scope.addSiteTypeAttribute.site_type_name.split(' ').join('_').toLowerCase()
                    }
                    console.log($scope.addSiteTypeAttribute)
                    M.toast({ html: 'Adding New Site Type...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/sitetypes',
                        data: {
                            data: $scope.addSiteTypeAttribute
                        }
                    }).success(function (new_site_implementation) {
                        if (new_site_implementation.err) {
                            M.toast({ html: 'Error! Site Type Not Added </br>' + new_site_implementation.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_site_implementation.err) {
                            $scope.master.site_types.unshift(new_site_implementation);
                            $timeout(function () {
                                $('#add-site-type-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Site Type ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Site Type Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationSite: function (site) {
                    valid = false;
                    if (!site || site.site_type_name === '' || !site.cluster_id || !site.cluster_id.length) {
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
                setEditedSite: function (site) {
                    $scope.master.editedSiteType = angular.copy(site);
                    $('#edit-site-type-modal').modal({ dismissible: false });
                    $('#edit-site-type-modal').modal('open');
                },
                editSite: function (site) {

                    M.toast({ html: 'Updating Site Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/sitetypes',
                        data: {
                            data: site
                        }
                    }).success(function (site_edited) {
                        if (site_edited.err) {
                            M.toast({ html: 'Error! Site Type not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!site_edited.err) {
                            var index = $scope.master.site_types.map(x => { return x.id }).indexOf(site_edited.id);
                            $scope.master.site_types[index] = site_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Site Type is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Site Type not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedSiteType = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if ( role === 'USER') {
                        return true;
                    }
                    return false;
                },
                editClusterSite: function (id) {
                    if (document.getElementById('edit-' + id).checked) {
                        console.log($scope.master.editedSiteType)
                        $scope.master.editedSiteType.cluster_id.push(id)
                    } else {
                        var index = $scope.master.editedSiteType.cluster_id.indexOf(id)
                        $scope.master.editedSiteType.cluster_id.splice(index, 1)

                    }
                },
                addClusterSite: function (id) {
                    if (document.getElementById('add-' + id).checked) {
                        $scope.addSiteTypeAttribute.cluster_id.push(id)
                    } else {
                        var index = $scope.addSiteTypeAttribute.cluster_id.indexOf(id)
                        $scope.addSiteTypeAttribute.cluster_id.splice(index, 1)

                    }
                },
                removedSite: function (id) {
                    M.toast({ html: 'Deleting Site Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/sitetypes',
                        data: {
                            data: $scope.master.removeSiteType
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Site Type not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.site_types.map(x => { return x.id }).indexOf(id);
                                $scope.master.site_types.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Site Type ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Site Type not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
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
                paste: function (name) {
                    temp = ngmClusterHelper.pasteObject(name);
                    delete temp.id;
                    $scope.addSiteTypeAttribute = temp;
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
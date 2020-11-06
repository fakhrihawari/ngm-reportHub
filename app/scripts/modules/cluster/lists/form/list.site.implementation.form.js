angular.module('ngm.widget.form.site.implementation.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.site.implementation.list', {
                title: 'Site Implementation Form List',
                description: 'Site Implementation Form List',
                controller: 'SiteImplementationFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/site.implementation.list.html'
            });
    })
    .controller('SiteImplementationFormListCtrl', [
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
                site_implementations: config.site_implementations ? config.site_implementations : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                cluster_id: config.cluster_id,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedSiteImplementation: {},
                removeSiteImplementation: {},
                openAddModal: function (modal) {
                    $('#add-site-implementation-modal').modal({ dismissible: false });
                    $('#add-site-implementation-modal').modal('open');
                    $scope.addSiteImplementationAttribute = {
                        cluster_id: [],
                        site_implementation_id: '',
                        site_implementation_name: ''
                    };

                },
                removeSiteImplementationModal: function (site) {
                    $scope.master.removeSiteImplementation = site;
                    $('#remove-site-implementation-modal').modal({ dismissible: false });
                    $('#remove-site-implementation-modal').modal('open');

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
                addSiteImplementation: function () {
                    if (!$scope.addSiteImplementationAttribute.site_implementation_id) {
                        $scope.addSiteImplementationAttribute.site_implementation_id = $scope.addSiteImplementationAttribute.site_implementation_name.split(' ').join('_').toLowerCase()
                    }
                    console.log($scope.addSiteImplementationAttribute)
                    M.toast({ html: 'Adding New Site Implementation...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/siteimplementations',
                        data: {
                            data: $scope.addSiteImplementationAttribute
                        }
                    }).success(function (new_site_implementation) {
                        if (new_site_implementation.err) {
                            M.toast({ html: 'Error! Site Implementation Not Added </br>' + new_site_implementation.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_site_implementation.err) {
                            $scope.master.site_implementations.unshift(new_site_implementation);
                            $timeout(function () {
                                $('#add-site-implementation-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Site Implementation ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Site Implementation Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationSite: function (site) {
                    valid = false;
                    if (!site || site.site_implementation_name === '' || !site.cluster_id || !site.cluster_id.length) {
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
                    $scope.master.editedSiteImplementation = angular.copy(site);
                    $('#edit-site-implementation-modal').modal({ dismissible: false });
                    $('#edit-site-implementation-modal').modal('open');
                },
                editSite: function (site) {

                    M.toast({ html: 'Updating Site Implementation....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/siteimplementations',
                        data: {
                            data: site
                        }
                    }).success(function (site_edited) {
                        if (site_edited.err) {
                            M.toast({ html: 'Error! Site Implementation not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!site_edited.err) {
                            var index = $scope.master.site_implementations.map(x => { return x.id }).indexOf(site_edited.id);
                            $scope.master.site_implementations[index] = site_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Site Implementation is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Site Implementation not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedSiteImplementation = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'USER') {
                        return true;
                    }
                    return false;
                },
                editClusterSite: function (id) {
                    if (document.getElementById('edit-' + id).checked) {
                        console.log($scope.master.editedSiteImplementation)
                        $scope.master.editedSiteImplementation.cluster_id.push(id)
                    } else {
                        var index = $scope.master.editedSiteImplementation.cluster_id.indexOf(id)
                        $scope.master.editedSiteImplementation.cluster_id.splice(index, 1)

                    }
                },
                addClusterSite: function (id) {
                    if (document.getElementById('add-' + id).checked) {
                        $scope.addSiteImplementationAttribute.cluster_id.push(id)
                    } else {
                        var index = $scope.addSiteImplementationAttribute.cluster_id.indexOf(id)
                        $scope.addSiteImplementationAttribute.cluster_id.splice(index, 1)

                    }
                },
                removedSite: function (id) {
                    M.toast({ html: 'Deleting Site Implementation....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/siteimplementations',
                        data: {
                            data: $scope.master.removeSiteImplementation
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Site Implementation not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.site_implementations.map(x => { return x.id }).indexOf(id);
                                $scope.master.site_implementations.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Site Implementation ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Site Implementation not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
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
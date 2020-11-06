angular.module('ngm.widget.form.cluster.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.cluster.list', {
                title: 'Cluster Form List',
                description: 'Cluster Form List',
                controller: 'ClusterFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/cluster.list.html'
            });
    })
    .controller('ClusterFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $filter
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                clusters: config.clusters ? config.clusters : [],
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                // editedOrg: {},
                // removeOrg: {},
                editedCluster: {},
                removedCluster: {},
                openAddModal: function (modal) {
                    $('#add-cluster-modal').modal({ dismissible: false });
                    $('#add-cluster-modal').modal('open');
                    $scope.addCluster = {
                        admin0pcode: "",
                        cluster_id: '',
                        cluster: ''
                    };

                },
                // removeOrgModal: function (org) {
                //     $scope.master.removeOrg = org;
                //     $('#remove-org-modal').modal({ dismissible: false });
                //     $('#remove-org-modal').modal('open');

                // },
                removeClusterModal: function (cluster) {
                    $scope.master.removedCluster = cluster;
                    $('#remove-cluster-modal').modal({ dismissible: false });
                    $('#remove-cluster-modal').modal('open');

                },
                admin0pcode: config.admin0pcode ? config.admin0pcode.toUpperCase() : 'ALL',
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
                addCluster: function () {
                    if (!$scope.addCluster.clusters_id) {
                        $scope.addCluster.clusters_id = $scope.addCluster.cluster.split(' ').join('_').toLowerCase();
                    }
                    M.toast({ html: 'Adding New Cluster...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/clusters',
                        data: {
                            data: $scope.addCluster
                        }
                    }).success(function (new_cluster) {
                        if (new_cluster.err) {
                            M.toast({ html: 'Error! Cluster Not Added </br>' + new_cluster.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_cluster.err) {
                            $scope.master.clusters.unshift(new_cluster);
                            $timeout(function () {
                                $('#add-cluster-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Cluster ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Cluster Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationCluster: function (cluster) {
                    valid = false;
                    if (!cluster || cluster.cluster === '' || cluster.admin0pcode === '') {
                        valid = false;
                    } else {
                        valid = true;
                    }
                    return valid;
                },
                updateName: function (list, key, name, item) {

                    // this approach does NOT break gulp!
                    $timeout(function () {
                        var obj = {}
                        obj[key] = item[key];
                        var select = $filter('filter')(list, obj, true);

                        // set name
                        if (select.length) {
                            // name
                            item[name] = select[0][name];
                        }
                    }, 10);
                },
                setEditedCluster: function (stock) {
                    $scope.master.editedCluster = angular.copy(stock);
                    $('#edit-cluster-modal').modal({ dismissible: false });
                    $('#edit-cluster-modal').modal('open');

                },
                editCluster: function (cluster) {

                    M.toast({ html: 'Updating Cluster....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/clusters',
                        data: {
                            data: cluster
                        }
                    }).success(function (cluster_edited) {
                        if (cluster_edited.err) {
                            M.toast({ html: 'Error! Cluster not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!cluster_edited.err) {
                            var index = $scope.master.clusters.map(x => { return x.id }).indexOf(cluster_edited.id);
                            $scope.master.clusters[index] = cluster_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Cluster is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Cluster not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.editedCluster = {};
                },
                removeCluster: function (id) {
                    M.toast({ html: 'Deleting Cluster....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/clusters',
                        data: {
                            data: $scope.master.removedCluster
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Cluster not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.clusters.map(x => { return x.id }).indexOf(id);
                                $scope.master.clusters.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Cluster ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Cluster not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'USER') {
                        return true;
                    }
                    return false;
                },
                init: function () {
                }
            }

            $scope.master.init();

        }])
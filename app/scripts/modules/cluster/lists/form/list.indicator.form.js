angular.module('ngm.widget.form.indicator.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.indicator.list', {
                title: 'Indicator Form List',
                description: 'Indicator Form List',
                controller: 'IndicatorFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/indicator.list.html'
            });
    })
    .controller('IndicatorFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmClusterHelper',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
        '$route',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmClusterHelper,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $filter,
            $route
        ) {
            $scope.ngmClusterHelper = ngmClusterHelper

            $scope.master = {
                // current user
                user: ngmUser.get(),
                indicators: config.indicators ? config.indicators : [],
                activities: config.activities,
                activity_descriptions: config.activity_descriptions,
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                cluster_id: config.cluster_id,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedIndicator: {},
                removeIndicator: {},
                addIndicatorAttribute: {
                    cluster_id: '',
                    activity_type_id: '',
                    activity_description_id: '',
                    indicator_name: '',
                    indicator_id: '',
                },
                resetAddForm: function () {
                    var reset_form = {
                        cluster_id: '',
                        activity_type_id: '',
                        activity_description_id: '',
                        indicator_name: '',
                        indicator_id: '',
                    }
                    $scope.master.addIndicatorAttribute = reset_form;
                },
                openAddModal: function (modal) {
                    $('#add-indicator-modal').modal({ dismissible: false });
                    $('#add-indicator-modal').modal('open');
                    // $scope.master.addIndicatorAttribute = {
                    //     cluster_id: '',
                    //     mpc_delivery_type_name:'',
                    //     mpc_delivery_type_id:'',
                    //     mpc_mechanism_type_id:'',
                    //     mpc_mechanism_type_name:''
                    // };

                },
                removeIndicatorModal: function (site) {
                    $scope.master.removeIndicator = site;
                    $('#remove-indicator-modal').modal({ dismissible: false });
                    $('#remove-indicator-modal').modal('open');

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
                addIndicator: function () {
                    if (!$scope.master.addIndicatorAttribute.indicator_id) {
                        $scope.master.addIndicatorAttribute.indicator_id = $scope.master.addIndicatorAttribute.indicator_id.split(' ').join('_').toLowerCase()
                    }
                    
                    M.toast({ html: 'Adding New Indicator...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/indicators',
                        data: {
                            data: $scope.master.addIndicatorAttribute
                        }
                    }).success(function (new_site_implementation) {
                        if (new_site_implementation.err) {
                            M.toast({ html: 'Error! Indicator Not Added </br>' + new_site_implementation.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_site_implementation.err) {
                            $scope.master.indicators.unshift(new_site_implementation);
                            $timeout(function () {
                                $('#add-indicator-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Indicator ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Indicator Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationIndicator: function (indicator) {
                    valid = false;
                    if (!indicator || !indicator.indicator_name ||  indicator.activity_type_id=== '',
                        indicator.activity_description_id === ''|| !indicator.cluster_id) {
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
                setEditedIndicator: function (indicator) {
                    $scope.master.editedIndicator = angular.copy(indicator);
                    $('#edit-indicator-modal').modal({ dismissible: false });
                    $('#edit-indicator-modal').modal('open');
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
                editIndicator: function (site) {

                    M.toast({ html: 'Updating Indicator....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/indicators',
                        data: {
                            data: site
                        }
                    }).success(function (site_edited) {
                        if (site_edited.err) {
                            M.toast({ html: 'Error! Indicator not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!site_edited.err) {
                            var index = $scope.master.indicators.map(x => { return x.id }).indexOf(site_edited.id);
                            $scope.master.indicators[index] = site_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Indicator is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Indicator not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedSiteType = {};
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
                removedIndicator: function (id) {
                    M.toast({ html: 'Deleting Indicator....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/indicators',
                        data: {
                            data: $scope.master.removeIndicator
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Indicator not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.indicators.map(x => { return x.id }).indexOf(id);
                                $scope.master.indicators.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Indicator ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Indicator not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
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
                    console.log(item.admin0pcode)
                },
                paste: function (name) {
                    temp = ngmClusterHelper.pasteObject(name);
                    delete temp.id;
                    $scope.master.addIndicatorAttribute = temp;
                },
                init: function () {
                    $scope.master.list_cluster = [];
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    if (role === 'SUPERADMIN' || $scope.master.user.email === 'farifin@immap.org' || $scope.master.user.email === 'pfitzgerald@immap.org' || $scope.master.user.email === 'tkilkeiev@immap.org') {
                        $scope.master.list_cluster = $scope.master.clusters;
                    } else {
                        $scope.master.list_cluster = $scope.master.clusters.filter(x => x.cluster_id === $scope.master.cluster_id);
                    }

                    $scope.filterCluster = $route.current.params.cluster_id ? $route.current.params.cluster_id:''

                }
            }

            $scope.master.init();

        }])
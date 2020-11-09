angular.module('ngm.widget.form.delivery.types.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.delivery.types.list', {
                title: 'Delivery Types Form List',
                description: 'Delivery Types Form List',
                controller: 'DeliveryTypesListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/delivery.type.list.html'
            });
    })
    .controller('DeliveryTypesListCtrl', [
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
            $filter
        ) {
            $scope.ngmClusterHelper = ngmClusterHelper

            $scope.master = {
                // current user
                user: ngmUser.get(),
                delivery_types: config.delivery_types ? config.delivery_types : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                // editedOrg: {},
                // removeOrg: {},
                editedDeliveryType: {},
                removedDeliveryType: {},
                openAddModal: function (modal) {
                    $('#add-delivery_types-modal').modal({ dismissible: false });
                    $('#add-delivery_types-modal').modal('open');
                    $scope.addDeliveryType = {
                        admin0pcode: "",
                        cluster: "",
                        cluster_id: "",
                        delivery_type_id: '',
                        delivery_type_name: ''
                    };

                },
                removedDeliveryTypeModal: function (type) {
                    $scope.master.removedDeliveryType = type;
                    $('#remove-delivery_types-modal').modal({ dismissible: false });
                    $('#remove-delivery_types-modal').modal('open');

                },
                cluster: config.cluster ? config.cluster : 'all',
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
                addDeliveryType: function () {
                    if (!$scope.addDeliveryType.delivery_type_id) {
                        $scope.addDeliveryType.delivery_type_id = $scope.addDeliveryType.delivery_type_name.split(' ').join('_').toLowerCase();
                    }
                    M.toast({ html: 'Adding New Delivery Type...', displayLength: 2000, classes: 'note' });
                    console.log($scope.addDeliveryType)
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/deliverytypes',
                        data: {
                            data: $scope.addDeliveryType
                        }
                    }).success(function (new_delivery_type) {
                        if (new_delivery_type.err) {
                            M.toast({ html: 'Error! Delivery Type Not Added </br>' + new_delivery_type.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_delivery_type.err) {
                            $scope.master.delivery_types.unshift(new_delivery_type);
                            $timeout(function () {
                                $('#add-delivery_types-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Delivery Type ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Delivery Type Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationDeliveryType: function (type) {
                    valid = false;
                    if (!type || !type.cluster_id || type.delivery_type_name === '' || type.admin0pcode === '') {
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
                setEditedDeliveryType: function (type) {
                    $scope.master.editedDeliveryType = angular.copy(type);
                    $('#edit-delivery_types-modal').modal({ dismissible: false });
                    $('#edit-delivery_types-modal').modal('open');

                },
                editDeliveryType: function (type) {

                    M.toast({ html: 'Updating Delivery Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/deliverytypes',
                        data: {
                            data: type
                        }
                    }).success(function (edited_type) {
                        if (edited_type.err) {
                            M.toast({ html: 'Error! Delivery Type not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!edited_type.err) {
                            var index = $scope.master.delivery_types.map(x => { return x.id }).indexOf(edited_type.id);
                            $scope.master.delivery_types[index] = edited_type;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Delivery Type is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Delivery Type not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.editedDeliveryType = {};
                },
                removeDeliveryType: function (id) {
                    M.toast({ html: 'Deleting Delivery Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/deliverytypes',
                        data: {
                            data: $scope.master.removedDeliveryType
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Delivery Type not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.delivery_types.map(x => { return x.id }).indexOf(id);
                                $scope.master.delivery_types.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Delivery Type ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Delivery Type not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
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
                paste: function (name) {
                    temp = ngmClusterHelper.pasteObject(name);
                    delete temp.id;
                    $scope.addDeliveryType = temp;
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])
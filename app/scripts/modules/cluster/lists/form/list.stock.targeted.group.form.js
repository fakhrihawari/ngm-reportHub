angular.module('ngm.widget.form.stock.targeted.group.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.stock.targeted.group.list', {
                title: 'Stock Targeted Form List',
                description: 'Stock Targeted Form List',
                controller: 'StockTargetedFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/stock.targeted.group.list.html'
            });
    })
    .controller('StockTargetedFormListCtrl', [
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
            $scope.listService = listService;
            $scope.master = {
                // current user
                user: ngmUser.get(),
                stock_targeted_groups: config.stock_targeted_groups ? config.stock_targeted_groups:[],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                // editedOrg: {},
                // removeOrg: {},
                editedStock: {},
                removedStock: {},
                openAddModal: function (modal) {
                    $('#add-stock-targeted-modal').modal({ dismissible: false });
                    $('#add-stock-targeted-modal').modal('open');
                    $scope.addStockTargetedGroup = {
                        admin0pcode: "",
                        stock_targeted_groups_id: '',
                        stock_targeted_groups_name: ''
                    };

                },
                // removeOrgModal: function (org) {
                //     $scope.master.removeOrg = org;
                //     $('#remove-org-modal').modal({ dismissible: false });
                //     $('#remove-org-modal').modal('open');

                // },
                removeStockModal: function (stock_item) {
                    $scope.master.removedStock = stock_item;
                    $('#remove-stock-targeted-modal').modal({ dismissible: false });
                    $('#remove-stock-targeted-modal').modal('open');

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
                addStock: function () {
                    if (!$scope.addStockTargetedGroup.stock_targeted_groups_id) {
                        $scope.addStockTargetedGroup.stock_targeted_groups_id = $scope.addStockTargetedGroup.stock_targeted_groups_name.split(' ').join('_').toLowerCase();
                    }
                    console.log($scope.addStockTargetedGroup)
                    M.toast({ html: 'Adding New Stock Targeted Group...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/stocktargetedgroups',
                        data: {
                            data: $scope.addStockTargetedGroup
                        }
                    }).success(function (new_stock_item) {
                        if (new_stock_item.err) {
                            M.toast({ html: 'Error! Stock Targeted Group Not Added </br>' + new_stock_item.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_stock_item.err) {
                            $scope.master.stock_targeted_groups.unshift(new_stock_item);
                            $timeout(function () {
                                $('#add-stock-targeted-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Stock Targeted Group ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Stock Item Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationStock: function (stock) {
                    valid = false;
                    if (!stock || stock.stock_targeted_groups_name === '' || stock.admin0pcode === '') {
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
                setEditedStock: function (stock) {
                    $scope.master.editedStock = angular.copy(stock);
                    $('#edit-stock-targeted-modal').modal({ dismissible: false });
                    $('#edit-stock-targeted-modal').modal('open');

                },
                editStock: function (stock) {

                    M.toast({ html: 'Updating Stock....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/stocktargetedgroups',
                        data: {
                            data: stock
                        }
                    }).success(function (stock_edited) {
                        if (stock_edited.err) {
                            M.toast({ html: 'Error! Stock not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!stock_edited.err) {
                            var index = $scope.master.stock_targeted_groups.map(x => { return x.id }).indexOf(stock_edited.id);
                            $scope.master.stock_targeted_groups[index] = stock_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Stock is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Stock not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.editedStock = {};
                },
                removeStock: function (id) {
                    M.toast({ html: 'Deleting Stock....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/stocktargetedgroups',
                        data: {
                            data: $scope.master.removedStock
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Delete not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.stock_targeted_groups.map(x => { return x.id }).indexOf(id);
                                $scope.master.stock_targeted_groups.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Stock ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Stock not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
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
                    $scope.addStockTargetedGroup = temp;
                },
                init: function () {
                }
            }

            $scope.master.init();

        }])
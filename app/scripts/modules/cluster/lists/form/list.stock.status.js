angular.module('ngm.widget.form.stock.status.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.stock.status.list', {
                title: 'Stock Status Form List',
                description: 'Stock Status Form List',
                controller: 'StockStatusFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/stock.status.list.html'
            });
    })
    .controller('StockStatusFormListCtrl', [
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
                stock_status: config.stock_status ? config.stock_status:[],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedStock: {},
                removedStock: {},
                openAddModal: function (modal) {
                    $('#add-stock-status-modal').modal({ dismissible: false });
                    $('#add-stock-status-modal').modal('open');
                    $scope.addStockStatus = {
                        admin0pcode: "",
                        stock_type_id: '',
                        stock_type_name: '',
                        stock_status_id: '',
                        stock_status_name: ''
                    };

                },
                removeStockModal: function (stock_item) {
                    $scope.master.removedStock = stock_item;
                    $('#remove-stock-status-modal').modal({ dismissible: false });
                    $('#remove-stock-status-modal').modal('open');

                },
                cluster: config.cluster ? config.cluster : 'all',
                admin0pcode: config.admin0pcode ? config.admin0pcode.toUpperCase() : 'ALL',
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
                stock_types: [{
                    stock_type_id: 'stock',
                    stock_type_name: 'Stock',
                },{
                    stock_type_id: 'pipeline',
                    stock_type_name: 'Pipeline',
                }],
                addStock: function () {
                    if (!$scope.addStockStatus.stock_status_id) {
                        $scope.addStockStatus.stock_status_id = $scope.addStockStatus.stock_status_name.split(' ').join('_').toLowerCase();
                    }
                    console.log($scope.addStockStatus)
                    M.toast({ html: 'Adding New Stock Status...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/stockstatuses',
                        data: {
                            data: $scope.addStockStatus
                        }
                    }).success(function (new_stock_item) {
                        if (new_stock_item.err) {
                            M.toast({ html: 'Error! Stock Status Not Added </br>' + new_stock_item.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_stock_item.err) {
                            $scope.master.stock_status.unshift(new_stock_item);
                            $timeout(function () {
                                $('#add-stock-status-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Stock Status ', displayLength: 4000, classes: 'success' });
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
                    if (!stock || stock.stock_status_name === '' || stock.admin0pcode === '' || stock.stock_stype_id) {
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
                    $('#edit-stock-status-modal').modal({ dismissible: false });
                    $('#edit-stock-status-modal').modal('open');

                },
                editStock: function (stock) {

                    M.toast({ html: 'Updating Stock....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/stockstatuses',
                        data: {
                            data: stock
                        }
                    }).success(function (stock_edited) {
                        if (stock_edited.err) {
                            M.toast({ html: 'Error! Stock not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!stock_edited.err) {
                            var index = $scope.master.stock_status.map(x => { return x.id }).indexOf(stock_edited.id);
                            $scope.master.stock_status[index] = stock_edited;
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
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/stockstatuses',
                        data: {
                            data: $scope.master.removedStock
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Delete not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.stock_status.map(x => { return x.id }).indexOf(id);
                                $scope.master.stock_status.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Stock ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Stock not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                
                init: function () {

                }
            }

            $scope.master.init();

        }])
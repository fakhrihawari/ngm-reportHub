angular.module('ngm.widget.form.currencies.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.currencies.list', {
                title: 'Currencies Form List',
                description: 'Currencies Form List',
                controller: 'CurrenciesFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/currencies.list.html'
            });
    })
    .controller('CurrenciesFormListCtrl', [
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
                currencies: config.currencies ? config.currencies : [],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                // editedOrg: {},
                // removeOrg: {},
                editedCurrency: {},
                removedCurrency: {},
                openAddModal: function (modal) {
                    $('#add-currency-modal').modal({ dismissible: false });
                    $('#add-currency-modal').modal('open');
                    $scope.addCurrency = {
                        admin0pcode: '',
                        currency_id: '',
                        currency_name: ''
                    };

                },
                // removeOrgModal: function (org) {
                //     $scope.master.removeOrg = org;
                //     $('#remove-org-modal').modal({ dismissible: false });
                //     $('#remove-org-modal').modal('open');

                // },
                removeCurrencykModal: function (currency) {
                    $scope.master.removedCurrency = currency;
                    $('#remove-currency-modal').modal({ dismissible: false });
                    $('#remove-currency-modal').modal('open');

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
                addCurrency: function () {
                    if (!$scope.addCurrency.currency_id) {
                        $scope.addCurrency.currency_id = $scope.addCurrency.currency_name.split(' ').join('_').toLowerCase();
                    }
                    console.log($scope.addCurrency)
                    M.toast({ html: 'Adding New Currency...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/currencies',
                        data: {
                            data: $scope.addCurrency
                        }
                    }).success(function (new_stock_item) {
                        if (new_stock_item.err) {
                            M.toast({ html: 'Error! Currency Not Added </br>' + new_stock_item.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_stock_item.err) {
                            $scope.master.currencies.unshift(new_stock_item);
                            $timeout(function () {
                                $('#add-currency-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Currency ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Currency Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationCurrency: function (currency) {
                    valid = false;
                    if (!currency || currency.currency_name === '' || currency.admin0pcode === '') {
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
                setEditedCurrency: function (currency) {
                    $scope.master.editedCurrency = angular.copy(currency);
                    $('#edit-currency-modal').modal({ dismissible: false });
                    $('#edit-currency-modal').modal('open');

                },
                editCurrency: function (currency) {

                    M.toast({ html: 'Updating Currency....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/currencies',
                        data: {
                            data: currency
                        }
                    }).success(function (currency_edited) {
                        if (currency_edited.err) {
                            M.toast({ html: 'Error! Currency not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!currency_edited.err) {
                            var index = $scope.master.currencies.map(x => { return x.id }).indexOf(currency_edited.id);
                            $scope.master.currencies[index] = currency_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Currency is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Currency not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.editedStock = {};
                },
                removeCurrency: function (id) {
                    M.toast({ html: 'Deleting Currency....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/currencies',
                        data: {
                            data: $scope.master.removedCurrency
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Currencies not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.currencies.map(x => { return x.id }).indexOf(id);
                                $scope.master.currencies.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Currencies ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Currencies not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {
                }
            }

            $scope.master.init();

        }])
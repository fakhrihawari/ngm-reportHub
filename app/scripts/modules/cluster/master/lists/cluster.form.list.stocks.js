angular.module('ngm.widget.form.stocks.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.stocks.list', {
                title: 'Stocks Form List',
                description: 'Stocks Form List',
                controller: 'StocksFormListCtrl',
                templateUrl: '/scripts/modules/cluster/master/views/cluster.stocks.list.html'
            });
    })
    .controller('StocksFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmUser',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmUser
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                stocks: config.stocks,
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 12,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                admin0pcode: config.admin0pcode.toUpperCase(),
                country: [
                    {
                        'admin0pname': 'ALL',
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
                openAddModal: function (modal) {
                    $('#add-stocks-modal').openModal({ dismissible: false });
                    $scope.addStockAtribute = {
                        stock_item_name: '',
                        cluster_id: ''
                    };

                },
                addStockItem: function () {
                    $scope.addStockAtribute.stock_item_type = $scope.addStockAtribute.stock_item_name.toLowerCase().split(' ').join('_');
                    $scope.master.stocks.unshift($scope.addStockAtribute);
                    
                },
                validStocks: function (stock) {
                    if (!stock || stock.cluster_id === '' || stock.stock_item_name === '') {
                        return true
                    } else {
                        return false
                    }
                },
                activeInActive: function (item) {
                    if (item.admin0pcode.indexOf($scope.master.admin0pcode) > -1 || item.admin0pcode.indexOf("ALL") > -1) {
                        return true
                    }
                    return false
                },
                changeActiveInActive: function (id) {
                    $scope.IndexOrg = $scope.master.stocks.map(x => { return x.id }).indexOf(id);
                    if (document.getElementById(id).checked) {

                        if ($scope.master.stocks[$scope.IndexOrg].admin0pcode === '') {
                            $scope.master.stocks[$scope.IndexOrg].admin0pcode += $scope.master.admin0pcode;
                        } else {
                            $scope.master.stocks[$scope.IndexOrg].admin0pcode = $scope.master.admin0pcode === 'ALL' ?
                                $scope.master.admin0pcode + ', ' + $scope.master.stocks[$scope.IndexOrg].admin0pcode :
                                $scope.master.stocks[$scope.IndexOrg].admin0pcode += ', ' + $scope.master.admin0pcode;

                        }
                    } else {
                        var copy = $scope.master.stocks[$scope.IndexOrg].admin0pcode
                        var copyarray = copy.replace(/\s/g, '').split(",")
                        var delIndex = copyarray.indexOf($scope.master.admin0pcode);
                        copyarray.splice(delIndex, 1)
                        var copystring = copyarray.join("")
                        $scope.master.stocks[$scope.IndexOrg].admin0pcode = copystring

                    }

                }
            }

        }])
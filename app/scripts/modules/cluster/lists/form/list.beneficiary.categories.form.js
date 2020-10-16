angular.module('ngm.widget.form.beneficiary.categories.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.beneficiary.categories.list', {
                title: 'Beneficiary Categories Form List',
                description: 'Beneficiary Categories Form List',
                controller: 'BeneficiaryCategoriesFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/beneficiary.categories.list.html'
            });
    })
    .controller('BeneficiaryCategoriesFormListCtrl', [
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
                beneficiary_categories: config.beneficiary_categories ? config.beneficiary_categories:[],
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                // editedOrg: {},
                // removeOrg: {},
                editedBeneficiaryCategories: {},
                removedBeneficiaryCategories: {},
                openAddModal: function (modal) {
                    $('#add-beneficiary_categories-modal').modal({ dismissible: false });
                    $('#add-beneficiary_categories-modal').modal('open');
                    $scope.addBeneficiaryCategories = {
                        admin0pcode: "",
                        cluster: "",
                        cluster_id: "",
                        beneficiary_category_id: '',
                        beneficiary_category_name: ''
                    };

                },
                removedBeneficiaryModal: function (beneficiary) {
                    $scope.master.removedBeneficiaryCategories = beneficiary;
                    $('#remove-beneficiary_categories-modal').modal({ dismissible: false });
                    $('#remove-beneficiary_categories-modal').modal('open');

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
                addBeneficiaryCategories: function () {
                    if (!$scope.addBeneficiaryCategories.beneficiary_category_id) {
                        $scope.addBeneficiaryCategories.beneficiary_category_id = $scope.addBeneficiaryCategories.beneficiary_category_name.split(' ').join('_').toLowerCase();
                    }
                    M.toast({ html: 'Adding New Beneficiary Categories...', displayLength: 2000, classes: 'note' });
                    console.log($scope.addBeneficiaryCategories)
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/beneficiarycategories',
                        data: {
                            data: $scope.addBeneficiaryCategories
                        }
                    }).success(function (new_beneficiary_categories) {
                        if (new_beneficiary_categories.err) {
                            M.toast({ html: 'Error! Beneficiary Categories Not Added </br>' + new_beneficiary_categories.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_beneficiary_categories.err) {
                            $scope.master.beneficiary_categories.unshift(new_beneficiary_categories);
                            $timeout(function () {
                                $('#add-beneficiary_categories-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Beneficiary Categories ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Beneficiary Categories Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationBeneficiaryCategories: function (beneficiary) {
                    valid = false;
                    if (!beneficiary || !beneficiary.cluster_id || beneficiary.beneficiary_category_name === '' || beneficiary.admin0pcode === '') {
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
                setEditedBeneficiaryCategories: function (beneficiary) {
                    $scope.master.editedBeneficiaryCategories = angular.copy(beneficiary);
                    $('#edit-beneficiary_categories-modal').modal({ dismissible: false });
                    $('#edit-beneficiary_categories-modal').modal('open');

                },
                editBeneficiaryCategories: function (beneficiary) {

                    M.toast({ html: 'Updating Beneficiary Categories....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/beneficiarycategories',
                        data: {
                            data: beneficiary
                        }
                    }).success(function (edited_beneficiary) {
                        if (edited_beneficiary.err) {
                            M.toast({ html: 'Error! Beneficiary Categories not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!edited_beneficiary.err) {
                            var index = $scope.master.beneficiary_categories.map(x => { return x.id }).indexOf(edited_beneficiary.id);
                            $scope.master.beneficiary_categories[index] = edited_beneficiary;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Beneficiary Categories is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Beneficiary Categories not updated', displayLength: 3000, classes: 'error' });
                    })

                    //after save reset
                    $scope.editedBeneficiaryCategories = {};
                },
                removeBeneficiaryCategories: function (id) {
                    M.toast({ html: 'Deleting Beneficiary Categories....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/beneficiarycategories',
                        data: {
                            data: $scope.master.removedBeneficiaryCategories
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Beneficiary Categories not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.beneficiary_categories.map(x => { return x.id }).indexOf(id);
                                $scope.master.beneficiary_categories.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Beneficiary Categories ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Beneficiary Categories not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])
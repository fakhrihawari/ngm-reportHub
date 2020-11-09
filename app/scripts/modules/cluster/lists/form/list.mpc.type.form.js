angular.module('ngm.widget.form.mpc.type.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.mpc.type.list', {
                title: 'MPC Type Form List',
                description: 'MPC Type Form List',
                controller: 'MpcTypeFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/mpc.type.list.html'
            });
    })
    .controller('MpcTypeFormListCtrl', [
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
                mpc_types: config.mpc_types ? config.mpc_types : [],
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
                editedMpcType: {},
                removeMpcType: {},
                addMpcTypeAttribute: {
                    cluster_id: '',
                    activity_type_id:'',
                    activity_description_id:'',
                    mpc_delivery_type_name: '',
                    mpc_delivery_type_id: '',
                    mpc_mechanism_type_id: '',
                    mpc_mechanism_type_name: ''
                },
                resetAddForm: function () {
                    var reset_form = {
                        cluster_id: '',
                        activity_type_id: '',
                        activity_description_id: '',
                        mpc_delivery_type_name: '',
                        mpc_delivery_type_id: '',
                        mpc_mechanism_type_id: '',
                        mpc_mechanism_type_name: ''
                    }
                    $scope.master.addMpcTypeAttribute = reset_form;
                },
                openAddModal: function (modal) {
                    $('#add-mpc-type-modal').modal({ dismissible: false });
                    $('#add-mpc-type-modal').modal('open');
                    // $scope.master.addMpcTypeAttribute = {
                    //     cluster_id: '',
                    //     mpc_delivery_type_name:'',
                    //     mpc_delivery_type_id:'',
                    //     mpc_mechanism_type_id:'',
                    //     mpc_mechanism_type_name:''
                    // };

                },
                removeMpcTypeModal: function (site) {
                    $scope.master.removeMpcType = site;
                    $('#remove-mpc-type-modal').modal({ dismissible: false });
                    $('#remove-mpc-type-modal').modal('open');

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
                mpc_delivery_types:[
						{
							mpc_delivery_type_id: 'efectivo',
							mpc_delivery_type_name: 'Efectivo',
							
						},
						{
							mpc_delivery_type_id: 'bonos',
							mpc_delivery_type_name: 'Bonos',
							
						},
						{
							mpc_delivery_type_id: 'tecnica',
							mpc_delivery_type_name: 'Tecnica',
							
						},
						{
							mpc_delivery_type_id: 'en_especie',
							mpc_delivery_type_name: 'En_especie',
							
						},{
							mpc_delivery_type_id: 'cash',
							mpc_delivery_type_name: 'Cash',
							
						},{
							mpc_delivery_type_id: 'voucher',
							mpc_delivery_type_name: 'Voucher',
							
						},{
							mpc_delivery_type_id: 'distribution',
							mpc_delivery_type_name: 'Distribution',
							
						}
                    ],
                mpc_mechanism_types: [
                    {
                        mpc_delivery_type_id: 'efectivo',
                        mpc_mechanism_type_id: 'cuenta_bancaria',
                        mpc_mechanism_type_name: 'Cuenta Bancaria'
                    },
                    {
                        mpc_delivery_type_id: 'efectivo',
                        mpc_mechanism_type_id: 'dinero_entregado',
                        mpc_mechanism_type_name: 'Dinero Entregado'
                    },
                    {
                        mpc_delivery_type_id: 'efectivo',
                        mpc_mechanism_type_id: 'tarjeta_prepago',
                        mpc_mechanism_type_name: 'Tarjeta Pre-pago'
                    },
                    //bonos
                    {
                        mpc_delivery_type_id: 'bonos',
                        mpc_mechanism_type_id: 'e_voucher',
                        mpc_mechanism_type_name: 'E - Voucher'
                    },

                    {
                        mpc_delivery_type_id: 'bonos',
                        mpc_mechanism_type_id: 'tarjeta_electronica',
                        mpc_mechanism_type_name: 'Tarjeta electrónica'
                    },
                    {
                        mpc_delivery_type_id: 'bonos',
                        mpc_mechanism_type_id: 'transferencia_electrónica',
                        mpc_mechanism_type_name: 'Transferencia electrónica'
                    },
                    //tecnica
                    {
                        mpc_delivery_type_id: 'tecnica',
                        mpc_mechanism_type_id: 'tecnica',
                        mpc_mechanism_type_name: 'Técnica'
                    },
                    // en especie
                    {
                        mpc_delivery_type_id: 'en_especie',
                        mpc_mechanism_type_id: 'en_especie',
                        mpc_mechanism_type_name: 'En Especie'
                    }, {
                        mpc_delivery_type_id: 'cash',
                        mpc_mechanism_type_id: 'hawala',
                        mpc_mechanism_type_name: 'Hawala'
                    }, {
                        mpc_delivery_type_id: 'cash',
                        mpc_mechanism_type_id: 'cash_in_envelope',
                        mpc_mechanism_type_name: 'Cash in Envelope'
                    }, {
                        mpc_delivery_type_id: 'cash',
                        mpc_mechanism_type_id: 'bank',
                        mpc_mechanism_type_name: 'Bank'
                    }, {
                        mpc_delivery_type_id: 'cash',
                        mpc_mechanism_type_id: 'mobile_cash',
                        mpc_mechanism_type_name: 'Mobile Cash'
                    }, {
                        mpc_delivery_type_id: 'cash',
                        mpc_mechanism_type_id: 'e_cash',
                        mpc_mechanism_type_name: 'Electronic Card - Cash'
                    }, {
                        mpc_delivery_type_id: 'voucher',
                        mpc_mechanism_type_id: 'paper_vouchers',
                        mpc_mechanism_type_name: 'Paper Vouchers'
                    }, {
                        mpc_delivery_type_id: 'voucher',
                        mpc_mechanism_type_id: 'mobile_vouchers',
                        mpc_mechanism_type_name: 'Mobile Vouchers'
                    }, {
                        mpc_delivery_type_id: 'voucher',
                        mpc_mechanism_type_id: 'e_vouchers',
                        mpc_mechanism_type_name: 'Electronic Card - Vouchers'
                    }, {
                        mpc_delivery_type_id: 'distribution',
                        mpc_mechanism_type_id: 'distribution',
                        mpc_mechanism_type_name: 'Distribution'
                    }
                ],
                addMpcType: function () {
                    if (!$scope.master.addMpcTypeAttribute.mpc_mechanism_type_id) {
                        $scope.master.addMpcTypeAttribute.mpc_mechanism_type_id = $scope.master.addMpcTypeAttribute.mpc_mechanism_type_name.split(' ').join('_').toLowerCase()
                    }
                    if (!$scope.master.addMpcTypeAttribute.mpc_mechanism_type_id) {
                        $scope.master.addMpcTypeAttribute.mpc_mechanism_type_id = $scope.master.addMpcTypeAttribute.mpc_mechanism_type_name.split(' ').join('_').toLowerCase()
                    }
                    console.log($scope.master.addMpcTypeAttribute)
                    M.toast({ html: 'Adding New MPC Type...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/mpctypes',
                        data: {
                            data: $scope.master.addMpcTypeAttribute
                        }
                    }).success(function (new_site_implementation) {
                        if (new_site_implementation.err) {
                            M.toast({ html: 'Error! MPC Type Not Added </br>' + new_site_implementation.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_site_implementation.err) {
                            $scope.master.mpc_types.unshift(new_site_implementation);
                            $timeout(function () {
                                $('#add-mpc-type-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New MPC Type ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! MPC Type Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationMpc: function (mpc) {
                    valid = false;
                    if (!mpc || !mpc.mpc_mechanism_type_name || !mpc.mpc_delivery_type_name === '' || !mpc.cluster_id) {
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
                setEditedMpc: function (mpc) {
                    $scope.master.editedMpcType = angular.copy(mpc);
                    $('#edit-mpc-type-modal').modal({ dismissible: false });
                    $('#edit-mpc-type-modal').modal('open');
                },
                updateName: function (list, key, name, item) {

                    // this approach does NOT break gulp!
                    $timeout(function () {
                        var obj = {}
                        obj[key] = item[key];
                        var select = $filter('filter')(list, obj, true);

                        // set name
                        if (select.length) {
                            console.log(select)
                            // name
                            item[name] = select[0][name];
                        }
                    }, 10);
                },
                editMpc: function (site) {

                    M.toast({ html: 'Updating MPC Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/mpctypes',
                        data: {
                            data: site
                        }
                    }).success(function (site_edited) {
                        if (site_edited.err) {
                            M.toast({ html: 'Error! MPC Type not updated', displayLength: 3000, classes: 'error' });
                        }
                        if (!site_edited.err) {
                            var index = $scope.master.mpc_types.map(x => { return x.id }).indexOf(site_edited.id);
                            $scope.master.mpc_types[index] = site_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'MPC Type is Updated ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! MPC Type not updated', displayLength: 3000, classes: 'error' });
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
                removedMpc: function (id) {
                    M.toast({ html: 'Deleting MPC Type....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/mpctypes',
                        data: {
                            data: $scope.master.removeMpcType
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! MPC Type not deleted', displayLength: 3000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.mpc_types.map(x => { return x.id }).indexOf(id);
                                $scope.master.mpc_types.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete MPC Type ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! MPC Type not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                // changeListCountry: function (item) {
                // },
                // showInactive: function (org) {
                // },
                // editInactiveCountry: function (id, prefix, item) {
                // },
                paste: function (name) {
                    temp = ngmClusterHelper.pasteObject(name);
                    delete temp.id;
                    $scope.master.addMpcTypeAttribute = temp;
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
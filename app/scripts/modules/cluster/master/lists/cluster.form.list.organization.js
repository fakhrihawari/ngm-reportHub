angular.module('ngm.widget.form.organization.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.organization.list', {
                title: 'Organization Form List',
                description: 'Donor Form List',
                controller: 'OrganizationFormListCtrl',
                templateUrl: '/scripts/modules/cluster/master/views/cluster.organization.list.html'
            });
    })
    .controller('OrganizationFormListCtrl', [
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
                organization: config.organization,
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                openAddModal: function (modal) {
                    $('#add-org-modal').openModal({ dismissible: false });
                    $scope.addOrganizationAtribute = {
                        organization_name:'',
                        organization_type:'',
                        organization:'',
                        admin0pcode:'',
                    };

                },
                country: [
                        {
                            'admin0pname': 'ALL',
                            'admin0pcode': 'all',
                            
                        },
                        {
                            'admin0pname': 'Afghanistan',
                            'admin0pcode': 'AF',
                            
                        },{
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
                type_org:[
                    { organization_type:'United Nations'},
                    { organization_type: 'Government' },
                    { organization_type: 'International NGO' },
                    { organization_type: 'National NGO'}
                ],
                addOrganization: function () {
                    $scope.addOrganizationAtribute.organization_tag = $scope.addOrganizationAtribute.organization.toLowerCase().split(' ').join('_');
                    $scope.master.organization.unshift($scope.addOrganizationAtribute);
                    console.log($scope.addOrganizationAtribute)
                },
                validOrganization: function (org) {
                    if (!org || org.organization_name === '' || org.admin0pcode === '' || org.organization === '' || org.organization_type === '') {
                        return true
                    } else {
                        return false
                    }
                }
            }

        }])
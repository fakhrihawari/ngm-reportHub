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
                admin0pcode :config.admin0pcode.toUpperCase(),
                country: [
                        {
                            'admin0pname': 'ALL',
                            'admin0pcode': 'ALL',
                            
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
                },
                activeInActive:function(item){
                    if (item.admin0pcode.indexOf($scope.master.admin0pcode) > -1 || item.admin0pcode.indexOf("ALL") > -1 ){
                        return true
                    }
                    return false
                },
                changeActiveInActive: function(id){
                    $scope.IndexOrg = $scope.master.organization.map(x => { return x.id }).indexOf(id);   
                    if (document.getElementById(id).checked) {
                        
                        if ($scope.master.organization[$scope.IndexOrg].admin0pcode === ''){
                            $scope.master.organization[$scope.IndexOrg].admin0pcode += $scope.master.admin0pcode;
                        }else{
                            $scope.master.organization[$scope.IndexOrg].admin0pcode = $scope.master.admin0pcode === 'ALL' ? 
                                                                                      $scope.master.admin0pcode + ', ' + $scope.master.organization[$scope.IndexOrg].admin0pcode : 
                                                                                      $scope.master.organization[$scope.IndexOrg].admin0pcode += ', ' + $scope.master.admin0pcode;
                                                                                       
                        }
                    }else{
                       var copy = $scope.master.organization[$scope.IndexOrg].admin0pcode
                       var copyarray = copy.replace(/\s/g, '').split(",")
                       var delIndex = copyarray.indexOf($scope.master.admin0pcode);
                       copyarray.splice(delIndex,1)
                       var copystring = copyarray.join("")
                       $scope.master.organization[$scope.IndexOrg].admin0pcode = copystring

                    }
                    
                }
            }

        }])
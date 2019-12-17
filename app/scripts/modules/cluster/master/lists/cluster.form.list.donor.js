angular.module('ngm.widget.form.donor.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.donor.list', {
                title: 'Donor Form List',
                description: 'Donor Form List',
                controller: 'DonorFormListCtrl',
                templateUrl: '/scripts/modules/cluster/master/views/cluster.donor.list.html'
            });
    })
    .controller('DonorFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmUser',
        function(
            $scope,
            config,
            ngmClusterLists,
            ngmUser
        ){

            $scope.master = {
                // current user
                user: ngmUser.get(),
                donor : config.donor,
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 12,
                listId : 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
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
                    $('#add-donor-modal').openModal({ dismissible: false });
                    $scope.addDonorAtribute = {
                        project_donor_name:'',
                        cluster_id:''
                    };

                },
                addDonor: function(){
                    $scope.addDonorAtribute.project_donor_id = $scope.addDonorAtribute.project_donor_name.toLowerCase().split(' ').join('_');
                    $scope.master.donor.unshift($scope.addDonorAtribute);
                },
                validDonor:function(donor){
                    if (!donor || donor.cluster_id === '' || donor.project_donor_name === ''){
                        return true
                    }else{
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
                    $scope.IndexOrg = $scope.master.donor.map(x => { return x.id }).indexOf(id);
                    if (document.getElementById(id).checked) {

                        if ($scope.master.donor[$scope.IndexOrg].admin0pcode === '') {
                            $scope.master.donor[$scope.IndexOrg].admin0pcode += $scope.master.admin0pcode;
                        } else {
                            $scope.master.donor[$scope.IndexOrg].admin0pcode = $scope.master.admin0pcode === 'ALL' ?
                                $scope.master.admin0pcode + ', ' + $scope.master.donor[$scope.IndexOrg].admin0pcode :
                                $scope.master.donor[$scope.IndexOrg].admin0pcode += ', ' + $scope.master.admin0pcode;

                        }
                    } else {
                        var copy = $scope.master.donor[$scope.IndexOrg].admin0pcode
                        var copyarray = copy.replace(/\s/g, '').split(",")
                        var delIndex = copyarray.indexOf($scope.master.admin0pcode);
                        copyarray.splice(delIndex, 1)
                        var copystring = copyarray.join("")
                        $scope.master.donor[$scope.IndexOrg].admin0pcode = copystring

                    }

                }
            }
            
    }])
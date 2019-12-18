angular.module('ngm.widget.form.beneficiaries.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.beneficiaries.list', {
                title: 'Donor Form List',
                description: 'Donor Form List',
                controller: 'BeneficiariesFormListCtrl',
                templateUrl: '/scripts/modules/cluster/master/views/cluster.beneficiaries.list.html'
            });
    })
    .controller('BeneficiariesFormListCtrl', [
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
                beneficiaries: config.beneficiaries,
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                itemsPerPage: 5,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                openAddModal: function (modal) {
                    $('#add-beneficiaries-modal').openModal({ dismissible: false });
                    $scope.addBeneficiaryTypes = {
                        beneficiary_type_id: '',
                        beneficiary_type_name: '',
                        cluster_id: []
                    };

                },
                addBeneficiaries: function () {
                    $scope.addBeneficiaryTypes.beneficiary_type_id = $scope.addBeneficiaryTypes.beneficiary_type_name.toLowerCase().split(' ').join('_');
                    $scope.master.beneficiaries.unshift($scope.addBeneficiaryTypes);
                    $scope.master.donor.unshift($scope.addBeneficiaryTypes);
                },
                validBeneficiaries: function (b) {
                    if (!b || b.beneficiary_type_name === '') {
                        return true
                    } else {
                        return false
                    }
                },
                activeInActive: function (item) {
                    
                    if (config.cluster_id === 'all') {
                        return true
                    }else{                        
                       if(item.cluster_id.filter(x=>x === config.cluster_id).length >0)return true;
                    }
                    return false
                },
                // changeActiveInActive: function (id) {
                //     $scope.IndexOrg = $scope.master.donor.map(x => { return x.id }).indexOf(id);
                //     if (document.getElementById(id).checked) {

                //         if ($scope.master.donor[$scope.IndexOrg].admin0pcode === '') {
                //             $scope.master.donor[$scope.IndexOrg].admin0pcode += $scope.master.admin0pcode;
                //         } else {
                //             $scope.master.donor[$scope.IndexOrg].admin0pcode = $scope.master.admin0pcode === 'ALL' ?
                //                 $scope.master.admin0pcode + ', ' + $scope.master.donor[$scope.IndexOrg].admin0pcode :
                //                 $scope.master.donor[$scope.IndexOrg].admin0pcode += ', ' + $scope.master.admin0pcode;

                //         }
                //     } else {
                //         var copy = $scope.master.donor[$scope.IndexOrg].admin0pcode
                //         var copyarray = copy.replace(/\s/g, '').split(",")
                //         var delIndex = copyarray.indexOf($scope.master.admin0pcode);
                //         copyarray.splice(delIndex, 1)
                //         var copystring = copyarray.join("")
                //         $scope.master.donor[$scope.IndexOrg].admin0pcode = copystring

                //     }

                // }
            }
            
            $scope.master.donor = ngmClusterLists.getBeneficiaries();
            

        }])
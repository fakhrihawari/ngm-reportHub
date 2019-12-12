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
                }
            }
            
    }])
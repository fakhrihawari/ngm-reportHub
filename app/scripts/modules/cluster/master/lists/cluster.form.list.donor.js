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
        function(
            $scope,
            config
        ){
            $scope.master = {
                donor : config.donor,
                itemsPerPage: 10,
                listId : 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
            }
            console.log($scope.master.donor)
    }])
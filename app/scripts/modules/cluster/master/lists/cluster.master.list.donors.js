/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectProjectsCtrl
 * @description
 * # ClusterProjectProjectsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('MasterListDonorCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', '$translate', '$filter', '$rootScope', 'ngmClusterLists', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterHelper, $translate, $filter, $rootScope, ngmClusterLists) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.list = {

            // ngm
            ngm: $scope.$parent.ngm,

            // user
            user: ngmUser.get(),

            // init
            init: function () {

                // report dashboard model
                $scope.model = {
                    name: 'cluster_project_list',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.list.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m9 l9 report-title truncate',
                            style: 'font-size: 3.4rem; color: ' + $scope.list.ngm.style.defaultPrimaryColor,
                            title: 'DONORS'
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: 'List Donors'
                        },
                    },
                    menu: [],
                    rows: [{
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 20px;',
                                config: {
                                    html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="#/cluster/admin/lists/"><i class="material-icons left">keyboard_return</i> Back To List </a>'
                                }
                            }]
                        }]
                    },{
                       columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'form.donor.list',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    style: $scope.list.ngm.style,
                                    donor: $scope.list.donor,
                                    admin0pcode: $route.current.params.admin0pcode
                                }
                            }]
                        }] 
                    },{
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'card-panel',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    html: $scope.list.ngm.footer
                                }
                            }]
                        }]
                    }]
                };

                // assign to ngm app scope
                $scope.list.ngm.dashboard.model = $scope.model;

            }

        }
        // run page
        var country = $route.current.params.admin0pcode === 'all' ? '' : $route.current.params.admin0pcode; 
        var cluster = $route.current.params.cluster_id === 'all' ? '' : $route.current.params.cluster_id;
        
        $scope.list.donor = cluster === '' ? ngmClusterLists.getDonors(country):ngmClusterLists.getDonors(country,cluster);
        $scope.list.donor.map(x=>x['admin0pcode'] = 'ALL'); 
        // init
        $scope.list.init();

    }]);

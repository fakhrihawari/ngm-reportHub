/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ListActivitiesCtrl
 * @description
 * # ListActivitiesCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('ListActivitiesCtrl', ['$scope', '$location', '$route', '$http', '$q', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', '$translate', '$filter', '$rootScope', 'ngmClusterLists', function ($scope, $location, $route, $http, $q, ngmAuth, ngmData, ngmUser, ngmClusterHelper, $translate, $filter, $rootScope, ngmClusterLists) {
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
            getActivities: $http({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/admin/cluster/list/activities',
                params: {
                    cluster_id: $route.current.params.cluster_id === 'all' ? '' : $route.current.params.cluster_id
                }
            }),
            clusters : ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
            setMenu:function(){
                var clusters = $scope.list.clusters;
                var cluster_rows = [{
                    'title': 'ALL',
                    'param': 'cluster_id',
                    'active': 'all',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/activities/all'
                }];
                for (i = 0; i < clusters.length; i++) {
                    var clusterName = clusters[i].cluster;
                    var clusterId = clusters[i].cluster_id
                    cluster_rows.push({
                        'title': clusterName,
                        'param': 'cluster_id',
                        'active': clusterId,
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/list/activities/' +  clusterId
                    });
                };
                $scope.model.menu.push({
                    'id': 'search-cluster',
                    'icon': 'person_pin',
                    'title': 'Cluster',
                    'class': 'teal lighten-1 white-text',
                    'rows': cluster_rows
                });
            },

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
                            title: 'Activities | ' + $scope.list.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: 'List Activities For ' + $scope.list.title
                        },
                        // download: {
                        //     'class': 'col s12 m3 l3 hide-on-small-only',
                        //     downloads: [
                        //         {
                        //             type: 'csv',
                        //             color: 'blue lighten-2',
                        //             icon: 'assignment',
                        //             hover: 'Download Organization CSV',
                        //             request: {
                        //                 method: 'GET',
                        //                 url: ngmAuth.LOCATION + '/api/list/organizationsCSV',
                        //                 params: {
                        //                     admin0pcode: $route.current.params.admin0pcode
                        //                 },
                        //                 data: {
                        //                     report: 'list_organization_' + $route.current.params.admin0pcode,
                        //                     csv: true
                        //                 }
                        //             },
                        //             metrics: {
                        //                 method: 'POST',
                        //                 url: ngmAuth.LOCATION + '/api/metrics/set',
                        //                 data: {
                        //                     organization: $scope.list.user.organization,
                        //                     username: $scope.list.user.username,
                        //                     email: $scope.list.user.email,
                        //                     dashboard: 'organization list',
                        //                     theme: 'list_organizations',
                        //                     format: 'csv',
                        //                     url: $location.$$path
                        //                 }
                        //             }
                        //         }
                        //     ]
                        // }
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
                                    html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="#/cluster/lists/admin"><i class="material-icons left">keyboard_return</i> Back To List </a>'
                                }
                            }]
                        }]
                    },
                    {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'form.activities.list',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    style: $scope.list.ngm.style,
                                    activities:$scope.list.activities
                                }
                            }]
                        }]
                    },
                    {
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

        $q.all([$scope.list.getActivities]).then(function (result) {
            $scope.list.activities = result[0].data

            setTimeout(() => {
                $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
            }, 0);
            // init
            $scope.list.title = $route.current.params.cluster_id === 'all' ? 'ALL' : $scope.list.clusters.filter(x => x.cluster_id === $route.current.params.cluster_id)[0]['cluster'];
            $scope.list.init();
            $scope.list.setMenu()

        })
        // setTimeout(() => {
        //     $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
        // }, 0);
        // // init
        // $scope.list.init();


    }]);

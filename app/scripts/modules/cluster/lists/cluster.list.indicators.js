/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ListIndicatorCtrl
 * @description
 * # ListIndicatorCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('ListIndicatorCtrl', ['$scope', '$location', '$route', '$http', '$q', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', '$translate', '$filter', '$rootScope', 'ngmClusterLists', function ($scope, $location, $route, $http, $q, ngmAuth, ngmData, ngmUser, ngmClusterHelper, $translate, $filter, $rootScope, ngmClusterLists) {
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
                url: ngmAuth.LOCATION + '/api/admin/cluster/list/activities'
            }),
            getIndicators: $http({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/admin/cluster/list/indicators'
            }),

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
                            title: 'Indicator | ' + $scope.list.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: 'List Indicator For ' + $scope.list.title
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
                    }, {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'form.indicator.list',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    style: $scope.list.ngm.style,
                                    activities: $scope.list.activities,
                                    activity_descriptions: $scope.list.activity_descriptions,
                                    indicators: $scope.list.indicators,
                                }
                            }]
                        }]
                    }, {
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

        $q.all([$scope.list.getActivities, $scope.list.getIndicators]).then(function (result) {
            $scope.list.activities = result[0].data.filter((v, i, a) => a.findIndex(t => (t.activity_type_id === v.activity_type_id)) === i);
            $scope.list.indicators = result[1].data;
            $scope.list.activity_descriptions = result[0].data.map((x) => {
                return {
                    cluster_id: x.cluster_id,
                    cluster: x.cluster,
                    activity_type_id: x.activity_type_id,
                    activity_description_id: x.activity_description_id,
                    activity_description_name: x.activity_description_name,
                }
            })
            
            setTimeout(() => {
                $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
            }, 0);
            // init
            $scope.list.init();

        })

    }]);

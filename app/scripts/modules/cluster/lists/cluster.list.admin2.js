/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ListAdmin2Ctrl
 * @description
 * # ListAdmin2Ctrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('ListAdmin2Ctrl', ['$scope', '$location', '$route', '$http', '$q', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', '$translate', '$filter', '$rootScope', 'ngmClusterLists', function ($scope, $location, $route, $http, $q,ngmAuth, ngmData, ngmUser, ngmClusterHelper, $translate, $filter, $rootScope, ngmClusterLists) {
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

            getAdmin1: $http({
                    method: 'GET',
                    url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin1'
            }),
            getAdmin2: $http({
                    method: 'GET',
                    url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin2'
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
                            title: 'Admin2 | ' + $scope.list.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: 'List Admin2 For ' + $scope.list.title
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
                                type: 'form.admin2.list',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    style: $scope.list.ngm.style,
                                    admin0lists: $scope.list.admin0lists,
                                    admin1lists: $scope.list.admin1lists,
                                    admin2lists: $scope.list.admin2lists
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
        // ngmData.get({
        //     method: 'GET',
        //     url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin2'
        // }).then(function (admin2lists) {
        //     if (admin2lists.length) {
        //         $scope.list.admin2lists = admin2lists;
        //         $scope.list.admin0lists = [];
        //         var getTheInfo = admin2lists.map((x) => {
        //             return {
        //                 adminRlat: x.adminRlat,
        //                 adminRlng: x.adminRlng,
        //                 adminRname: x.adminRname,
        //                 adminRpcode: x.adminRpcode,
        //                 adminRtype_name: x.adminRtype_name,
        //                 adminRzoom: x.adminRzoom,
        //                 admin0lat: x.admin0lat,
        //                 admin0lng: x.admin0lng,
        //                 admin0name: x.admin0name,
        //                 admin0pcode: x.admin0pcode,
        //                 admin0type_name: x.admin0type_name,
        //                 admin0zoom: x.admin0zoom
        //             }
        //         })
        //         $scope.list.admin0lists = getTheInfo.filter((v, i, a) => a.findIndex(t => (t.admin0pcode === v.admin0pcode)) === i);
        //         $scope.list.title = 'ALL'
        //         setTimeout(() => {
        //             $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
        //         }, 0);
        //         // init
        //         $scope.list.init();
        //     }
        //     $scope.list.init();
        // })

        $q.all([$scope.list.getAdmin1,$scope.list.getAdmin2]).then(function(result){

            $scope.list.admin1lists = result[0].data;
            var getTheInfo = result[0].data.map((x) => {
                return {
                    admin0name: x.admin0name,
                    admin0pcode: x.admin0pcode,
                }
            })
            $scope.list.admin0lists = getTheInfo.filter((v, i, a) => a.findIndex(t => (t.admin0pcode === v.admin0pcode)) === i);
            $scope.list.admin2lists = result[1].data;
            setTimeout(() => {
                $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
            }, 0);
            // init
            $scope.list.init();

        })

    }]);

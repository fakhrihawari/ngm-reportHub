/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ListAdmin4Ctrl
 * @description
 * # ListAdmin4Ctrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('ListAdmin4Ctrl', ['$scope', '$location', '$route', '$http', '$q', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', '$translate', '$filter', '$rootScope', 'ngmClusterLists', 'listService', function ($scope, $location, $route, $http, $q, ngmAuth, ngmData, ngmUser, ngmClusterHelper, $translate, $filter, $rootScope, ngmClusterLists, listService) {
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
            title: $route.current.params.admin0pcode.toUpperCase(),
            getAdmin1: $http({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin1',
                params: { admin0pcode: $route.current.params.admin0pcode.toUpperCase() }
            }),
            getAdmin2: $http({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin2',
                params: { admin0pcode: $route.current.params.admin0pcode.toUpperCase() }
            }),
            getAdmin3: $http({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin3',
                params: { admin0pcode: $route.current.params.admin0pcode.toUpperCase() }
            }),
            getAdmin4: $http({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/Admin4',
                params: { admin0pcode: $route.current.params.admin0pcode.toUpperCase() }
            }),
            setMenu: function () {
                // country
                var country = [{
                    'title': 'Afghanistan',
                    'param': 'admin0pcode',
                    'active': 'af',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/af/'
                }, {
                    'title': 'Bangladesh',
                    'param': 'admin0pcode',
                    'active': 'bd',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/bd/'
                }, {
                    'title': 'Colombia',
                    'param': 'admin0pcode',
                    'active': 'col',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/col/'
                }, {
                    'title': 'Cox Bazar',
                    'param': 'admin0pcode',
                    'active': 'cb',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/cb/'
                }, {
                    'title': 'Democratic Republic of Congo',
                    'param': 'admin0pcode',
                    'active': 'cd',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/cd/'
                }, {
                    'title': 'Ethiopia',
                    'param': 'admin0pcode',
                    'active': 'et',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/et/'
                }, {
                    'title': 'Iraq',
                    'param': 'admin0pcode',
                    'active': 'iq',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ng/'
                }, {
                    'title': 'Kenya',
                    'param': 'admin0pcode',
                    'active': 'ke',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ng/'
                }, {
                    'title': 'Nigeria',
                    'param': 'admin0pcode',
                    'active': 'ng',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ng/'
                }, {
                    'title': 'Papua New Guinea',
                    'param': 'admin0pcode',
                    'active': 'pg',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ng/'
                }, {
                    'title': 'Philiphine',
                    'param': 'admin0pcode',
                    'active': 'phl',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ng/'
                }, {
                    'title': 'South Sudan',
                    'param': 'admin0pcode',
                    'active': 'ss',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ss/'
                }, {
                    'title': 'Somalia',
                    'param': 'admin0pcode',
                    'active': 'so',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/so/'
                }, {
                    'title': 'Syria',
                    'param': 'admin0pcode',
                    'active': 'sy',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/sy/'
                }, {
                    'title': 'Yemen',
                    'param': 'admin0pcode',
                    'active': 'ye',
                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                    'href': '#/cluster/admin/list/admin4/ye/'
                }];

                // if ($scope.master.role === 'SUPERADMIN' || $scope.master.user.email === 'farifin@immap.org' || $scope.master.user.email === 'pfitzgerald@immap.org' || $scope.master.user.email === 'tkilkeiev@immap.org') {

                $scope.model.menu.push({
                    'id': 'search-country',
                    'icon': 'person_pin',
                    'title': 'Country',
                    'class': 'teal lighten-1 white-text',
                    'rows': country
                });
                // }
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
                            title: 'Admin4 | ' + $scope.list.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: 'List Admin4 For ' + $scope.list.title
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
                                type: 'form.admin4.list',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    style: $scope.list.ngm.style,
                                    admin0lists: $scope.list.admin0lists,
                                    admin1lists: $scope.list.admin1lists,
                                    admin2lists: $scope.list.admin2lists,
                                    admin3lists: $scope.list.admin3lists,
                                    admin4lists: $scope.list.admin4lists
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

        $q.all([$scope.list.getAdmin1, $scope.list.getAdmin2,$scope.list.getAdmin3, $scope.list.getAdmin4]).then(function (result) {


            $scope.list.admin1lists = result[0].data;
            $scope.list.admin0lists = [];
            var getTheInfo = $scope.list.admin1lists.map((x) => {
                return {
                    adminRlat: x.adminRlat,
                    adminRlng: x.adminRlng,
                    adminRname: x.adminRname,
                    adminRpcode: x.adminRpcode,
                    adminRtype_name: x.adminRtype_name,
                    adminRzoom: x.adminRzoom,
                    admin0lat: x.admin0lat,
                    admin0lng: x.admin0lng,
                    admin0name: x.admin0name,
                    admin0pcode: x.admin0pcode,
                    admin0type_name: x.admin0type_name,
                    admin0zoom: x.admin0zoom
                }
            })
            $scope.list.admin0lists = getTheInfo.filter((v, i, a) => a.findIndex(t => (t.admin0pcode === v.admin0pcode)) === i);
            $scope.list.admin2lists = result[1].data
            $scope.list.admin3lists = result[2].data
            $scope.list.admin4lists = result[3].data

            setTimeout(() => {
                $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
            }, 0);
            // init
            $scope.list.init();
            $scope.list.setMenu();

        })
        listService.backLink()

    }]);

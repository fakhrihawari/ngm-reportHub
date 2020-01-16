/**
 * @ngdoc function
 * @name ngmReportHubApp.MasterListAdminCtrl
 * @description
 * # DashboardDroughtAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('MasterListActivityGroupCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterLists',
        // 'ngmMasterListHelper', 
        function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterLists
            // ngmMasterListHelper
        ) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            // report object
            $scope.master = {

                // ngm
                ngm: $scope.$parent.ngm,

                // current user
                user: ngmUser.get(),

                // role: ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'],

                // getPath: function (country, cluster) {
                //     var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                //     var path = '/cluster/admin/lists'
                //     if (role === "SUPERADMIN") {
                //         return path += '/' + country + '/' + cluster;
                //     }
                //     if (role === "CLUSTER") {
                //         path += '/' + ngmUser.get().admin0pcode + '/' + cluster;
                //     }
                //     if (role === "COUNTRY") {
                //         path += '/' + country + '/' + ngmUser.get().cluster_id;
                //     }
                //     return path
                // },
                // setUrl: function () {
                //     var path = $scope.master.getPath($route.current.params.admin0pcode, $route.current.params.cluster_id);
                //     if (path !== $location.$$path) {
                //         $location.path(path);
                //     }
                // },

                // 
                init: function () {

                    // $scope.master.setUrl()
                    // report dashboard model
                    $scope.model = {
                        name: 'cluster_master_list',
                        header: {
                            div: {
                                'class': 'col s12 m12 l12 report-header',
                                style: 'border-bottom: 3px ' + $scope.master.ngm.style.defaultPrimaryColor + ' solid;'
                            },
                            title: {
                                'class': 'col s12 m12 l12 report-title truncate',
                                style: 'font-size: 3.4rem; color: ' + $scope.master.ngm.style.defaultPrimaryColor,
                                title: 'Activities'
                            },
                            subtitle: {
                                'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                                title: 'Activities'
                            }
                        },
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
                        }, {
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'html',
                                    card: 'white grey-text text-darken-2',
                                    style: 'padding: 0px;',
                                    config: {
                                        templateUrl: '/scripts/modules/cluster/master/views/cluster.activities.group.html',
                                        year: [{ year: 2017 }, { year: 2018 }, { year: 2019 }],
                                        setUrl: function () { return '/' + $route.current.params.admin0pcode + '/' + $route.current.params.cluster_id + '/' }
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
                                        html: $scope.master.ngm.footer
                                    }
                                }]
                            }]
                        }]
                    }
                    $scope.model.menu = [];
                    // $scope.master.setMenu();
                    // assign to ngm app scope
                    $scope.master.ngm.dashboard.model = $scope.model;
                },
                setMenu: function () {

                },


            }

            // set page
            $scope.master.init();
            $scope.master.setMenu();
            // $scope.master.getPath($route.current.params.admin0pcode, $route.current.params.cluster_id)
            // console.log(ngmClusterLists.getBeneficiaries())
            ngmData.get(
            {
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/cluster/list/activities?admin0pcode=' + ngmUser.get().admin0pcode
            }).then(function(x){
                // console.log(x);
            })


        }]);
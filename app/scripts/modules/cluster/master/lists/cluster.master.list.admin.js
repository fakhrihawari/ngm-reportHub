/**
 * @ngdoc function
 * @name ngmReportHubApp.MasterListAdminCtrl
 * @description
 * # DashboardDroughtAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('MasterListAdminCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterLists',
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

                role: ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'],

                getPath: function(country,cluster){
                    var role =ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    var path = '/cluster/admin/lists'
                    if(role === "SUPERADMIN"){
                        return path += '/'+country+'/'+cluster;
                    }
                    if (role ===  "CLUSTER"){
                        path += '/'+ngmUser.get().admin0pcode +'/' + cluster;
                    }
                    if (role === "COUNTRY") {
                        path += '/' +country+'/' + ngmUser.get().cluster_id;
                    }
                    return path
                },
                setUrl: function(){
                    var path = $scope.master.getPath($route.current.params.admin0pcode, $route.current.params.cluster_id);
                    if (path !== $location.$$path) {
                        $location.path(path);
                    }
                },

                // 
                init: function () {

                    $scope.master.setUrl()
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
                                title: $route.current.params.admin0pcode.toUpperCase() + ' | LISTS ',//$scope.master.user.roles.indexOf("SUPERADMIN") > -1 ? 'ALL | LISTS ' : $scope.master.user.admin0pcode + '| LISTS '
                            },
                            subtitle: {
                                'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                                title: 'IMMAP Overview for ' + $scope.master.user.admin0name
                            }
                        },
                        rows: [{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'html',
                                    card: 'white grey-text text-darken-2',
                                    style: 'padding: 0px;',
                                    config: {
                                        urlForResponseOrgList: function () { return $scope.master.setResponseListOrgUrl() },
                                        urlForResponseDonorList: function(){ return $scope.master.setResponseListDonorUrl() },
                                        setTitleResponse: function () { return $scope.master.setTitleResponse() },
                                        showMasterlist: function () { return $scope.master.showMasterlist() },
                                        templateUrl: '/scripts/modules/cluster/master/views/cluster.master.admin.list.html',
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
                    // country
                    var country = [{
                        'title': 'ALL',
                        'param': 'admin0pcode',
                        'active': 'all',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/all/' + $route.current.params.cluster_id
                    },{
                        'title': 'Afghanistan',
                        'param': 'admin0pcode',
                        'active': 'af',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/af/' + $route.current.params.cluster_id
                    }, {
                            'title': 'Bangladesh',
                            'param': 'admin0pcode',
                            'active': 'bd',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '#/cluster/admin/lists/bd/' + $route.current.params.cluster_id
                     }, {
                        'title': 'Colombia',
                        'param': 'admin0pcode',
                        'active': 'col',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/col/'+$route.current.params.cluster_id
                    }, {
                        'title': 'Cox Bazar',
                        'param': 'admin0pcode',
                        'active': 'cb',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/cb/'+$route.current.params.cluster_id
                    },{
                        'title': 'Democratic Republic of Congo',
                        'param': 'admin0pcode',
                        'active': 'cd',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/cd/'+$route.current.params.cluster_id
                    }, {
                        'title': 'Ethiopia',
                        'param': 'admin0pcode',
                        'active': 'et',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/et/'+$route.current.params.cluster_id
                    }, {
                        'title': 'Nigeria',
                        'param': 'admin0pcode',
                        'active': 'ng',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/ng/'+$route.current.params.cluster_id
                    }, {
                        'title': 'South Sudan',
                        'param': 'admin0pcode',
                        'active': 'ss',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/ss/'+$route.current.params.cluster_id
                    },  {
                        'title': 'Somalia',
                        'param': 'admin0pcode',
                        'active': 'so',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/so/'+$route.current.params.cluster_id
                    }, {
                        'title': 'Syria',
                        'param': 'admin0pcode',
                        'active': 'sy',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/sy/'+$route.current.params.cluster_id
                    }, {
                        'title': 'Yemen',
                        'param': 'admin0pcode',
                        'active': 'ye',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/ye/'+$route.current.params.cluster_id
                    }];

                    // cluster
                    var clusters = ngmClusterLists.getClusters(ngmUser.get().admin0pcode);
                    var cluster_rows = [{
                        'title': 'ALL',
                        'param': 'cluster_id',
                        'active': 'all',
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '#/cluster/admin/lists/' + $route.current.params.admin0pcode + '/all'}];
                    for (i = 0; i < clusters.length; i++) {
                        var clusterName = clusters[i].cluster;
                        var clusterId = clusters[i].cluster_id
                        cluster_rows.push({
                            'title': clusterName,
                            'param': 'cluster_id',
                            'active': clusterId,
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '#/cluster/admin/lists/' + $route.current.params.admin0pcode + '/' + clusterId
                        });
                    };

                    if ($scope.master.role === 'SUPERADMIN' || $scope.master.role === "CLUSTER") {

                        $scope.model.menu.push({
                            'id': 'search-country',
                            'icon': 'person_pin',
                            'title': 'Country',
                            'class': 'teal lighten-1 white-text',
                            'rows': country
                        });
                    }
                    if($scope.master.role === 'SUPERADMIN' || $scope.master.role === "COUNTRY"){
                        $scope.model.menu.push({
                            'id': 'search-cluster',
                            'icon': 'person_pin',
                            'title': 'Cluster',
                            'class': 'teal lighten-1 white-text',
                            'rows': cluster_rows
                        });
                    }
                },
                setResponseListOrgUrl: function () {
                    if ($scope.master.role === 'CLUSTER') {
                            string = '/' + $scope.master.user.admin0pcode;
                    }
                    if ($scope.master.role === 'COUNTRY' || $scope.master.role === 'SUPERADMIN'){
                            string = '/'+ $route.current.params.admin0pcode;
                    }
                    return string
                },
                setResponseListDonorUrl: function () {
                    if ($scope.master.role === 'COUNTRY') {
                        string = '/' + $route.current.params.admin0pcode +'/' + $scope.master.user.cluster_id;
                    }
                    if ($scope.master.role === 'CLUSTER' || $scope.master.role === 'SUPERADMIN') {
                        string = '/' + $route.current.params.admin0pcode+'/' + $route.current.params.cluster_id;
                    }
                    return string
                },
                setTitleResponse: function () {
                    if ($scope.master.user.roles.indexOf('CLUSTER') > -1) {
                        if ($route.current.params.admin0pcode) {
                            title = ': ' + $route.current.params.admin0pcode + ' CLUSTER: ' + $scope.master.user.cluster_id;
                        } else {
                            title = ': ' + $scope.master.user.admin0pcode + ' CLUSTER: ' + $scope.master.user.cluster_id;
                        }
                    }
                    if ($scope.master.user.roles.indexOf('COUNTRY') > -1) {
                        if ($route.current.params.cluster_id) {
                            title = ': ' + $scope.master.user.admin0pcode + ' CLUSTER: ' + $route.current.params.cluster_id;
                        } else {
                            title = ': ' + $scope.master.user.admin0pcode + ' CLUSTER: ' + $scope.master.user.cluster_id;
                        }
                    }
                    if ($scope.master.user.roles.indexOf('SUPERADMIN') > -1) {
                        if ($route.current.params.admin0pcode && $route.current.params.cluster_id) {
                            title = ': ' + $route.current.params.admin0pcode + ' CLUSTER: ' + $route.current.params.cluster_id;
                        }
                        if ($route.current.params.admin0pcode && !$route.current.params.cluster_id) {
                            title = ': ' + $route.current.params.admin0pcode
                        }
                        if (!$route.current.params.admin0pcode && $route.current.params.cluster_id) {
                            title = 'CLUSTER: ' + $route.current.params.cluster_id
                        }
                        if (!$route.current.params.admin0pcode && !$route.current.params.cluster_id) {
                            title = ': ' + $scope.master.user.admin0pcode + ' CLUSTER: ' + $scope.master.user.cluster_id;
                        }
                    }
                    return title
                },
                showMasterlist: function () {
                    if ($scope.master.user.roles.indexOf('SUPERADMIN') > -1) {
                        return true
                    }
                    return false
                }

            }

            // set page
            $scope.master.init();
            $scope.master.setMenu();
            $scope.master.getPath($route.current.params.admin0pcode, $route.current.params.cluster_id)

        }]);
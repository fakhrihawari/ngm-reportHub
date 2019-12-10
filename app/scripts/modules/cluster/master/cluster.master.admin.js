angular.module('ngmReportHub')
    .controller('DashboardMasterAdminCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        // master object
        $scope.master = {

            // ngm
            ngm: $scope.$parent.ngm,

            // current user
            user: ngmUser.get(),

            // 
            init: function () {

                // master dashboard model
                $scope.model = {
                    name: 'cluster_master_admin',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.master.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m12 l12 report-title truncate',
                            style: 'font-size: 3.4rem; color: ' + $scope.master.ngm.style.defaultPrimaryColor,
                            title: '#CLUSTER ADMIN'
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: '#CLUSTER ADMIN'
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
                                    templateUrl: '/scripts/modules/cluster/master/views/cluster.master.landing.html',
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
                // assign to ngm app scope
                $scope.master.ngm.dashboard.model = $scope.model;
            },

        }

        // set page
        $scope.master.init();

    }]);
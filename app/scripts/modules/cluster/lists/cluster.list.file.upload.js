/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ListUploadFileCtrl
 * @description
 * # ListUploadFileCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('ListUploadFileCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', '$translate', '$filter', '$rootScope', 'ngmClusterLists', 'listService', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmClusterHelper, $translate, $filter, $rootScope, ngmClusterLists, listService) {
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
                
                $scope.list.title = $route.current.params.id.toUpperCase()
                
                var previousLink = $rootScope.ListPreviouseUrl;
                // report dashboard model
                $scope.model = {
                    name: 'cluster_donor_list',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.list.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m9 l9 report-title truncate',
                            style: 'font-size: 3.4rem; color: ' + $scope.list.ngm.style.defaultPrimaryColor,
                            title: 'FILE | ' + $scope.list.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: 'Upload File For ' + $scope.list.title
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
                                    html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="' + previousLink+'"'+$route.current.params.id+'><i class="material-icons left">keyboard_return</i> Back To List </a>'
                                }
                            }]
                        }]
                    },
                        {
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'form.upload.list',
                                    style: 'padding:0px; height: 90px; padding-top:10px;',
                                    config: {
                                        style: $scope.list.ngm.style,
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

                $scope.list.ngm.dashboard.model = $scope.model;

            }

        };

        $scope.list.init();
        

    }]);

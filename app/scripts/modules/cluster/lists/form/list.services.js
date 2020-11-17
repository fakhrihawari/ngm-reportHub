/**
 * @name ngmReportHubApp.factory:ngmUser
 * @description
 * # ngmAccess
 * Manages browser local storage
 *
 * @name ngmReportHubApp.factory:ngmUser
 * @description
 * # ngmAccess
 * Manages browser local storage
 *
 */
angular.module('ngmReportHub')
    .factory('listService', ['$q', '$route', '$http', '$location', '$timeout', 'ngmAuth', 'ngmUser', function ($q, $route, $http, $location, $timeout, ngmAuth, ngmUser) {
        // list Service
        var service = {
            canEditList: function(item){
                allow = false;
                 var restricted_obj ={
                     admin0pcode:item.admin0pcode ? item.admin0pcode:'',
                     cluster_id: item.cluster_id? item.cluster_id: ''
                 }
                var x = ngmAuth.canDo('EDIT_LIST', restricted_obj);
                if(x){
                    allow = true;
                }

               return allow;
            }
        };

        return service;

    }])
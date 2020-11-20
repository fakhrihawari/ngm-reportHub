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
    .factory('listService', ["$rootScope", '$q', '$route', '$http', '$location', '$timeout', 'ngmAuth', 'ngmUser', function ($rootScope,$q, $route,  $http, $location, $timeout, ngmAuth, ngmUser) {
        // list Service
        var service = {
            canEditList: function(item){
                allow = false;
                if (item.cluster_id instanceof Array || item.admin0pcode instanceof Array){
                    
                    if(item.cluster_id.indexOf(ngmUser.get().cluster_id) >-1){
                        item.cluster_id = ngmUser.get().cluster_id
                    }else{
                        item.cluster_id = '';
                    }

                    
                }
                if(item.admin0pcode instanceof Array) {

                    if (item.admin0pcode.indexOf(ngmUser.get().cluster_id) > -1) {
                        item.admin0pcode = ngmUser.get().cluster_id
                    } else {
                        item.admin0pcode = '';
                    }


                }
                 var restricted_obj ={
                     admin0pcode:item.admin0pcode ? item.admin0pcode:'',
                     cluster_id: item.cluster_id? item.cluster_id: ''
                 }
                var x = ngmAuth.canDo('EDIT_LIST', restricted_obj);
                if(x){
                    allow = true;
                }

               return allow;
            },
            attribute:function(type){
                var list = {
                    activities:[
                        "admin0pcode",
                        "cluster_id",
                        "cluster",
                        "response",
                        "strategic_objective_id",
                        "strategic_objective_name",
                        "strategic_objective_description",
                        "sector_objective_id",
                        "sector_objective_name",
                        "sector_objective_description",
                        "strategic_objective_descriptions",
                        "activity_type_id",
                        "activity_type_name",
                        "activity_description_id",
                        "activity_description_name",
                        "activity_detail_id",
                        "activity_detail_name",
                        "indicator_id",
                        "indicator_name",
                        "active",
                        "display_activity_detail",
                        "display_indicator",
                        "beneficiary_category_type_id",
                        "beneficiary_delivery_type_id",
                        "vulnerable_populations",
                        "mpc_delivery_type_id",
                        "mpc_mechanism_type_id",
                        "mpc_transfer_category_id",
                        "mpc_grant_type_id",
                        "mpc_package_type_id",
                        "mpc_transfer_type_id",
                        "sector_objective_description",
                        "sector_objective_id",
                        "sector_objective_name",
                        "strategic_objective_description",
                        "strategic_objective_id",
                        "strategic_objective_name",
                        "units",
                        "unit_type_id",
                        "display_details",
                        "details",
                        "households",
                        "families",
                        "boys_0_5",
                        "boys_0_12",
                        "boys_6_11",
                        "boys_6_12",
                        "boys_12_17",
                        "boys_13_17",
                        "boys",
                        "girls_0_5",
                        "girls_0_12",
                        "girls_6_11",
                        "girls_6_12",
                        "girls_12_17",
                        "girls_13_17",
                        "girls",
                        "men",
                        "women",
                        "elderly_men",
                        "elderly_women",
                        "total_male",
                        "total_female",
                        "total_beneficiaries",
                        "remarks",
                        "activity_date",
                        "start_date",
                        "end_date",
                        "templateUrl"
                    ],
                    Admin1:[
                        "admin0lat",
                        "admin0lng",
                        "admin0name",
                        "admin0pcode",
                        "admin0type_name",
                        "admin0zoom",
                        "admin1lat",
                        "admin1lng",
                        "admin1name",
                        "admin1pcode",
                        "admin1type_name",
                        "admin1zoom",
                        "adminRlat",
                        "adminRlng",
                        "adminRname",
                        "adminRpcode",
                        "adminRtype_name",
                        "adminRzoom",
                        "inactive ",
                    ],
                    Admin2:[
                        "admin0lat",
                        "admin0lng",
                        "admin0name",
                        "admin0pcode",
                        "admin0type_name",
                        "admin0zoom",
                        "admin1lat",
                        "admin1lng",
                        "admin1name",
                        "admin1pcode",
                        "admin1type_name",
                        "admin1zoom",
                        "admin2lat",
                        "admin2lng",
                        "admin2name",
                        "admin2pcode",
                        "admin2type_name",
                        "admin2zoom",
                        "adminRlat",
                        "adminRlng",
                        "adminRname",
                        "adminRpcode",
                        "adminRtype_name",
                        "adminRzoom",
                        "conflict",
                        "inactive",
                    ],
                    Admin3:[
                        "admin0pcode",
                        "admin1pcode",
                        "admin2pcode",
                        "admin3lat",
                        "admin3lng",
                        "admin3name",
                        "admin3pcode",
                        "admin3type_name",
                        "admin3zoom",
                        "inactive",
                        "admin0lat",
                        "admin0lng",
                        "admin0name",
                        "admin0pcode",
                        "admin0type_name",
                        "admin0zoom",
                        "admin1lat",
                        "admin1lng",
                        "admin1name",
                        "admin1pcode",
                        "admin1type_name",
                        "admin1zoom",
                        "admin2lat",
                        "admin2lng",
                        "admin2name",
                        "admin2pcode",
                        "admin2type_name",
                        "admin2zoom",
                        "admin3lat",
                        "admin3lng",
                        "admin3name",
                        "admin3pcode",
                        "admin3type_name",
                        "admin3zoom",
                        "adminRlat",
                        "adminRlng",
                        "adminRname",
                        "adminRpcode",
                        "adminRtype_name",
                        "adminRzoom",
                        "conflict",
                        "inactive"
                    ],
                    Admin4:[
                        "admin0pcode",
                        "admin1pcode",
                        "admin2pcode",
                        "admin4lat",
                        "admin4lng",
                        "admin4name",
                        "admin4pcode",
                        "admin4type_name",
                        "admin4zoom",
                        "inactive",
                    ],
                    Admin5:[
                        "admin0pcode",
                        "admin1pcode",
                        "admin2pcode",
                        "admin3pcode",
                        "admin5lat",
                        "admin5lng",
                        "admin5name",
                        "admin5pcode",
                        "admin5type_name",
                        "admin5zoom",
                        "inactive",
                    ],
                    AdminSites:[
                        "admin0lat",
                        "admin0lng",
                        "admin0name",
                        "admin0pcode",
                        "admin0type",
                        "admin0type_name",
                        "admin0zoom",
                        "admin1lat",
                        "admin1lng",
                        "admin1name",
                        "admin1pcode",
                        "admin1type",
                        "admin1type_name",
                        "admin1zoom",
                        "admin2lat",
                        "admin2lng",
                        "admin2name",
                        "admin2pcode",
                        "admin2type",
                        "admin2type_name",
                        "admin2zoom",
                        "admin3lat",
                        "admin3lng",
                        "admin3name",
                        "admin3pcode",
                        "admin3type",
                        "admin3type_name",
                        "admin3zoom",
                        "admin4lat",
                        "admin4lng",
                        "admin4name",
                        "admin4pcode",
                        "admin4type_name",
                        "admin4zoom",
                        "admin5zoom",
                        "adminRlat",
                        "adminRlng",
                        "adminRname",
                        "adminRpcode",
                        "adminRtype_name",
                        "adminRzoom",
                        "boys",
                        "conflict",
                        "elderly_men",
                        "elderly_women",
                        "girls",
                        "households",
                        "men",
                        "population",
                        "site_boys",
                        "site_class",
                        "site_dtm",
                        "site_elderly_men",
                        "site_elderly_women",
                        "site_girls",
                        "site_households",
                        "site_id",
                        "site_lat",
                        "site_lng",
                        "site_men",
                        "site_name",
                        "site_population",
                        "site_status",
                        "site_type_id",
                        "site_type_name",
                        "site_women",
                        "total_beneficiaries",
                        "women"
                    ],
                    beneficiarycategories:[
                        "admin0pcode",
                        "cluster",
                        "cluster_id",
                        "beneficiary_category_id",
                        "beneficiary_category_name",
                    ],
                    beneficiarytypes:[
                        "cluster_id",
                        "beneficiary_type_id",
                        "beneficiary_type_name",
                    ],
                    clusters:[
                        "admin0pcode",
                        "cluster_id",
                        "cluster",
                    ],
                    currencies:[
                        "admin0pcode",
                        "currency_id",
                        "currency_name",
                    ],
                    deliverytypes:[
                        "admin0pcode",
                        "cluster",
                        "cluster_id",
                        "delivery_type_id",
                        "delivery_type_name",
                    ],
                    donors:[
                        "cluster_id",
                        "project_donor_id",
                        "project_donor_name",
                    ],
                    hrpbeneficiarytypes:[
                        "cluster_id",
                        "hrp_beneficiary_type_id",
                        "hrp_beneficiary_type_name",
                    ],
                    indicators:[
                        "cluster_id",
                        "activity_type_id",
                        "activity_description_id",
                        "indicator_name",
                        "indicator_id",
                    ],
                    mpctypes:[
                        "cluster_id",
                        "activity_type_id",
                        "activity_description_id",
                        "mpc_delivery_type_name",
                        "mpc_delivery_type_id",
                        "mpc_mechanism_type_id",
                        "mpc_mechanism_type_name",
                    ],
                    org:[
                        "organization_name",
                        "organization_type",
                        "organization_tag",
                        "organization",
                        "admin0pcode",
                    ],
                    projectdetails:[
                        "admin0pcode",
                        "project_detail_id",
                        "project_detail_name",
                    ],
                    siteimplementations:[
                        "cluster_id",
                        "site_implementation_id",
                        "site_implementation_name",
                    ],
                    sitetypes:[
                        "cluster_id",
                        "site_type_id",
                        "site_type_name",
                    ],
                    stockitems:[
                        "admin0pcode",
                        "cluster",
                        "cluster_id",
                        "stock_item_name",
                        "stock_item_type",
                    ],
                    stockstatuses:[
                        "admin0pcode",
                        "stock_type_id",
                        "stock_type_name",
                        "stock_status_id",
                        "stock_status_name",
                    ],
                    stocktargetedgroups:[
                        "admin0pcode",
                        "stock_targeted_groups_id",
                        "stock_targeted_groups_name",
                    ],
                    units:[
                        "cluster_id",
                        "unit_type_id",
                        "unit_type_name",
                    ]
                };
                return list[type];
            },
            linkUrl:{
                activities: "activities",
                Admin1: "admin1",
                Admin2: "admin2",
                Admin3: "admin3",
                Admin4: "admin4",
                Admin5: "admin5",
                AdminSites:"admin_site",
                beneficiarycategories: "beneficiary_categories",
                beneficiarytypes: "beneficiary_type",
                clusters: "clusters",
                currencies: "currencies",
                deliverytypes: "delivery_types",
                donors: "donor",
                hrpbeneficiarytypes: "hrp_type",
                indicators: "indicator",
                mpctypes: "mpc_type",
                org: "organization",
                projectdetails: "project_detail",
                siteimplementations: "site_implementation",
                sitetypes: "site_type",
                stockitems: "stock_item",
                stockstatuses: "stock_status",
                stocktargetedgroups: "stock_targeted_group",
                units: "units"
            },
            validateFile:function(array,type){
                params = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['EDIT_LIST_RESTRICTED']
                var validation = {
                    error:'========================= ERROR MESSAGE ========================= \n',
                    valid: false
                }
                if(array && array.length){
                    var head = service.attribute(type) //Object.keys(array[0])
                    var count_error =0
                    for(var i=0;i < array.length; i++){
                       for(var h=0;h<head.length;h++){
                           if (array[i][head[h]] === undefined || array[i][head[h]] === '' ){
                               validation.error = validation.error + ' ROW '+i+' COLUMN '+head[h]+' is Missing or Value is Invalid \n';
                               count_error+=1
                           }
                           if((params.indexOf('cluster_id')>-1) && (head[h] ==='cluster_id')){
                               cluster = ngmUser.get().cluster_id
                               if (array[i][head[h]].indexOf(cluster) !== 0 ){
                                   validation.error = validation.error + ' ROW ' + i + ' COLUMN ' + head[h] + '  Cannot upload file that contain other cluster beside your cluster \n';
                                   count_error += 1
                               }
                           }
                           if ((params.indexOf('admin0pcode') > -1) && (head[h] === 'admin0pcode')) {
                               admin0pcode = ngmUser.get().admin0pcode
                               if (array[i][head[h]].indexOf(admin0pcode) !== 0) {
                                    validation.error = validation.error + ' ROW ' + i + ' COLUMN ' + head[h] + ' Cannot upload file that contain other country beside your country \n';
                                    count_error += 1
                               }
                           }

                       }
                    };

                    if(count_error <1){
                        validation.valid = true;
                    }

                }else{
                    validation.error = 'File is Empty';
                }
                return validation;

            },
            backLink:function(){
                $rootScope.$on('$locationChangeStart', function (evt, absNewUrl, absOldUrl) {
                    var absOldUrl = absOldUrl.substring(absOldUrl.indexOf("/#") + 1);
                    $rootScope.ListPreviouseUrl = absOldUrl
                })
            },
            showUpload:function(){
                return ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['EDIT_LIST'];
            }
            
        };

        return service;

    }])
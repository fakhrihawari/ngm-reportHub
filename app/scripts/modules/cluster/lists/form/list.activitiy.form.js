
angular.module('ngm.widget.form.activities.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.activities.list', {
                title: 'Activities Form List',
                description: 'Activities Form List',
                controller: 'ActivitiesFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/activity.list.html'
            });
    })
    .controller('ActivitiesFormListCtrl', [
        '$scope',
        'config',
        'ngmClusterLists',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
        function (
            $scope,
            config,
            ngmClusterLists,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $filter
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                activities: config.activities ? config.activities:[],
                itemsPerPage: 9,
                clusters: ngmClusterLists.getClusters(ngmUser.get().admin0pcode),
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                addActivityAttribute: {
                    "admin0pcode": "",
                    "cluster_id": "",
                    "cluster": "",
                    "response": "",
                    "strategic_objective_id": "",
                    "strategic_objective_name": "",
                    "strategic_objective_description": "",
                    "sector_objective_id": "",
                    "sector_objective_name": "",
                    "sector_objective_description": "",
                    "strategic_objective_descriptions": "",
                    "activity_type_id": "",
                    "activity_type_name": "",
                    "activity_description_id": "",
                    "activity_description_name": "",
                    "activity_detail_id": "",
                    "activity_detail_name": "",
                    "indicator_id": "",
                    "indicator_name": "",
                    "active": 0,
                    "display_activity_detail": 0,
                    "display_indicator": 0,
                    "beneficiary_category_type_id": 0,
                    "beneficiary_delivery_type_id": 0,
                    "vulnerable_populations": 0,
                    "mpc_delivery_type_id": 0,
                    "mpc_mechanism_type_id": 0,
                    "mpc_transfer_category_id": "",
                    "mpc_grant_type_id": "",
                    "mpc_package_type_id": 0,
                    "mpc_transfer_type_id": 0,
                    "units": 0,
                    "unit_type_id": 0,
                    "display_details": 0,
                    "details": 0,
                    "households": 0,
                    "families": 0,
                    "boys_0_5": 0,
                    "boys_0_12": "",
                    "boys_6_11": 0,
                    "boys_6_12": "",
                    "boys_12_17": 0,
                    "boys_13_17": "",
                    "boys": 0,
                    "girls_0_5": 0,
                    "girls_0_12": "",
                    "girls_6_11": 0,
                    "girls_6_12": "",
                    "girls_12_17": 0,
                    "girls_13_17": "",
                    "girls": 0,
                    "men": 0,
                    "women": 0,
                    "elderly_men": 0,
                    "elderly_women": 0,
                    "total_male": 0,
                    "total_female": 0,
                    "total_beneficiaries": 0,
                    "remarks": 0,
                    "activity_date": 0,
                    "start_date": "",
                    "end_date": "",
                    "templateUrl": ""
                },
                editedActivity: {},
                removeActivity: {},
                openAddModal: function (modal) {
                    $('#add-activity-modal').modal({ dismissible: false });
                    $('#add-activity-modal').modal('open');
                },
                admin5Type: ["Union", "Settlement", "Refugee Block"],
                removeActivityModal: function (type) {
                    $scope.master.removeActivity = type;
                    $('#remove-activity-modal').modal({ dismissible: false });
                    $('#remove-activity-modal').modal('open');

                },
                active_types: [{ name: 'Active', value: 1 }, { name: 'Not Active', value: 0 }],
                country: [
                    {
                        'admin0name': 'Afghanistan',
                        'admin0pcode': 'AF',

                    }, {
                        'admin0name': 'Bangladesh',
                        'admin0pcode': 'BD',

                    }, {
                        'admin0name': 'Cox Bazar',
                        'admin0pcode': 'CB',

                    }, {
                        'admin0name': 'Democratic Republic of Congo',
                        'admin0pcode': 'CD',
                    }, {
                        admin0pcode: 'IQ', admin0name: 'Iraq'
                    }, {
                        'admin0name': 'Ethiopia',
                        'admin0pcode': 'ET',

                    },{ 
                        admin0pcode: 'UR', 
                        admin0name: 'Uruk'
                    },
                    {
                        admin0pcode: 'KE', 
                        admin0name: 'Kenya'
                    },{
                        'admin0name': 'Somalia',
                        'admin0pcode': 'SO',

                    }, {
                        'admin0name': 'South Sudan',
                        'admin0pcode': 'SS',

                    }, {
                        'admin0name': 'Syria',
                        'admin0pcode': 'SY',

                    }, {
                        'admin0name': 'Ukraine',
                        'admin0pcode': 'UA',

                    }, {
                        'admin0name': 'Yemen',
                        'admin0pcode': 'YE',

                    }, {
                        'admin0name': 'Nigeria',
                        'admin0pcode': 'NG',

                    },
                    {
                        'admin0name': 'Colombia',
                        'admin0pcode': 'COL',
                    }],
                updateName: function (list, key, name, item) {


                    // this approach does NOT break gulp!
                    $timeout(function () {
                        var obj = {}
                        obj[key] = item[key];
                        var select = $filter('filter')(list, obj, true);

                        // set name
                        if (select.length) {

                            // name
                            item[name] = select[0][name];
                            if (name === 'site_type_name') {
                                item['site_class'] = select[0][name]
                            }
                        }
                    }, 10);
                },
                addActivity: function () {

                    if (!$scope.master.addActivityAttribute.activity_type_id){
                        $scope.master.addActivityAttribute.activity_type_id = $scope.master.addActivityAttribute.activity_type_name.split(' ').join('_').toLowerCase();
                    }
                    if (!$scope.master.addActivityAttribute.activity_description_id) {
                        $scope.master.addActivityAttribute.activity_description_id = $scope.master.addActivityAttribute.activity_description_name.split(' ').join('_').toLowerCase();
                    }
                    if (!$scope.master.addActivityAttribute.indicator_id) {
                        $scope.master.addActivityAttribute.indicator_id = $scope.master.addActivityAttribute.indicator_name.split(' ').join('_').toLowerCase();
                    }
                    if (!$scope.master.addActivityAttribute.activity_detail_id) {
                        $scope.master.addActivityAttribute.activity_detail_id = $scope.master.addActivityAttribute.activity_detail_name.split(' ').join('_').toLowerCase();
                    }
                    M.toast({ html: 'Adding New Activity ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/activities',
                        data: {
                            data: $scope.master.addActivityAttribute
                        }
                    }).success(function (new_admin_site) {

                        if (new_admin_site.err) {
                            M.toast({ html: 'Error! Activity  Not Added </br>' + new_admin_site.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin_site.err) {
                            $scope.master.activities.unshift(new_admin_site);
                            $timeout(function () {
                                $('#add-activity-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Activity  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Activity Site  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationActivity: function (activity) {

                    valid = false;
                    if (!activity || !activity.cluster_id || !activity.activity_type_name || !activity.activity_description_name || activity.admin0pcode==='' || !activity.active ) {
                        valid = false;
                    } else {
                        valid = true;
                    }
                    return valid;
                },
                checkActiveDeactivedUnit: function (item) {
                },
                changeActiveDeactivedUnitByCluster: function (id) {
                },
                disabledUnit: function (item) {
                },
                setEditedActivity: function (admin) {

                    $scope.master.editedActivity = angular.copy(admin);
                    $('#edit-activity-modal').modal({ dismissible: false });
                    $('#edit-activity-modal').modal('open');
                },
                editeActivity: function (admin) {

                    M.toast({ html: 'Updating Activity....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/activities',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {

                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Activity not updated', displayLength: 4000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.activities.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.activities[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Activity is Updated ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Activity not updated', displayLength: 4000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedActivity = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'COUNTRY') {
                        return true;
                    }
                    // if organization type is international
                    if (item.organization_type === 'International NGO' || item.organization_type === 'United Nations') {
                        if (role === 'SUPERADMIN') {
                            return false;
                        }
                        return true;
                    }
                    return false;
                },
                updateNumber: function (item, key) {

                    if (key === 'boys') {

                        item['site_boys'] = item[key];
                    }
                    if (key === 'girls') {

                        item['site_girls'] = item[key];
                    }
                    if (key === 'households') {

                        item['site_households'] = item[key];
                    }
                    if (key === 'men') {

                        item['site_men'] = item[key];
                    }
                    if (key === 'elderly_men') {

                        item['site_elderly_men'] = item[key];
                    }
                    if (key === 'elderly_women') {

                        item['site_elderly_women'] = item[key];
                    }
                    if (key === 'women') {

                        item['site_women'] = item[key];
                    }

                    item['total_beneficiaries'] = item['site_boys'] +
                        item['site_girls'] +
                        item['site_households'] +
                        item['site_men'] +
                        item['site_elderly_men'] +
                        item['site_elderly_women'] +
                        item['site_women'];
                    item['site_population'] = item['total_beneficiaries']

                },
                removedActivity: function (id) {
                    M.toast({ html: 'Deleting Activity....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/list/activities',
                        data: {
                            data: $scope.master.removeActivity
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Activity not deleted', displayLength: 4000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.activities.map(x => { return x.id }).indexOf(id);
                                $scope.master.activities.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Activity ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Activity not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                setDate: function (item,attribute) {
                    // set new start / end date
                    item[attribute] = moment(new Date(item[attribute])).format('YYYY-MM-DD');
                    if (item[attribute] === 'Invalid date'){
                        item[attribute] ="";
                    }
                },
                setCountry: function (id, item,edit) {
                    if(edit){
                        id = 'edit-'+id
                    }
                    if (document.getElementById(id).checked) {
                        var values = document.getElementById(id).value;
                        if (item.admin0pcode.indexOf(values) === -1) {
                            if(item.admin0pcode === ''){
                                item.admin0pcode = values;
                            }else{
                                temp = item.admin0pcode.replace(/\s/g, '').split(',')
                                temp.push(values)
                                item.admin0pcode = temp.join(', ');
                            }
                        }
                    } else {
                        var values = document.getElementById(id).value;
                        if (item.admin0pcode.indexOf(values) > -1) {
                            temp = item.admin0pcode.replace(/\s/g, '').split(',')
                            var index = temp.indexOf(values);
                            temp.splice(index,1)

                            if(temp.length<1){
                                item.admin0pcode ='';
                            }else{
                            item.admin0pcode = temp.join(', ');
                            }
                            
                        }
                    }
                },
                init: function () {
                    
                }
            }

            $scope.master.init();

        }])
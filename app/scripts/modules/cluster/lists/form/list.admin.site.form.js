
angular.module('ngm.widget.form.admin.site.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.admin.site.list', {
                title: 'Admin Site Form List',
                description: 'Admin Site Form List',
                controller: 'AdminSiteFormListCtrl',
                templateUrl: '/scripts/modules/cluster/views/lists/admin.site.list.html'
            });
    })
    .controller('AdminSiteFormListCtrl', [
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
                admin_sites: config.admin_sites ? config.admin_sites : [],
                admin5lists: config.admin5lists,
                admin4lists: config.admin4lists,
                admin3lists: config.admin3lists,
                admin2lists: config.admin2lists,
                admin1lists: config.admin1lists,
                admin0lists: config.admin0lists,
                site_types: config.site_types && config.site_types.length ? config.site_types : ngmClusterLists.getSiteTypes(), 
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                addAdminSiteAttribute: {
                    admin0lat:'',
                    admin0lng:'',
                    admin0name:'',
                    admin0pcode:'',
                    admin0type:'',
                    admin0type_name:'',
                    admin0zoom:'',
                    admin1lat:'',
                    admin1lng:'',
                    admin1name:'',
                    admin1pcode:'',
                    admin1type:'',
                    admin1type_name:'',
                    admin1zoom:'',
                    admin2lat:'',
                    admin2lng:'',
                    admin2name:'',
                    admin2pcode:'',
                    admin2type:'',
                    admin2type_name:'',
                    admin2zoom:'',
                    admin3lat:'',
                    admin3lng:'',
                    admin3name:'',
                    admin3pcode:'',
                    admin3type:'',
                    admin3type_name:'',
                    admin3zoom:'',
                    admin4lat:'',
                    admin4lng:'',
                    admin4name:'',
                    admin4pcode:'',
                    admin4type_name:'',
                    admin4zoom:'',
                    admin5zoom:'',
                    adminRlat:'',
                    adminRlng:'',
                    adminRname:'',
                    adminRpcode:'',
                    adminRtype_name:'',
                    adminRzoom:'',
                    boys:0,
                    conflict:false,
                    elderly_men:0,
                    elderly_women:0,
                    girls:0,
                    households:0,
                    men:0,
                    population: "site_population",
                    site_boys:0,
                    site_class:'',
                    site_dtm:'',
                    site_elderly_men:0,
                    site_elderly_women:0,
                    site_girls:0,
                    site_households:0,
                    site_id:'',
                    site_lat:'',
                    site_lng:'',
                    site_men:0,
                    site_name:'',
                    site_population:0,
                    site_status:'',
                    site_type_id:'',
                    site_type_name:'',
                    site_women:0,
                    total_beneficiaries:0,
                    women:0
                    
                },
                resetAddForm: function () {
                    var reset_form = {
                        admin0lat: '',
                        admin0lng: '',
                        admin0name: '',
                        admin0pcode: '',
                        admin0type: '',
                        admin0type_name: '',
                        admin0zoom: '',
                        admin1lat: '',
                        admin1lng: '',
                        admin1name: '',
                        admin1pcode: '',
                        admin1type: '',
                        admin1type_name: '',
                        admin1zoom: '',
                        admin2lat: '',
                        admin2lng: '',
                        admin2name: '',
                        admin2pcode: '',
                        admin2type: '',
                        admin2type_name: '',
                        admin2zoom: '',
                        admin3lat: '',
                        admin3lng: '',
                        admin3name: '',
                        admin3pcode: '',
                        admin3type: '',
                        admin3type_name: '',
                        admin3zoom: '',
                        admin4lat: '',
                        admin4lng: '',
                        admin4name: '',
                        admin4pcode: '',
                        admin4type_name: '',
                        admin4zoom: '',
                        admin5zoom: '',
                        adminRlat: '',
                        adminRlng: '',
                        adminRname: '',
                        adminRpcode: '',
                        adminRtype_name: '',
                        adminRzoom: '',
                        boys: 0,
                        conflict: false,
                        elderly_men: 0,
                        elderly_women: 0,
                        girls: 0,
                        households: 0,
                        men: 0,
                        population: "site_population",
                        site_boys: 0,
                        site_class: '',
                        site_dtm: '',
                        site_elderly_men: 0,
                        site_elderly_women: 0,
                        site_girls: 0,
                        site_households: 0,
                        site_id: '',
                        site_lat: '',
                        site_lng: '',
                        site_men: 0,
                        site_name: '',
                        site_population: 0,
                        site_status: '',
                        site_type_id: '',
                        site_type_name: '',
                        site_women: 0,
                        total_beneficiaries: 0,
                        women: 0

                    };
                    $scope.master.addAdminSiteAttribute = reset_form;
                },
                editedAdminSite: {},
                removeAdminSite: {},
                openAddModal: function (modal) {
                    $('#add-admin_site-modal').modal({ dismissible: false });
                    $('#add-admin_site-modal').modal('open');
                },
                admin5Type: ["Union", "Settlement", "Refugee Block"],
                removeAdminSiteModal: function (type) {
                    $scope.master.removeAdminSite = type;
                    $('#remove-admin_site-modal').modal({ dismissible: false });
                    $('#remove-admin_site-modal').modal('open');

                },
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
                            if (name === 'site_type_name'){
                                item['site_class'] = select[0][name]
                            }
                        }
                    }, 10);
                },
                addAdminSite: function () {

                    
                    M.toast({ html: 'Adding New Admin Site ...', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/AdminSites',
                        data: {
                            data: $scope.master.addAdminSiteAttribute
                        }
                    }).success(function (new_admin_site) {
                        
                        if (new_admin_site.err) {
                            M.toast({ html: 'Error! AdminSite  Not Added </br>' + new_admin_site.err, displayLength: 3000, classes: 'error' });
                        }
                        if (!new_admin_site.err) {
                            $scope.master.admin_sites.unshift(new_admin_site);
                            $timeout(function () {
                                $('#add-admin_site-modal').modal('close');
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Successfully Added New Admin Site  ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({
                            html: 'Error! Admin Site  Not Added </br>' + err.err, displayLength: 6000, classes: 'error'
                        });
                    })
                },
                checkValidationAdminSite: function (admin) {
                    
                    valid = false;
                    if (!admin || admin.admin1name === '' || admin.admin1pcode === '' || admin.admin2name === '' || !admin.admin2pcode === '' 
                        || admin.site_class === '' || !admin.site_id === '' || admin.site_status === '' || !admin.site_type_id 
                        || admin.households < 0 
                        ||admin.boys < 0
                        ||admin.girls < 0
                        ||admin.men < 0 
                        ||admin.women < 0
                        ||admin.elderly_men < 0
                        ||admin.elderly_women <0) {
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
                setEditedAdminSite: function (admin) {
                    
                    $scope.master.editedAdminSite = angular.copy(admin);
                    $('#edit-admin_site-modal').modal({ dismissible: false });
                    $('#edit-admin_site-modal').modal('open');
                },
                editAdminSite: function (admin) {

                    M.toast({ html: 'Updating Admin Site....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/AdminSites',
                        data: {
                            data: admin
                        }
                    }).success(function (admin_edited) {
                        
                        if (admin_edited.err) {
                            M.toast({ html: 'Error! Admin Site not updated', displayLength: 4000, classes: 'error' });
                        }
                        if (!admin_edited.err) {
                            var index = $scope.master.admin_sites.map(x => { return x.id }).indexOf(admin_edited.id);
                            $scope.master.admin_sites[index] = admin_edited;
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Admin Site is Updated ', displayLength: 4000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin Site not updated', displayLength: 4000, classes: 'error' });
                    })

                    //after save reset
                    $scope.master.editedAdminSite = {};
                },
                disabledEditButton: function (item) {
                    var role = ngmAuth.userPermissions().reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })['ROLE'];
                    // disable edit if role is COUNTRY;
                    if (role === 'USER') {
                        return true;
                    }
                    return false;
                },
                updateAdminAttribute: function (item, level) {
                    
                    if (level === 'admin0') {
                        item.admin1pcode = '';
                        item.admin2pcode = '';
                        item.admin3pcode = '';
                        item.admin4pcode = '';
                       
                    }
                    if (level === 'admin1') {
                        item.admin2pcode = '';
                        item.admin3pcode = '';
                        item.admin4pcode = '';
                    }
                    if (level === 'admin2') {
                        item.admin3pcode = '';
                        item.admin4pcode = '';

                        selected = $scope.master.admin2lists.filter(x => x.admin2pcode === item.admin2pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.site_id = selected[0].admin2pcode
                            item.site_lat=selected[0].admin2lat
                            item.site_lng=selected[0].admin2lng
                            item.admin1type = selected[0].admin1type_name
                            item.admin2type = selected[0].admin2type_name
                        }
                        
                    }
                    if (level === 'admin3') {
                        item.admin4pcode = '';
                        selected = $scope.master.admin3lists.filter(x => x.admin3pcode === item.admin3pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.site_id = selected[0].admin3pcode
                            item.site_lat = selected[0].admin3lat
                            item.site_lng = selected[0].admin3lng
                            item.admin1type = selected[0].admin1type_name
                            item.admin2type = selected[0].admin2type_name
                            item.admin3type = selected[0].admin3type_name
                            
                        }
                    }
                    if (level === 'admin4') {
                        selected = $scope.master.admin4lists.filter(x => x.admin4pcode === item.admin4pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.site_id = selected[0].admin4pcode
                            item.site_lat = selected[0].admin4lat
                            item.site_lng = selected[0].admin4lng
                            item.admin1type = selected[0].admin1type_name
                            item.admin2type = selected[0].admin2type_name
                            item.admin3type = selected[0].admin3type_name
                            item.admin4type = selected[0].admin4type_name
                        }
                    }
                    if (level === 'admin5') {
                        selected = $scope.master.admin5lists.filter(x => x.admin5pcode === item.admin5pcode)
                        if (selected[0]) {
                            delete selected[0].id
                            delete selected[0].updatedAt
                            delete selected[0].createdAt
                            item = angular.merge(item, selected[0])
                            item.site_id = selected[0].admin4pcode
                            item.site_lat = selected[0].admin4lat
                            item.site_lng = selected[0].admin4lng
                            item.admin1type = selected[0].admin1type_name
                            item.admin2type = selected[0].admin2type_name
                            item.admin3type = selected[0].admin3type_name
                            item.admin4type = selected[0].admin4type_name
                            item.admin5type = selected[0].admin5type_name
                        }
                    }


                    
                },
                updateNumber:function(item,key){

                    if( key === 'boys'){

                        item['site_boys']=item[key];
                    }
                    if( key === 'girls'){

                        item['site_girls']=item[key];
                    }
                    if( key === 'households'){

                        item['site_households']=item[key];
                    }
                    if( key === 'men'){

                        item['site_men']=item[key];
                    }
                    if( key === 'elderly_men'){

                        item['site_elderly_men']=item[key];
                    }
                    if( key === 'elderly_women'){

                        item['site_elderly_women']=item[key];
                    }
                    if( key === 'women'){

                        item['site_women']=item[key];
                    }

                    item['total_beneficiaries'] = item['site_boys']+
                                                    item['site_girls']+
                                                    item['site_households']+
                                                    item['site_men']+
                                                    item['site_elderly_men']+
                                                    item['site_elderly_women']+
                                                    item['site_women'];
                    item['site_population'] = item['total_beneficiaries']

                },
                removedAdminSite: function (id) {
                    M.toast({ html: 'Deleting Admin Site....', displayLength: 2000, classes: 'note' });
                    $http({
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/admin/cluster/adminlist/AdminSites',
                        data: {
                            data: $scope.master.removeAdminSite
                        }
                    }).success(function (org) {
                        if (org.err) {
                            M.toast({ html: 'Error! Admin Site not deleted', displayLength: 4000, classes: 'error' });
                        }
                        if (!org.err) {
                            $timeout(function () {
                                var index = $scope.master.admin_sites.map(x => { return x.id }).indexOf(id);
                                $scope.master.admin_sites.splice(index, 1);
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: 'Succesfully delete Admin Site ', displayLength: 3000, classes: 'success' });
                            }, 1000);

                        }
                    }).error(function (err) {
                        M.toast({ html: 'Error! Admin Site not deleted </br>' + err.err, displayLength: 3000, classes: 'error' });
                    })
                },
                init: function () {
                    
                }
            }

            $scope.master.init();

        }])
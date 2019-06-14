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
	.factory('ngmImoAuth', ['$q', '$route', '$http', '$location', '$timeout', 'ngmUser', 'ngmPermissions', function ($q, $route, $http, $location, $timeout, ngmUser, ngmPermissions) {
		// auth
		var ngmImoAuth = {

			OK: 200,
			UNAUTHORIZED: 401,
			FORBIDDEN: 403,
			LOCATION: $location.protocol() + '://' + $location.host() + ':' + $location.port(),
			APP: $location.path().split('/')[1],

			// guest
			// GUEST: {
			// 	adminRpcode: 'HQ',
			// 	adminRname: 'Global',
			// 	admin0pcode: 'all',
			// 	admin0name: 'All',
			// 	guest: true,
			// 	visits: 1,
			// 	cluster_id: 'all',
			// 	cluster: 'All',
			// 	organization: 'All',
			// 	organization_tag: 'all',
			// 	username: 'welcome',
			// 	email: 'public@immap.org',
			// 	roles: ['USER', 'ADMIN', 'SUPERADMIN', 'PUBLIC']
			// },

			// register
			register: function (user) {

				// set the $http object
				var register = $http({
					method: 'POST',
					url: this.LOCATION + '/api/immap/create',
					data: user
				});

				// register success
				register.success(function (result) {

					if (!result.err && !result.summary) {
						// unset guest
						// ngmUser.unset();
						// set localStorage
						// ngmUser.set(result);
						// manage session
						// ngmImoAuth.setSessionTimeout(result);
					}

				}).error(function (err) {
					// update
					Materialize.toast('Error!', 6000, 'error');
				});

				return register;
			},

			// update user profile
			updateProfile: function (user) {

				// set the $http object
				var update = $http({
					method: 'POST',
					url: this.LOCATION + '/api/profile/update',
					data: user
				});

				// on success store in localStorage
				update.success(function (result) {
					//  success handles in controller.authentication.js
				}).error(function (err) {
					// update
					Materialize.toast('Error!', 6000, 'error');
				});

				return update;

			},

			// login
			login: function (user) {
				console.log(user);
				// set the $http object
				var login = $http({
					method: 'POST',
					url: this.LOCATION + '/api/immap/login',
					data: user
				});

				// on success store in localStorage
				login.success(function (result) {

					if (!result.err && !result.summary) {
						// unset guest
						ngmUser.unset();
						// set localStorage
						ngmUser.set(result);
						// manage session
						ngmImoAuth.setSessionTimeout(result);
					}

				}).error(function (err) {
					// update
					Materialize.toast('Error!', 6000, 'error');
				});

				return login;
			},

			passwordResetSend: function (user) {

				var reset = $http({
					method: 'POST',
					url: this.LOCATION + '/api/send-email',
					data: user
				});

				return reset;
			},

			passwordReset: function (user) {

				// set the $http object
				var reset = $http({
					method: 'POST',
					url: this.LOCATION + '/api/password-reset',
					data: user
				});

				// on success store in localStorage
				reset.success(function (result) {
					if (!result.err && !result.summary) {
						// unset guest
						ngmUser.unset();
						// set user
						ngmUser.set(result);
					}
				}).error(function (err) {
					// update
					Materialize.toast('Error!', 6000, 'error');
				});;

				return reset;
			},

			logout: function () {

				// rotate icon
				// $('.ngm-profile-icon').toggleClass('rotate');
				$('.ngm-profile-icon').toggleClass('open');
				// set class
				$('.ngm-profile').toggleClass('active');
				$('.ngm-profile-menu-content').toggleClass('active');
				// toggle menu dropdown
				$('.ngm-profile-menu-content').slideToggle();

				// unset token, backend dosnt care about logouts 
				ngmUser.unset();
				$location.path('/login');
				// $location.path( '/' + $location.$$path.split('/')[1] + '/login' );

			},

			// Manages client session timeout
			setSessionTimeout: function (user) {

				// tmp fix
				if (!user || !user.last_logged_in) {
					// unset localStorage
					ngmUser.unset();
				} else {
					// get minutes since last login
					var minutes =
						moment.duration(moment().diff(user.last_logged_in)).asMinutes();

					// ( 24 * 60 ) = 1440 minutes
					if (minutes > (24 * 60)) {

						// unset localStorage
						ngmUser.unset();

						// redirect to login
						$location.path('/' + ngmImoAuth.APP + '/login');

					}
				}

			},

			// setup a public user
			grantPublicAccess: function (role) {

				var deferred = $q.defer();

				// if no user exists
				if (!ngmUser.get()) {
					// set guest to localStorage
					ngmUser.set(ngmAuth.GUEST);
				}

				// resolve ok
				deferred.resolve(ngmAuth.OK);

				return deferred.promise;
			},

			// has role
			hasRole: function (role) {

				var deferred = $q.defer();

				if (ngmUser.hasRole(role)) {
					deferred.resolve(ngmAuth.OK);
				} else if (ngmUser.get().guest) {
					deferred.reject(ngmAuth.UNAUTHORIZED);
				} else {
					deferred.reject(ngmAuth.FORBIDDEN);
				}

				return deferred.promise;
			},

			// has any role
			hasAnyRole: function (roles) {

				var deferred = $q.defer();

				if (ngmUser.hasAnyRole(roles)) {
					deferred.resolve(ngmAuth.OK);
				} else if (ngmUser.get().guest) {
					deferred.reject(ngmAuth.UNAUTHORIZED);
				} else {
					deferred.reject(ngmAuth.FORBIDDEN);
				}

				return deferred.promise;
			},

			// anonymous
			isAnonymous: function () {

				var deferred = $q.defer();

				if (!ngmUser.get() || ngmUser.get().guest) {
					deferred.resolve(ngmImoAuth.OK);
				} else {
					deferred.reject(ngmImoAuth.FORBIDDEN);
				}

				return deferred.promise;
			},

			// authenticated
			isAuthenticated: function () {

				var deferred = $q.defer();

				if (ngmUser.get() && !ngmUser.get().guest) {
					deferred.resolve(ngmAuth.OK);
				} else {
					deferred.reject(ngmAuth.UNAUTHORIZED);
				}

				return deferred.promise;
			},

			/**
			 * @param {string} role - the User Role
			 * Returns user permissions definitions array of objs
			 * @returns {UserPermissions[]} - User permissions definitions array
			 */
			getUserRoleDescriptions: function (role) {
				return ngmPermissions.filter(function (x) { return x.ROLE === role })[0].DESCRIPTION;
			},

			/**
			 * Returns user permissions definitions array of objs
			 * @returns {UserPermissions[]} - User permissions definitions array
			 */
			userPermissions: function () {
				const user = ngmUser.get();
				return ngmPermissions.filter(function (x) { return user.roles.includes(x.ROLE) })
			},

			/**
			 * Checks if user can edit in input view zones.
			 * @param {string} permission - Permission to check, accepts one of values: 'EDIT', 'EDIT_USER', defined as props on ngmPermissions.
			 * @param {Object} zones - Object containing zones and their values.
			 * @param {string} zones.adminRpcode - adminRpcode.
			 * @param {string} zones.admin0pcode - admin0pcode.
			 * @param {string} zones.cluster_id - cluster_id. 
			 * @param {string} zones.organization_tag - organization_tag. 
			 * @returns {boolean} User can/cannot edit for input view zones.
			 */
			canDo: function (permission, zones) {

				// check params
				if (!permission || !zones || typeof zones !== 'object' || typeof permission !== 'string') return false

				// get user obj
				const user = ngmUser.get();

				const USER_PERMISSIONS = ngmAuth.userPermissions();

				// _RESTRICTED prop on permissions conf with user restricted zones
				const permission_restricted = permission + '_RESTRICTED';

				// validation logic 

				// roll over user roles definitions, use for...of in future				
				for (const role of USER_PERMISSIONS) {
					// if permission active
					if (role[permission]) {
						allowed = true;
						// roll over role restricted zones
						for (const z of role[permission_restricted]) {
							// if not own zone
							if (!z || !user[z] || !zones[z] || (user[z] !== zones[z])) {
								// disallow access
								allowed = false;
							}
						}
						// fast return on match
						if (allowed) return allowed
					}
				}

				// otherwise if no match, no edit rights
				return false;
			},

			/**
			 * Returns array of user route restiction params
			 * @param {string} dashboard - name of dashboard defined as props on ngmPermissions.
			 * @returns {string[]} zones array e.g. ['admin0pcode', 'organization_tag']
			 */
			getRouteParams: function (dashboard) {
				// permissions filter prop
				const dashboard_filter = dashboard + '_RESTRICTED'
				const USER_PERMISSIONS = ngmAuth.userPermissions();
				// for menu get role with highest priority if user has multiple roles 
				return USER_PERMISSIONS.reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })[dashboard_filter]
			},

			/**
			 * Returns array of user menu params
			 * @param {string} dashboard - name of dashboard defined as props on ngmPermissions.
			 * @returns {string[]} zones array e.g. ['cluster_id']
			 */
			getMenuParams: function (dashboard) {
				// permissions filter prop
				const dashboard_filter = dashboard + '_MENU'
				const USER_PERMISSIONS = ngmAuth.userPermissions();
				// for menu get role with highest priority if user has multiple roles 
				return USER_PERMISSIONS.reduce(function (max, v) { return v.LEVEL > max.LEVEL ? v : max })[dashboard_filter]
			},

			/**
			 * Returns array of user's allowed roles to edit on users
			 * @returns {string[]} Roles array e.g. [ 'USER', 'ORG' ]
			 */
			getEditableRoles: function () {
				// filter permissions if EDIT_USER allowed
				const USER_PERMISSIONS = ngmAuth.userPermissions().filter(role => role['EDIT_USER'] && role['EDIT_USER_ROLES']);
				if (!USER_PERMISSIONS.length) return [];
				// get users allowed roles to edit highest priority if user has multiple roles 
				return USER_PERMISSIONS.reduce(function (max, role) { return role.LEVEL > max.LEVEL ? role : max })['EDIT_USER_ROLES']
			},

			/**
			 * @deprecated Wrapper for canEdit, pass zones as function params.
			 */
			canEditPlain: function (permission, adminRpcode, admin0pcode, cluster_id, organization_tag) {
				const zones = {
					organization_tag,
					cluster_id,
					admin0pcode,
					adminRpcode
				}
				return this.canDo(permission, zones)
			},
		};

		return ngmImoAuth;

	}])
	.factory('ngmAuthInterceptor', ['$q', '$injector', function ($q, $injector) {

		// get user
		var ngmUser = $injector.get('ngmUser');

		return {
			request: function (config) {

				var token;

				// cover external APIs
				if (ngmUser.get() && !config.externalApi) {
					token = ngmUser.get().token;
				}
				if (token) {
					config.headers.Authorization = 'Bearer ' + token;
				}

				return config;
			}
		};

	}])
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('ngmAuthInterceptor');
	});

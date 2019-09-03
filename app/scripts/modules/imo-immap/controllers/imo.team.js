/**
 * @ngdoc function
 * @name ngmReportHubApp.IMOProfileCtrl
 * @description
 * # ImmapTeamCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoTeamCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmImoAuth', 'ngmData', 'ngmUser', '$translate', '$filter', function ($scope, $location, $route, ngmAuth, ngmImoAuth, ngmData, ngmUser, $translate, $filter) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		// report object
		$scope.dashboard = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),
			username: $route.current.params.username,
			MD5: function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() },
			profileHref:'/immap/reporting/profile',
			// dummy
			getRequest: function (obj) {
				var request = {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/cluster/indicator',
					data: {
						adminRpcode: 'hq',
						admin0pcode: 'all',
						admin1pcode: 'all',
						admin2pcode: 'all',
						cluster_id: 'all',
						activity_type_id: 'all',
						organization_tag: 'all',
						beneficiaries: ['all'],
						start_date: moment('2018').format('YYYY-MM-DD'),
						end_date: moment().format('YYYY-MM-DD')
					}
				}

				request.data = angular.merge(request.data, obj);

				return request;
			},
			getRequestT: function (indicator,status) {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/getOrganizationIndicator',
					data: {
						indicator: indicator,
						status: status,
						admin0pcode: 'all',
						organization_tag: 'all',
						project: 'all',
						cluster_id: 'all'
					}
				}
			},
			getTeamRequest:function(indicator){
				console.log(indicator)
				return{
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/immap/getTeamReporting',
					data:{
						indicator:indicator
					}
				}
			},
			// init()
			init: function (user) {
				user.emailHash = $scope.dashboard.MD5(user.email.trim().toLowerCase());
				// report dashboard model
				$scope.model = {
					name: 'immap_home',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
							title: 'iMMAP | ' + user.admin0name + ' | My Team'
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
							style: 'font-size:20px',
							title: 'Check Your Teammate'
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12 m6',
							widgets: [{
								type: 'html',
								config: {
									user: user,
									style: $scope.dashboard.ngm.style,
									profileHref: '#/immap/reporting/profile',
									templateUrl: '/scripts/modules/imo-immap/views/imo.profile-card.html'
								}
							}]
						}, {
							styleClass: 's12 m6',
							widgets: [{
								type: 'stats',
								style: 'text-align:center; height:235px; padding-top:90px;',
								card: 'card-panel stats-card white grey-text text-darken-2',
								config: {
									title: 'Active Teammate',
									request: $scope.dashboard.getTeamRequest('total_active')//$scope.dashboard.getRequestT('total', 'active')
								}
							}]
						}]
					}, {
							columns: [{
								styleClass: 's12',
								widgets: [{
									type: 'table',
									card: 'panel',
									style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
									config: {
										style: $scope.dashboard.ngm.style,
										headerClass: 'collection-header lighten-2',
										headerStyle: 'background-color:' + $scope.dashboard.ngm.style.defaultPrimaryColor,
										headerText: 'white-text',
										headerIcon: 'group',
										headerTitle: $filter('translate')('active_users'),
										templateUrl: '/scripts/modules/imo-immap/views/imo.team.html',
										tableOptions: {
											count: 10,
											sorting: { updatedAt: "desc" }
										},
										request: $scope.dashboard.getTeamRequest('active'),//$scope.dashboard.getRequestT('list', 'active'),
										onClick: function (user) {
											// go to profile
											$location.path($scope.dashboard.profileHref + '/' + user.username);
										},
										editableRole: ngmImoAuth.getEditableRoles(),
										manageUser: function (role, row) {
											$scope.dashboard.manageUserAccess(role, row);
										},
										saveEditAccess: function (user) {
											$scope.dashboard.saveAccess(user);
										},
										openModal: function (modal) {
											$scope.dashboard.openModal(modal);
										},
										getUserRoleDescriptions: function (role) {
											return ngmImoAuth.getUserRoleDescriptions(role);
										},
										formDisabled: (function () {
											var disabled = true;
											if ($scope.dashboard.user.status === 'active' && ngmImoAuth.canDo('EDIT_USER',{})) {
												disabled = false;
											}
											return disabled;
										})(),
										btnDisabled: (function () {
											if (!$scope.dashboard.btnManageAccessDisabled) {
												return false
											}
											return true;
										})
									}
								}]
							}]
						}, {
							columns: [{
								styleClass: 's12',
								widgets: [{
									type: 'table',
									card: 'panel',
									style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
									config: {
										style: $scope.dashboard.ngm.style,
										headerClass: 'collection-header lighten-2',
										headerStyle: 'background-color: grey',
										headerText: 'white-text',
										headerIcon: 'group',
										headerTitle: $filter('translate')('desactivated_users'),
										templateUrl: '/scripts/modules/imo-immap/views/imo.team.html',
										tableOptions: {
											count: 10,
											sorting: { updatedAt: "desc" }
										},
										request: $scope.dashboard.getTeamRequest('deactivate'),//$scope.dashboard.getRequestT('list', 'deactivated'),
										onClick: function (user) {
											// go to profile
											$location.path($scope.dashboard.profileHref + '/' + user.username);
										},
										editableRole: ngmImoAuth.getEditableRoles(),
										manageUser: function (role, row) {
											$scope.dashboard.manageUserAccess(role, row);
										},
										saveEditAccess: function (user) {
											$scope.dashboard.saveAccess(user);
										},
										openModal: function (modal) {
											$scope.dashboard.openModal(modal);
										},
										getUserRoleDescriptions: function (role) {
											return ngmImoAuth.getUserRoleDescriptions(role);
										},
										formDisabled: (function () {
											var disabled = true;
											if ($scope.dashboard.user.status === 'active' && ngmImoAuth.canDo('EDIT_USER', {})) {
												disabled = false;
											}
											return disabled;
										})(),
										btnDisabled: (function () {
											if (!$scope.dashboard.btnManageAccessDisabled) {
												return false
											}
											return true;
										})
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
									html: $scope.dashboard.ngm.footer
								}
							}]
						}]
					}]
				}

				// assign to ngm app scope
				$scope.dashboard.ngm.dashboard.model = $scope.model;
			},
			openModal: function (modal) {
				$('#' + modal).openModal({ dismissible: false });
			},
			//manage user access
			manageUserAccess: function (id,user) {
				if (document.getElementById(id).checked) {
					var values = document.getElementById(id).value;
					if (user.roles.indexOf(values) === -1) {
						user.roles.push(values);
					}
				} else {
					var values = document.getElementById(id).value;
					if (user.roles.indexOf(values) > -1) {
						var index = user.roles.indexOf(values);
						user.roles.splice(index, 1);
					}
				}
			},
			saveAccess:function(user){
				//set button to disable 
				$scope.dashboard.btnManageAccessDisabled= true;
				// toast to wait
				Materialize.toast('Plesase! wait a moment...', 10000, 'note');
				//save update
				ngmImoAuth
					.updateProfile({ user: user }).success(function (result) {
						// db error!
						if (result.err || result.summary) {
							var msg = result.msg ? result.msg : 'error!';
							Materialize.toast(msg, 6000, msg);
						}
						// success
						if (result.success) {							
							Materialize.toast('Success! Role updated!', 3000, 'success');
							$scope.dashboard.btnManageAccessDisabled=false;
						}
					});
			},

		}
		// set page
		if ($scope.dashboard.username &&
			($scope.dashboard.username !== $scope.dashboard.user.username)) {

			// get use
			ngmData
				.get({ method: 'GET', url: ngmAuth.LOCATION + '/api/immap/getUserByUsername?username=' + $scope.dashboard.username })
				.then(function (user) {
					// load with user profile
					$scope.dashboard.init(user);
				});

		} else {
			// load with current user profile
			$scope.dashboard.init($scope.dashboard.user);

		}
		// $scope.dashboard.init();

	}]);
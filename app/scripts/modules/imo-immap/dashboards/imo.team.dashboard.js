/**
 * @ngdoc function
 * @name ngmReportHubApp.ImoTeamDashboardCtrl
 * @description
 * # DashboardEthAssessmentsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ImoTeamDashboardCtrl', ['$scope', '$location', '$route', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$sce', 'dashboardImoStatHelper', function ($scope, $location, $route, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter, $sce, dashboardImoStatHelper) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// report object
		$scope.report = {

			// ngm
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),

			// url admin
			admin0pcode: $route.current.params.admin0pcode,

			// url admin
			project: $route.current.params.project,

			// url email
			email: $route.current.params.email,

			// url sector type
			product_sector_id: $route.current.params.product_sector_id,

			// url product type
			product_type_id: $route.current.params.product_type_id,

			// report start
			start_date: moment($route.current.params.start_date).format('YYYY-MM-DD'),

			// report end
			end_date: moment($route.current.params.end_date).format('YYYY-MM-DD'),

			// downlaod filename
			report_filename: 'iMMAP_products_list_',
			// sector
			sector:$route.current.params.sector,
			// area
			area:$route.current.params.area,
			// type:
			type:$route.current.params.type,
			// user
			person_user:$route.current.params.person_user,
			// partner
			partner:$route.current.params.partner,

			// set path based on user
			getPath: function () {

				// if USER
				if ($scope.report.user.roles.indexOf('ORG') === -1 ||
					$scope.report.user.roles.indexOf('ADMIN') === -1) {

					// set report variables to USER
					$scope.report.email = $scope.report.user.email;

				}

				// go with URL
				// var path = '/immap/reporting/dashboard-team/' + $scope.report.admin0pcode +
				// 	'/' + $scope.report.project +
				// 	'/' + $scope.report.product_sector_id +
				// 	'/' + $scope.report.product_type_id +
				// 	'/' + $scope.report.email +
				// 	'/' + $scope.report.start_date +
				// 	'/' + $scope.report.end_date;
				var path = '/immap/reporting/dashboard-team/' + $scope.report.sector +
					'/' + $scope.report.area +
					'/' + $scope.report.type +
					'/' + $scope.report.partner +
					'/' + $scope.report.person_user +
					'/' + $scope.report.email +
					'/' + $scope.report.start_date +
					'/' + $scope.report.end_date;
					
					console.log(path);
					var param={
						sector: $scope.report.sector,
						area: $scope.report.area,
						partner: $scope.report.partner,
						person_user: $scope.report.person_user,
						email: $scope.report.email,
						start_date: $scope.report.start_date,
						end_date: $scope.report.end_date,
						type: $scope.report.type
					};
				if ($route.current.params.sub_area) {
					path = path + '/' + $route.current.params.sub_area;
					param.sub_area =$route.current.params.sub_area;
				}
					dashboardImoStatHelper.setParam(param);
				// return path
				return path;

			},

			// set
			setPath: function (path) {
				// if current location is not equal to path
				if (path !== $location.$$path) {
					console.log(path);
					$location.path(path);
				}

			},

			// request
			// getRequest: function (indicator) {
			// 	return {
			// 		method: 'POST',
			// 		url: ngmAuth.LOCATION + '/api/immap/products/indicator',
			// 		data: {
			// 			indicator: indicator,
			// 			admin0pcode: $scope.report.admin0pcode,
			// 			project: $scope.report.project,
			// 			email: $scope.report.email,
			// 			product_sector_id: $scope.report.product_sector_id,
			// 			product_type_id: $scope.report.product_type_id,
			// 			start_date: $scope.report.start_date,
			// 			end_date: $scope.report.end_date,
			// 			// for filename downloads
			// 			report: $scope.report.report_filename
			// 		}
			// 	}
			// },
			getRequestDummy:function(indicator){
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/immap/report/getProductDummyIndicator',
					data: {
						indicator: indicator,
					}
				}
			},
			// metrics
			getMetrics: function (theme, format) {
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/metrics/set',
					data: {
						organization: $scope.report.user.organization,
						username: $scope.report.user.username,
						email: $scope.report.user.email,
						dashboard: 'immap_products',
						theme: theme,
						format: format,
						url: $location.$$path
					}
				}
			},

			// set menu based on URL
			setMenu: function () {

				// menu
				var menu_items = []

				// // if USER
				// if ($scope.report.user.roles.indexOf('ORG') === -1 ||
				// 	$scope.report.user.roles.indexOf('ADMIN') === -1) {
				// 	menu_items = ['admin0pcode', 'project', 'product_sector_id', 'product_type_id'];
				// } else {
				// 	menu_items = ['admin0pcode', 'project', 'product_sector_id', 'product_type_id', 'email'];
				// }
				menu_items = ['product_sector_id','area', 'product_type_id','partner','user'];
				// ngmData
				// ngmData
				// 	.get(angular.merge($scope.report.getRequestDummy('menu_items'),
				// 		{ data: { menu_items: menu_items }, url: ngmAuth.LOCATION + '/api/immap/report/getDummyMenu' }))
				// 	.then(function (menu) {
				// 		// set menu
				// 		// $scope.report.ngm.dashboard.model.menu = menu;
				// 	});
				console.log($scope.report.ngm.dashboard.model.menu);
				// $scope.report.ngm.dashboard.model.menu =
				type = [{ product_id: 'static_infoghraphic', product_name:'Static infographic'},
					{ product_id: 'dynamic_infoghraphic', product_name: 'Dynamic infographic' },
					{ product_id: 'training', product_name: 'Training' },
					{ product_id: 'map', product_name: 'Map' },
					{ product_id: 'printed_product', product_name: 'Printed Product' },
					{ product_id: 'Meeting', product_name: 'Meeting' }]
				area=[{area_id:'information_management_coordination_support',area_name:'Information Management and Coordination Support',subarea_id:'sub_a',subarea_name:'Sub A'},
							{area_id:'information_management_coordination_support',area_name:'Information Management and Coordination Support',subarea_id:'sub_b',subarea_name:'Sub B'},
							{area_id:'drr',area_name:'DRR',subarea_id:'sub_c',subarea_name:'Sub C'},
							{area_id:'drr',area_name:'DRR',subarea_id:'sub_d',subarea_name:'Sub D'}]
				$scope.report.ngm.dashboard.model.menu.push(dashboardImoStatHelper.getSectorMenu('#/immap/reporting/dashboard-team'));
				$scope.report.ngm.dashboard.model.menu.push(dashboardImoStatHelper.getAreaMenu('#/immap/reporting/dashboard-team',area));
				var subArea = dashboardImoStatHelper.getSubAreaMenu('#/immap/reporting/dashboard-team', area);
				console.log("ADA SUB",subArea.rows.length)
				if (subArea.rows.length>0 && $scope.report.area !=='all'){
					$scope.report.ngm.dashboard.model.menu.push(subArea);
				};
				$scope.report.ngm.dashboard.model.menu.push(dashboardImoStatHelper.getTypeMenu('#/immap/reporting/dashboard-team',type));
				$scope.report.ngm.dashboard.model.menu.push(dashboardImoStatHelper.getPartnerMenu('#/immap/reporting/dashboard-team'));
				$scope.report.ngm.dashboard.model.menu.push(dashboardImoStatHelper.getUserMenu('#/immap/reporting/dashboard-team'));
				
			},

			// format subtitle
			getSubTitle: function () {
				// all params
				// var subtitle = 
				// 	$scope.report.project.toUpperCase() + ' | ' +
				// 	$scope.report.email.toUpperCase() + ' | ' +
				// 	$scope.report.product_sector_id.toUpperCase() + ' | ' +
				// 	$scope.report.product_type_id.toUpperCase() + ' type(s)'; //+
				// '- hit <span style="font-weight:400;">REFRESH LIST</span> to fetch the latest submissions!'
				// var subtitle =
				// 	$scope.report.sector.toUpperCase() + ' | ' +
				// 	$scope.report.area.toUpperCase() + ' | ' +
				// 	$scope.report.partner.toUpperCase() + ' | ' +
				// 	$scope.report.type.toUpperCase() + ' type(s)';
				var subtitle= 'This is for';
				if ($scope.report.sector !== 'all'){
					subtitle = 'Sector '+ $scope.report.sector;
				}else{
					subtitle = 'All Sector';
				}
				if ($scope.report.area !== 'all'){
					subtitle += ', Area '+ $scope.report.area;
				}else{
					subtitle += ', All Area';
				}
				if ($scope.report.partner !== 'all'){
					subtitle += ', Partner ' + $scope.report.partner;
				}else{
					subtitle += ', All Partner'
				}
				if ($scope.report.type !== 'all'){
					subtitle += ', ' + $scope.report.type + ' type(s)';
				}else {
					subtitle +=', All type(s)'
				}
				return subtitle;

			},

			// get rows based on USER
			getRows: function () {

				// controls
				var rows = [{
					columns: [{
						styleClass: 's12 m12 l12',
						widgets: [{
							type: 'html',
							card: 'white grey-text text-darken-2',
							style: 'padding-top: 20px;padding-bottom: 46px;',
							config: {

								// fetch immap products
								fetchData: function () {

									// disabled btn
									$('#dashboard-fetch-btn').toggleClass('disabled');

									// toast
									$timeout(function () { Materialize.toast('Refreshing data...', 6000, 'note'); }, 400);

									// ngmData
									ngmData
										.get({ method: 'GET', url: ngmAuth.LOCATION + '/api/immap/products/getProductsData' })
										.then(function (result) {
											// toast
											$timeout(function () {
												Materialize.toast('iMMAP Products Updated!', 6000, 'success');
												$('#dashboard-fetch-btn').toggleClass('disabled');
												$timeout(function () {
													$route.reload();
												}, 400);
											}, 600);
										});
								},
								getPreviousMonth: function () {
									// get dates
									var start_date = moment(new Date($scope.report.start_date)).utc().subtract(1, 'M').startOf('M').format('YYYY-MM-DD');
									var end_date = moment(new Date($scope.report.end_date)).utc().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');
									// set dates
									$scope.report.start_date = start_date;
									$scope.report.end_date = end_date;
									$scope.report.setPath($scope.report.getPath());
								},
								getCurrentMonth: function () {
									// get dates
									var start_date = moment().utc().startOf('M').format('YYYY-MM-DD');
									var end_date = moment().utc().endOf('M').format('YYYY-MM-DD');
									// set dates
									$scope.report.start_date = start_date;
									$scope.report.end_date = end_date;
									$scope.report.setPath($scope.report.getPath());
								},
								request: { method: 'GET', url: ngmAuth.LOCATION + '/api/immap/products/latestUpdate' },
								templateUrl: '/scripts/widgets/ngm-html/template/imo/imo.product.control.html'
							}
						}]
					}]
				}];

				// user heatmap
				var heatmap = {
					columns: [{
						styleClass: 's12',
						widgets: [{
							type: 'calHeatmap',
							card: 'card-panel',
							style: 'padding-top:5px;',
							config: {
								title: {
									style: 'padding-top: 0px;',
									name: $filter('translate')('product_submissions')
								},
								options: { itemName: 'Product', start: new Date($scope.report.start_date) },
								// request: $scope.report.getRequest('calendar')
							}
						}]
					}]
				};

				// admin widgets
				var adminWidgets = [{
					columns: [{
						styleClass: 's12 m3',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('total_products'),
								request: $scope.report.getRequestDummy('products')
							}
						}]
					}, {
						styleClass: 's12 m3',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: 'Total Partner',//$filter('translate')('total_sectors'),
								request: $scope.report.getRequestDummy('sectors')
							}
						}]
					}, {
						styleClass: 's12 m6',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('team_contributors'),
								request: $scope.report.getRequestDummy('contributors')
							}
						}]
					}]
				}, {
					columns: [{
						styleClass: 's12 m3',
						widgets: [{
							type: 'highchart',
							style: 'height: 190px;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: {
									text: $filter('translate')('by_type'),
								},
								chartConfig: {
									options: {
										chart: {
											type: 'pie',
											height: 150,
											spacing: [0, 0, 20, 0]
										},
										tooltip: {
											pointFormat: '<b>{point.y:,.0f} {series.name}</b>'
										},
										legend: {
											enabled: false
										}
									},
									title: {
										text: null
									},
									yAxis: {
										title: {
											text: null
										}
									},
									plotOptions: {
										pie: {
											shadow: false
										}
									},
									tooltip: {
										formatter: function () {
											return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
										}
									},
									series: [{
										name: 'Product(s)',
										data: [],
										request: $scope.report.getRequestDummy('type_chart'),
										size: '120%',
										innerSize: '60%',
										showInLegend: true,
										dataLabels: {
											enabled: false
										}
									}]
								}
							}
						}]
					}, {
						styleClass: 's12 m3',
						widgets: [{
							type: 'highchart',
							style: 'height: 190px;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: {
									text: 'by Area'//$filter('translate')('by_sector')
								},
								chartConfig: {
									options: {
										chart: {
											type: 'pie',
											height: 150,
											spacing: [0, 0, 20, 0]
										},
										tooltip: {
											pointFormat: '<b>{point.y:,.0f} {series.name}</b>'
										},
										legend: {
											enabled: false
										}
									},
									title: {
										text: null
									},
									yAxis: {
										title: {
											text: null
										}
									},
									plotOptions: {
										pie: {
											shadow: false
										}
									},
									tooltip: {
										formatter: function () {
											return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
										}
									},
									series: [{
										name: 'Product(s)',
										data: [],
										request: $scope.report.getRequestDummy('sector_chart'),
										size: '120%',
										innerSize: '60%',
										showInLegend: true,
										dataLabels: {
											enabled: false
										}
									}]
								}
							}
						}]
					}, {
						styleClass: 's12 m6',
						widgets: [{
							type: 'calHeatmap',
							card: 'card-panel',
							style: 'padding-top:5px;',
							config: {
								title: {
									style: 'padding-top: 0px;',
									name: $filter('translate')('product_submissions')
								},
								options: { itemName: $filter('translate')('products_mayus1'), start: new Date($scope.report.start_date) },
								// request: $scope.report.getRequest('calendar')
							}
						}]
					}]
					}];
				var barchart = [{
					columns: [{
						styleClass: 's12 m12 l12',
						widgets: [{
							type: 'highchart',
							style: 'height: 310px;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: {
									text: 'Partners, Type'
								},
								chartConfig: {
									options: {
										chart: {
											type: 'bar',
											height: 260,
										},
										tooltip: {
											pointFormat: '<b>{point.y:,.0f}</b>'
										},
										// legend: {
										// 	enabled: false
										// }
										legend: {
											layout: 'vertical',
											align: 'right',
											verticalAlign: 'top',
											x: -40,
											y: 0,
											floating: true,
											borderWidth: 1,
											backgroundColor: '#FFFFFF',
											shadow: true
										}
									},
									title: {
										text: ''
									},
									xAxis: {
										categories: [
											'Parner A',
											'Parner AB',
											'Parner AC',
											'Parner AD',
											'Parner AE',
											'Parner AF',
											'Parner AG',
											'Parner AH',
											'Parner AI',
											'Parner AJ',
											'Parner AK'
										],
										labels: {
											rotation: 0,
											style: {
												fontSize: '12px',
												fontFamily: 'Roboto, sans-serif'
											}
										}
									},
									yAxis: {
										min: 0,
										title: {
											text: 'Products'
										}
									},
									// series: [{
									// 	name: 'Product',
									// 	color: '#7cb5ec',
									// 	data: [
									// 		10,
									// 		19,
									// 		11,
									// 		12,
									// 		15,
									// 		21,
									// 		5,
									// 		25,
									// 		40,
									// 		31,
									// 		8
									// 	]
									// }]
									series:[
										{
											name:'Map',
											color: '#7cb5ec',
											data: [10,19,11,12,15,21,5,25,40,31,8]
										},
										{
											name: 'Dashboard',
											color: '#be2126',
											data: [5, 10, 4, 6, 7, 10, 2, 12, 20, 15, 4]
										}
									]
								}
							}
						}]
					}]
				}, {
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'highchart',
								style: 'height: 310px;',
								card: 'card-panel stats-card white grey-text text-darken-2',
								config: {
									title: {
										text: 'User, Type'
									},
									chartConfig: {
										options: {
											chart: {
												type: 'bar',
												height: 260,
											},
											tooltip: {
												pointFormat: '<b>{point.y:,.0f}</b>'
											},
											// legend: {
											// 	enabled: false
											// }
											legend: {
												layout: 'vertical',
												align: 'right',
												verticalAlign: 'top',
												x: -40,
												y: 0,
												floating: true,
												borderWidth: 1,
												backgroundColor: '#FFFFFF',
												shadow: true
											}
										},
										title: {
											text: ''
										},
										xAxis: {
											categories: [
												'User A',
												'User AB',
												'User AC',
												'User AD',
												'User AE',
												'User AF',
												'User AG',
												'User AH',
												'User AI',
												'User AJ',
												'User AK'
											],
											labels: {
												rotation: 0,
												style: {
													fontSize: '12px',
													fontFamily: 'Roboto, sans-serif'
												}
											}
										},
										yAxis: {
											min: 0,
											title: {
												text: 'Products'
											}
										},
										// series: [{
										// 	name: 'Product',
										// 	color: '#7cb5ec',
										// 	data: [
										// 		10,
										// 		19,
										// 		11,
										// 		12,
										// 		15,
										// 		21,
										// 		5,
										// 		25,
										// 		40,
										// 		31,
										// 		8
										// 	]
										// }]
										series: [
											{
												name: 'Map',
												color: '#7cb5ec',
												data: [10, 19, 11, 12, 15, 21, 5, 25, 40, 31, 8]
											},
											{
												name: 'Dashboard',
												color: '#be2126',
												data: [5, 10, 4, 6, 7, 10, 2, 12, 20, 15, 4]
											}
										]
									}
								}
							}]
						}]
					}];
				// default widgets
				var defaultWidgets = [{
					columns: [{
						styleClass: 's12',
						widgets: [{
							type: 'table',
							card: 'panel',
							style: 'padding:0px; height: ' + $scope.report.ngm.style.height + 'px;',
							config: {
								style: $scope.report.ngm.style,
								headerClass: 'collection-header lighten-2',
								headerStyle: 'background-color:' + $scope.report.ngm.style.defaultPrimaryColor,
								headerText: 'white-text',
								headerIcon: 'insert_drive_file',
								headerTitle: 'Report',
								templateUrl: '/scripts/widgets/ngm-table/templates/imo/imo.report.html',								
								tableOptions: {
									count: 4
								},
								request: $scope.report.getRequestDummy('lists')
							}
						}]
					}]
				},{
					columns: [{
						styleClass: 's12',
						widgets: [{
							type: 'table',
							card: 'panel',
							style: 'padding:0px; height: ' + $scope.report.ngm.style.height + 'px;',
							config: {
								style: $scope.report.ngm.style,
								headerClass: 'collection-header lighten-2',
								headerStyle: 'background-color:' + $scope.report.ngm.style.defaultPrimaryColor,
								headerText: 'white-text',
								headerIcon: 'crop_original',
								headerTitle: $filter('translate')('products_list'),
								templateUrl: '/scripts/widgets/ngm-table/templates/imo/imo.products.html',
								openModal: function (modal, link) {
									$('#' + modal).openModal({ dismissible: false });
									if (link !== '') {
										if (modal === 'close-preview-modal') {
											$scope.linkPreview = link;
										} else {
											// if its from google drive; link in here is id of google drive  file
											$scope.linkPreview = "https://drive.google.com/file/d/" + link + "/preview"
										}
									}
								},
								setLink: function () {
									return $sce.trustAsResourceUrl($scope.linkPreview);
								},
								tableOptions: {
									count: 4
								},
								request: $scope.report.getRequestDummy('lists')
							}
						}]
					}]
				}, {
					columns: [{
						styleClass: 's12 m12 l12',
						widgets: [{
							type: 'html',
							card: 'white grey-text text-darken-2',
							style: 'padding-top: 20px;padding-bottom: 46px;',
							config: {
								style: $scope.report.ngm.style,
								request: $scope.report.getRequestDummy('lists'),
								templateUrl: '/scripts/widgets/ngm-html/template/imo/imo.product.list.html'
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
								html: $scope.report.ngm.footer
							}
						}]
					}]
				}];

				// if USER
				// if ($scope.report.user.roles.indexOf('ORG') === -1 ||
				// 	$scope.report.user.roles.indexOf('ADMIN') === -1) {
				// 	// calendar heatmap
				// 	rows.push(heatmap);
					
				// } else {
				// 	// push admin widgets
				// 	rows.push(adminWidgets[0], adminWidgets[1]);

				// }
				rows.push(adminWidgets[0], adminWidgets[1]);
				// push default widgets
				rows.push(barchart[0],barchart[1]);
				rows.push(defaultWidgets[0], defaultWidgets[1], defaultWidgets[2]);


				// return rows
				return rows;

			},

			// init()
			init: function () {

				// update filename
				$scope.report.report_filename += $scope.report.start_date + '-to-' + $scope.report.end_date + '-extracted-' + moment().format('YYYY-MM-DDTHHmm')

				// report dashboard model
				$scope.model = {
					name: 'immap_products',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m8 l8 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.report.ngm.style.defaultPrimaryColor,
							title: 'iMMAP |' + $filter('translate')('products_mayus1')
						},
						subtitle: {
							'class': 'col hide-on-small-only m8 l9 report-subtitle truncate',
							title: $scope.report.getSubTitle()
						},
						datePicker: {
							'class': 'col s12 m4 l3',
							dates: [{
								style: 'float:left;',
								label: $filter('translate')('from'),
								format: 'd mmm, yyyy',
								min: '2017-01-01',
								max: $scope.report.end_date,
								currentTime: $scope.report.start_date,
								onClose: function () {
									// set date
									var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
									if (date !== $scope.report.start_date) {
										// set new date
										$scope.report.start_date = date;
										$scope.report.setPath($scope.report.getPath());
									}
								}
							}, {
								style: 'float:right',
								label: $filter('translate')('to'),
								format: 'd mmm, yyyy',
								min: $scope.report.start_date,
								currentTime: $scope.report.end_date,
								onClose: function () {
									// set date
									var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
									if (date !== $scope.report.end_date) {
										// set new date
										$scope.report.end_date = date;
										$scope.report.setPath($scope.report.getPath());
									}
								}
							}]
						},
						download: {
							'class': 'col s12 m4 l4 hide-on-small-only',
							downloads: [{
								type: 'csv',
								color: 'blue lighten-2',
								icon: 'assignment_turned_in',
								hover: $filter('translate')('download_products_list_as_csv'),
								// request: $scope.report.getRequest('csv'),
								metrics: $scope.report.getMetrics('immap_products_list', 'csv')
							}]
						}
					},
					menu: [],
					rows: $scope.report.getRows()
				}

				// assign to ngm app scope
				$scope.report.ngm.dashboard.model = $scope.model;
			}

		}

		// set path, menu and init
		$scope.report.setPath($scope.report.getPath());
		$scope.report.init();
		$scope.report.setMenu();
		console.log($scope.report.getRows())

	}]);

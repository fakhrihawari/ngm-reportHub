importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
workbox.setConfig({ debug: true })
const match4WProjectPlanRoute = ({ url, event }) => {
	return (url.pathname === '/api/cluster/indicator4wprojectplan');
};
const matchClusterIndicator = ({ url, event }) => {
	return (url.pathname === '/api/cluster/indicator');
};
const matchReport = ({ url, event }) => {
	return (url.pathname === '/api/cluster/report/getReport');
};
const matchReportStock = ({ url, event }) => {
	return (url.pathname === '/api/cluster/stock/getReport');
};
// PROFILE-PAGE
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/list/organizations'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'listOrganization',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	})
);
// PROFILE-PAGE-END
// HOME-PAGE
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/getOrganization'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'getOrganization',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// HOME-PAGE-END

// TEAM PAGE
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/getOrganizationMenu'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'getMenuTeam',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/getOrganizationIndicator'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getIndicatorTeam',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
workbox.routing.registerRoute(
	new RegExp('https://www.gravatar.com/avatar/ecc6fdfef9593d82e81a3efcb0b344e4?s=188'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'getAvatar',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// TEAM PAGE-END

// ADMIN PAGE
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/cluster/admin/indicator'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getAdminDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// ADMIN PAGE- END
// PROJECT LIST
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/cluster/project/getProjectsList'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getListProject',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// PROJECT LIST-END
// STOCK LIST'
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/cluster/stock/getReportsList'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getStockList',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// STOCK LIST-END
// STOCK Monthly
workbox.routing.registerRoute(
	// new RegExp('http://192.168.33.16/api/cluster/stock/getReport'),
	matchReportStock,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getStockReport',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// STOCK Monthly - END
// 5W Dashboard
workbox.routing.registerRoute(
	// new RegExp('http://192.168.33.16/api/cluster/indicator'),
	matchClusterIndicator,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getClusterDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// 5W Dashboard -END
// EPR ADMIN
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/epr/indicator'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getEPRAdminDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/epr/latestUpdate'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'getEPRAdminDashboardLatest',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// EPR ADMIN-END
// EPR Dashboard
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/epr/alerts/indicator'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getEPRAlertDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/epr/disasters/indicator'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getEPRDisasterDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// EPR Dashboard-END
// 4W Project Plan
workbox.routing.registerRoute(
	// new RegExp('http://192.168.33.16/api/cluster/indicator4wprojectplan'),
	match4WProjectPlanRoute,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getProjectDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// 4W Project Plan-END
// DEWS DASHBOARD
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/dews'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getDEWSDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// DEWS DASHBOARD -END
// DROUGHT DASHBOARD
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/drought/afghanistan'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'getDroughtDashboard',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// DROUGHT DASHBOARD-END
// project summary page
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/cluster/project/getProject'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'getProjectSummary',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// project summary page-END
// Monthly Report
workbox.routing.registerRoute(
	// new RegExp('http://192.168.33.16/api/cluster/report/getReport'),
	matchReport,
	new workbox.strategies.NetworkFirst({
		cacheName: 'getMonthlyReport',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// Monthly Report - END
// Monthly ReportList 
workbox.routing.registerRoute(
	new RegExp('http://192.168.33.16/api/cluster/report/getReportsList'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'getMonthlyReportList',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 60 // 30 Minutes
			})
		]
	}),
);
// Monthly ReportList - END
workbox.precaching.precacheAndRoute([
  {
    "url": "images/chrome.png",
    "revision": "c996399dc6e0be48ccf0efe4765007da"
  },
  {
    "url": "images/cluster/details-1.jpg",
    "revision": "e79b3d79f7d43f22d9ad7552a6c725d1"
  },
  {
    "url": "images/cluster/details-2.jpg",
    "revision": "70ee02b2c1d6f7f94f30de145e2d7892"
  },
  {
    "url": "images/cluster/dtm-col.jpg",
    "revision": "7c879cf0581c74484390d07b1b895f25"
  },
  {
    "url": "images/cluster/groups_01.jpg",
    "revision": "d65e1195d7eb311da2337a8bafd34f23"
  },
  {
    "url": "images/cluster/groups.jpg",
    "revision": "e8e93f62ccf9af7056f1da867dd422cb"
  },
  {
    "url": "images/cluster/monthly_report.jpg",
    "revision": "3c47cfdbc2919e9054b6a77de5dc2a79"
  },
  {
    "url": "images/cluster/projects-1.jpg",
    "revision": "f642206b67707e549bd18159506c4ad5"
  },
  {
    "url": "images/cluster/projects-AF.jpg",
    "revision": "4b66907f921b1a98c0ff8d644c63e67e"
  },
  {
    "url": "images/cluster/projects-AF17.jpg",
    "revision": "fa63bac8b8a683be348706a0172501c7"
  },
  {
    "url": "images/cluster/projects-CB.jpg",
    "revision": "527809a0a5359cd03509cecc38c346af"
  },
  {
    "url": "images/cluster/projects-CBv1.jpg",
    "revision": "115f1d10a2c177be9604d46d2b526f45"
  },
  {
    "url": "images/cluster/projects-COL.jpg",
    "revision": "e98c4accbcf225c2db775cb6d634b95e"
  },
  {
    "url": "images/cluster/projects-ET.jpg",
    "revision": "09bd55c862f3b3e312d34f07ca887388"
  },
  {
    "url": "images/cluster/projects-NG.jpg",
    "revision": "64a6a065e4930abc4055efb9b553cdff"
  },
  {
    "url": "images/cluster/projects-NG01.jpg",
    "revision": "4ca9ce85be494bf47820c683f62f1c7d"
  },
  {
    "url": "images/cluster/projects-SO.jpg",
    "revision": "86420bac4537b54a0a57c407380bdb9c"
  },
  {
    "url": "images/cluster/projects-SS.jpg",
    "revision": "86420bac4537b54a0a57c407380bdb9c"
  },
  {
    "url": "images/cluster/projects-SY.jpg",
    "revision": "14780ab3f31f3ab5489aa17069b7f997"
  },
  {
    "url": "images/cluster/projects.jpg",
    "revision": "fa63bac8b8a683be348706a0172501c7"
  },
  {
    "url": "images/cluster/reports.jpg",
    "revision": "c434fb17dc64676f55a44bd6bc098025"
  },
  {
    "url": "images/cluster/reports.orig.jpg",
    "revision": "eddd5a18e203e8cde6b6fad1953a8259"
  },
  {
    "url": "images/cluster/sample.jpg",
    "revision": "9206b4a6d4f3401326e0e6297dfdf8af"
  },
  {
    "url": "images/cluster/stocks.jpg",
    "revision": "1212c8025558d32b3399056df9b49caa"
  },
  {
    "url": "images/cluster/team.jpg",
    "revision": "41c04309154c84654500353a291d870d"
  },
  {
    "url": "images/contact.png",
    "revision": "85c921038c675f6440990c6810d459a7"
  },
  {
    "url": "images/country/afghanistan/assessments/nutrition_admin.jpg",
    "revision": "99ab2d5b91195c7989a952261f11cb9d"
  },
  {
    "url": "images/country/afghanistan/assessments/nutrition_assessment.jpg",
    "revision": "4dceaa0f1def035df0fdec2c079d0b19"
  },
  {
    "url": "images/country/afghanistan/assessments/nutrition_dashboard.jpg",
    "revision": "397a21e89057a7cb7a6762c6ff0f7adc"
  },
  {
    "url": "images/country/afghanistan/assessments/nutrition_projects2.jpg",
    "revision": "39e524db9b4fbac94922ac56f82abb86"
  },
  {
    "url": "images/country/ethiopia/assessments/alert_investigation.jpg",
    "revision": "6102a9659f2c7159bafeb035f1cbbc99"
  },
  {
    "url": "images/country/ethiopia/assessments/monitoring.jpg",
    "revision": "8f742b8c0edfee4176bc8fb44a6f67c2"
  },
  {
    "url": "images/country/ethiopia/assessments/wash_assessmennt.jpg",
    "revision": "3fc0890a442a74cc7885f28da5cfd97a"
  },
  {
    "url": "images/docm.png",
    "revision": "0621515a68267864a0ca5d51f45eabfd"
  },
  {
    "url": "images/docxm.png",
    "revision": "8bdbf1e9dadca78ccb9130a297da3efb"
  },
  {
    "url": "images/elsedoc.png",
    "revision": "36efe07b2bc0a80732e22a018ad3e315"
  },
  {
    "url": "images/en.png",
    "revision": "fa1311374671135f713f8fdd86d82d2f"
  },
  {
    "url": "images/favicon.ico",
    "revision": "6f7141fa68893229f3ab855e8a307d96"
  },
  {
    "url": "images/find-account.png",
    "revision": "97d2483987fc5483d8127fe67dc18801"
  },
  {
    "url": "images/forbidden.png",
    "revision": "c3552c4c1d71dcd0f502a33260110cc3"
  },
  {
    "url": "images/fullscreen.png",
    "revision": "ddb8362e333c8f3225da9d578d00c14c"
  },
  {
    "url": "images/immap/briefing.jpg",
    "revision": "f642206b67707e549bd18159506c4ad5"
  },
  {
    "url": "images/immap/monthly_report.jpg",
    "revision": "d98d1f30b2b39008cf23a8bf8a98414a"
  },
  {
    "url": "images/immap/pfitzgerald.jpg",
    "revision": "7c0a9b1e69b146d1f5d434f9cbc11949"
  },
  {
    "url": "images/immap/products.jpg",
    "revision": "54616f3350fa565ed6e5dd8fd0537b35"
  },
  {
    "url": "images/immap/team.jpg",
    "revision": "db733462d75ff416958adb71a715d7d8"
  },
  {
    "url": "images/immap/trainings-lr.jpg",
    "revision": "aaff0fd412d0199c657400be321e70fb"
  },
  {
    "url": "images/immap/trainings.jpg",
    "revision": "77506b3c8363e5c822ee1064b68f99f0"
  },
  {
    "url": "images/invite-sent.png",
    "revision": "faf55cd8ee0aca1f0c4cec439ecbd028"
  },
  {
    "url": "images/log-in.png",
    "revision": "b56957c465ef57d18544657856b21847"
  },
  {
    "url": "images/logo-acbar.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-agriculture.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-albergues.png",
    "revision": "515b594dcacb1b36685a64a7085ea747"
  },
  {
    "url": "images/logo-all.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-cp.png",
    "revision": "f382317520ae5638205f8c56796ab2ad"
  },
  {
    "url": "images/logo-cvwg.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-education.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-eiewg.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-esnfi.png",
    "revision": "515b594dcacb1b36685a64a7085ea747"
  },
  {
    "url": "images/logo-fsac.png",
    "revision": "49733b8791c89562c083f918d9a41ee6"
  },
  {
    "url": "images/logo-fss.png",
    "revision": "49733b8791c89562c083f918d9a41ee6"
  },
  {
    "url": "images/logo-health.png",
    "revision": "7aa2471788a9d54233b4044004e242bf"
  },
  {
    "url": "images/logo-healthcare.png",
    "revision": "7f23e19aae1cfbd2dad3a8b08ca08b5a"
  },
  {
    "url": "images/logo-immap.png",
    "revision": "9af81b1aad9c4579b696ff0d86519078"
  },
  {
    "url": "images/logo-l.png",
    "revision": "2148f945e54681168ae3c478ebead875"
  },
  {
    "url": "images/logo-nutrition.png",
    "revision": "d44fd57d6e9589f76883a2a1e8b62d51"
  },
  {
    "url": "images/logo-protection.png",
    "revision": "64f2630943cec17d9f303601761687e2"
  },
  {
    "url": "images/logo-recuperacion_temprana.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/logo-rnr_chapter.png",
    "revision": "d25eb74c46c799963be63b8d13d63753"
  },
  {
    "url": "images/logo-s.png",
    "revision": "c16a57d1828e1983b1fa968d80bda71a"
  },
  {
    "url": "images/logo-san.png",
    "revision": "49733b8791c89562c083f918d9a41ee6"
  },
  {
    "url": "images/logo-smsd.png",
    "revision": "515b594dcacb1b36685a64a7085ea747"
  },
  {
    "url": "images/logo-wash.png",
    "revision": "5263d664f5d4f0f4fa841febf43b3651"
  },
  {
    "url": "images/logo-who.png",
    "revision": "2454b3ddc339471d1ad893ced75264a8"
  },
  {
    "url": "images/logo.png",
    "revision": "d23be6a9525ad6d5476445c4f16f546a"
  },
  {
    "url": "images/mp4m.png",
    "revision": "f2cc25a4600a5fba4d44c21d3d99ac3b"
  },
  {
    "url": "images/password-reset.png",
    "revision": "4d8f97b37812168dd5cecc46c809a97b"
  },
  {
    "url": "images/pdfm.png",
    "revision": "bb2b70ff7100be415167726eb97f9bbc"
  },
  {
    "url": "images/ppt.png",
    "revision": "d7cafa5bccce3b2595fc6ab0931d5e19"
  },
  {
    "url": "images/quote1.png",
    "revision": "792a22f189d72f599aa9bc85301b8da1"
  },
  {
    "url": "images/quote2.png",
    "revision": "b5e47ce619e69f5c0109bde0f9be33aa"
  },
  {
    "url": "images/recaptcha.png",
    "revision": "532eb8cd3b0335b34b04bd8cee71bffa"
  },
  {
    "url": "images/registration.png",
    "revision": "50381b433ee7ae931dec2c959be7a4bc"
  },
  {
    "url": "images/snapshots/cdc/201711/20171115_171935.jpg",
    "revision": "b818c13d5283f23b97b4d358c3aaa03e"
  },
  {
    "url": "images/snapshots/cdc/201711/20171117_100308.jpg",
    "revision": "508fec2cb61ecd14acc522be96437435"
  },
  {
    "url": "images/snapshots/cdc/201711/20171117_174407.jpg",
    "revision": "74c7379f78cff57b8636c1f6d5ad7e5c"
  },
  {
    "url": "images/snapshots/cdc/201712/immap_powerbi_dec_dashboard.png",
    "revision": "3af9fdfe696039959293d79fb3034bfe"
  },
  {
    "url": "images/snapshots/cdc/201712/immap_powerbi_dec_meetings.png",
    "revision": "0b3cc5a68d9d5d75c88aa81b07cc67bf"
  },
  {
    "url": "images/snapshots/cdc/201712/ocha_3w.png",
    "revision": "9f5a2622566cb38c99113dd9a78f06e7"
  },
  {
    "url": "images/snapshots/cdc/201712/ReportHub_immap_dec.png",
    "revision": "75c423367904629abe0e671a5c822f25"
  },
  {
    "url": "images/snapshots/cdc/better_data.png",
    "revision": "d26334756e7b703af98e702dd20f9aae"
  },
  {
    "url": "images/snapshots/cdc/better_decisions.png",
    "revision": "7f894496d9f20d3e4dc7ae4aacb93fe5"
  },
  {
    "url": "images/snapshots/cdc/better_outcomes.png",
    "revision": "84809660891e7eee911743d0c5e5309b"
  },
  {
    "url": "images/snapshots/cdc/contact/cfuhrer.png",
    "revision": "90058d9c0148654eead6ec607faff0ad"
  },
  {
    "url": "images/snapshots/cdc/contact/contact_beatrice_muraguri.png",
    "revision": "c4f550551ba11165ee0d4a3820dd4411"
  },
  {
    "url": "images/snapshots/cdc/contact/contact_christophe_bois.png",
    "revision": "6dac87c83e4342e13a61e2837bddc346"
  },
  {
    "url": "images/snapshots/cdc/contact/contact_haroun_habib.png",
    "revision": "b92c1dd49ac0ebb8490f4eb291002aee"
  },
  {
    "url": "images/snapshots/cdc/contact/contact_olivier_cheminat.png",
    "revision": "633ad212573417f163cc77bb10061e0d"
  },
  {
    "url": "images/snapshots/cdc/contact/contact_olivier_papadakis.png",
    "revision": "803babe079b8d68bcfb4a479b04e4e88"
  },
  {
    "url": "images/snapshots/cdc/contact/contact_patrick_fitzgerald.png",
    "revision": "22356ede6dc8c0c4eba56a5f1a283857"
  },
  {
    "url": "images/snapshots/cdc/contact/fasso.png",
    "revision": "ababb4ea545c007618406c6cd4e2c65e"
  },
  {
    "url": "images/snapshots/drr/areas/emergency_response.png",
    "revision": "6a3ebb56be04a56cd2dcaff04808b352"
  },
  {
    "url": "images/snapshots/drr/areas/seasonal_planning.png",
    "revision": "7844266a254f370d737e44287818ab48"
  },
  {
    "url": "images/snapshots/drr/areas/situational_anlaysis.png",
    "revision": "ebd1288a584c13fab34e02485fd93f77"
  },
  {
    "url": "images/snapshots/drr/contact/contact_card_budi.png",
    "revision": "d6e05cb93b74c9fea33ba2aaa354bbf9"
  },
  {
    "url": "images/snapshots/drr/contact/contact_card_emlyn.png",
    "revision": "89bacfe37e5e29294f9977506fb7c784"
  },
  {
    "url": "images/snapshots/drr/contact/contact_card_marisol.png",
    "revision": "0613cc15d726aff00ffaae6bedc3a63c"
  },
  {
    "url": "images/snapshots/drr/layers/accessibility.png",
    "revision": "5f8455131e3ab69b0ae03498d4c2edd2"
  },
  {
    "url": "images/snapshots/drr/layers/avalanche.png",
    "revision": "0d72bf88fa486eb8154ab10c22814343"
  },
  {
    "url": "images/snapshots/drr/layers/base.png",
    "revision": "9549c5535161c61f1761d8d363fb4eb5"
  },
  {
    "url": "images/snapshots/drr/layers/earthquakes.png",
    "revision": "c87680f81f9b06a6bcfd1ceb213a3e53"
  },
  {
    "url": "images/snapshots/drr/layers/floods.png",
    "revision": "211e505bb7705343a153db7613677d54"
  },
  {
    "url": "images/snapshots/drr/layers/humanitarian_access.png",
    "revision": "3e536d9a9c98a780e4a513f9272e161b"
  },
  {
    "url": "images/snapshots/drr/layers/infrastructure.png",
    "revision": "972cdcb1a8f8479cd09280f20459a203"
  },
  {
    "url": "images/snapshots/drr/layers/population.png",
    "revision": "16d4c8a90aedcdc545fe240e64e86f99"
  },
  {
    "url": "images/snapshots/drr/products/print-dashboard.png",
    "revision": "82cd78baad0e9e848f3a4649390220eb"
  },
  {
    "url": "images/snapshots/drr/products/static-maps.png",
    "revision": "d4fe0b23e8afa287ba088d27cdfa3187"
  },
  {
    "url": "images/snapshots/drr/training/girls_gps.jpg",
    "revision": "5b0f762537901e55857504689ca0af7c"
  },
  {
    "url": "images/snapshots/drr/training/group_gps.jpg",
    "revision": "704e49d919e84f6c8d125cca4901731e"
  },
  {
    "url": "images/snapshots/drr/training/hasibullah.jpg",
    "revision": "898b39c929e4c80020fd3e957ebd3f42"
  },
  {
    "url": "images/snapshots/drr/training/women_in_control.jpg",
    "revision": "7893f4e64875143ae3110fef4179ce88"
  },
  {
    "url": "images/snapshots/immap/contact/contact_card_bill_red.png",
    "revision": "bcd95711d52d46fbb767288e09b1a1c2"
  },
  {
    "url": "images/snapshots/immap/contact/contact_card_chris_red.png",
    "revision": "69abba7805c6b20d499aef4d8945194b"
  },
  {
    "url": "images/snapshots/immap/contact/contact_card_jon_red.png",
    "revision": "f2efd886dd70577804cac46758c9dcff"
  },
  {
    "url": "images/snapshots/immap/contact/contact_card_melissa.png",
    "revision": "781dc7f1c575a4c73fd0686c3128e348"
  },
  {
    "url": "images/snapshots/reporthub/contact/aadekunle_v0.png",
    "revision": "e883696153468f57319d4474ebffae18"
  },
  {
    "url": "images/snapshots/reporthub/contact/aadekunle.png",
    "revision": "e883696153468f57319d4474ebffae18"
  },
  {
    "url": "images/snapshots/reporthub/contact/contact_card_fakhri.png",
    "revision": "7fcbfd5902244b7e674a03acdd63acd6"
  },
  {
    "url": "images/snapshots/reporthub/contact/contact_card_pfitzgerald_rh_ng.png",
    "revision": "fab9549ccc25d58b638457c76c1e7972"
  },
  {
    "url": "images/snapshots/reporthub/contact/contact_card_pfitzgerald_rh.png",
    "revision": "37ca072aa00f26e55e243e5ede8a6169"
  },
  {
    "url": "images/snapshots/reporthub/contact/contact_card_timur.png",
    "revision": "3b01a5ce2f5cc5161d9bbce0075efb27"
  },
  {
    "url": "images/snapshots/reporthub/contact/rsennoga.png",
    "revision": "cc9f40e1b1b022681eb82ccfd0add0a6"
  },
  {
    "url": "images/snapshots/reporthub/exports/afg_3w.png",
    "revision": "eb79edfd4babed08cf0ba81ee970239c"
  },
  {
    "url": "images/snapshots/reporthub/exports/csv.png",
    "revision": "2deca3133b5a880c926dcf37884682c7"
  },
  {
    "url": "images/snapshots/reporthub/exports/hpc.tools.png",
    "revision": "b4f24f95605c9eca91ae648c8d8600ce"
  },
  {
    "url": "images/snapshots/reporthub/exports/powerbi.png",
    "revision": "7e90497e11a0163928882d4356e10fa3"
  },
  {
    "url": "images/snapshots/reporthub/monitoring/ReportHub_health_4w.png",
    "revision": "e816eccf08eff4ded67a94d8c0059220"
  },
  {
    "url": "images/snapshots/reporthub/monitoring/ReportHub-admin-wash.png",
    "revision": "84fb6486e1761191b4f1c68b9356dd26"
  },
  {
    "url": "images/snapshots/reporthub/monitoring/ReportHub-ctc-assessment.png",
    "revision": "253f25a1601cc1d842c0192af03302db"
  },
  {
    "url": "images/snapshots/reporthub/tools/reportHub_monitoring.png",
    "revision": "1e45fbd850954de574bf32a270101231"
  },
  {
    "url": "images/snapshots/reporthub/usage_2018.png",
    "revision": "63ecae1a2c63a1bc8cc577aab5c6cc69"
  },
  {
    "url": "images/snapshots/reporthub/usage.png",
    "revision": "d00a82a5d64ed7217f9049030ca2d391"
  },
  {
    "url": "images/snapshots/who-immap/better_data.png",
    "revision": "411c113d456ddebe9090e3cd21c200d2"
  },
  {
    "url": "images/snapshots/who-immap/better_decisions.png",
    "revision": "b6a7bc5ab2ac1ffe0def862780d5f619"
  },
  {
    "url": "images/snapshots/who-immap/better_outcomes.png",
    "revision": "b0c968ebc91467858fd85c738e9193dd"
  },
  {
    "url": "images/snapshots/who-immap/contact_abdon.png",
    "revision": "21130968697b1e3f7a3c29f5cd69d1c5"
  },
  {
    "url": "images/snapshots/who-immap/contact_bois.png",
    "revision": "255e755c02c309e8141af4d0c222c859"
  },
  {
    "url": "images/snapshots/who-immap/contact_jon.png",
    "revision": "fd430fb0ca5424f04d2c17d7baf08435"
  },
  {
    "url": "images/snapshots/who-immap/data_viz.jpg",
    "revision": "54616f3350fa565ed6e5dd8fd0537b35"
  },
  {
    "url": "images/snapshots/who-immap/layout.jpeg",
    "revision": "600bfbc4b115f84f49f5455b50e5266d"
  },
  {
    "url": "images/snapshots/who-immap/map.jpg",
    "revision": "77506b3c8363e5c822ee1064b68f99f0"
  },
  {
    "url": "images/snapshots/who-immap/report3.png",
    "revision": "49e53e7651ed444fdd1a2faf556da037"
  },
  {
    "url": "images/spain.png",
    "revision": "dca4ec9ea8426f1a003c36a76b3bf740"
  },
  {
    "url": "images/txtm.png",
    "revision": "2c36ae051a7f88716372ff66e19dfc24"
  },
  {
    "url": "images/worldmap.svg",
    "revision": "e85d168bf2ddcb391f624e16f71b5083"
  },
  {
    "url": "images/xls.png",
    "revision": "b49190a292b2ffff383c39dac3c37a9f"
  },
  {
    "url": "images/xlsx.png",
    "revision": "e8d04c524d7eef30da2f6af2a99e3b91"
  },
  {
    "url": "images/zipm.png",
    "revision": "dee022ee1f51fcf663918ea3b8ecab6b"
  },
  {
    "url": "index.html",
    "revision": "ec60045c090c79ec0df4aa8fdf59bc6a"
  },
  {
    "url": "maintenance/css/materialize.min.css",
    "revision": "7fd47388046c5fa14ce34f805725d2b5"
  },
  {
    "url": "maintenance/css/style.css",
    "revision": "1fcdada5928dd95c76e0ef61fcd6cd73"
  },
  {
    "url": "maintenance/fonts/fontello/fontello.eot",
    "revision": "88e5b4a10f69f9adcff5ef32c71d32ec"
  },
  {
    "url": "maintenance/fonts/fontello/fontello.svg",
    "revision": "d29af06f9f724475d75f1edf4bbf19f4"
  },
  {
    "url": "maintenance/fonts/fontello/fontello.ttf",
    "revision": "3385b3d6c7ae743376cff75a1363187d"
  },
  {
    "url": "maintenance/fonts/fontello/fontello.woff",
    "revision": "42b7d2eb5f8923030fd19495e98c12e4"
  },
  {
    "url": "maintenance/fonts/fontello/fontello.woff2",
    "revision": "85692aa457531a714a420c4110ed49f2"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Bold.eot",
    "revision": "ecdd509cadbf1ea78b8d2e31ec52328c"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Bold.ttf",
    "revision": "e31fcf1885e371e19f5786c2bdfeae1b"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Bold.woff",
    "revision": "dc81817def276b4f21395f7ea5e88dcd"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Bold.woff2",
    "revision": "39b2c3031be6b4ea96e2e3e95d307814"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Light.eot",
    "revision": "a990f611f2305dc12965f186c2ef2690"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Light.ttf",
    "revision": "46e48ce0628835f68a7369d0254e4283"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Light.woff",
    "revision": "3b813c2ae0d04909a33a18d792912ee7"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Light.woff2",
    "revision": "69f8a0617ac472f78e45841323a3df9e"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Medium.eot",
    "revision": "4d9f3f9e5195e7b074bb63ba4ce42208"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Medium.ttf",
    "revision": "894a2ede85a483bf9bedefd4db45cdb9"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Medium.woff",
    "revision": "fc78759e93a6cac50458610e3d9d63a0"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Medium.woff2",
    "revision": "574fd0b50367f886d359e8264938fc37"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Regular.eot",
    "revision": "30799efa5bf74129468ad4e257551dc3"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Regular.ttf",
    "revision": "df7b648ce5356ea1ebce435b3459fd60"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Regular.woff",
    "revision": "ba3dcd8903e3d0af5de7792777f8ae0d"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Regular.woff2",
    "revision": "2751ee43015f9884c3642f103b7f70c9"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Thin.eot",
    "revision": "dfe56a876d0282555d1e2458e278060f"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Thin.ttf",
    "revision": "94998475f6aea65f558494802416c1cf"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Thin.woff",
    "revision": "7500519de3d82e33d1587f8042e2afcb"
  },
  {
    "url": "maintenance/fonts/roboto/Roboto-Thin.woff2",
    "revision": "954bbdeb86483e4ffea00c4591530ece"
  },
  {
    "url": "maintenance/imgs/bot.png",
    "revision": "038ce8e4fc16ac7110ae2a0f11b4685f"
  },
  {
    "url": "maintenance/imgs/favicon.ico",
    "revision": "6f7141fa68893229f3ab855e8a307d96"
  },
  {
    "url": "maintenance/imgs/footer.jpeg",
    "revision": "1efc1a09aa245776ca37849f8dcc1071"
  },
  {
    "url": "maintenance/imgs/logo-s.png",
    "revision": "c16a57d1828e1983b1fa968d80bda71a"
  },
  {
    "url": "maintenance/index.html",
    "revision": "deb867a634ecc9318063a695ed0c4d7d"
  },
  {
    "url": "maintenance/js/jquery-2.1.1.min.js",
    "revision": "9a094379d98c6458d480ad5a51c4aa27"
  },
  {
    "url": "maintenance/js/materialize.min.js",
    "revision": "a03b87a2e3dfcb9ac6865515efe87a73"
  },
  {
    "url": "promo/css/animate.min.css",
    "revision": "b7d28487cf7d0845cfb3cfc246ef4c51"
  },
  {
    "url": "promo/css/materialize.css",
    "revision": "917ef26fc573bcd67b4f7694b74e0bfb"
  },
  {
    "url": "promo/css/materialize.min.css",
    "revision": "7fd47388046c5fa14ce34f805725d2b5"
  },
  {
    "url": "promo/css/style.css",
    "revision": "36803d1cf8b37e5b90ac1b6c47f7f4a1"
  },
  {
    "url": "promo/fonts/fontello/fontello.eot",
    "revision": "88e5b4a10f69f9adcff5ef32c71d32ec"
  },
  {
    "url": "promo/fonts/fontello/fontello.svg",
    "revision": "d29af06f9f724475d75f1edf4bbf19f4"
  },
  {
    "url": "promo/fonts/fontello/fontello.ttf",
    "revision": "3385b3d6c7ae743376cff75a1363187d"
  },
  {
    "url": "promo/fonts/fontello/fontello.woff",
    "revision": "42b7d2eb5f8923030fd19495e98c12e4"
  },
  {
    "url": "promo/fonts/fontello/fontello.woff2",
    "revision": "85692aa457531a714a420c4110ed49f2"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Bold.eot",
    "revision": "ecdd509cadbf1ea78b8d2e31ec52328c"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Bold.ttf",
    "revision": "e31fcf1885e371e19f5786c2bdfeae1b"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Bold.woff",
    "revision": "dc81817def276b4f21395f7ea5e88dcd"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Bold.woff2",
    "revision": "39b2c3031be6b4ea96e2e3e95d307814"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Light.eot",
    "revision": "a990f611f2305dc12965f186c2ef2690"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Light.ttf",
    "revision": "46e48ce0628835f68a7369d0254e4283"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Light.woff",
    "revision": "3b813c2ae0d04909a33a18d792912ee7"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Light.woff2",
    "revision": "69f8a0617ac472f78e45841323a3df9e"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Medium.eot",
    "revision": "4d9f3f9e5195e7b074bb63ba4ce42208"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Medium.ttf",
    "revision": "894a2ede85a483bf9bedefd4db45cdb9"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Medium.woff",
    "revision": "fc78759e93a6cac50458610e3d9d63a0"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Medium.woff2",
    "revision": "574fd0b50367f886d359e8264938fc37"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Regular.eot",
    "revision": "30799efa5bf74129468ad4e257551dc3"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Regular.ttf",
    "revision": "df7b648ce5356ea1ebce435b3459fd60"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Regular.woff",
    "revision": "ba3dcd8903e3d0af5de7792777f8ae0d"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Regular.woff2",
    "revision": "2751ee43015f9884c3642f103b7f70c9"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Thin.eot",
    "revision": "dfe56a876d0282555d1e2458e278060f"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Thin.ttf",
    "revision": "94998475f6aea65f558494802416c1cf"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Thin.woff",
    "revision": "7500519de3d82e33d1587f8042e2afcb"
  },
  {
    "url": "promo/fonts/roboto/Roboto-Thin.woff2",
    "revision": "954bbdeb86483e4ffea00c4591530ece"
  },
  {
    "url": "promo/imgs/calendar.png",
    "revision": "bea0dbb885e628e85897a2b0ca46f6ad"
  },
  {
    "url": "promo/imgs/favicon.ico",
    "revision": "6f7141fa68893229f3ab855e8a307d96"
  },
  {
    "url": "promo/imgs/footer.jpeg",
    "revision": "1efc1a09aa245776ca37849f8dcc1071"
  },
  {
    "url": "promo/imgs/layout.jpeg",
    "revision": "0184341cdcd5a7590b7df9fa4dba8787"
  },
  {
    "url": "promo/imgs/logo-l.png",
    "revision": "2148f945e54681168ae3c478ebead875"
  },
  {
    "url": "promo/imgs/logo-s.png",
    "revision": "c16a57d1828e1983b1fa968d80bda71a"
  },
  {
    "url": "promo/imgs/toolbox-z1.png",
    "revision": "c4f1adb414fae358b5a5aaa42ee1e948"
  },
  {
    "url": "promo/index.html",
    "revision": "00b1d9df44ddd9d29830f7ef6daa323b"
  },
  {
    "url": "promo/js/init.js",
    "revision": "db8cc5a938534fd1d640ab8cdc517339"
  },
  {
    "url": "promo/js/jquery-2.1.1.min.js",
    "revision": "9a094379d98c6458d480ad5a51c4aa27"
  },
  {
    "url": "promo/js/jquery.animateNumber.min.js",
    "revision": "6f23065463e4aaaf1cdfc3e08eec437d"
  },
  {
    "url": "promo/js/jquery.waypoints.min.js",
    "revision": "cebc34dedef229a98275955df75e20e5"
  },
  {
    "url": "promo/js/materialize.min.js",
    "revision": "a03b87a2e3dfcb9ac6865515efe87a73"
  },
  {
    "url": "promo/js/prezi_player.js",
    "revision": "94a456336561aaa6e26b79b5e3c416e4"
  },
  {
    "url": "scripts/app/app.js",
    "revision": "b925d68717e01b417e63cdd3f51c6d70"
  },
  {
    "url": "scripts/app/controllers/admin/controller.authentication.js",
    "revision": "35394f4c60a5f806d816bcdecedcdf38"
  },
  {
    "url": "scripts/app/controllers/admin/controller.forbidden.js",
    "revision": "e607c5bdc9ced2d9424733bbd190524c"
  },
  {
    "url": "scripts/app/controllers/admin/controller.login.js",
    "revision": "46946f745f73331773da5960fa37c53b"
  },
  {
    "url": "scripts/app/controllers/admin/controller.profile.js",
    "revision": "ff3bae3f5dd9d6d84c6a57370b350bba"
  },
  {
    "url": "scripts/app/controllers/admin/controller.register.js",
    "revision": "99dc2b4b65eb0e0ba8386bd03f54a162"
  },
  {
    "url": "scripts/app/controllers/admin/controller.reset.js",
    "revision": "a7f5bc114c4308d2df22f44418e4452c"
  },
  {
    "url": "scripts/app/controllers/admin/controller.team.js",
    "revision": "cd11309047817ff52baee88682403b32"
  },
  {
    "url": "scripts/app/controllers/guides/controller.guide.feedback.js",
    "revision": "1fb1d223d182f53e917e1ee925f45aa4"
  },
  {
    "url": "scripts/app/controllers/guides/controller.guide.menu.js",
    "revision": "24a9ac78910cd238ccd02e72e2a55aed"
  },
  {
    "url": "scripts/app/dashboards/dashboard.reporthub.cluster.js",
    "revision": "bd027088c0c1c8e383cf54a6b66a85bc"
  },
  {
    "url": "scripts/app/dashboards/dashboard.reporthub.js",
    "revision": "40ec3f50bae7ab7406cc1570cc0cf9e6"
  },
  {
    "url": "scripts/app/dashboards/dashboard.reporthub.reporting.js",
    "revision": "49f645f70c12294a07e89870d37edb43"
  },
  {
    "url": "scripts/app/dashboards/dashboard.reporthub.stocks.js",
    "revision": "a7cd1bfbbb958a0641592d5965044411"
  },
  {
    "url": "scripts/app/directives/materialize.select.js",
    "revision": "348c55c565be7af251fd882b3cf82894"
  },
  {
    "url": "scripts/app/services/ngmAuthentication.js",
    "revision": "56c09f79ce22c15f14218f25681ccb28"
  },
  {
    "url": "scripts/app/services/ngmHelper.js",
    "revision": "de5abb8158a355e96f3d9f6fb9a10fa1"
  },
  {
    "url": "scripts/app/views/authentication/404.html",
    "revision": "df593fff43ab08c9c123943314d6a0c3"
  },
  {
    "url": "scripts/app/views/authentication/forbidden.html",
    "revision": "bf2ea13a57fa64dc9312beba424f59e8"
  },
  {
    "url": "scripts/app/views/authentication/login.html",
    "revision": "12a80a5b299c5e37ed2ed707cbdc4832"
  },
  {
    "url": "scripts/app/views/authentication/profile-card.html",
    "revision": "7d7d8e2daa6fba63c81d3c8b801cbbca"
  },
  {
    "url": "scripts/app/views/authentication/profile.html",
    "revision": "f0d219435d0728ad4f6fc3733b7d1dcc"
  },
  {
    "url": "scripts/app/views/authentication/register.html",
    "revision": "80694f31254a14abf023f71875e57b16"
  },
  {
    "url": "scripts/app/views/authentication/reset.html",
    "revision": "765e548f83d576e29c4a06645755e1f5"
  },
  {
    "url": "scripts/app/views/authentication/team.html",
    "revision": "c0083cdbb7b21b071b597783c8cd06d1"
  },
  {
    "url": "scripts/app/views/guides/feedback.html",
    "revision": "a80fb08a52ef82b69f4b1def7dd80c7d"
  },
  {
    "url": "scripts/app/views/guides/menu.html",
    "revision": "9f3f2ed6b590394ad91f366b7b8dea4f"
  },
  {
    "url": "scripts/app/views/typeahead.html",
    "revision": "4879c403548f825f984e9407b2552dcd"
  },
  {
    "url": "scripts/app/views/view.html",
    "revision": "899cd02e97070344806563d2130f6816"
  },
  {
    "url": "scripts/modules/cluster/app.js",
    "revision": "61cb2a35e076d7578db19c1553d22478"
  },
  {
    "url": "scripts/modules/cluster/dashboards/dashboard.4wprojectplan.js",
    "revision": "eabd9baa2978f57d2965de6ac647cedd"
  },
  {
    "url": "scripts/modules/cluster/dashboards/dashboard.admin.js",
    "revision": "ab3679dbc4467554a1262d5160130667"
  },
  {
    "url": "scripts/modules/cluster/dashboards/dashboard.cluster.js",
    "revision": "1941c7d3e5b7dd04c7be206e43f968a9"
  },
  {
    "url": "scripts/modules/cluster/dashboards/health/dashboard.hct.js",
    "revision": "553bf9c16245ff9137e22f81bc09cebf"
  },
  {
    "url": "scripts/modules/cluster/dashboards/health/dashboard.health.js",
    "revision": "641a92d5aa9410b91624387a9acdab15"
  },
  {
    "url": "scripts/modules/cluster/dashboards/services/ngmHctHelper.js",
    "revision": "6947a26c0b028840721b6d897aaf7d29"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.home.page.app.js",
    "revision": "5af547e4a86c190665a31d5539fe9285"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.details.js",
    "revision": "9b3348dc5c7286a15177a082dcc89fe4"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.documents.js",
    "revision": "bc2ac29a2be1a390c1b39bb77594a534"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.financials.js",
    "revision": "a53365b92c09701efbead1c5bcade576"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.projects.js",
    "revision": "30d7c2ed0032d3426745f940c4b4ef97"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.report.js",
    "revision": "5bc78db6c253bdf81bbbe5d0a6e9b5cd"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.reports.group.js",
    "revision": "a94202907288c3e6b60d898ae0a8a130"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.reports.list.js",
    "revision": "a8a561c85fe63c5c27765c3e68c89f86"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.project.summary.js",
    "revision": "d74e950174d39f060bad2b5c9065c855"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.stock.js",
    "revision": "708954169b237c6f9e9fbe1695ee9ac1"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.stocks.list.js",
    "revision": "af4e6b7a70a7a77142b0f17aab922a33"
  },
  {
    "url": "scripts/modules/cluster/reports/controllers/cluster.syria.dashboard.js",
    "revision": "37b06ed4af5dcfa7ba21a51b6e2760bd"
  },
  {
    "url": "scripts/modules/cluster/reports/forms/cluster.organization.form.stock.js",
    "revision": "c005955c4ce21eaedf0ad808f953568a"
  },
  {
    "url": "scripts/modules/cluster/reports/forms/cluster.organization.form.stocks.list.js",
    "revision": "63a9e16a88c40a11eecd24578a54ace6"
  },
  {
    "url": "scripts/modules/cluster/reports/forms/cluster.project.form.details.js",
    "revision": "ffda84ca95978cfa18717897fdc0f5df"
  },
  {
    "url": "scripts/modules/cluster/reports/forms/cluster.project.form.financials.js",
    "revision": "6e9b1230ba5d7a152b34b701e1c645c7"
  },
  {
    "url": "scripts/modules/cluster/reports/forms/cluster.project.form.report.js",
    "revision": "442634d4662592fecd1f78a14f747639"
  },
  {
    "url": "scripts/modules/cluster/reports/services/activity-details/ngmClusterDetails.js",
    "revision": "6b11c59ff2f208ba287d9d02eeb7f913"
  },
  {
    "url": "scripts/modules/cluster/reports/services/AF/ngmClusterHelperAf.js",
    "revision": "ac8cf18848e818b9d29623bc85779fe8"
  },
  {
    "url": "scripts/modules/cluster/reports/services/CB/ngmCbBeneficiaries.js",
    "revision": "0904533e027d448d2ea5ac7e2ccd5912"
  },
  {
    "url": "scripts/modules/cluster/reports/services/CB/ngmCbLocations.js",
    "revision": "6fdcb500864574e992463c362a5ef13d"
  },
  {
    "url": "scripts/modules/cluster/reports/services/COL/ngmClusterHelperCol.js",
    "revision": "11fc377240fec2926701a59bb201368a"
  },
  {
    "url": "scripts/modules/cluster/reports/services/NG/ngmClusterHelperNgWash.js",
    "revision": "44c7b165e5ca8c86c9243bc10d758e0e"
  },
  {
    "url": "scripts/modules/cluster/reports/services/NG/ngmClusterHelperNgWashKeys.js",
    "revision": "9de21ffbf583ab00ce46e3ec1d8895ba"
  },
  {
    "url": "scripts/modules/cluster/reports/services/NG/ngmClusterHelperNgWashLists.js",
    "revision": "6817ea77a0347ebedfc71a7330fac744"
  },
  {
    "url": "scripts/modules/cluster/reports/services/NG/ngmClusterHelperNgWashValidation.js",
    "revision": "0fe93c9eed669355f45544fa0e7fd788"
  },
  {
    "url": "scripts/modules/cluster/reports/services/ngmClusterBeneficiaries.js",
    "revision": "b70a45ff2e1ccee0c677cc51987d48c1"
  },
  {
    "url": "scripts/modules/cluster/reports/services/ngmClusterDocument.js",
    "revision": "a1f6fd62ef189e2f5f12bc6eab2f8144"
  },
  {
    "url": "scripts/modules/cluster/reports/services/ngmClusterHelper.js",
    "revision": "2f933fae964e3feb61bc90c23e054939"
  },
  {
    "url": "scripts/modules/cluster/reports/services/ngmClusterLists.js",
    "revision": "f82a720df996ad799ecdf9be04fc0f10"
  },
  {
    "url": "scripts/modules/cluster/reports/services/ngmClusterLocations.js",
    "revision": "a9c8e23aa139718f727d2198ea484ae9"
  },
  {
    "url": "scripts/modules/cluster/reports/services/ngmClusterValidation.js",
    "revision": "524d884aaad2867ba976b66124cd631e"
  },
  {
    "url": "scripts/modules/cluster/views/cluster.home.page.html",
    "revision": "e3527c1e0c94dfedbfeae9586fdaa773"
  },
  {
    "url": "scripts/modules/cluster/views/cluster.project.summary.html",
    "revision": "d6442c986a161559361613ba05938d01"
  },
  {
    "url": "scripts/modules/cluster/views/cluster.syria.dashboard.html",
    "revision": "208b6ada0a25bcbc1e7f53c5e47209fb"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/contact-details.html",
    "revision": "f678310bfa9105e2f3b1547dd5a6d5e8"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/details.html",
    "revision": "4d9ab5ff52d9f00cf3a46c6f15b4154e"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/form.html",
    "revision": "a06bd1601bc69d597ef85a953519e75d"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/project-classifications/classifications.html",
    "revision": "cafbd7da27d3c89f9a70f37dfe17cfb8"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/project-upload.html",
    "revision": "f00fb053a027225b16a0c2040f9b0de2"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/strategic-objectives.html",
    "revision": "d6b67bf1c2ca855394c36b3292916a5c"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/target-beneficiaries/2016/target-beneficiaries-default.html",
    "revision": "602be2c633998d2ff30e4da0fd1faf42"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/target-beneficiaries/2016/target-beneficiaries-training.html",
    "revision": "d85cea0daa67cd219e46507835557ded"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/target-beneficiaries/2016/target-beneficiaries.html",
    "revision": "90965722e47a375d9454108c0d37c99d"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/target-beneficiaries/target-beneficiaries.html",
    "revision": "029a1e7c0e7d7bead06cc7b8e81d5e30"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/target-locations/CB/locations.html",
    "revision": "ed6d67c59028f9114557921229242001"
  },
  {
    "url": "scripts/modules/cluster/views/forms/details/target-locations/locations.html",
    "revision": "f2d3981d004da1692a0b710dd1dfa40a"
  },
  {
    "url": "scripts/modules/cluster/views/forms/financials/financials-COL.html",
    "revision": "46cf863fecf7afca41bac84044378950"
  },
  {
    "url": "scripts/modules/cluster/views/forms/financials/financials.html",
    "revision": "ce4b75032fbb443dd2e46af8a76e0c69"
  },
  {
    "url": "scripts/modules/cluster/views/forms/financials/form.html",
    "revision": "e392220bcbd1d2665cb46b7d669d1e8b"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/2016/beneficiaries-health-2016.html",
    "revision": "14a2dbcd7bada7467f468d1370281746"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/2016/beneficiaries-training.html",
    "revision": "59cd487d1698cae2818b7e0cc19862c2"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/2016/beneficiaries.html",
    "revision": "adf252713eaeb4236499d17a154e2750"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/activity-details/activity-date.html",
    "revision": "98c050bb54c5c892860e8964ffa669d2"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/activity-details/activity-details.html",
    "revision": "bb530407593d3915461e119e53540190"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/AF/assessment_fsac_absnumber_v2.html",
    "revision": "91f7883ba98f0e580130c3961f2e6b14"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/AF/assessment_fsac.html",
    "revision": "8fbd72b53eec8631535f0382a6209995"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/AF/fsac_percentage.html",
    "revision": "98f7180a5c47912847448a67bb75db76"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/beneficiaries.html",
    "revision": "a79cba59d910608a1f0e433fd466d5d5"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/beneficiaries.html",
    "revision": "47424890bb4232d8c1757c26df153c21"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/accountability/complaints.html",
    "revision": "d8901bc1f5787c9454348438400fe957"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/accountability/details/details.accountability.html",
    "revision": "253302b9ad04083f7ebeb551156a1233"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/accountability/participation.html",
    "revision": "cd87f8719ffd24d917782451c8de141b"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/cash_transfer_programming/cash.html",
    "revision": "eae74c2d4d5c2b1cdb43967bda6387b1"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/cash_transfer_programming/details/cash.details.html",
    "revision": "bf358836d0b680ad577e697e8e1b6374"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/hygiene/details/kit_details.html",
    "revision": "cf46c3483cd981506e579834e57b6701"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/hygiene/details/monitoring.html",
    "revision": "8c38be9259f765b02fcfa7478ee57884"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/hygiene/details/other_campaigns.html",
    "revision": "17299933698d423da4e6e3161c65b612"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/hygiene/details/training.html",
    "revision": "e6d2b90650391678050b464fa31ec058"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/hygiene/kits.html",
    "revision": "db1b65a81728f40cd377d953658f41dd"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/hygiene/promotion.html",
    "revision": "1325fb176647215f06a7498abe21d5e0"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/committee.html",
    "revision": "6362847aaccd2b70a04d5b497505bf59"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/committee.establishment_training_rotational_sanitation_committee.html",
    "revision": "3a8be2b2c4c5cfe2780af328c8263596"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/committee.sanitation_committee_kits_distribution.html",
    "revision": "3e22518f70e6be624224466ff29d0d78"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/latrines.latrine_monitoring.html",
    "revision": "6cb7711390ef4e9815a21c47ac2d6abe"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/latrines.sludge_dumping_site.html",
    "revision": "11019467ddd76123fe5177930339b80b"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/showers.shower_cleaning_disinfection_monitoring.html",
    "revision": "0b6244c09136a980bd7509aafeb63355"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/waste.establishment_training_rotational_waste_management_committee.html",
    "revision": "43822faa75bb13091af35255debe3a21"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/details/waste.solid_waste_management_committee_kits_distribution.html",
    "revision": "c598df491eb07196b6783008d4c8c429"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/latrines.html",
    "revision": "aa5e89b1fdb65cae9a25d0fdecb665a2"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/showers.html",
    "revision": "cfed44d7766692271598c06ef9e40900"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/sanitation/waste.html",
    "revision": "bd2cb43d3131997e87e38e2947824d7a"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/water/borehole.html",
    "revision": "19e2e0b5b3d5831990499aa59a066d2f"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/water/details/maintenance.repair_kits.html",
    "revision": "3a7a6e92c0bfa9eaef8de4c179d95620"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/water/details/maintenance.replacement_parts.html",
    "revision": "e41b522ae748c983bc033a8172cf2359"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/water/maintenance.html",
    "revision": "4c8af125bd602ee8a297dd0df7bd02e1"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/water/reticulation.html",
    "revision": "8a550f658c6a59c829755ccf7daf7334"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/beneficiaries/NG/wash/water/service.html",
    "revision": "bb73cae1d57ff1ca2f570e78f65300fe"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/form.html",
    "revision": "a4cfe4a7468571bb3b005f03b481b20d"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/location/add.location.html",
    "revision": "8dc324079769724e9c53d117499d2876"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/location/locations.html",
    "revision": "1de53179212a8d59b094c95bb2931f13"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/notes.html",
    "revision": "aba30ad2a7dbb8b6b82ffa39f2794a82"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/report-upload.html",
    "revision": "35ff917f25a45b0cd39c47a3563ab7cb"
  },
  {
    "url": "scripts/modules/cluster/views/forms/report/report.group.html",
    "revision": "70915a5f3b3a435f0cbd812b5fefbda6"
  },
  {
    "url": "scripts/modules/cluster/views/forms/stock/form.html",
    "revision": "4295f4fea5de633b182f0c9dfd87fcda"
  },
  {
    "url": "scripts/modules/cluster/views/forms/stock/locations.html",
    "revision": "c53332f5f17c6cb23ca56838fab51c80"
  },
  {
    "url": "scripts/modules/cluster/views/forms/stock/notes.html",
    "revision": "d7344c79bfd97bd5cf9ad75df22b6173"
  },
  {
    "url": "scripts/modules/cluster/views/forms/stock/stocks.html",
    "revision": "4048340d5b200d5f9d459fe24cf55bd4"
  },
  {
    "url": "scripts/modules/cluster/views/forms/warehouse/form.html",
    "revision": "c93567c5da5eac27fd12f946c982087c"
  },
  {
    "url": "scripts/modules/cluster/views/forms/warehouse/locations.html",
    "revision": "3c8f6146543cb137790f792d6ec5fa96"
  },
  {
    "url": "scripts/modules/country/afghanistan/dews/app.js",
    "revision": "3a9759e5556122a6953b95de2ceb2b14"
  },
  {
    "url": "scripts/modules/country/afghanistan/dews/dashboards/dashboard.dews.js",
    "revision": "2907c0093628523e1b916d5422575dc6"
  },
  {
    "url": "scripts/modules/country/afghanistan/dews/upload/upload.dews.js",
    "revision": "459e4d8a44fdfc9fbda6c20209f48569"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/app.js",
    "revision": "9abc142d17b300042026d526cd409536"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/dashboards/dashboard.drought.admin.js",
    "revision": "1f94162cafa595f826ad9fe7d59437b1"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/main/drought.main.js",
    "revision": "8da5032e9abac421011adc37f27a8209"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/services/ngmDroughtHelper.js",
    "revision": "6b4cc40ac87b37ccd9596c9989d6fcfa"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/views/drought.admin.list.html",
    "revision": "3db215c8855661fddbcbb5125d41e8a1"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/views/drought.heatmap.html",
    "revision": "ba457db6dd8ba5b93d7cf29b5b75a814"
  },
  {
    "url": "scripts/modules/country/afghanistan/drought/views/drought.main.html",
    "revision": "593e24368eb62350a19f7964f75253c9"
  },
  {
    "url": "scripts/modules/country/afghanistan/drr/app.js",
    "revision": "161ca2dd33fbb9baa8c7d23e67e07ac8"
  },
  {
    "url": "scripts/modules/country/afghanistan/drr/dashboards/dashboard.baseline.js",
    "revision": "94d8882e2bae068a9763fd3733e8b9ae"
  },
  {
    "url": "scripts/modules/country/afghanistan/drr/dashboards/dashboard.flood.forecast.js",
    "revision": "1b230576047ce69e63dc22b3c214af31"
  },
  {
    "url": "scripts/modules/country/afghanistan/drr/dashboards/dashboard.flood.risk.js",
    "revision": "ed3548f4d88c42b9cc7d86d799e16310"
  },
  {
    "url": "scripts/modules/country/afghanistan/epr/app.js",
    "revision": "18e1358ee481294daf70def4e17bd2c8"
  },
  {
    "url": "scripts/modules/country/afghanistan/epr/dashboards/dashboard.admin.js",
    "revision": "e965eec1586923c16b2710220b5bfb31"
  },
  {
    "url": "scripts/modules/country/afghanistan/epr/dashboards/dashboard.epr.js",
    "revision": "571324f3e4f9c8a66bcc7e568a2518ad"
  },
  {
    "url": "scripts/modules/country/afghanistan/epr/services/ngmEprHelper.js",
    "revision": "8b09b4c41135b292b4bbfcaeefadd1cb"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/app.js",
    "revision": "5fbca2d09db506e1f9d804fa44e8cfc0"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/assessments/nutrition.assessments.js",
    "revision": "82d5e7080435bda42d8e187c96c3e6c1"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/assessments/nutrition.koboform.js",
    "revision": "6e0e5b44ebd21f78961a9aeae6d45a05"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/dashboards/dashboard.admin.nutrition.weekly.js",
    "revision": "a31ed0033e4f8ce09e1682cdfa1b9303"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/dashboards/dashboard.nutrition.weekly.js",
    "revision": "59c93f74ffd6a594cc54445037c3bc3c"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/services/ngmNutritionHelper.js",
    "revision": "8fc903b06d3af81efaf4fd41326bc6f3"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/views/nutrition.assessments.html",
    "revision": "e47a29c6fd1f54b8af15059d62756a72"
  },
  {
    "url": "scripts/modules/country/afghanistan/nutrition/views/nutrition.koboform.html",
    "revision": "f862eee378a60479eb090ab84b8abdb7"
  },
  {
    "url": "scripts/modules/country/ethiopia/app.js",
    "revision": "2cce3f6fd15b772ebb56159581e28a5e"
  },
  {
    "url": "scripts/modules/country/ethiopia/assessments/ethiopia.assessments.js",
    "revision": "277ad9def62ec8461c1523a1215267f4"
  },
  {
    "url": "scripts/modules/country/ethiopia/dashboards/monitoring/dashboard.monitoring.js",
    "revision": "44110dcd87fd54c6645670445c9e726d"
  },
  {
    "url": "scripts/modules/country/ethiopia/views/ethiopia.assessments.html",
    "revision": "a871354619f6abec05c073dba095b56b"
  },
  {
    "url": "scripts/modules/immap/app.js",
    "revision": "8b95612fe7661dd97cd2b07cee18b026"
  },
  {
    "url": "scripts/modules/immap/controllers/immap.home.js",
    "revision": "f32f9d7ffd3de42561ad51b132d09df2"
  },
  {
    "url": "scripts/modules/immap/controllers/immap.products.js",
    "revision": "1b6c70161bb723364b0f9b4ace10677f"
  },
  {
    "url": "scripts/modules/immap/controllers/immap.products.new.js",
    "revision": "fedc5a16922d4bbb7684a663a0e2d5eb"
  },
  {
    "url": "scripts/modules/immap/dashboards/dashboard.watchkeeper.js",
    "revision": "0c036d85b7de54eb6da8bb210421b3e4"
  },
  {
    "url": "scripts/modules/immap/views/immap.home.html",
    "revision": "43bd62c2d0fa6ee39cf35354aad8b8bd"
  },
  {
    "url": "scripts/modules/immap/views/products/immap.products.google.form.html",
    "revision": "fd74935920cc744f1764d5dde2b6d9cc"
  },
  {
    "url": "scripts/modules/snapshots/app.js",
    "revision": "82cf2f253ce80a88c23af830e2f5a011"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/cdc/dashboard.2017.10.js",
    "revision": "413f029b96738e5c6d46c7cced45af17"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/cdc/dashboard.2017.11.js",
    "revision": "5d9bab59e731e7f1cd4b7b0d2fd7477d"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/cdc/dashboard.2017.12.js",
    "revision": "008ab54f87f0e1bb82f45e14c07b558b"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/cdc/dashboard.2018.01.js",
    "revision": "c22138f50ab3b2138ece8bc5d9cf569e"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/drr/dashboard.drr.js",
    "revision": "a964d567f945b6006f013bd48855b968"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/reporthub/dashboard.reporthub.js",
    "revision": "42a3869c1ea2d8703a322b7312915b92"
  },
  {
    "url": "scripts/modules/snapshots/dashboards/who/dashboard.who.immap.js",
    "revision": "0b4f62f55d53109640c7612bc0af0bc7"
  },
  {
    "url": "scripts/widgets/ngm-calHeatmap/calHeatmap.js",
    "revision": "e27ee5d05306eb6448109c02e37898f5"
  },
  {
    "url": "scripts/widgets/ngm-calHeatmap/view.html",
    "revision": "def271841c70e916666c6617a0f2aa3e"
  },
  {
    "url": "scripts/widgets/ngm-dropzone/dropzone.js",
    "revision": "df386508601ddeb0b94ac84930c0cf5b"
  },
  {
    "url": "scripts/widgets/ngm-dropzone/template/default.html",
    "revision": "19c59bd26d021308caac2f8e30ceecc7"
  },
  {
    "url": "scripts/widgets/ngm-dropzone/template/upload.html",
    "revision": "33b798ee4b3b8d01f2b96b4c3889523a"
  },
  {
    "url": "scripts/widgets/ngm-dropzone/view.html",
    "revision": "637415f6f779c7d7f504ac5f445216df"
  },
  {
    "url": "scripts/widgets/ngm-highchart/highchart.js",
    "revision": "b6467b9c2e2267922e440f846749b0c1"
  },
  {
    "url": "scripts/widgets/ngm-highchart/template/center.html",
    "revision": "64281472da838ba03ed21b96740528e9"
  },
  {
    "url": "scripts/widgets/ngm-highchart/template/default.html",
    "revision": "9ea9ba25ee26fea7189d2418b69e28fe"
  },
  {
    "url": "scripts/widgets/ngm-highchart/template/flood-forecast.html",
    "revision": "78770f9feb334db6d9898b4b1c4129e1"
  },
  {
    "url": "scripts/widgets/ngm-highchart/template/promo.html",
    "revision": "1c32d70bad59a7f57dd92b5c9d356917"
  },
  {
    "url": "scripts/widgets/ngm-highchart/view.html",
    "revision": "b85d70f0f7f474cb8e2d1a4356c472a4"
  },
  {
    "url": "scripts/widgets/ngm-html/html.js",
    "revision": "d16f543ff464219af162d7b6f3652c7d"
  },
  {
    "url": "scripts/widgets/ngm-html/template/breadcrumb.html",
    "revision": "9218301561b8fb0f7d8273c4f124d36a"
  },
  {
    "url": "scripts/widgets/ngm-html/template/cluster.dashboard.admin.html",
    "revision": "97ec5c84f76076b14d9f420edb6457e7"
  },
  {
    "url": "scripts/widgets/ngm-html/template/cluster.dashboard.html",
    "revision": "aa3140cf3cc750c67e37b47f7ad6df74"
  },
  {
    "url": "scripts/widgets/ngm-html/template/COL/projectdonor.html",
    "revision": "591b70a4bba1a099071868d8a14758b1"
  },
  {
    "url": "scripts/widgets/ngm-html/template/COL/responsecomponents.html",
    "revision": "b8bb5fe12be9af85bef23dc38a2f2121"
  },
  {
    "url": "scripts/widgets/ngm-html/template/ctc.dashboard.html",
    "revision": "fcbc657a4088bf2da14e8d19ea0bb702"
  },
  {
    "url": "scripts/widgets/ngm-html/template/default.html",
    "revision": "6ea3b83af9e703f6adcaccdba1fc95f3"
  },
  {
    "url": "scripts/widgets/ngm-html/template/drought.dashboard.html",
    "revision": "f78325ec6919bf2f1232f74341c2d381"
  },
  {
    "url": "scripts/widgets/ngm-html/template/epr.admin.html",
    "revision": "11ae95276b10673d0674c9dd40549050"
  },
  {
    "url": "scripts/widgets/ngm-html/template/epr.dashboard.html",
    "revision": "0bb354298948510948c3023f9514d9e4"
  },
  {
    "url": "scripts/widgets/ngm-html/template/immap/products/immap.product.controls.html",
    "revision": "cb068c1d6f8523413218147b500eff40"
  },
  {
    "url": "scripts/widgets/ngm-html/template/immap/products/immap.products.list.html",
    "revision": "c5d6a6babb4355b19a7f3c41b056c818"
  },
  {
    "url": "scripts/widgets/ngm-html/template/nutrition.admin.html",
    "revision": "9f42ffc635f57d2df90f01dd565ec96b"
  },
  {
    "url": "scripts/widgets/ngm-html/template/nutrition.dashboard.html",
    "revision": "0229c3c1651d169b6a90e53244409529"
  },
  {
    "url": "scripts/widgets/ngm-html/template/tabs.html",
    "revision": "ae361587aeb7e98bde3fd4bb6e2092e8"
  },
  {
    "url": "scripts/widgets/ngm-html/view.html",
    "revision": "25d7df60b188a677615de1d0b753c5a7"
  },
  {
    "url": "scripts/widgets/ngm-leaflet/leaflet.js",
    "revision": "eec099fa1e8c280f5e2d3780b2358901"
  },
  {
    "url": "scripts/widgets/ngm-leaflet/view.html",
    "revision": "52718e33ea55d12c0d1339867ee1ce01"
  },
  {
    "url": "scripts/widgets/ngm-list/list.js",
    "revision": "67e40046cb2e5b7204fb223ea9bd6c2c"
  },
  {
    "url": "scripts/widgets/ngm-list/template/admin.list.upload.html",
    "revision": "957129855c699b67103d44c3f6a9da53"
  },
  {
    "url": "scripts/widgets/ngm-list/template/default.html",
    "revision": "c102b49988bcefe0e368db0d295325a1"
  },
  {
    "url": "scripts/widgets/ngm-list/template/hide_list.html",
    "revision": "1db2a70937190bd281b06042c3805cdd"
  },
  {
    "url": "scripts/widgets/ngm-list/template/list_upload.html",
    "revision": "733967c5c40573f848acec5804e61e22"
  },
  {
    "url": "scripts/widgets/ngm-list/template/report_somalia.html",
    "revision": "9544d62e449248b445a42631fdcb1364"
  },
  {
    "url": "scripts/widgets/ngm-list/template/report.html",
    "revision": "d06b2e6bd7f83f95009730afe3f92e6c"
  },
  {
    "url": "scripts/widgets/ngm-list/template/stock.html",
    "revision": "fe204ddcee5bae06315b51421f8474ec"
  },
  {
    "url": "scripts/widgets/ngm-list/view.html",
    "revision": "4af623ef4ed2b9dfcb8cd27549e3f4b4"
  },
  {
    "url": "scripts/widgets/ngm-modal/modal.js",
    "revision": "d687b67249ff1e0e87b5deeab6967e0c"
  },
  {
    "url": "scripts/widgets/ngm-modal/template/dews.modal.html",
    "revision": "e0eee228dddac93eab3f9de5aebcf331"
  },
  {
    "url": "scripts/widgets/ngm-modal/view.html",
    "revision": "95e2062cbd6d7008ba56eb428066722c"
  },
  {
    "url": "scripts/widgets/ngm-stats/stats.js",
    "revision": "b73fca595b671e029a722fab8c0e72ac"
  },
  {
    "url": "scripts/widgets/ngm-stats/template/default.html",
    "revision": "d7b25d114152bc16f8313a239f4d3380"
  },
  {
    "url": "scripts/widgets/ngm-stats/view.html",
    "revision": "fb945fc10ef992b3d57ca6cca23dfc04"
  },
  {
    "url": "scripts/widgets/ngm-table/table.js",
    "revision": "781c58ed753ce71a666e0f2356c27256"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/cluster/admin.progress.beneficiaries.html",
    "revision": "6aadc1104d7b2f27d8f6458303bd4e2d"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/cluster/admin.project.list.html",
    "revision": "50bf4929b35de5c50f8acea97c9b3505"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/drr/drr.flood.forecast.html",
    "revision": "2bdcf832ddb01e4b572c0830dad3367c"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/drr/drr.flood.forecast.list.html",
    "revision": "730eb77eec80036c3f9a62a44fdf04cf"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/epr/epr.list.html",
    "revision": "aa5aa28eb236d9215e6d8a6f4b613cfe"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/immap/products/immap.products.table.html",
    "revision": "f348a77aa665ec322ceab9b14ccc7e0b"
  },
  {
    "url": "scripts/widgets/ngm-table/templates/nutrition/nutrition.list.html",
    "revision": "9d98c3e9689474e105cb3b63b6e3a83c"
  },
  {
    "url": "scripts/widgets/ngm-table/view.html",
    "revision": "74b23030dbd2cb0a57ffc025fc378e2f"
  },
  {
    "url": "styles/iconfont.css",
    "revision": "22d410e260acade30bae3e24ece196a7"
  },
  {
    "url": "styles/iconfont/material-icons.css",
    "revision": "ff3e74b8aab07604027161591fd4adf2"
  },
  {
    "url": "styles/iconfont/MaterialIcons-Regular.eot",
    "revision": "e79bfd88537def476913f3ed52f4f4b3"
  },
  {
    "url": "styles/iconfont/MaterialIcons-Regular.svg",
    "revision": "60b333913565d0fd467d8616af325557"
  },
  {
    "url": "styles/iconfont/MaterialIcons-Regular.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "styles/iconfont/MaterialIcons-Regular.woff",
    "revision": "012cf6a10129e2275d79d6adac7f3b02"
  },
  {
    "url": "styles/iconfont/MaterialIcons-Regular.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "styles/main.css",
    "revision": "b783f73a595aa8e589e9a8c0a445c377"
  },
  {
    "url": "styles/ngm-dropzone.css",
    "revision": "d779bd1b6f239020993f299523f1fef8"
  },
  {
    "url": "styles/ngm-form.css",
    "revision": "147f33e7c0a95804521a603a46f7a949"
  },
  {
    "url": "styles/ngm-menu.css",
    "revision": "1cab0d92c4692815458ab82fab962d38"
  },
  {
    "url": "tableau/css/materialize.css",
    "revision": "a0cc5f51835d4c2bbf1258bb17b48d80"
  },
  {
    "url": "tableau/css/materialize.min.css",
    "revision": "2586113387d02e463f6f0476ea95b37f"
  },
  {
    "url": "tableau/css/style.css",
    "revision": "72cf5933f6248e655fb2400f6a6b72a4"
  },
  {
    "url": "tableau/images/favicon-32x32.png",
    "revision": "6a03fa2899f17ee1af013b801b7e37e0"
  },
  {
    "url": "tableau/images/logo-glc.svg",
    "revision": "ab8b9d963ccdfee92abec9d73e811b8e"
  },
  {
    "url": "tableau/images/logo-tableau.png",
    "revision": "14a3927003b8e6ca82868aeb49e20401"
  },
  {
    "url": "tableau/index.html",
    "revision": "f067fc76aa7240c0588dd18f07c3eca0"
  },
  {
    "url": "tableau/js/init.js",
    "revision": "4125a7f7b17ad3bb64452773f7b06f11"
  },
  {
    "url": "tableau/js/materialize.js",
    "revision": "3b9f146ee25dccbfcfa39f16b51c6938"
  },
  {
    "url": "tableau/js/materialize.min.js",
    "revision": "be48f2be03f94c8ffec804350dba05e6"
  },
  {
    "url": "tableau/js/tableauwdc-2.3.latest.js",
    "revision": "5583536c2749c17209f17b24faf78f21"
  },
  {
    "url": "tableau/modules/glc/cxb/315279.html",
    "revision": "7b6cba7923a56c81472b2c8d544edfb9"
  },
  {
    "url": "tableau/modules/glc/cxb/earthquakes.html",
    "revision": "1335c24d5c3f6b63df377c5cd78d8e15"
  },
  {
    "url": "tableau/modules/glc/cxb/js/315279.js",
    "revision": "d365d001620e0755745336b9369b7c72"
  },
  {
    "url": "tableau/modules/glc/cxb/js/earthquakes.js",
    "revision": "92f1aafa502e68ae8fa30e44f45c55e8"
  },
  {
    "url": "tableau/modules/glc/cxb/js/init.js",
    "revision": "12036022f2112acb593084f96449a6e7"
  },
  {
    "url": "views/app/dashboard.html",
    "revision": "1ef28f076befded756f6932aa985fc62"
  },
  {
    "url": "views/modals/contact.html",
    "revision": "c7d62fb6448087f2e2f5f6ab2ca4d53f"
  },
  {
    "url": "views/modals/loading.html",
    "revision": "f5cb85eb492190fcc29e462844797aeb"
  },
  {
    "url": "views/modals/maintenance.html",
    "revision": "21053653237cc6c9d1738f6489431dd4"
  },
  {
    "url": "views/modals/session.html",
    "revision": "bbe5b9d61fc5748f25020b60baeaa8d5"
  }
]);
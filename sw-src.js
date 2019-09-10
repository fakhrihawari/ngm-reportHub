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
workbox.precaching.precacheAndRoute([]);
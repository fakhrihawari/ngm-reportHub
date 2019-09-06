importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
workbox.setConfig({ debug: true })
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
workbox.precaching.precacheAndRoute([]);
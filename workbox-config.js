module.exports = {
	"globDirectory": "build/",
	"globPatterns": [
		"**/*.{html,js,css,png}"
	],
	"swDest": "build/sw.js",
	"clientsClaim": true,
	"skipWaiting": true,
	"globIgnores": ["**/firebase-messaging-sw.js"],
	"runtimeCaching": [{
    "urlPattern": "/.jpg$/",
		"handler": "cacheFirst",
		"options": {
			"cacheName": "my-image-cache",
			"expiration": {
				"maxEntries": 10,
				"maxAgeSeconds": 2592000
			}
		}
	}]
};

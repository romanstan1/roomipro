/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "fav128.png",
    "revision": "9f75efab90a92f0bbab60d1edde2d83f"
  },
  {
    "url": "fav512.png",
    "revision": "a38d266e076c58f622b111f911bc1071"
  },
  {
    "url": "index.html",
    "revision": "8a4dce9665ca1263c722e66dc76fff58"
  },
  {
    "url": "static/css/main.58ce45c9.css",
    "revision": "ee350f518ef98c2ecfd98e8a691738c0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/.jpg$/", workbox.strategies.cacheFirst({ "cacheName":"my-image-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":10,"maxAgeSeconds":2592000,"purgeOnQuotaError":false})] }), 'GET');

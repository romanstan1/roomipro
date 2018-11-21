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
    "revision": "5c4438deeeab8dea2724d2e88d7b1819"
  },
  {
    "url": "static/css/main.81bbd2a6.css",
    "revision": "90c1f7532866724afccb67fb7623cb4a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/.jpg$/", workbox.strategies.cacheFirst({ "cacheName":"my-image-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":10,"maxAgeSeconds":2592000,"purgeOnQuotaError":false})] }), 'GET');

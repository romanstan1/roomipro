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

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "asset-manifest.json",
    "revision": "1999fea1f7ef8500e8b19d5869b33c9a"
  },
  {
    "url": "favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "firebase-messaging-sw.js",
    "revision": "91d35e432c5c7e698dab5f9a3099ac6e"
  },
  {
    "url": "index.html",
    "revision": "61fbdf830014bf3a7ab810c748185ed7"
  },
  {
    "url": "manifest.json",
    "revision": "173d8350dd303a8e4843be68115076de"
  },
  {
    "url": "static/css/main.a836d2ca.css",
    "revision": "c5969c43de9818ca45bbf8194e58a191"
  },
  {
    "url": "static/js/main.ccd90b45.js",
    "revision": "2e9f3003eb0a939a8c1d021a7d6157ff"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

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
    "revision": "db629312421438a1648d978cd5f1d0c5"
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
    "revision": "c45b3489587e0bc5df590d79c804ba0c"
  },
  {
    "url": "manifest.json",
    "revision": "173d8350dd303a8e4843be68115076de"
  },
  {
    "url": "static/css/main.a81264b0.css",
    "revision": "88a02ac46436dd69e1e8dec73d30589a"
  },
  {
    "url": "static/js/main.decbee56.js",
    "revision": "896671b33261f839bf421967b1d088e8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

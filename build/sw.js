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
    "revision": "4d806bba37ff745d769400bed987c806"
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
    "revision": "20bb2a5112a7bd9d5775f0c25c0b206d"
  },
  {
    "url": "manifest.json",
    "revision": "173d8350dd303a8e4843be68115076de"
  },
  {
    "url": "static/css/main.99c71702.css",
    "revision": "9bc59141e48ad6d11f790013c5befaff"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

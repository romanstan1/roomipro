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
    "revision": "7842a3a0c8822232dbbe3011dc35b265"
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
    "revision": "abe2d8070984afaa98faf8d87030340b"
  },
  {
    "url": "manifest.json",
    "revision": "173d8350dd303a8e4843be68115076de"
  },
  {
    "url": "static/css/main.d43037d5.css",
    "revision": "5ff291ef2defb7dc863333f4c8c29071"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

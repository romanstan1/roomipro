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
    "revision": "65ee093787e8a5381c4ce59e1f9a0714"
  },
  {
    "url": "favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "firebase-messaging-sw.js",
    "revision": "952a65ffb1632b40c1953efeb8084a15"
  },
  {
    "url": "index.html",
    "revision": "9e2552a32c6f79bfe27e5e9580d39fbf"
  },
  {
    "url": "static/css/main.55bcce6c.css",
    "revision": "f7e6614edcc2c716ed1d5319a0b9e3ba"
  },
  {
    "url": "static/js/main.fdea0fd8.js",
    "revision": "6f0b40ecad1b16b3fe4554ba0ffc1b36"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

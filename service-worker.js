"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","a1d83b5e71f24bceb4169448af45e8ef"],["service-worker.js","32a4bb3dee9d0c9dc795bfbb59568053"],["static/css/app.8d46d18328a3a6f04cff24de6aa72085.css","72e46bcd5a0a208195a3ecb5ee035b54"],["static/images/bg-front.png","531b5e2c72edb436f59a32035170b2f2"],["static/images/bg.png","8d854946d7c4942326a577dfedd2340c"],["static/images/content.png","473ec37860021096a4ab0215449e23d5"],["static/images/design.png","715a92f763cd41add46de6910a7dda85"],["static/images/logo-black.png","67391ce25d12c7fc9fd4065dac3ce112"],["static/images/logo.png","232f3cdc1552b784d2d39ddad1fca771"],["static/images/marketing.png","00e93a7cf01ed6df6c61c2e035a2935c"],["static/images/programming.png","ef22a94db9df10df4d69771a52ba42d1"],["static/js/app.9c2c0285c62fef0a77b5.js","d4e454cefe7f9f2617ed66ff2243d30d"],["static/js/manifest.b032026e3bc2a9d539d6.js","007b36f242398c239e8627895df5c265"],["static/js/vendor.3b45c73d4eeba9b61266.js","081b9f81a3218cfc4456b2422323a75b"]],cacheName="sw-precache-v3-yw15-announcement-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,!1);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});
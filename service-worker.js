"use strict";

function setOfCachedUrls(e) {
  return e.keys().then(function(e) {
    return e.map(function(e) {
      return e.url
    })
  }).then(function(e) {
    return new Set(e)
  })
}
var precacheConfig = [
    ["index.html", "aba740d604b177fef2f527636b235d63"],
    ["service-worker.js", "58988870f7a10130abb550bf871c8160"],
    ["static/css/app.609388b827b81b57026df9c7e27ac997.css", "1a76ba01bff4765dd6e7d84ecf23ad57"],
    ["static/images/bg-front.png", "531b5e2c72edb436f59a32035170b2f2"],
    ["static/images/bg.png", "8d854946d7c4942326a577dfedd2340c"],
    ["static/images/content.png", "473ec37860021096a4ab0215449e23d5"],
    ["static/images/design.png", "715a92f763cd41add46de6910a7dda85"],
    ["static/images/logo-black.png", "67391ce25d12c7fc9fd4065dac3ce112"],
    ["static/images/logo.png", "232f3cdc1552b784d2d39ddad1fca771"],
    ["static/images/marketing.png", "00e93a7cf01ed6df6c61c2e035a2935c"],
    ["static/images/programming.png", "ef22a94db9df10df4d69771a52ba42d1"],
    ["static/js/0.c7aa9e19f0362441a14f.js", "6bfaf3e5e3c1c742cbd6bf74d3465050"],
    ["static/js/1.c07f15fc60de6007460a.js", "46204b7777fd3a8a3b604feccfe2f7d0"],
    ["static/js/2.9b4212254433aad160d9.js", "9dff2bce08e98784fc4f33315efbf82b"],
    ["static/js/3.31cac65bd211e146c566.js", "95ef0229ea97c24f5b6df091d4936b3b"],
    ["static/js/4.1e93410bf43b4229a241.js", "6d8b8c6d396a2bf4827b8dfc590e73f2"],
    ["static/js/app.805eb34371e6be74303e.js", "20f85f0ca4d0eec31053a2c079879aec"],
    ["static/js/manifest.12654d94fa17b93a8ceb.js", "4949072e8001029a3c94d2064cff3c27"],
    ["static/js/vendor.ae09b37f763734ed23a8.js", "de5c054c6c4333d8bb257d01dbc061dd"]
  ],
  cacheName = "sw-precache-v3-my-vue-app-" + (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var a = new URL(e);
    return "./" === a.pathname.slice(-1) && (a.pathname += t), a.toString()
  },
  cleanResponse = function(e) {
    if (!e.redirected) return Promise.resolve(e);
    return ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
      return new Response(t, {
        headers: e.headers,
        status: e.status,
        statusText: e.statusText
      })
    })
  },
  createCacheKey = function(e, t, a, n) {
    var r = new URL(e);
    return n && r.pathname.match(n) || (r.search += (r.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(a)), r.toString()
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var a = new URL(t).pathname;
    return e.some(function(e) {
      return a.match(e)
    })
  },
  stripIgnoredUrlParameters = function(e, t) {
    var a = new URL(e);
    return a.hash = "", a.search = a.search.slice(1).split("&").map(function(e) {
      return e.split("=")
    }).filter(function(e) {
      return t.every(function(t) {
        return !t.test(e[0])
      })
    }).map(function(e) {
      return e.join("=")
    }).join("&"), a.toString()
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(precacheConfig.map(function(e) {
    var t = e[0],
      a = e[1],
      n = new URL(t, self.location),
      r = createCacheKey(n, hashParamName, a, !1);
    return [n.toString(), r]
  }));
self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(cacheName).then(function(e) {
    return setOfCachedUrls(e).then(function(t) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a) {
        if (!t.has(a)) {
          var n = new Request(a, {
            credentials: "same-origin"
          });
          return fetch(n).then(function(t) {
            if (!t.ok) throw new Error("Request for " + a + " returned a response with status " + t.status);
            return cleanResponse(t).then(function(t) {
              return e.put(a, t)
            })
          })
        }
      }))
    })
  }).then(function() {
    return self.skipWaiting()
  }))
}), self.addEventListener("activate", function(e) {
  var t = new Set(urlsToCacheKeys.values());
  e.waitUntil(caches.open(cacheName).then(function(e) {
    return e.keys().then(function(a) {
      return Promise.all(a.map(function(a) {
        if (!t.has(a.url)) return e.delete(a)
      }))
    })
  }).then(function() {
    return self.clients.claim()
  }))
}), self.addEventListener("fetch", function(e) {
  if ("GET" === e.request.method) {
    var t, a = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    (t = urlsToCacheKeys.has(a)) || (a = addDirectoryIndex(a, "index.html"), t = urlsToCacheKeys.has(a));
    t && e.respondWith(caches.open(cacheName).then(function(e) {
      return e.match(urlsToCacheKeys.get(a)).then(function(e) {
        if (e) return e;
        throw Error("The cached response that was expected is missing.")
      })
    }).catch(function(t) {
      return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request)
    }))
  }
});

/* FOR LOCAL DEVELOPMENT - can also enable CRA SERVICE WORKER for DEVELOPMENT */

/*
var CACHE_NAME = "pwa-task-manager";
var urlsToCache = [];

// Install a service worker

self.addEventListener("install", event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", event => {
  var cacheWhitelist = ["pwa-task-manager"];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function(event) {
  if (event.data) {
    const data = event.data.json();

    const title = data.title;
    const message = data.message;

    const options = {
      body: message
      // here you can add more properties like icon, image, vibrate, etc.
    };
    self.registration.showNotification(title, options);
  } else {
    console.log("Push event but no data");
  }
});

*/

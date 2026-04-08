// sw.js
const CACHE_NAME = "speak-read-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/read.html",
  "/results.html",
  "/styles.css",
  "/js/home.js",
  "/js/read-page.js",
  "/js/results-page.js",
  "/js/passages.js",
  "/js/recorder.js",
  "/js/storage.js",
  "/js/utils.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

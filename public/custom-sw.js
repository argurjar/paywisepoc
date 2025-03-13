// Step 4: Service Worker (public/custom-sw.js)
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  self.clients.claim();
});

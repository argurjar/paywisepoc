self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
});

self.addEventListener("sync", (event) => {
  if (event.tag === "location-sync") {
    event.waitUntil(updateLocation());
  }
});

async function updateLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Background Location:", position.coords);

          // Backend API ko location bhejna
          fetch("https://surprising-proceeding-shaved-polar.trycloudflare.com/api/update-location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          });

          resolve();
        },
        (error) => {
          console.error("Error getting background location:", error);
          reject(error);
        }
      );
    }
  });
}

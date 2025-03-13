// // Step 3: Web Worker for Background Location Tracking (public/locationWorker.js)
// self.onmessage = async function (event) {
//   if (event.data === "startTracking") {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           self.postMessage({
//             type: "location",
//             payload: {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             },
//           });
//         },
//         (error) => console.error("Geolocation Error:", error),
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//       );
//     } else {
//       console.error("Geolocation not available");
//     }
//   }
// };

// Web Workers do NOT have access to `navigator.geolocation`
// Move geolocation handling to the main thread
self.onmessage = function (event) {
  if (event.data.type === "startTracking" && event.data.coords) {
    self.postMessage({
      type: "location",
      payload: event.data.coords,
    });
  }
};

// // Step 5: Home Page with Worker Setup (app/page.js)
// "use client";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     const worker = new Worker("/locationWorker.js");
//     worker.postMessage("startTracking");

//     worker.onmessage = (event) => {
//       if (event.data.type === "location") {
//         console.log("Received location", event.data.payload);
//         setLocation(event.data.payload);
//         fetch(
//           "https://surprising-proceeding-shaved-polar.trycloudflare.com/api/update-location",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(event.data.payload),
//           }
//         );
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>PWA Location Tracking</h1>
//       {location ? (
//         <p>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </p>
//       ) : (
//         <p>Fetching location...</p>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null);
  let worker;

  useEffect(() => {
    if ("Worker" in window) {
      worker = new Worker("/locationWorker.js");

      worker.onmessage = (event) => {
        if (event.data.type === "location") {
          console.log("Received location", event.data.payload);
          setLocation(event.data.payload);

          fetch("https://surprising-proceeding-shaved-polar.trycloudflare.com/api/update-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event.data.payload),
          });
        }
      };
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          if (worker) {
            worker.postMessage({ type: "startTracking", coords });
          }
        },
        (error) => console.error("Geolocation Error:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      console.error("Geolocation not available");
    }
  }, []);

  return (
    <div>
      <h1>PWA Location Tracking</h1>
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}

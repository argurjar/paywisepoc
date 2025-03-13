// Step 2: Register Service Worker (app/layout.tsx or app/layout.js)
"use client";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.register("/custom-sw.js").then((reg) => {
    //     console.log("Service Worker Registered:", reg);
    //   });
    // }

    useEffect(() => {
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.register("/custom-sw.js").then((registration) => {
          console.log("Service Worker Registered");

          if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition((position) => {
              console.log("Location:", position.coords);
              registration.sync.register("location-sync");
            });
          }
        });
      }
    }, []);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}

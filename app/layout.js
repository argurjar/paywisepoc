// Step 2: Register Service Worker (app/layout.tsx or app/layout.js)
"use client";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/custom-sw.js").then((reg) => {
        console.log("Service Worker Registered:", reg);
      });
    }
  }, []);

  return <>{children}</>;
}

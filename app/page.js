"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerShadow from "/public/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl:
    "https://tse3.mm.bing.net/th?id=OIP.ks5kH0YpgDUB1Jl9st9o3wHaHa&pid=Api&P=0&h=220",
  iconRetinaUrl:
    "https://tse3.mm.bing.net/th?id=OIP.ks5kH0YpgDUB1Jl9st9o3wHaHa&pid=Api&P=0&h=220",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Home() {
  const [location, setLocation] = useState(null); // Initially NULL
  const [address, setAddress] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setAddress(data.display_name || "Location not found");
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setAddress("Location access denied");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setAddress("Geolocation is not supported in this browser.");
    }
  }, []);

  if (!location) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Fetching your location...
      </p>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Real-Time Location Tracking</h1>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
      <p>
        <strong>Address:</strong> {address}
      </p>

      {/* Map Container */}
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        style={{
          height: "400px",
          width: "400px",
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.cartocdn.org/copyright">cartocdn</a> contributors'
        />
        <Marker position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>
            <strong>Your Location</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [location, setLocation] = useState({ lat: null, lng: null });
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });

//           // Fetch address from latitude & longitude
//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//             );
//             const data = await response.json();
//             setAddress(data.display_name || "Location not found");
//           } catch (error) {
//             console.error("Error fetching location:", error);
//           }
//         },
//         (error) => console.error(error),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Real-Time Location Tracking</h1>
//       <p>Latitude: {location.lat}</p>
//       <p>Longitude: {location.lng}</p>
//       <p><strong>Address:</strong> {address}</p>
//     </div>
//   );
// }

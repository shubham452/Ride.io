import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icon URLs for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapClickHandler({ pointA, setPointA, pointB, setPointB }) {
  useMapEvents({
    click(e) {
      if (!pointA) {
        console.log("Set PointA:", e.latlng);
        setPointA(e.latlng);
      } else if (!pointB) {
        console.log("Set PointB:", e.latlng);
        setPointB(e.latlng);
      }
    },
  });
  return null;
}

function LocationMarker({ setPointA, setUserLocated, pointA }) {
  useEffect(() => {
    if (!navigator.geolocation || pointA) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Geolocation set PointA:", pos.coords);
        setPointA({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setUserLocated(true);
      },
      () => {
        console.log("Geolocation error");
        setUserLocated(false);
      }
    );
  }, [setPointA, setUserLocated, pointA]);
  return null;
}

function RoutingMachine({ pointA, pointB, setRouteInfo, setLoading }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !pointA || !pointB) {
      console.log("RoutingMachine: missing requirements", { map, pointA, pointB });
      return;
    }
    setLoading(true);

    const control = L.Routing.control({
      waypoints: [
        L.latLng(pointA.lat, pointA.lng),
        L.latLng(pointB.lat, pointB.lng),
      ],
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      routeWhileDragging: false,
      createMarker: () => null,
    })
      .on("routesfound", function (e) {
        const route = e.routes[0];
        const info = {
          distance: (route.summary.totalDistance / 1000).toFixed(2),
          time: Math.round(route.summary.totalTime / 60),
        };
        setRouteInfo(info);
        console.log("Route found and setRouteInfo:", info);
        setLoading(false);
      })
      .on("routingerror", function (err) {
        console.log("Routing error:", err);
        setLoading(false);
      })
      .addTo(map);

    return () => {
      map.removeControl(control);
      console.log("RoutingMachine unmounted");
    };
  }, [map, pointA, pointB, setRouteInfo, setLoading]);

  return null;
}

const MapPage = () => {
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLocated, setUserLocated] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  const mapCenter = pointA ? [pointA.lat, pointA.lng] : [28.61, 77.23];

  const resetRoute = () => {
    setPointA(null);
    setPointB(null);
    setRouteInfo(null);
    setUserLocated(null);
    setShowRoute(false);
    console.log("Reset route and all state");
  };

  useEffect(() => {
    console.log("State:",
      { pointA, pointB, showRoute, routeInfo, loading }
    );
  }, [pointA, pointB, showRoute, routeInfo, loading]);

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 8, background: "#f6f8fb" }}>
        <button onClick={resetRoute} style={{ marginRight: 10 }}>🔄 New route</button>
        <span>
          {pointA && !pointB
            ? "Select destination (Point B) on the map"
            : !pointA
            ? "Select start point (Point A) on the map or use your location"
            : ""}
        </span>
        <button
          onClick={() => setUserLocated(true)}
          disabled={!!pointA}
          style={{ marginLeft: 10 }}
        >
          📍 Use My Location
        </button>
        {(pointA && pointB && !showRoute) && (
          <button
            style={{
              marginLeft: 10,
              background: "#001e5a",
              color: "#fff",
              borderRadius: 4,
              padding: "5px 15px",
            }}
            onClick={() => {
              setShowRoute(true);
              console.log("Show Route clicked");
            }}
          >
            Show Route
          </button>
        )}
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler pointA={pointA} setPointA={setPointA} pointB={pointB} setPointB={setPointB} />
          {userLocated && !pointA && (
            <LocationMarker setPointA={setPointA} setUserLocated={setUserLocated} pointA={pointA} />
          )}
          {pointA && <Marker position={[pointA.lat, pointA.lng]} />}
          {pointB && <Marker position={[pointB.lat, pointB.lng]} />}
          {showRoute && pointA && pointB && (
            <RoutingMachine
              pointA={pointA}
              pointB={pointB}
              setRouteInfo={setRouteInfo}
              setLoading={setLoading}
            />
          )}
        </MapContainer>
        {pointA && (
          <div
            style={{
              position: "absolute",
              left: "15px",
              top: "60px",
              background: "rgba(255,255,255,0.85)",
              padding: "8px 12px",
              borderRadius: 8,
              minWidth: 150,
              zIndex: 1000,
            }}
          >
            <b>Point A</b>:<br />({pointA.lat.toFixed(5)}, {pointA.lng.toFixed(5)})
            {pointB && (
              <>
                <br />
                <b>Point B</b>:<br />({pointB.lat.toFixed(5)}, {pointB.lng.toFixed(5)})
              </>
            )}
            {showRoute && routeInfo && (
              <>
                {console.log("Showing distance/time in overlay:", routeInfo)}
                <br /><br />
                <b>Distance:</b> {routeInfo.distance} km<br />
                <b>Time:</b> {routeInfo.time} min
              </>
            )}
            {loading && <div>Loading route...</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    });

    function MapClickHandler({ pointA, setPointA, pointB, setPointB }) {
    useMapEvents({
        click(e) {
        if (!pointA) setPointA(e.latlng);
        else if (!pointB) setPointB(e.latlng);
        },
    });
    return null;
    }

    function LocationMarker({ setPointA, setUserLocated, pointA }) {
    useEffect(() => {
        if (!navigator.geolocation || pointA) return;
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            setPointA({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setUserLocated(true);
        },
        () => setUserLocated(false)
        );
    }, [setPointA, setUserLocated, pointA]);
    return null;
    }

    function RoutingMachine({ pointA, pointB, setRouteInfo, setLoading }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !pointA || !pointB) return;

        setLoading(true);

        const control = L.Routing.control({
        waypoints: [L.latLng(pointA.lat, pointA.lng), L.latLng(pointB.lat, pointB.lng)],
        lineOptions: { styles: [{ color: "blue", weight: 5 }] },
        show: true,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        routeWhileDragging: false,
        createMarker: () => null,
        })
        .on("routesfound", (e) => {
            const route = e.routes[0];
            setRouteInfo({
            distance: (route.summary.totalDistance / 1000).toFixed(2),
            time: Math.round(route.summary.totalTime / 60),
            });
            setLoading(false);
        })
        .on("routingerror", () => setLoading(false))
        .addTo(map);

        return () => map.removeControl(control);
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
    };

    return (
        <div className="h-screen w-screen flex flex-col">
        {/* Top Bar */}
        <div className="p-4 bg-gray-100 flex items-center justify-start gap-4 shadow-sm border-b border-gray-200">
            <button onClick={resetRoute} className="text-sm bg-white px-3 py-2 rounded border hover:bg-gray-200">
            New route
            </button>
            <span className="text-sm text-gray-700">
            {pointA && !pointB
                ? "Select destination (Point B) on the map"
                : !pointA
                ? "Select start point (Point A) or use your location"
                : ""}
            </span>
            <button
            onClick={() => setUserLocated(true)}
            disabled={!!pointA}
            className={`text-sm px-3 py-2 rounded border ${pointA ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
            >
            Use My Location
            </button>
            {pointA && pointB && !showRoute && (
            <button
                onClick={() => setShowRoute(true)}
                className="ml-auto bg-blue-800 hover:bg-blue-900 text-white text-sm px-4 py-2 rounded"
            >
                Show Route
            </button>
            )}
        </div>

        {/* Map Section */}
        <div className="flex-1 relative">
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom className="h-full w-full z-0">
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

            {/* Info Overlay */}
            {pointA && (
            <div className="absolute top-16 left-4 bg-white/90 shadow-md rounded-lg p-4 z-[999] min-w-[180px] text-sm">
                <div>
                <strong>Point A:</strong><br />
                ({pointA.lat.toFixed(5)}, {pointA.lng.toFixed(5)})
                </div>
                {pointB && (
                <div className="mt-2">
                    <strong>Point B:</strong><br />
                    ({pointB.lat.toFixed(5)}, {pointB.lng.toFixed(5)})
                </div>
                )}
                {showRoute && routeInfo && (
                <div className="mt-4 border-t pt-2">
                    <div><strong>Distance:</strong> {routeInfo.distance} km</div>
                    <div><strong>Time:</strong> {routeInfo.time} min</div>
                </div>
                )}
                {loading && <div className="mt-2 text-blue-700">Loading route...</div>}
            </div>
            )}
        </div>
        </div>
    );
};

export default MapPage;

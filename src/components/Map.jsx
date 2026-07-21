import React, { useContext, useEffect } from "react";
import { Weathercontext } from "../context/Weathercontext";
import "../styling/map.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
function ChangeView({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);

  return null;
}
const WeatherMap = () => {
  const { tempData } = useContext(Weathercontext);

  return (
    <div className="mapdiv">
      {tempData ? (
        <div className="map">
          <MapContainer
            center={[tempData.latitude, tempData.longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <ChangeView
              lat={tempData.latitude}
              lng={tempData.longitude}
            />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            <Marker position={[tempData.latitude, tempData.longitude]}>
              <Popup>{tempData.city || "Current Location"}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <div className="map2">
          <h2 className="maptext">📍 Location Unavailable</h2>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;
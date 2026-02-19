import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Station } from "../types/Station";

interface StationsMapProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelect: (station: Station) => void;
}

const germanyCenter: [number, number] = [51.1657, 10.4515];

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ⬇️ این کامپوننت فقط مسئول جابه‌جا کردن ویو است
const RecenterOnChange: React.FC<{
  center: [number, number];
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, zoom); // یا map.flyTo(center, zoom)
  }, [map, center, zoom]);

  return null;
};

export const StationsMap: React.FC<StationsMapProps> = ({
  stations,
  selectedStation,
  onSelect,
}) => {
  const center: [number, number] =
    selectedStation != null
      ? [selectedStation.lat, selectedStation.lng]
      : stations.length > 0
        ? [stations[0].lat, stations[0].lng]
        : germanyCenter;

  const zoom = selectedStation || stations.length > 0 ? 11 : 5;

  return (
    <MapContainer center={center} zoom={zoom}>
      {/* اینجا اضافه شد تا روی هر تغییر center/zoom، ویو واقعاً عوض شود */}
      <RecenterOnChange center={center} zoom={zoom} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onSelect(station),
          }}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            {station.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

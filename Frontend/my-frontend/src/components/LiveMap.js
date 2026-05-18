import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function LiveMap({ location }) {
  if (!location) return <p>No location yet</p>;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={15}
      style={{ height: "300px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[location.lat, location.lng]} />
    </MapContainer>
  );
}
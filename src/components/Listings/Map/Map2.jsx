import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin2 from "./Pin2";

const Map2 = ({ item }) => {
  return (
    <MapContainer
      className="h-[300px] w-full rounded-md"
      center={[item?.latitude, item?.longitude]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Pin2 item={item} />
    </MapContainer>
  );
};

export default Map2;

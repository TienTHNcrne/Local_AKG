import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icon marker không hiện
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: shadow,
});

const MapView = ({ data }) => {
    const center = [data[0].lat, data[0].lng]; // lấy vị trí đầu tiên làm center

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {data.map((place) => (
                <Marker key={place.id} position={[place.lat, place.lng]}>
                    <Popup>
                        <strong>{place.name}</strong>
                        <br />
                        {place.description}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;

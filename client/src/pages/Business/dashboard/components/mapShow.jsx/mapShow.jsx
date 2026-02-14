import React from "react";
import styles from "./mapShow.module.scss";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ZoomControl } from "react-leaflet";
export default function mapShow() {
    return (
        <div className={styles.map}>
            {" "}
            <MapContainer
                center={[10.173, 104.237]}
                zoom={9}
                className={styles.map}
                zoomControl={false}
                doubleClickZoom={false}
            >
                <ZoomControl position="topright" />

                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="MapTiler Streets">
                        <TileLayer
                            url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=WCKUTbdVx5gBcrVCqpsa"
                            attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Light">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Dark">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Esri World Imagery">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="Tiles &copy; Esri"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </div>
    );
}

/** @format */

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
export default function Maps({ className }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios.get("/data.geojson").then((res) => {
			setData(res.data);
		});
	}, []);
	const onEachFeature = (feature, layer) => {
		const p = feature.properties;
		const popupContent = `${p.ten_xa}`;
		layer.bindPopup(popupContent);
	};

	return (
		<MapContainer
			center={[10.173, 104.237]}
			zoom={8}
			minZoom={8}
			className={className}
		>
			<TileLayer
				url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
				attribution='Tiles &copy; Esri'
			/>
			{data && (
				<GeoJSON
					data={data}
					style={() => ({
						fillColor: "#00cc66",
					})}
					onEachFeature={onEachFeature}
				/>
			)}
		</MapContainer>
	);
}

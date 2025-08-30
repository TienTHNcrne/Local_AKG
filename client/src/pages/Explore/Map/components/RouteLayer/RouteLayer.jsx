import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-ant-path";
import React, { useEffect, useMemo } from "react";

export default function RouteLayer({ draw }) {
    const map = useMap();

    const coords = useMemo(() => {
        return (
            draw?.features?.[0]?.geometry?.coordinates?.map(([lng, lat]) => [
                lat,
                lng,
            ]) || []
        );
    }, [draw]);

    useEffect(() => {
        if (!coords.length) return;

        // Bay camera tới route
        const bounds = L.latLngBounds(coords);
        map.flyToBounds(bounds, { padding: [50, 50], duration: 2 });

        // Vẽ AntPath với màu sắc mới
        const antPolyline = L.polyline
            .antPath(coords, {
                color: "#e5483aae", // Màu tím đậm hiện đại
                weight: 6,
                delay: 800,
                dashArray: [15, 25],
                pulseColor: "#e5483aff", // Màu tím nhạt cho hiệu ứng
                opacity: 0.9,
                interactive: false,
            })
            .addTo(map);

        // cleanup khi unmount
        return () => {
            map.removeLayer(antPolyline);
        };
    }, [coords, map]);

    return null;
}

import React, { useEffect } from "react";

import { useMap } from "react-leaflet";

export default function FlyToPlace({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center.lat && center.lng) {
            map.flyTo([center.lat, center.lng], 17);
        }
    }, [center, map]);
    return null;
}

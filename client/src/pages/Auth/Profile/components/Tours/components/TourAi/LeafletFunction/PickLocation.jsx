/** @format */

import { Marker, useMapEvents } from 'react-leaflet';

export default function PickLocation({ setPosition }) {
    useMapEvents({
        click(e) {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
}

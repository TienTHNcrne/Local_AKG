/** @format */

import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import './Icons.css';

// Create the custom locate control
function CreateLocateControl({ map }) {
    // Check if control already exists
    if (map._locateControl) return;

    L.Control.Locate = L.Control.extend({
        onAdd: function () {
            const btn = L.DomUtil.create(
                'button',
                'leaflet-bar leaflet-control-locate'
            );
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>`;
            btn.title = 'Find my location';

            L.DomEvent.on(btn, 'click', e => {
                L.DomEvent.stopPropagation(e);
                map.locate({
                    setView: true,
                    maxZoom: 16,
                    enableHighAccuracy: true,
                });
            });

            L.DomEvent.disableClickPropagation(btn);
            L.DomEvent.disableScrollPropagation(btn);

            return btn;
        },

        onRemove: function () {
            map._locateControl = null;
        },
    });

    L.control.locate = function (opts) {
        return new L.Control.Locate(opts);
    };

    map._locateControl = L.control.locate({ position: 'topleft' }).addTo(map);
}

export default function GetLocation({ setPos }) {
    const map = useMap();

    useMapEvents({
        locationfound(e) {
            const zoomLevel = Math.max(map.getZoom(), 16);
            map.flyTo(e.latlng, zoomLevel);
            setPos({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                accuracy: e.accuracy, // Include accuracy if needed
            });
        },
        locationerror(e) {
            console.error('Location access denied or unavailable:', e.message);
            // Optional: Show user-friendly error message
            alert(
                'Unable to access your location. Please check your browser permissions.'
            );
        },
    });

    useEffect(() => {
        if (!map._locateControlCreated) {
            CreateLocateControl({ map });
            map._locateControlCreated = true;
        }

        // Cleanup function
        return () => {
            if (map._locateControl) {
                map.removeControl(map._locateControl);
                map._locateControl = null;
                map._locateControlCreated = false;
            }
        };
    }, [map]);

    return null;
}

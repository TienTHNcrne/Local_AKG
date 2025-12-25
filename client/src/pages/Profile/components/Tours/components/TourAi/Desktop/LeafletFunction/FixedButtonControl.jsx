/** @format */

// FixedButtonControl.js
import { useEffect } from 'react';
import L from 'leaflet';

export default function FixedButtonControl({ onClick }) {
    useEffect(() => {
        const CustomControl = L.Control.extend({
            onAdd: function () {
                const btn = L.DomUtil.create('div', 'fixed-btn-control');
                btn.innerHTML = '★'; // icon của bạn
                btn.style.width = '32px';
                btn.style.height = '32px';
                btn.style.background = 'white';
                btn.style.borderRadius = '6px';
                btn.style.boxShadow = '0 0 6px rgba(0,0,0,.3)';
                btn.style.display = 'flex';
                btn.style.justifyContent = 'center';
                btn.style.alignItems = 'center';
                btn.style.cursor = 'pointer';

                btn.onclick = onClick;

                return btn;
            },
        });

        const control = new CustomControl({ position: 'topright' });
        control.addTo(window.__MAP__);

        return () => {
            control.remove();
        };
    }, [onClick]);

    return null;
}

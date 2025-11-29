/** @format */

import axios from 'axios';
const Find = async place => {
    try {
        const result = await axios.get(
            'https://nominatim.openstreetmap.org/search',
            {
                params: {
                    q: place,
                    format: 'json',
                    viewbox: '102.15,23.3833,109.4,8.5667',
                    bounded: 1,
                    countrycodes: 'vn',
                },
                headers: { 'User-Agent': 'MyApp/1.0 (your@email.com)' },
            }
        );

        return {
            status: 200,
            data: result.data,
        };
    } catch (err) {
        console.log(err);
    }
};

const TradePosToAddress = async pos => {
    try {
        const result = await axios.get(
            'https://nominatim.openstreetmap.org/reverse',
            {
                params: {
                    lon: pos.lng,
                    lat: pos.lat,
                    addressdetails: 1,
                    countrycodes: 'vn',
                    format: 'json',
                },
                headers: {
                    'User-Agent': 'tienguyen3541@gmail.com',
                },
            }
        );
        return {
            status: 200,
            data: result.data,
        };
    } catch (err) {
        console.log(err);
    }
};
export { Find, TradePosToAddress };

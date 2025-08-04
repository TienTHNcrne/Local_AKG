import React from "react";

import axios from "axios";
export default async function Create(center, search, description) {
    console.log(center, " ", search);
    try {
        await axios.get(`${import.meta.env.VITE_BE_URL}/v1/api/gps`, {
            params: {
                lat: center.lat,
                lng: center.lng,
                name: search,
                description: description,
            },
        });
    } catch (err) {
        console.error(err.message);
    }
}

/** @format */

import React, { useState, useEffect } from 'react';

import axios from 'axios';
export default function useFindPlace({ keyword, coordinate }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const coords = Array.isArray(coordinate) ? coordinate : [];

        if (!keyword) {
            setData(coords);
            return;
        }

        setData(
            coordinate.filter(i =>
                i.name.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    }, [keyword, coordinate]);
    return data;
}

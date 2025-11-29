/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Row3.module.scss';

export default function Row3() {
    const [places, setPlaces] = useState([]);
    const [randomPlaces, setRandomPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    function getRandomElements(arr, n) {
        if (!arr || arr.length === 0) return [];
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/gps/all`
                );
                setPlaces(res.data);
                const randomPlaces = getRandomElements(res.data, 4);
                setRandomPlaces(randomPlaces);
            } catch (err) {
                console.error('Error fetching places:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    // ---- GET NAME OF PLACE ----
    const getPlaceName = name => {
        if (!name) return 'Đang tải...';
        const index = name.indexOf(',');
        return index !== -1 ? name.slice(0, index) : name;
    };

    const getShortDescription = description => {
        if (!description) return 'Khám phá địa điểm tuyệt vời này...';
        return description.length > 120 ?
                `${description.substring(0, 120)}...`
            :   description;
    };

    if (loading) {
        return (
            <div className={styles.Container}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải địa điểm...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.Container}>
            <div className={styles.row1}>
                <h1>Địa điểm nổi bật</h1>
            </div>

            <div className={styles.cards}>
                {randomPlaces.map((place, index) => (
                    <div
                        className={styles.card}
                        key={index}>
                        <img
                            src={place?.img?.[0] || '/imgs/placeholder.jpg'}
                            alt={getPlaceName(place?.name)}
                            onError={e => {
                                e.target.src = '/imgs/placeholder.jpg';
                            }}
                        />
                        <div className={styles.content}>
                            <div className={styles.miniContent}>
                                <h4>{getPlaceName(place?.name)}</h4>
                                <p>{getShortDescription(place?.description)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.end}>
                <Link
                    to='/Explore/TinhHoa'
                    className={styles.btn}>
                    <span>Xem thêm địa điểm</span>
                    <div className={styles.icon}>→</div>
                </Link>
            </div>
        </div>
    );
}

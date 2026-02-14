/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Suggests from './components/Suggest/Suggests';
import styles from './GetPlace.module.scss';
import { FaCar } from 'react-icons/fa6';
import { IoAddCircle } from 'react-icons/io5';
import { TbBikeFilled } from 'react-icons/tb';
import { RiWalkFill } from 'react-icons/ri';
import { useMapContext } from '../contexts/useMapContext';
import { RiDeleteBin2Fill } from 'react-icons/ri';
export default function GetPlace({ setDraw, setShows, shows }) {
    const { inFor, setDurDis, setShowD } = useMapContext();
    const { durDis } = useMapContext();

    const [data, setData] = useState({ value: '', id: null });
    const [coordinates, setCoordinates] = useState(['', '']);
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [vehicle, setVehicle] = useState('driving-car');
    const [preVe, setPreVe] = useState('driving-car');
    const [unit, setUnit] = useState({ time: 'h', distance: 'km' });
    const [newData, setNewData] = useState({ distance: 0, duration: 0 });
    useEffect(() => {
        if (!durDis) return;

        let distance = durDis.distance;
        let duration = durDis.duration;

        switch (unit.distance) {
            case 'km':
                distance = (distance / 1000).toFixed(2);
                break;
            case 'mi':
                distance = (distance / 1609.34).toFixed(2);
                break;
            default:
                distance = distance.toFixed(0);
        }

        switch (unit.time) {
            case 'min':
                duration = (duration / 60).toFixed(0);
                break;
            case 'h':
                duration = (duration / 3600).toFixed(1);
                break;
            default:
                duration = duration.toFixed(0);
        }

        setNewData({ distance, duration });
    }, [unit, durDis]);
    // Update coordinates when inFor changes
    useEffect(() => {
        if (!inFor || Object.keys(inFor).length === 0) return;

        setCoordinates(prev => {
            const newCoords = [...prev];
            newCoords[1] = inFor.name;
            return newCoords;
        });

        setResults(prev => {
            const newRes = [...prev];
            newRes[1] = [Number(inFor.lng), Number(inFor.lat)];
            return newRes;
        });
    }, [inFor?.lat, inFor?.lng, inFor?.name]);

    const handleChange = (value, id) => {
        setCoordinates(prev => {
            const newCoords = [...prev];
            newCoords[id] = value;
            return newCoords;
        });
        setData({ value, id });
    };

    const handleChoose = (place, id) => {
        setCoordinates(prev => {
            const newCoords = [...prev];
            newCoords[id] = place.name;
            return newCoords;
        });

        setResults(prev => {
            const newRes = [...prev];
            newRes[id] = [Number(place.lng), Number(place.lat)];
            return newRes;
        });
    };

    const fetchRoute = async coords => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v2/api/router`,
                {
                    coordinates: coords,
                    profile: vehicle,
                }
            );

            setDraw(res.data);
            setPreVe(vehicle);

            let distance = 0,
                duration = 0;
            res.data.features.forEach(value => {
                distance += value.properties.summary.distance;
                duration += value.properties.summary.duration;
            });
            setDurDis({ distance, duration });
            setShowD(true);
        } catch (err) {
            window.alert('Phương tiện không khả thi');
            console.log(err.message);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (results.length === coordinates.length) fetchRoute(results);
    };

    // Update route when vehicle changes
    useEffect(() => {
        if (coordinates.length !== results.length) return;
        fetchRoute(results).catch(() => setVehicle(preVe));
    }, [vehicle]);

    const check = () => {
        let check = 0;
        results.forEach(value => {
            ++check;
        });
        return check === results.length;
    };
    return (
        <div
            className={`${styles.container} ${
                shows ? styles.open : styles.closes
            }`}>
            <button
                className={styles.close}
                onClick={() => setShows(false)}>
                &times;
            </button>

            <div className={styles.traffics}>
                <button
                    className={vehicle === 'driving-car' ? styles.active : ''}
                    onClick={() => setVehicle('driving-car')}>
                    <FaCar />
                    <span>Ô tô</span>
                </button>
                <button
                    className={vehicle === 'foot-walking' ? styles.active : ''}
                    onClick={() => setVehicle('foot-walking')}>
                    <RiWalkFill />
                    <span>Đi bộ</span>
                </button>
                <button
                    className={
                        vehicle === 'cycling-regular' ? styles.active : ''
                    }
                    onClick={() => setVehicle('cycling-regular')}>
                    <TbBikeFilled />
                    <span>Xe đạp</span>
                </button>
            </div>

            <form className={styles.items}>
                {coordinates.map((v, id) => (
                    <div
                        key={id}
                        className={styles.item}>
                        <input
                            required
                            type='text'
                            value={v}
                            onFocus={() => {
                                setData({ value: v, id });
                                setShow(true);
                            }}
                            onChange={e => handleChange(e.target.value, id)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setData({ value: v, id });
                                }
                            }}
                        />
                        {coordinates.length > 2 && (
                            <button
                                className={styles.remove}
                                onClick={() => {
                                    setCoordinates(prev =>
                                        prev.filter((_, i) => i !== id)
                                    );
                                    setResults(prev =>
                                        prev.filter((_, i) => i !== id)
                                    );
                                }}>
                                {' '}
                                <RiDeleteBin2Fill />
                            </button>
                        )}
                    </div>
                ))}

                {check() && results.length === coordinates.length && (
                    <button
                        className={styles.add}
                        onClick={e => {
                            e.preventDefault();
                            setCoordinates(prev => [...prev, '']);
                        }}>
                        <IoAddCircle />
                        <span>Thêm điểm đến</span>
                    </button>
                )}

                <button
                    type='submit'
                    className={styles.submit}
                    disabled={!check() || results.length !== coordinates.length}
                    onClick={onSubmit}>
                    Tìm kiếm tuyến đường
                </button>
            </form>
            <div className={styles.miniBox}>
                <div className={styles.step1}>
                    <div className={styles.distance}>
                        {['m', 'km', 'mi'].map(d => (
                            <button
                                key={d}
                                className={
                                    unit.distance === d ? styles.acStep : ''
                                }
                                onClick={() =>
                                    setUnit({ ...unit, distance: d })
                                }>
                                {d === 'm' ?
                                    'mét (m)'
                                : d === 'km' ?
                                    'km (km)'
                                :   'dặm (mi)'}
                            </button>
                        ))}
                    </div>
                    <div className={styles.duration}>
                        {['s', 'min', 'h'].map(t => (
                            <button
                                key={t}
                                className={unit.time === t ? styles.acStep : ''}
                                onClick={() => setUnit({ ...unit, time: t })}>
                                {t === 's' ?
                                    'giây (s)'
                                : t === 'min' ?
                                    'phút (min)'
                                :   'Giờ (h)'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.step2}>
                    <div className={styles.content1}>
                        <div className={styles.main}>
                            <h3>Khoảng cách</h3>
                            <p>
                                {newData?.distance} ({unit.distance})
                            </p>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h3>Thời gian trung bình</h3>
                        <p>
                            {newData?.duration} ({unit.time})
                        </p>
                    </div>
                </div>
            </div>
            {show && (
                <Suggests
                    value={data.value}
                    id={data.id}
                    onChoose={handleChoose}
                    setShow={setShow}
                />
            )}
        </div>
    );
}

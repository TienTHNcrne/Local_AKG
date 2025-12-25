/** @format */

import React, { useEffect, useState } from 'react';
import styles from './Map.module.scss';
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    ZoomControl,
    LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { FaMapMarker, FaDirections } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaFilter } from 'react-icons/fa';
import { MapProvider } from './components/contexts/useMapContext.jsx';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from 'axios';

import GetPlace from './components/GetPlace/GetPlace';
import CreateForm from './components/CreateForm/CreateForm';
import FlyToPlace from './components/FlyToPlace/FlyToPlace.jsx';
import InforPlace from './components/InforPlace/InforPlace.jsx';
import RouteLayer from './components/RouteLayer/RouteLayer.jsx';
import useFindPlace from './Hooks/useFindPlace.js';

export function MapContent() {
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [popup, setPopup] = useState(false);
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [search, setSearch] = useState('');
    const [territory, setTerritory] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [draw, setDraw] = useState(null);
    const [inFor, setInFor] = useState({});

    const [suggest, setSuggest] = useState([]);
    const [serSug, setSerSug] = useState('');
    const [filter, setFilter] = useState(false);
    const [checkbox, setCheckbox] = useState(['All']);
    const a = useFindPlace({ keyword: serSug, coordinate: coordinates });

    useEffect(() => setSuggest(a), [serSug]);
    useEffect(() => {
        axios.get('/data.geojson').then(res => setTerritory(res.data));
    }, []);
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
            .then(res => setCoordinates(res.data))
            .catch(err => console.log(err));
    }, []);
    if (checkbox.length === 0) setCheckbox(['All']);

    const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
            <FaMapMarker className={styles.marker} />
        ),
        className: '',
        iconSize: [24, 24],
    });

    const categories = [
        'All',
        'Danh lam thắng cảnh',
        'Du lịch tâm linh',
        'Di tích lịch sử',
        'Biển đảo',
        'Lễ hội',
        'Chợ',
        'Sở thú',
        'Khu đô thị ',
        'Khu vui chơi - giải trí',
    ];
    return (
        <div className={styles.container}>
            <div
                className={`${styles.roq} ${
                    show || add || popup ? styles.open : styles.closes
                }`}>
                <div className={styles.func}>
                    <div className={styles.s1}>
                        <div className={styles.search}>
                            <input
                                type='text'
                                placeholder='Tìm kiếm địa điểm'
                                value={serSug}
                                onChange={e => setSerSug(e.target.value)}
                            />
                            <button type='submit'>
                                <FaMagnifyingGlass />
                            </button>
                        </div>
                        {suggest.length > 0 && serSug && (
                            <div className={styles.suggests}>
                                {suggest.map((e, id) => (
                                    <div
                                        className={styles.suggest}
                                        key={id}>
                                        {e.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.s2}>
                        <button
                            className={styles.icon}
                            onClick={() => {
                                setAdd(false);
                                setPopup(false);
                                setShow(!show);
                            }}>
                            <FaDirections />
                        </button>

                        <button
                            className={styles.icon}
                            onClick={() => setFilter(!filter)}>
                            <FaFilter />
                        </button>

                        {filter && (
                            <div className={styles.categories}>
                                {categories.map((value, id) => (
                                    <div
                                        className={styles.category}
                                        key={id}>
                                        <label
                                            htmlFor={value}
                                            onClick={() => {
                                                if (value === 'All')
                                                    setCheckbox(['All']);
                                                else {
                                                    {
                                                        setCheckbox(
                                                            checkbox.filter(
                                                                i => i !== 'All'
                                                            )
                                                        );

                                                        (
                                                            checkbox.includes(
                                                                value
                                                            )
                                                        ) ?
                                                            setCheckbox(
                                                                checkbox.filter(
                                                                    i =>
                                                                        i !==
                                                                        value
                                                                )
                                                            )
                                                        :   setCheckbox(e => [
                                                                ...e,
                                                                value,
                                                            ]);
                                                    }
                                                }
                                            }}
                                            style={
                                                checkbox.includes(value) ?
                                                    {
                                                        backgroundColor:
                                                            '#4285f4',
                                                        color: 'white',
                                                    }
                                                :   {}
                                            }>
                                            {value}
                                        </label>
                                        <input
                                            type='checkbox'
                                            id={value}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <GetPlace
                setDraw={setDraw}
                setShows={setShow}
                shows={show}
            />
            <InforPlace
                center={{ lat: inFor.lat, lng: inFor.lng }}
                popup={popup}
                inFor={inFor}
                setPopup={setPopup}
                setDraw={setDraw}
                setShows={setShow}
                shows={show}
            />
            <CreateForm
                setShow={setAdd}
                add={add}
                center={center}
                setCenter={setCenter}
                search={search}
                setSearch={setSearch}
                AddNewLocal={() => {
                    axios
                        .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
                        .then(res => setCoordinates(res.data))
                        .catch(err => console.log(err));
                }}
            />

            <MapContainer
                center={[10.173, 104.237]}
                zoom={9}
                minZoom={9}
                className={styles.map}
                zoomControl={false}
                doubleClickZoom={false}>
                <ZoomControl position='topright' />

                <LayersControl position='topright'>
                    <LayersControl.BaseLayer name='MapTiler Streets'>
                        <TileLayer
                            url='https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=WCKUTbdVx5gBcrVCqpsa'
                            attribution='&copy; MapTiler &copy; OpenStreetMap contributors'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer
                        checked
                        name='OpenStreetMap'>
                        <TileLayer
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name='Carto Light'>
                        <TileLayer
                            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name='Carto Dark'>
                        <TileLayer
                            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name='Esri World Imagery'>
                        <TileLayer
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                            attribution='Tiles &copy; Esri'
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {territory && (
                    <GeoJSON
                        data={territory}
                        style={() => ({
                            fillColor: '#00cc66',
                            weight: 1.5,
                            opacity: 0.9,
                            color: '#007BFF',
                            fillOpacity: 0.2,
                        })}
                    />
                )}

                {coordinates?.length > 0 && (
                    <MarkerClusterGroup chunkedLoading>
                        {coordinates.map((value, index) => {
                            let show = checkbox.includes('All');

                            {
                                !show &&
                                    value.category.forEach(e => {
                                        if (checkbox.includes(e)) {
                                            show = true;
                                            return;
                                        }
                                    });
                            }
                            if (!show) return null;

                            return (
                                typeof value.lat === 'number' &&
                                typeof value.lng === 'number' && (
                                    <Marker
                                        key={index}
                                        position={[value.lat, value.lng]}
                                        icon={customIcon}
                                        eventHandlers={{
                                            click: () => {
                                                setInFor(value);
                                                setPopup(true);
                                                setShow(false);
                                                setAdd(false);
                                            },
                                        }}
                                    />
                                )
                            );
                        })}
                    </MarkerClusterGroup>
                )}

                {center.lat && center.lng && (
                    <>
                        <Marker
                            position={[center.lat, center.lng]}
                            icon={customIcon}
                        />
                        <FlyToPlace center={center} />
                    </>
                )}

                {draw?.features && <RouteLayer draw={draw} />}
            </MapContainer>

            <button
                className={styles.but}
                onClick={() => {
                    setAdd(!add);
                    setPopup(false);
                    setShow(false);
                }}>
                <IoIosAddCircle />
            </button>
        </div>
    );
}

export default function Map() {
    return (
        <MapProvider>
            <MapContent />
        </MapProvider>
    );
}

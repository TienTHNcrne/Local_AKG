// MapContext.jsx
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
    const [add, setAdd] = useState(false);
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [search, setSearch] = useState("");
    const [territory, setTerritory] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [popup, setPopup] = useState(false);
    const [inFor, setInFor] = useState({});
    const [draw, setDraw] = useState(null);
    const [show, setShow] = useState(false);
    const [cate, setCate] = useState("All");
    const [durDis, setDurDis] = useState({ distance: 0, duration: 0 });
    const [showD, setShowD] = useState(false);

    return (
        <MapContext.Provider
            value={{
                add,
                setAdd,
                center,
                setCenter,
                search,
                setSearch,
                territory,
                setTerritory,
                coordinates,
                setCoordinates,
                popup,
                setPopup,
                inFor,
                setInFor,
                draw,
                setDraw,
                show,
                setShow,
                cate,
                setCate,
                durDis,
                setDurDis,
                showD,
                setShowD,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

export const useMapContext = () => useContext(MapContext);

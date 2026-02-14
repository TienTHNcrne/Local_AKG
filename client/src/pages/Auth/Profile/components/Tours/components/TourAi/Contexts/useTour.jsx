/** @format */

import React, { createContext, useState, useContext } from "react";

import GetHis from "../Hooks/GetHis";
const TourContext = createContext();

export default function TourProvide({ children }) {
    const [lovePlaces, setLovePlaces] = useState(new Map());
    const [chatPresent, setChatPresent] = GetHis("");

    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [loading, setLoading] = useState(false);
    const [startPlace, setStartPlace] = useState("");
    const [startPos, setStartPos] = useState({ lat: null, lng: null });
    const value = {
        startPos,
        setStartPos,
        lovePlaces,
        setLoading,
        loading,
        setLovePlaces,
        setChatPresent,
        chatPresent,
        days,
        setDays,
        budget,
        setBudget,
        startPlace,
        setStartPlace,
    };
    return (
        <TourContext.Provider value={value}>{children}</TourContext.Provider>
    );
}
export const useTour = () => useContext(TourContext);

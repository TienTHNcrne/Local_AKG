/** @format */

import React, { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext();

export default function Auth({ children }) {
    const [userId, setUserId] = useState(() => localStorage.getItem("userid"));

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userid", userId);
        } else {
            localStorage.removeItem("userid");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
        }
    }, [userId]);

    const login = (id) => {
        setUserId(id);
    };
    const logout = () => {
        setUserId(null);
    };
    return (
        <AuthContext.Provider value={{ userId, login, logout, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}

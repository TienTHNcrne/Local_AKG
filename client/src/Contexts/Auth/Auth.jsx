/** @format */
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function Auth({ children }) {
    const [user, setUser] = useState({
        role: "",
        name: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/api/verify/login`, {
                withCredentials: true,
            })
            .then((res) => setUser(res.data))
            .catch(() => setUser({ role: "", name: "" }))
            .finally(() => setLoading(false));
    }, []);

    const logout = () => {
        setUser({ role: "", name: "" });
        axios.get(`${import.meta.env.VITE_BE_URL}/api/verify/logout`, {
            withCredentials: true,
        });
        window.location.reload();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

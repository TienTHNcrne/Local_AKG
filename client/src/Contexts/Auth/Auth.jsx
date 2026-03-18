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
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/verify/login`, {
                withCredentials: true,
            })
            .then((res) => setUser(res.data))
            .catch(() => setUser({ role: "", name: "" }))
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        setUser({ role: "", name: "" });
        await axios.get(`${import.meta.env.VITE_BE_URL}/v1/api/verify/logout`, {
            withCredentials: true,
        });
        window.location.href = "/";
        console.log("oke");
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

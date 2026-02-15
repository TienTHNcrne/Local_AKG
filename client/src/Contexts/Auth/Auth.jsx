/** @format */

import React, { createContext, useState, useContext } from "react";
const AuthContext = createContext();
import axios from "axios";
export default function Auth({ children }) {
    const [user, setUser] = useState();

    const logout = () => {
        setUser(null);
        axios.post("/api/verify/logout", {}, { withCredentials: true });
    };
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

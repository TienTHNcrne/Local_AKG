import React from "react";
import Before_Login from "./Layouts/Before_Login/Before_Login";
import Home from "./pages/Home/Home";
import Maps from "./components/Maps/Maps";
import Location from "./pages/Location/Location";
import { Outlet } from "react-router-dom";
export default function App() {
    return (
        <div>
            {localStorage.setItem("userid", "688346cd44f8765b168c2932")}
            <Before_Login>
                <Outlet />
            </Before_Login>
        </div>
    );
}

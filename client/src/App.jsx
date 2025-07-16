import React from "react";
import Before_Login from "./Layouts/Before_Login/Before_Login";
import Home from "./pages/Home/Home";
import Maps from "./components/Maps/Maps";
export default function App() {
    return (
        <div>
            <Before_Login>
                <Maps />
            </Before_Login>
        </div>
    );
}

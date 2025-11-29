/** @format */

import React from "react";
import Religion from "./pages/Home/religon/Religion";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import Rich_text from "./pages/Rich_text/Rich_text";
import Home from "./pages/Home/Home";
import Climate from "./pages/Home/Climate/Climate";
import Location from "./pages/Home/Location/Location";
import History from "./pages/Home/History/History";
import CulSoc from "./pages/Home/CulSoc/CulSoc";
import Map from "./pages/Explore/Map/Map";
import TinhHoa from "./pages/Explore/TinhHoa/TinhHoa";
import "leaflet/dist/leaflet.css";
import Register from "./pages/Register/Register";
import Food from "./pages/Home/Food/Food";
import Login from "./pages/Login/Login";
import "./index.css";
import About from "./pages/About/About";
import Auth from "./Contexts/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import Guide from "./pages/Guide/Guide";
import Basic from "./pages/3d/Basic.jsx";
import Admin from "./pages/Admin/Admin.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            { path: "/Login", element: <Login /> },
            { path: "/Food", element: <Food /> },

            { path: "/Register", element: <Register /> },
            { path: "/profile", element: <Profile /> },
            { path: "/Religion", element: <Religion /> },
            { path: "/Guide", element: <Guide /> },

            { path: "/Edit", element: <Rich_text /> },
            { path: "Climate", element: <Climate /> },
            { path: "Location", element: <Location /> },
            { path: "History", element: <History /> },
            { path: "CulSoc", element: <CulSoc /> },
            { path: "About", element: <About /> },
            { path: "Admin", element: <Admin /> },
            { path: "Explore/map", element: <Map /> },
            { path: "Explore/TinhHoa", element: <TinhHoa /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Auth>
            <RouterProvider router={router} />
        </Auth>
    </React.StrictMode>
);

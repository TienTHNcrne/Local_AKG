/** @format */

import React from "react";
import Religion from "./pages/Home/religon/Religion";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
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
import Game3D from "./pages/Game3D/Game3D.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Test from "./pages/Test/Test.jsx";
import LoginSuccess from "./pages/Login/LoginSuccess.jsx";
import { ConfigProvider } from "antd";
import OAuthGoogleCallback from "./pages/Login/OAuthGoogleCallback.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Services from "./pages/Services/Services.jsx";
import Managers from "./pages/Managers/Managers.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";
import MapBusiness from "./pages/Explore/MapBusiness/MapBusiness.jsx";
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
            {
                path: "/auth/google/callback",
                element: <OAuthGoogleCallback />,
            },
            { path: "/business/dashboard", element: <Dashboard /> },
            { path: "/business/services", element: <Services /> },
            { path: "/business/managers", element: <Managers /> },
            { path: "/business/analytics", element: <Analytics /> },
            { path: "/business/map", element: <MapBusiness /> },

            { path: "/profile", element: <Profile /> },
            { path: "/Religion", element: <Religion /> },
            { path: "/Guide", element: <Guide /> },
            { path: "/login/success", element: <LoginSuccess /> },
            { path: "Climate", element: <Climate /> },
            { path: "Location", element: <Location /> },
            { path: "History", element: <History /> },
            { path: "CulSoc", element: <CulSoc /> },
            { path: "About", element: <About /> },
            { path: "Admin", element: <Admin /> },
            { path: "Explore/map", element: <Map /> },
            { path: "Explore/TinhHoa", element: <TinhHoa /> },
            { path: "Game", element: <Game3D /> },
            { path: "Test", element: <Test /> },
        ],
    },
    { path: "/Register", element: <Register /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Auth>
            <RouterProvider router={router} />
        </Auth>
    </React.StrictMode>,
);

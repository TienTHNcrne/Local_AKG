import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import Rich_text from "./pages/Rich_text/Rich_text";
import Home from "./pages/Home/Home";
import Climate from "./pages/Home/Climate/Climate";
import Location from "./pages/Home/Location/Location";
import History from "./pages/Home/History/History";
import CulSoc from "./pages/Home/CulSoc/CulSoc";
import Explore from "./pages/Explore/Explore";
import Map from "./pages/Explore/Map/Map";
import Event from "./pages/Explore/Event/Event";
import "leaflet/dist/leaflet.css";

import "./index.css";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            { path: "/Edit", element: <Rich_text /> },
            { path: "Climate", element: <Climate /> },
            { path: "Location", element: <Location /> },
            { path: "History", element: <History /> },
            { path: "CulSoc", element: <CulSoc /> },

            {
                path: "Explore",
                element: <Explore />,
                children: [
                    { path: "event", element: <Event /> },
                    { path: "map", element: <Map /> },
                ],
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home"; // thêm dòng này
import "leaflet/dist/leaflet.css";
import Food from "./pages/Explore/Food/Food";
import Events from "./pages/Events/Events";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                // không có dấu "/"
                path: "explore",
                element: <Explore />,
                children: [
                    {
                        path: "Food",
                        element: <Food />,
                    },
                ],
            },
            {
                // không có dấu "/"
                path: "Events",
                element: <Events />,
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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import Rich_text from "./pages/Rich_text/Rich_text";
import Home from "./pages/Home/Home";
import AI from "./components/AI/Ai";
import Location from "./pages/Location/Location";
import "leaflet/dist/leaflet.css";
import "./index.css";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },

            { path: "/Edit", element: <Rich_text /> },
            { path: "/Location", element: <Location /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

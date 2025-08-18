/** @format */

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
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import "./index.css";
import Auth from "./Contexts/Auth/Auth";
import Profile from "./pages/Profile/Profile";
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
			{ path: "/Register", element: <Register /> },
			{ path: "/profile", element: <Profile /> },

			{ path: "/Edit", element: <Rich_text /> },
			{ path: "Climate", element: <Climate /> },
			{ path: "Location", element: <Location /> },
			{ path: "History", element: <History /> },
			{ path: "CulSoc", element: <CulSoc /> },

			{ path: "Explore", element: <Explore /> },
			{ path: "Explore/map", element: <Map /> },
			{ path: "Explore/event", element: <Event /> },
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

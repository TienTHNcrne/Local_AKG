/** @format */

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import "leaflet/dist/leaflet.css";
import "./index.css";

// Layouts & Auth
import App from "./App";
import Auth from "./Contexts/Auth/Auth";

// Home Pages
import Home from "./pages/Home/Home";
import Climate from "./pages/Home/Climate/Climate";
import Location from "./pages/Home/Location/Location";
import History from "./pages/Home/History/History";
import CulSoc from "./pages/Home/CulSoc/CulSoc";
import Religion from "./pages/Home/religon/Religion";
import Food from "./pages/Home/Food/Food";
import About from "./pages/About/About";

// Explore Pages
import Map from "./pages/Traveler/Explore/Map/Map";
import TinhHoa from "./pages/Traveler/Explore/TinhHoa/TinhHoa";
import MapBusiness from "./pages/Business/MapBusiness/MapBusiness";

// Auth Pages
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import LoginSuccess from "./pages/Auth/Login/LoginSuccess.jsx";
//import OAuthGoogleCallback from "./pages/Auth/Login/OAuthGoogleCallback";

// User Pages
import Profile from "./pages/Auth/Profile/Profile";
import Guide from "./pages/Guide/Guide";
import Game3D from "./pages/Traveler/Game3D/Game3D";

// Business Pages
import Dashboard from "./pages/Business/dashboard/dashboard";
import Services from "./pages/Business/Services/Services";
import Managers from "./pages/Business/Managers/Managers";
import Analytics from "./pages/Business/Analytics/Analytics";

// Admin Pages
import Admin from "./pages/Admin/Admin";
import Test from "./pages/Test/Test";

// Route Constants
const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    FOOD: "/food",
    PROFILE: "/profile",
    GUIDE: "/guide",
    ADMIN: "/admin",
    TEST: "/test",
    GAME: "/game",
};

const EXPLORE_ROUTES = {
    MAP: "/explore/map",
    TINH_HOA: "/explore/tinh-hoa",
};

const INFO_ROUTES = {
    CLIMATE: "/climate",
    LOCATION: "/location",
    HISTORY: "/history",
    CUL_SOC: "/cul-soc",
    RELIGION: "/religion",
    ABOUT: "/about",
};

const BUSINESS_ROUTES = {
    DASHBOARD: "/business/dashboard",
    SERVICES: "/business/services",
    MANAGERS: "/business/managers",
    ANALYTICS: "/business/analytics",
    MAP: "/business/map",
};

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <App />,
        children: [
            // Home
            { index: true, element: <Home /> },

            // Auth
            { path: ROUTES.LOGIN, element: <Login /> },
            { path: ROUTES.REGISTER, element: <Register /> },
            //  { path: "/auth/google/callback", element: <OAuthGoogleCallback /> },

            // User Profile
            { path: ROUTES.PROFILE, element: <Profile /> },
            { path: ROUTES.GUIDE, element: <Guide /> },

            // Info Pages
            { path: INFO_ROUTES.CLIMATE, element: <Climate /> },
            { path: INFO_ROUTES.LOCATION, element: <Location /> },
            { path: INFO_ROUTES.HISTORY, element: <History /> },
            { path: INFO_ROUTES.CUL_SOC, element: <CulSoc /> },
            { path: INFO_ROUTES.RELIGION, element: <Religion /> },
            { path: INFO_ROUTES.ABOUT, element: <About /> },

            // Food & Discovery
            { path: ROUTES.FOOD, element: <Food /> },
            { path: EXPLORE_ROUTES.MAP, element: <Map /> },
            { path: `${EXPLORE_ROUTES.TINH_HOA}/:tab`, element: <TinhHoa /> },
            { path: EXPLORE_ROUTES.TINH_HOA, element: <TinhHoa /> },

            // Business Portal
            { path: BUSINESS_ROUTES.DASHBOARD, element: <Dashboard /> },
            { path: BUSINESS_ROUTES.SERVICES, element: <Services /> },
            { path: BUSINESS_ROUTES.MANAGERS, element: <Managers /> },
            { path: BUSINESS_ROUTES.ANALYTICS, element: <Analytics /> },
            { path: BUSINESS_ROUTES.MAP, element: <MapBusiness /> },

            // Games & Tools
            { path: ROUTES.GAME, element: <Game3D /> },

            // Admin & Testing
            { path: ROUTES.ADMIN, element: <Admin /> },
            { path: ROUTES.TEST, element: <Test /> },
        ],
    },
    {
        path: ROUTES.REGISTER,
        element: <Register />,
    },
    { path: "/login/success", element: <LoginSuccess /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ConfigProvider>
        <Auth>
            <RouterProvider router={router} />
        </Auth>
    </ConfigProvider>,
);

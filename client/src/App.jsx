import { Outlet } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import DefaultLayout from "./Layouts/DefaultLayout";
import "leaflet/dist/leaflet.css";
export default function App() {
    return (
        <>
            <DefaultLayout>
                <Outlet />
            </DefaultLayout>
        </>
    );
}

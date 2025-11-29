/** @format */

import React from 'react';
import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import Maps from './components/Maps/Maps';
import Location from './pages/Home/Location/Location';
import { Outlet } from 'react-router-dom';
export default function App() {
    return (
        <div>
            <Layout>
                <Outlet />
            </Layout>
        </div>
    );
}

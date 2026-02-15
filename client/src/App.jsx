/** @format */

import React from "react";
import Layout from "./Layout/Layout";

import { Outlet } from "react-router-dom";
import "antd/dist/reset.css";

export default function App() {
    return (
        <div>
            <Layout>
                <Outlet />
            </Layout>
        </div>
    );
}

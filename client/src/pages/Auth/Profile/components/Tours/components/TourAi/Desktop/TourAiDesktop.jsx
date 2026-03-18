/** @format */
import React, { useState } from "react";
import styles from "./TourAiDesktop.module.scss";
import clsx from "clsx";

import SuggestTour from "./components/SuggestTour/SuggestTour.jsx";
import SelectPlaces from "./components/SelectPlaces/SelectPlaces.jsx";
import TourHistory from "./components/TourHistory/TourHistory.jsx";

const TABS = [
    { key: "suggest", label: "Dựng hành trình" },
    { key: "historic-tour", label: "Lịch sử hành trình" },
];

export default function TourAiDesktop() {
    const [activeTab, setActiveTab] = useState("suggest");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isSuggest = activeTab === "suggest";

    return (
        <div className={styles.container}>
            {/* Tab bar */}
            <nav className={styles.tabBar}>
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        className={clsx(styles.tabBtn, {
                            [styles.tabActive]: activeTab === tab.key,
                        })}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                        {activeTab === tab.key && (
                            <span className={styles.tabIndicator} />
                        )}
                    </button>
                ))}
            </nav>
            {/* Page body */}
            <div className={styles.page}>
                {/* Sidebar */}
                {isSuggest && (
                    <aside
                        className={clsx(styles.sidebar, {
                            [styles.sidebarClosed]: !sidebarOpen,
                        })}
                    >
                        <div className={styles.sidebarScroll}>
                            <p className={styles.sidebarLabel}>Địa điểm</p>
                            <SelectPlaces />
                        </div>

                        <button
                            className={clsx(styles.toggleBtn, {
                                [styles.toggleBtnClosed]: !sidebarOpen,
                            })}
                            onClick={() => setSidebarOpen((prev) => !prev)}
                            aria-label="Toggle sidebar"
                        >
                            <svg
                                className={clsx(styles.toggleIcon, {
                                    [styles.toggleIconFlipped]: !sidebarOpen,
                                })}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                    </aside>
                )}

                {/* Nội dung chính */}
                <div className={styles.content}>
                    {isSuggest && <SuggestTour />}
                </div>
            </div>{" "}
            {activeTab === "historic-tour" && <TourHistory />}
        </div>
    );
}

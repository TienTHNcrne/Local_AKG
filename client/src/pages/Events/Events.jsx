import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Events.module.scss"; // nếu dùng CSS module

const eventList = [
    {
        Date: "2025-07-10",
        event: "Lễ hội bánh dân gian",
    },
];

export default function Events() {
    const [value, setValue] = useState(new Date());

    const dateStr = value.toISOString().split("T")[0];
    const matchedEvent = eventList.find((e) => e.Date === dateStr);

    return (
        <div className={styles["calendar-wrapper"]}>
            <h2>Sự kiện địa phương</h2>
            <Calendar onChange={setValue} value={value} />
            {matchedEvent ? (
                <div className={styles["event-info"]}>
                    <h3>{matchedEvent.event}</h3>
                    <p>Thời gian: {dateStr}</p>
                </div>
            ) : (
                <p className={styles["no-event"]}>
                    Không có sự kiện trong ngày này.
                </p>
            )}
        </div>
    );
}

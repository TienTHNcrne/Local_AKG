/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Weather.module.scss";
export default function Weather({ center }) {
    const [forecast, setForecast] = useState(null);
    const [current, setCurrent] = useState(null);
    const icons = Array.from({ length: 36 }, (_, i) => `/icons/${i + 1}.svg`);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                await axios
                    .get(
                        `${import.meta.env.VITE_BE_URL}/v2/api/weather/current`,
                        {
                            params: {
                                lat: center.lat,
                                lng: center.lng,
                            },
                        },
                    )
                    .then((res) => {
                        const time = new Date();
                        setCurrent(res.data[time.getHours()]);
                    });
                await axios
                    .get(
                        `${import.meta.env.VITE_BE_URL}/v2/api/weather/summary`,
                        {
                            params: {
                                lat: center.lat,
                                lng: center.lng,
                            },
                        },
                    )
                    .then((res) => {
                        setForecast(res.data);
                    });
            } catch (err) {
                console.log("Don't connect weather", err.message);
            }
        };

        if (center?.lat && center?.lng) {
            fetchWeather();
        }
    }, [center]);
    const getD = (dateString) => {
        const days = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
        ];
        const date = new Date(dateString);

        return days[date.getDay()];
    };
    const weatherMap = {
        Clear: "Quang đãng",
        Sunny: "Trời nắng",
        "Partly Sunny": "Trời hơi nắng",
        "Mostly Sunny": "Trời nhiều nắng",
        "Scattered Thunderstorms": "Giông bão rải rác",
        Showers: "Mưa rào",
        "Scattered Showers": "Mưa rào rải rác",
        "Rain and Snow": "Mưa kèm tuyết",
        overcast: "U ám",
        "Light Snow": "Tuyết nhẹ",
        "Freezing Drizzle": "Mưa phùn băng giá",
        "Chance of Rain": "Có khả năng mưa",
        "Partly Cloudy": "Trời ít mây",
        "Mostly Cloudy": "Trời nhiều mây",
        "Chance of Storm": "Có khả năng bão",
        Rain: "Mưa",
        "Chance of Snow": "Có khả năng tuyết rơi",
        Cloudy: "Nhiều mây",
        Mist: "Sương mù nhẹ",
        Storm: "Bão",
        Thunderstorm: "Giông bão",
        "Chance of TStorm": "Có khả năng giông bão",
        Sleet: "Mưa tuyết",
        Snow: "Tuyết",
        Icy: "Băng giá",
        Dust: "Bụi mù",
        Fog: "Sương mù dày",
        Smoke: "Khói",
        Haze: "Mờ sương/khói bụi",
        Flurries: "Tuyết rơi lác đác",
        light_rain: "Mưa nhỏ",
        "Snow Showers": "Mưa tuyết rào",
        Hail: "Mưa đá",
        "Patchy Rain Possible": "Có thể mưa rải rác",
        "Patchy Light Drizzle": "Mưa phùn nhẹ rải rác",
        "Moderate Rain": "Mưa vừa",
        "Heavy Rain": "Mưa to",
        "Light Snow Showers": "Mưa tuyết nhẹ",
        "Moderate or Heavy Snow Showers": "Mưa tuyết vừa hoặc to",
        "Thundery Outbreaks Possible": "Có thể có giông bão",
        "Light Rain Shower": "Mưa rào nhẹ",
        "Moderate or Heavy Rain Shower": "Mưa rào vừa hoặc to",
        "Torrential Rain Shower": "Mưa như trút nước",
        "Light Sleet Showers": "Mưa tuyết rào nhẹ",
        "Moderate or Heavy Sleet Showers": "Mưa tuyết rào vừa hoặc to",
        Blizzard: "Bão tuyết",
        "Blowing Snow": "Tuyết thổi",

        // key rút gọn/viết tắt (dạng API trả)
        psbl_rain: "Có thể mưa",
        tstorm: "Giông bão",
        sct_showers: "Mưa rào rải rác",
        hi_rain: "Mưa to",
        mod_rain: "Mưa vừa",
        light_snow: "Tuyết nhẹ",
        hi_snow: "Tuyết dày",
        fog: "Sương mù",
        mist: "Sương mù nhẹ",
        partly_cloudy: "Trời ít mây",
        mostly_cloudy: "Trời nhiều mây",
        clear: "Quang đãng",
        sunny: "Trời nắng",
    };
    console.log(forecast);
    return (
        <div className={styles.container}>
            {current && (
                <div className={styles.ro1}>
                    <h2>Thời tiết hiện tại</h2>
                    <div className={styles.current}>
                        <div className={styles.row1}>
                            <div div className={styles.col1}>
                                <h3>{current.temp_c}°C</h3>{" "}
                                <p>{current.condition.text}</p>
                            </div>
                            <img src={current.condition.icon} alt="" />

                            <div className={styles.col3}>
                                <h3>{getD(`${current.time}`)}</h3>
                                <h4>{current.time.split(" ")[0]}</h4>
                            </div>
                        </div>
                        <div className={styles.row2}>
                            {" "}
                            <p>
                                <strong>Gió</strong>: {current.wind_mph} km/h
                            </p>
                            <p>
                                <strong>Độ ẩm</strong>: {current.humidity}%
                            </p>
                            <p>
                                <strong>Mưa</strong>: {current.precip_mm} mm
                            </p>
                            <p>
                                <strong>Cảm nhận như:</strong>{" "}
                                {current.feelslike_c}°C
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/*FORECAST 7 DAY */}{" "}
            {forecast && (
                <div className={styles.ro2}>
                    <h2>Dự báo 7 ngày tới</h2>
                    <div className={styles.content}>
                        {forecast.daily.data.map((value, id) => (
                            <div key={id} className={styles.general}>
                                <div className={styles.top}>
                                    <div className={styles.f1}>
                                        <div className={styles.temp}>
                                            <h3 className={styles.max}>
                                                {value.all_day.temperature_max}
                                                °C
                                            </h3>
                                            <h3 className={styles.min}>
                                                {value.all_day.temperature_min}
                                                °C
                                            </h3>
                                        </div>
                                        <p>
                                            {weatherMap[
                                                value.all_day.weather
                                            ] || value.all_day.weather}{" "}
                                        </p>
                                    </div>

                                    <img
                                        src={icons[value.icon]}
                                        alt="weather icon"
                                    />
                                    <div className={styles.date}>
                                        <h3>{getD(value.day)}</h3>
                                        <h4>{value.day}</h4>
                                    </div>
                                </div>
                                {/*BOTTOM */}
                                <div className={styles.bottom}>
                                    <p>
                                        Lượng mưa:{" "}
                                        {value.all_day.precipitation.total} mm
                                    </p>

                                    <p>
                                        Gió: {value.all_day.wind.dir}{" "}
                                        {value.all_day.wind.speed} km/h
                                    </p>

                                    <p>
                                        Mây che phủ:{" "}
                                        {value.all_day.cloud_cover.total}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

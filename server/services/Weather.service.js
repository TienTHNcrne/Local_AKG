import axios from "axios";
import WeatherModel from "../Models/Weather.model.js";
import { client as redisClient } from "../config/redis.js";

const GetDaySeconds = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return Math.floor((tomorrow - now) / 1000);
};

const CurrentCall = async (lat, lng) => {
    try {
        const result = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json`,
            {
                params: {
                    key: process.env.WEATHER_CURRENT,
                    q: `${lat},${lng}`,
                    days: 1,
                    aqi: "no",
                    alerts: "no",
                    lang: "vi",
                },
            }
        );
        return result.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const SummaryCall = async (lat, lng) => {
    try {
        const result = await axios.get(
            `https://www.meteosource.com/api/v1/free/point`,
            {
                params: {
                    key: process.env.WEATHER_SUMMARY,
                    sections: "all",
                    timezone: "auto",
                    units: "metric",
                    language: "en",
                    lat: lat,
                    lon: lng,
                },
            }
        );
        return result.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const SumCache = async (lat, lng) => {
    try {
        const key = `summary:${lat}:${lng}`;
        const value = await redisClient.get(key);
        if (value === null) {
            const res = await SummaryCall(lat, lng);
            await redisClient.set(key, JSON.stringify(res), {
                EX: GetDaySeconds(),
            });
            return res;
        }
        return JSON.parse(value);
    } catch (err) {
        console.log(err);
        return null;
    }
};
const CurCache = async (lat, lng) => {
    try {
        const key = `current:${lat}:${lng}`;
        const value = await redisClient.get(key);
        console.log(new Date());
        if (value === null) {
            const res = await CurrentCall(lat, lng);
            if (!res?.forecast?.forecastday?.[0]?.hour) {
                console.warn("Weather API không có forecast.hour");
                return null;
            }
            await redisClient.set(
                key,
                JSON.stringify(res.forecast.forecastday[0].hour),
                {
                    EX: GetDaySeconds(),
                }
            );

            return res.forecast.forecastday[0].hour;
        }
        return JSON.parse(value);
    } catch (err) {
        console.log(err);
        return null;
    }
};
export { SumCache, CurCache };

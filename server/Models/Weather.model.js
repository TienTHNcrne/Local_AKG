import mongoose from "mongoose";
const hourSchema = new mongoose.Schema({
    time: String,
    temp_c: Number,
    is_day: Number,
    condition: {
        text: String,
        icon: String,
    },
    wind_mph: Number,
    wind_dir: String,
    precip_mm: Number,
    humidity: Number,
    cloud: Number,
    feelslike_c: Number,
    will_it_rain: Number,
    chance_of_rain: Number,
    uv: Number,
});

const forecastDaySchema = new mongoose.Schema({
    date: String,
    maxtemp_c: Number,
    mintemp_c: Number,
    avgtemp_c: Number,
    avghumidity: Number,
    daily_chance_of_rain: Number,
    condition: {
        text: String,
        icon: String,
    },
    hour: [hourSchema],
});
const weather = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },

    forecast: [forecastDaySchema],

    cachedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
});
export default mongoose.model("weather", weather);

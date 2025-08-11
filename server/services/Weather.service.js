/** @format */
import axios from "axios";

const weather = async (lat, lng) => {
	try {
		const result = await axios.get(
			`https://api.weatherapi.com/v1/forecast.json`,
			{
				params: {
					key: `${process.env.WEATHER_API_KEY}`,
					q: `${lat},${lng}`,
					days: 5,
					aqi: "no",
					alerts: "no",
				},
			}
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err.message;
	}
};

export default weather;

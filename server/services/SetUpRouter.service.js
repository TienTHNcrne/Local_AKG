import axios from "axios";
export const SetUpRouter = async ({ data, profile }) => {
    try {
        let key = [];
        for (let i = 1; i <= 1; ++i) {
            const res = await axios.post(
                `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
                {
                    coordinates: data,
                },
                {
                    headers: {
                        Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
                        Authorization: process.env[`ROUTER${i}`],
                        "Content-Type": "application/json; charset=utf-8",
                    },
                }
            );
            return {
                status: 200,
                data: res.data,
            };
        }
    } catch (err) {
        return { status: 400, data: err.message };
    }
};

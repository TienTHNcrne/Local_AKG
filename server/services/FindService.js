import axios from "axios";
const Find = async (place) => {
    try {
        const result = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: place,
                    format: "json",
                },
                headers: { "User-Agent": "MyApp/1.0 (your@email.com)" },
            }
        );
        return {
            status: 200,
            data: result.data,
        };
    } catch (err) {
        console.log(err);
    }
};
export default Find;

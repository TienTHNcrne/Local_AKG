import React, { useState, useEffect } from "react";

import axios from "axios";
export default function useSuggest(search) {
    const [suggest, setSuggest] = useState([]);
    useEffect(() => {
        if (!search) return;

        const time = setTimeout(() => {
            const offer = async () => {
                try {
                    const res = await axios.get(
                        `${
                            import.meta.env.VITE_BE_URL
                        }/v1/api/find?q=${encodeURIComponent(search)}`
                    );
                    setSuggest(res.data);
                } catch (err) {
                    console.error("Gợi ý thất bại:", err.message);
                }
            };
            offer();
        }, 300);

        return () => clearTimeout(time);
    }, [search]);
    return suggest;
}

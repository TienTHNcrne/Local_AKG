/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../../../../../Contexts/Auth/Auth";
export default function GetHis() {
    const { user } = useAuth();
    const [save, setSave] = useState([]);
    useEffect(() => {
        if (!user.userId) return;
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/historicTour`, {
                userId: user.userId,
            })
            .then((res) => {
                setSave(res.data);
            })
            .catch((err) => console.error("Lỗi API:", err));
    }, []);
    return [save, setSave];
}

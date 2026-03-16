/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../../../../../Contexts/Auth/Auth";
export default function GetPlace() {
    const [lovePlaces, setLovePlaces] = useState([]);
    const { user } = useAuth();
    const userId = user.userId;
    useEffect(() => {
        try {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v1/api/place/GetAll`, {
                    UserId: userId,
                })
                .then((res) => {
                    setLovePlaces(res.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    }, [userId]);
    return lovePlaces;
}

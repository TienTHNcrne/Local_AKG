import React from "react";
import axios from "axios";

const firstNames = [
    "An",
    "Bình",
    "Cường",
    "Duy",
    "Hải",
    "Hùng",
    "Khoa",
    "Linh",
    "Minh",
    "Nam",
    "Phương",
    "Trang",
];
const lastNames = [
    "Nguyễn",
    "Trần",
    "Lê",
    "Phạm",
    "Hoàng",
    "Võ",
    "Đặng",
    "Bùi",
];

function randomUser() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    const name = `${last} ${first}`;
    const email = `${first.toLowerCase()}${last.toLowerCase()}${Math.floor(
        Math.random() * 1000,
    )}@gmail.com`;
    const password = Math.random().toString(36).slice(-8);

    return { name, email, password };
}

export default function Test() {
    const submit = async (e) => {
        e.preventDefault();

        for (let i = 0; i < 12; i++) {
            const user = randomUser();

            try {
                await axios.post(
                    `${import.meta.env.VITE_BE_URL}/v1/api/register`,
                    {
                        ...user,
                        isTest: true,
                    },
                );
                console.log("OK:", user.name);
            } catch (err) {
                console.log("ERR:", err.message);
            }
        }

        console.log("DONE 100 REAL-LIKE USERS");
    };

    return (
        <div>
            <button onClick={submit}>Generate 100 real users</button>
        </div>
    );
}

/** @format */

// services/SetUpRouter.service.js
import axios from 'axios';
import PQueue from 'p-queue';

const keys = [process.env.ROUTER1, process.env.ROUTER2];

const queues = keys.map(
    () =>
        new PQueue({
            concurrency: 5,
            interval: 60_000,
            intervalCap: 400,
        })
);

let keyIndex = 0;
const getNextKeyIndex = () => {
    const idx = keyIndex;
    keyIndex = (keyIndex + 1) % keys.length;
    return idx;
};

async function callAPI(data, profile) {
    const triedKeys = new Set();

    while (triedKeys.size < keys.length) {
        const idx = getNextKeyIndex();
        const key = keys[idx];
        const queue = queues[idx];

        try {
            const res = await queue.add(() =>
                axios.post(
                    `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
                    { coordinates: data },
                    {
                        headers: {
                            Accept: 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                            Authorization: key,
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                    }
                )
            );

            return { status: 200, data: res.data };
        } catch (err) {
            if (err.response?.status === 429) {
                console.warn(`Key ${idx} hit rate limit, trying next key`);
                triedKeys.add(idx);
                continue;
            }
            // Các lỗi khác trả luôn
            return { status: 400, data: err.message };
        }
    }

    return { status: 400, data: 'All keys exhausted or failed' };
}

// Hàm public
export const SetUpRouter = ({ data, profile }) => callAPI(data, profile);

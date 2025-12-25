import { SumCache, CurCache } from "../services/Weather.service.js";
import cron from "node-cron";
import GpsModel from "../Models/Gps.model.js";
import { client } from "../config/redis.js";
let j = 0,
    task = null,
    gps = [];
function Task() {
    task = cron.schedule("* * * * *", async () => {
        if (j >= gps.length) {
            task.stop();
            return;
        }
        for (let i = j; i < j + 10 && i < gps.length; ++i) {
            await Promise.all([
                CurCache(gps[i].lat, gps[i].lng),
                SumCache(gps[i].lat, gps[i].lng),
            ]);
        }
        j += 10;
    });
}

export default function weatherJob() {
    cron.schedule("0 0 * * * ", async () => {
        if (task) task.stop();
        await client.flushAll();
        gps = await GpsModel.find();
        j = 0;
        Task();
        console.log("run task");
    });
}

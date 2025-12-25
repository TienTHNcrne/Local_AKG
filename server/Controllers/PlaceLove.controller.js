/** @format */

import {
    CreatePlaceLove,
    FindPlace,
    FindAllPlace,
    removePlace,
} from "../services/PlaceLove.service.js";

const CreatePlace = async (req, res) => {
    try {
        const UserId = req.body.UserId;
        const lat = req.body.lat;
        const lng = req.body.lng;
        const name = req.body.name;
        const img = req.body.img;
        const result1 = await FindPlace({
            UserId: UserId,
            name: name,
            lat: lat,
        });
        if (result1.data === "PlaceLove")
            return res.status(200).json("exist Place");
        const result = await CreatePlaceLove({
            UserId: UserId,
            name: name,
            lat: lat,
            lng: lng,
            lng: lng,
            img: img,
        });
        console.log(result.data);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err.message);
    }
};
//GET
const GetPlace = async (req, res) => {
    try {
        const UserId = req.body.UserId;
        const lat = req.body.lat;
        const lng = req.body.lng;
        const name = req.body.name;
        const result = await FindPlace({
            UserId: UserId,
            name: name,
            lat: lat,
            lng: lng,
        });

        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err.message);
    }
};

//GET ALL
const GetAllPlace = async (req, res) => {
    console.log(req.body.UserId);
    try {
        const UserId = req.body.UserId;

        const result = await FindAllPlace({
            UserId: UserId,
        });
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err.message);
    }
};
// remove
const RemoveP = async (req, res) => {
    try {
        const UserId = req.body.UserId;
        const lat = req.body.lat;
        const lng = req.body.lng;
        const name = req.body.name;
        const result = await removePlace({
            UserId: UserId,
            name: name,
            lat: lat,
            lng: lng,
        });
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err.message);
    }
};
export { CreatePlace, GetPlace, GetAllPlace, RemoveP };

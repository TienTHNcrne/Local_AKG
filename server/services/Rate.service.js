/** @format */

import RateModel from "../Models/Rate.model.js";

import UserModel from "../Models/user.model.js";

const Create = async ({ lat, lng, UserId, comment, rate, imgs }) => {
    try {
        const result = await RateModel.create({
            lat: lat,
            lng: lng,
            comment: comment,
            rate: rate,
            imgs: imgs,
            UserId: UserId,
        });
        return {
            status: 200,
            data: result,
        };
    } catch (Err) {
        console.log(Err.message);
    }
};

const GetAll = async ({ lat, lng }) => {
    try {
        const result = await RateModel.find({
            lat: lat,
            lng: lng,
        }).populate("UserId");
        return {
            status: 200,
            data: result,
        };
    } catch (Err) {
        console.log(Err.message);
    }
};

export { GetAll, Create };

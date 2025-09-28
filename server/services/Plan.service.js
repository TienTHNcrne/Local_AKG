/** @format */

import PlansModel from "../Models/Plans.model.js";

const CreatePlan = async ({ UserId, name, details }) => {
    try {
        const result = await PlansModel.create({
            UserId: UserId,
            name: name,
            details: details,
        });
        return {
            status: 200,
            data: result,
        };
    } catch (err) {
        console.log(err.message);
        return {
            status: 500,
            error: err.message,
        };
    }
};

const GetAll = async ({ UserId }) => {
    try {
        const result = await PlansModel.find({ UserId: UserId });
        return {
            status: 200,
            data: result,
        };
    } catch (err) {
        return {
            status: 500,
            error: err.message,
        };
    }
};

const remove = async ({ UserId, name, details }) => {
    try {
        const result = await PlansModel.deleteOne({
            UserId: UserId,
            name: name,
            details: details,
        });
        if (result.deletedCount)
            return {
                status: 200,
                data: "removedPlan",
            };
        return { status: 200, data: "NotFound" };
    } catch (err) {
        console.log(err.message);
        return { status: 501, data: err.message };
    }
};

const updateName = async ({ UserId, id, name }) => {
    try {
        const result = await PlansModel.findOneAndUpdate(
            { _id: id, UserId: UserId },
            { $set: { name: name } },
            { new: true }
        );

        if (!result) {
            return { status: 404, error: "Plan not found" };
        }

        return { status: 200, data: result };
    } catch (err) {
        console.log(err.message);
        return { status: 500, error: err.message };
    }
};
export { GetAll, remove, CreatePlan, updateName };

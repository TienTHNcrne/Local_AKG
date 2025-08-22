import FestivalModel from "../Models/Festival.model.js";

const CreateFestival = async ({ name, time, description, place, imgs }) => {
    try {
        console.log(imgs);
        const result = await FestivalModel.create({
            name: name,
            time: time,
            description: description,
            place: place,
            imgs: imgs,
        });
        return {
            status: 200,
            data: result,
        };
    } catch (err) {
        console.log(err);

        return {
            status: 500,
            data: `Lỗi festival ${err.message}`,
        };
    }
};

const GetAll = async () => {
    try {
        const result = await FestivalModel.find({});
        return {
            status: 200,
            data: result,
        };
    } catch (err) {
        console.log(err);

        return {
            status: 500,
            data: `Lỗi festival ${err.message}`,
        };
    }
};

export { GetAll, CreateFestival };

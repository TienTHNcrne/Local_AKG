import FoodModel from "../Models/Food.model.js";

const CreateFood = async ({ name, general, place, price, imgs, smell }) => {
    try {
        const result = await FoodModel.create({
            name: name,
            general: general,
            price: price,
            smell: smell,
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
        const result = await FoodModel.find({});
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

export { GetAll, CreateFood };

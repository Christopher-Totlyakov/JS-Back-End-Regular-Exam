import Car from "../models/Car.js";

export default {
    async create(carData) {

        return await Car.create(carData);
    },
    async getAll() {
        return await Car.find();
    },
    async getById(id) {
        return await Car.findById(id)
            .populate("likes", "email")
            .populate("owner", "firstName lastName");
    },
    async like(carId, userId) {
        const car = await Car.findById(carId);

        if (!car.likes.includes(userId)) {
            car.likes.push(userId);
            await car.save();
        }
    },
    async hasLiked(carId, userId) {
        const car = await Car.findById(carId);
        return car.likes.includes(userId);
    },
    async deleteCar(id) {
        return Car.findByIdAndDelete(id);
    },
    async updateCar(id, data) {
        return Car.findByIdAndUpdate(id, data, { runValidators: true});
    },
    async getByOwner(ownerId) {
        return Car.find({ owner: ownerId });
    },
};

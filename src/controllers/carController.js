import { Router } from "express";
import carService from "../services/carService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddlewares.js";

const carController = Router();

carController.get("/create", isAuth, (req, res) => {
    res.render("car/create");
});


carController.post("/create", isAuth, async (req, res) => {
    const data = req.body;

    try {
        data.owner = res.locals.user.id
        await carService.create(data);
        res.redirect("/cars");
    } catch (err) {
        res.render("car/create", {
            error: getErrorMessage(err),
            car: data
        });
    }
});

carController.get("/", async (req, res) => {
    try {
        const cars = await carService.getAll();
        res.render("car/all-posts", { cars });
    } catch (err) {
        res.render("car/all-posts", {
            error: getErrorMessage(err),
            cars: []
        });
    }
});

carController.get("/:id/details", async (req, res) => {
    try {
        const car = await carService.getById(req.params.id);

        if (!car) {
            return res.status(404).render("404", { error: "Car not found" });
        }

        let isLoggedIn = false;
        let isOwner = false;
        const currentUserId = req.user?.id;

        if (currentUserId) {
            isLoggedIn = true;
        }

        if (currentUserId == car.owner.id) {
            isOwner = true;
        }


        const hasLiked = isLoggedIn && car.likes.some(u => u._id.toString() === currentUserId);


        const peopleWhoLiked = car.likes.length > 0
            ? car.likes.map(u => u.email).join(", ")
            : "No one has liked yet";

        res.render("car/details", {
            car,
            isLoggedIn,
            isOwner,
            hasLiked,
            totalLikes: car.likes.length,
            peopleWhoLiked
        });
    } catch (err) {
        const cars = await carService.getAll();
        res.render("car/all-posts", {
            error: getErrorMessage(err),
            cars
        });
    }
   
});

carController.get("/:id/like", isAuth, async (req, res) => {
    const carId = req.params.id;
    const userId = req.user?.id;

    try {
        const car = await carService.getById(carId);

        if (!car){
            return res.status(404).render("404", { error: "Car not found" });
        } 

        if (car.owner.id == userId) {
            return res.redirect(`/cars/${carId}/details`);
        }

        await carService.like(carId, userId);
        res.redirect(`/cars/${carId}/details`);
    } catch (err) {
        res.redirect(`/cars/${carId}/details`);
    }
    
});

carController.get("/:id/delete", isAuth, async (req, res) => {
    const carId = req.params.id;
    const userId = req.user?.id;

    try {
        const car = await carService.getById(carId);

        if (!car) {
            throw new Error('Car not found');
        }

        if (car.owner.id != userId) {
            throw new Error('You are not the owner');

        }

        await carService.deleteCar(carId);

        res.redirect("/cars");
    } catch (err) {
        res.render("404", {
            error: getErrorMessage(err),
        });
    }
});
carController.get("/:id/edit", isAuth, async (req, res) => {
    try {
        const car = await carService.getById(req.params.id);

        if (!car) {
            throw new Error('Car not found');

        }

        if (car.owner.id != req.user.id) {
            throw new Error('You are not the owner');
        }

        res.render("car/edit", { car });
    } catch (err) {
        res.render("404", {
            error: getErrorMessage(err),
        });
    }
});

carController.post("/:id/edit", isAuth, async (req, res) => {

    try {
        const carId = req.params.id;
        const userId = req.user.id;
        const car = await carService.getById(carId);

        if (!car) {
            throw new Error('Car not found');
        }

        if (car.owner.id != userId) {
            return res.redirect(`/cars/${carId}/details`);
        }

        const mewCar = req.body;


        await carService.updateCar(carId, mewCar);

        res.redirect(`/cars/${carId}/details`);
    } catch (err) {
        res.render("car/edit", {
            car: req.body,
            error: getErrorMessage(err),
        });
    }
});

carController.get("/my-posts", isAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const myCars = await carService.getByOwner(userId);

        res.render("car/my-posts", {
            cars: myCars,
            hasCars: myCars.length > 0
        });
    } catch (err) {
        res.status(500).render("404", { error: "Could not load your cars" });
    }
});




export default carController;

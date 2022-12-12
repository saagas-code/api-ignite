import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { rentalRoutes } from './rental.routes';
import { passwordRoutes } from './password.routes';


const router = Router()

router.use("/", authenticateRoutes)
router.use("/users", usersRoutes)
router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)
router.use("/cars", carsRoutes)
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);


export { router }
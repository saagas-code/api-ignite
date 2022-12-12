 import { Router } from "express";
 import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { CreateSpecificationController } from './../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }
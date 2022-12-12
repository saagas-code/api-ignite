import { Router } from 'express'
import { CreateCarController } from './../modules/cars/useCases/createCar/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListAvailableCarsController } from './../modules/cars/useCases/listAvailableCars/ListAvailableController';
import { CreateCarSpecificationController } from './../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from './../modules/cars/useCases/uploadCarImage/UploadCarImagesController';
import  multer  from 'multer';
import uploadConfig from "../config/upload";

export const carsRoutes = Router()

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController()
let createCarSpecificationController = new CreateCarSpecificationController()
let uploadCarImagesController = new UploadCarImagesController()

// const upload = multer(uploadConfig.upload("./tmp/cars"))
const {upload} = uploadConfig.upload()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specification/:id", createCarSpecificationController.handle)
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)
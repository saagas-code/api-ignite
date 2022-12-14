import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

import { CreateCategoryController } from './../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from './../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from './../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()


categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post( 
  "/import", 
  upload.single("file"), 
  ensureAuthenticated, 
  ensureAdmin,
  importCategoryController.handle
)



export {categoriesRoutes}
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { CreateUserController } from './../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from './../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ProfileUserController } from './../modules/accounts/useCases/profileUserUseCase/ProfileUserController';



export const usersRoutes = Router();

const {upload: uploadAvatar} = uploadConfig.upload()
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserControler = new ProfileUserController();


usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar", 
  ensureAuthenticated, 
  uploadAvatar.single("avatar"), 
  updateUserAvatarController.handle
)
usersRoutes.get("/profile", ensureAuthenticated, profileUserControler.handle)
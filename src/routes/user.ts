import * as userController from "../controllers/userController";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", userController.getUserById);
userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUserById);
userRouter.delete("/", userController.deleteAllUsers);


export default userRouter;
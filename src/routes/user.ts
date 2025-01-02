import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "@controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);

export default userRouter;
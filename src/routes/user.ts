import { createUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);


export default userRouter;
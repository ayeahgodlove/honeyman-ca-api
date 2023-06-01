// src/infrastructure/routes/user-routes.ts
import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const userController = new UsersController();

const userRouter = Router();

userRouter.get("", isAuthenticatedMiddleware, userController.getAll);
userRouter.get("/:id", isAuthenticatedMiddleware, userController.getUserById);
userRouter.post("", isAuthenticatedMiddleware, userController.createUser);
userRouter.put("/:id", isAuthenticatedMiddleware, userController.updateUser);
userRouter.delete("/:id", isAuthenticatedMiddleware, userController.deleteUser);

export default userRouter;

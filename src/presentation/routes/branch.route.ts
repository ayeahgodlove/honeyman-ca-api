// src/infrastructure/routes/branch-routes.ts
import { Router } from "express";
import { BranchesController } from "../controllers/branch.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const branchController = new BranchesController();

const branchRouter = Router();

branchRouter.get("", branchController.getAll);
branchRouter.get("/:id", branchController.getBranchById);
branchRouter.post("", isAuthenticatedMiddleware, branchController.createBranch);
branchRouter.put("/:id", isAuthenticatedMiddleware, branchController.updateBranch);
branchRouter.delete("/:id", isAuthenticatedMiddleware, branchController.deleteBranch);

export default branchRouter;

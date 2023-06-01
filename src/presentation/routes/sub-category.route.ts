// src/infrastructure/routes/category-routes.ts
import { Router } from 'express';
import { SubCategoriesController } from '../controllers/sub-category.controller';
import { isAuthenticatedMiddleware } from '../../shared/middlewares/is-authenticated.middleware';

const subCategoryController = new SubCategoriesController();

const subCategoryRouter = Router();

subCategoryRouter.get('',isAuthenticatedMiddleware, subCategoryController.getAll);
subCategoryRouter.get('/:id',isAuthenticatedMiddleware, subCategoryController.getSubCategoryById);
subCategoryRouter.post('',isAuthenticatedMiddleware, subCategoryController.createSubCategory);
subCategoryRouter.put('/:id',isAuthenticatedMiddleware, subCategoryController.updateSubCategory);
subCategoryRouter.delete('/:id',isAuthenticatedMiddleware, subCategoryController.deleteSubCategory);

export default subCategoryRouter;

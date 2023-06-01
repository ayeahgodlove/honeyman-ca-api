// src/infrastructure/routes/category-routes.ts
import { Router } from 'express';
import { CategoriesController } from '../controllers/category.controller';
import { isAuthenticatedMiddleware } from '../../shared/middlewares/is-authenticated.middleware';

const categoryController = new CategoriesController();

const categoryRouter = Router();

categoryRouter.get('', isAuthenticatedMiddleware, categoryController.getAll);
categoryRouter.get('/:id', isAuthenticatedMiddleware, categoryController.getCategoryById);
categoryRouter.post('', categoryController.createCategory);
categoryRouter.put('/:id', isAuthenticatedMiddleware, categoryController.updateCategory);
categoryRouter.delete('/:id', isAuthenticatedMiddleware, categoryController.deleteCategory);

export default categoryRouter;

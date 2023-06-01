// src/infrastructure/routes/product-routes.ts
import { Router } from 'express';
import { ProductsController  } from '../controllers/product.controller';
import { isAuthenticatedMiddleware } from '../../shared/middlewares/is-authenticated.middleware';

const productController = new ProductsController();

const productRouter = Router();

productRouter.get('',isAuthenticatedMiddleware, productController.getAll);
productRouter.get('/:id',isAuthenticatedMiddleware, productController.getProductById);
productRouter.post('',isAuthenticatedMiddleware, productController.createProduct);
productRouter.put('/:id',isAuthenticatedMiddleware, productController.updateProduct);
productRouter.delete('/:id',isAuthenticatedMiddleware, productController.deleteProduct);

export default productRouter;

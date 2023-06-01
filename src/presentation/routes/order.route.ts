// src/infrastructure/routes/order-routes.ts
import { Router } from "express";
import { OrdersController } from "../controllers/order.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const orderController = new OrdersController();

const orderRouter = Router();

orderRouter.get("", isAuthenticatedMiddleware, orderController.getAll);
orderRouter.get(
  "/:id",
  isAuthenticatedMiddleware,
  orderController.getOrderById
);
orderRouter.post("", isAuthenticatedMiddleware, orderController.createOrder);
orderRouter.put("/:id", isAuthenticatedMiddleware, orderController.updateOrder);
orderRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  orderController.deleteOrder
);

export default orderRouter;

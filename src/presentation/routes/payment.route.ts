// src/infrastructure/routes/payment-routes.ts
import { Router } from 'express';
import { PaymentsController  } from '../controllers/payment.controller';
import { isAuthenticatedMiddleware } from '../../shared/middlewares/is-authenticated.middleware';

const paymentController = new PaymentsController();

const paymentRouter = Router();

paymentRouter.get('',isAuthenticatedMiddleware,  paymentController.getAll);
paymentRouter.get('/:id',isAuthenticatedMiddleware,  paymentController.getPaymentById);
paymentRouter.post('',isAuthenticatedMiddleware,  paymentController.createPayment);
paymentRouter.put('/:id',isAuthenticatedMiddleware,  paymentController.updatePayment);
paymentRouter.delete('/:id',isAuthenticatedMiddleware,  paymentController.deletePayment);

export default paymentRouter;

import { NextFunction, Response, Request } from "express";

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // redirect the user to the login route
  res.status(401).json({
    message: "Unauthorized!",
    success: false,
  });
};

// src/infrastructure/routes/category-routes.ts
import { Router } from "express";
import Passport from "../../../shared/middlewares/authz.middleware";

const authRoutes = Router();
// redirect to google sign in page
authRoutes.get(
  "/oauth/google",
  Passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//redirect user to the success or failure page from google sign in page
authRoutes.get(
  "/oauth2/redirect/google",
  Passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);
//redirect user to facebook login page
authRoutes.get(
  "/auth/facebook",
  Passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

//redirect user from facebook login page to success or failure login page
authRoutes.get(
  "/oauth2/redirect/facebook",
  Passport.authenticate("facebook", {
    failureRedirect: "/auth/failure",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);
// console.log(authRoutes)

authRoutes.post(
  "/auth/login",
  Passport.authenticate("local-auth"),
  (req, res) => {
    try {

      res.status(200).json({
        success: true,
        message: "Login Successfully!",
        data: req.user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login Failed",
      });
    }
  }
);

authRoutes.get("/auth/failure", (req, res) => {
  res.json({
    message: "failure!",
    success: false,
  });
});

authRoutes.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out successfully!");
  });
});


export { authRoutes };

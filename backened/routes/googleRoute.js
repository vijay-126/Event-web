// routes/googleRoute.js
import { Router } from "express";
import passport from "passport";
import { googleCallback } from "../controller/googleAuthController.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleCallback
);

// ✅ Default export
export default router;

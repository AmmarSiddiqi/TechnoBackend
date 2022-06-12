import express, { Router } from "express";
import { Users } from "../models/user.js";
import { signup } from "../controllers/user/signup.js";
import { login } from "./../controllers/user/login.js";
import { verifyEmail } from "../controllers/user/verifyEmail.js";

const router = Router();

router.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.url} @ ${Date.now()}`);
  next();
});

router.get("/", async (req, res) => {
  const users = await Users.find().select("name email date isVerified");
  res.status(200).send(users);
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

export { router as userRouter };

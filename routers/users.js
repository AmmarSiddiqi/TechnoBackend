import { Router } from "express";
import { Users } from "../models/user.js";
import { signup } from "../controllers/user/signup.js";
import { login } from "./../controllers/user/login.js";
import { verifyEmail } from "../controllers/user/verifyEmail.js";
import { profile } from "../controllers/user/profile.js";
import { profileUpdate } from "../controllers/user/profileUpdate.js";
import { changePassword } from "../controllers/user/changePassword.js";
import upload from "../utils/multer.js";

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
router.get("/profile/:id", profile);
router.post("/profile/changePassword/:id", changePassword);
router.put("/profile/update", /*upload.single("image"),*/ profileUpdate);

export { router as userRoute };

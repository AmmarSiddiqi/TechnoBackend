import express from "express";
import { renewAccessToken } from "../controllers/protected/renewAccessToken.js";
const router = express.Router();

router.post("/", renewAccessToken);

export { router as protectedRoute };

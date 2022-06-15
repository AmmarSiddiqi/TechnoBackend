import express from "express";
import { postCategories } from "../controllers/category/postCategories.js";
import { getCategories } from "./../controllers/category/getCategories.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", postCategories);

export { router as catergoryRoute };

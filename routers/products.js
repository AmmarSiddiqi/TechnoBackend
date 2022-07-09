import express from "express";
import { addProduct } from "../controllers/product/addProduct.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";
import { getAllProducts } from "../controllers/product/getAllProducts.js";
import { getProduct } from "../controllers/product/getProduct.js";
import { getTotalNumberOfProducts } from "../controllers/product/getTotalNumberOfProducts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} @ ${Date.now()}`);
  next();
});

router.get("/", getAllProducts);

router.get("/totalProducts", getTotalNumberOfProducts);

router.get("/:id", getProduct);

router.post("/add", /* upload.array("image", 6), */ addProduct);

router.delete("/delete/:id", auth, deleteProduct);

export { router as productRoute };

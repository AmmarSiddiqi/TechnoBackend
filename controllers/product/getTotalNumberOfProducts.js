import { Products } from "../../models/product.js";
import asyncHandler from "express-async-handler";

export const getTotalNumberOfProducts = asyncHandler(async (req, res) => {
  const number = await Products.countDocuments();
  if (!number) return res.status(400).send("No Pagination Number Found");
  return res.status(200).send(number.toString());
});

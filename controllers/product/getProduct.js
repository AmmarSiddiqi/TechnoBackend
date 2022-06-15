import asyncHandler from "express-async-handler";
import { Products } from "../../models/product.js";
import { mongoose } from "mongoose";

export const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(403).send(`Invalid Product ID ${id}`);
  const product = await Products.findById(id)
    .populate("user", "image name email countryCode phoneNumber isVerified")
    .populate("location", "name lat lng");
  if (!product) return res.status(400).send("No product found");
  return res.status(200).send(product);
});

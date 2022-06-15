import { Products } from "../../models/product.js";
import asyncHandler from "express-async-handler";
import { pagination } from "../../helpers/pagination.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageNumber = req.query.pageNumber;
  const pageSize = req.query.pageSize;
  const items = pagination(pageNumber, pageSize);
  console.log(items);
  const products = await Products.find()
    .skip(items)
    .limit(pageSize)
    .select("-__v")
    .populate("user", "image name email countryCode phoneNumber isVerified")
    .populate("location", "name lat lng");
  if (!products) return res.status(400).send("Didn't find any products");
  return res.status(200).send(products);
});

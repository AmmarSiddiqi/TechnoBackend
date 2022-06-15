import asyncHandler from "express-async-handler";
import { Products } from "../../models/product.js";

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("No product found against this ID");

  let product = await Products.findById(id);
  if (product.user.toString() !== req.user._id)
    return res
      .status(400)
      .send("You are not allowed to delete someone's else ad");
  product = await Products.findByIdAndDelete(id);
  return res.status(200).send({ product, message: "Product Deleted" });
});

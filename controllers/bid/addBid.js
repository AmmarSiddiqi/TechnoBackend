import asyncHandler from "express-async-handler";
import { Bid, validate } from "../../models/bid.js";
import { Products } from "../../models/product.js";
import { Users } from "../../models/user.js";

export const addBid = asyncHandler(async (req, res) => {
  await validate(req.body);
  const { bidBy, amount, product } = req.body;
  if (bidBy === req.user._id)
    return res.status(400).send("You can't bid against your own product.");
  const user = await Users.findById(bidBy);
  if (!user) return res.status(400).send("You cannot bid.");

  const validProduct = await Products.findById(req.body.product);
  if (!validProduct) return res.status(400).json({ error: "Invalid Product" });

  const bid = new Bid({ bidBy, amount, product });
  await bid.save();

  return res.status(200).send(bid);
});

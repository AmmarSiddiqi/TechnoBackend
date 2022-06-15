import asyncHandler from "express-async-handler";
import { Bid } from "../../models/bid.js";

export const getBids = asyncHandler(async (req, res) => {
  const product = req.body.product;
  const bids = await Bid.find({ product })
    .sort({ amount: -1 })
    .populate("bidBy", "name countryCode phoneNumber image");
  if (!bids) return res.status(400).send("No Bids Found");
  return res.status(400).send(bids);
});

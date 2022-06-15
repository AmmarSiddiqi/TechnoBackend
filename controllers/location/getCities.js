import asyncHandler from "express-async-handler";
import { Cities } from "../../models/location.js";

export const getCities = asyncHandler(async (req, res) => {
  const cities = await Cities.find();
  return res.status(200).send(cities);
});

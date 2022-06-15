import asyncHandler from "express-async-handler";
import { Cities } from "../../models/location.js";

export const addCities = asyncHandler(async (req, res) => {
  let sortedCities = req.body.sort((a, b) => a.last_nom - b.last_nom);
  Cities.insertMany(sortedCities);
  return res.status(200).send("Cities Added");
});

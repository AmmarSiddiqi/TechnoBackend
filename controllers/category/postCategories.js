import { Categories, validate } from "./../../models/category.js";
import asyncHandler from "express-async-handler";

export const postCategories = asyncHandler(async (req, res) => {
  const validated = await validate(req.body);
  console.log(req.body);
  console.log(validated);

  await Categories.insertMany(validated);
  return res.status(200).send("Categories Added");
});

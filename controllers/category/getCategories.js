import { Categories } from "../../models/category.js";
import asyncHandler from "express-async-handler";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find();
  if (!categories) return res.status(404).send("No category found");

  return res.status(200).send(categories);
});

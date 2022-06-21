import { Products, validate } from "../../models/product.js";
import asyncHandler from "express-async-handler";
import { cloudinary } from "../../utils/cloudinary.js";

export const addProduct = asyncHandler(async (req, res) => {
  const validated = await validate(req.body);

  // let imagesData = [];

  // const files = req.files;
  // console.log(files);

  // for (let file of files) {
  //   const uploader = await cloudinary.uploader.upload(file.path, {
  //     folder: `TechnoMarketplace/Products`,
  //   });
  //   imagesData.push(uploader.secure_url);
  // }

  // const result = await cloudinary.uploader.upload(req.files.path, {
  //   folder: `TechnoMarketplace/Products`,
  // });

  const product = new Products(validated);
  // product.image = imagesData;

  await product.save();

  return res.status(200).send("Product Added");
});

import asyncHandler from "express-async-handler";
import { Users, validate } from "../../models/user.js";
import { cloudinary } from "../../utils/cloudinary.js";

export const profileUpdate = asyncHandler(async (req, res) => {
  console.log(req.user);
  const id = req.user._id;
  await validate(req.body);

  const img = await cloudinary.uploader.upload(req.file.path, {
    folder: `TechnoMarketplace/Profiles`,
  });
  console.log(img);

  const user = await Users.findById(id);
  if (!user) return res.status(400).send("Invalid User Id");

  console.log(user);

  if (req.file.path) user.image = img.secure_url;
  if (req.body.name) user.name = req.body.name;
  if (req.body.contryCode) user.countryCode = req.body.contryCode;
  if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;

  const updatedUser = await user.save();
  return res.status(200).send(updatedUser);
});

import _ from "lodash";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Users, validate } from "../../models/user.js";

export const signup = asyncHandler(async (req, res) => {
  const validated = await validate(req.body);

  let user = await Users.findOne({ email: validated.email });
  if (user) return res.status(400).send("User already registered");

  user = new Users(validated);
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  user.password = hashed;

  const dataToSend = _.pick(user, [
    "name",
    "email",
    "date",
    "image",
    "countryCode",
    "phoneNumber",
  ]);

  await user.save();

  return res.status(200).send(dataToSend);
});

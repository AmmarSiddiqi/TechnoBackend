import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import _ from "lodash";
import { Users, validate } from "../../models/user.js";

export const login = asyncHandler(async (req, res) => {
  const validated = await validate(req.body);

  const { email, password } = validated;

  const user = await Users.findOne({ email });
  if (!user) return res.status(404).send("Invalid Email or Password");

  const isValid = bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send("Invalid Password");

  const dataToSend = _.pick(user, [
    "name",
    "email",
    "date",
    "image",
    "isVerified",
    "countryCode",
    "phoneNumber",
  ]);

  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  return res
    .header("x-auth-token", token)
    .header("x-refresh-token", refreshToken)
    .send(dataToSend);
});

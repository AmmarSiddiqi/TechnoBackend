import _ from "lodash";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import OTPGenerator from "otp-generator";
import { Users, validate } from "../../models/user.js";
import { Verification } from "../../models/userVerification.js";
import { emailOTPTemplate, mailTransport } from "../../utils/mail.js";

export const signup = asyncHandler(async (req, res) => {
  const validated = await validate(req.body);

  let user = await Users.findOne({ email: validated.email });
  if (user) return res.status(400).send("User already registered");

  user = new Users(validated);
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  user.password = hashed;

  const token = user.generateAuthToken();

  let OTP = OTPGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });

  const verification = new Verification({
    user: user._id,
    otp: OTP,
  });

  verification.otp = await bcrypt.hash(verification.otp, salt);

  await verification.save();
  await user.save();

  mailTransport.sendMail({
    from: "security@techno.com",
    to: user.email,
    subject: "Verify your email",
    html: emailOTPTemplate(OTP, user.name),
  });

  const dataToSend = _.pick(user, [
    "_id",
    "name",
    "email",
    "date",
    "image",
    "countryCode",
    "phoneNumber",
    "isVerified",
  ]);

  return res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(dataToSend);
});

import { validateObjectId } from "../../helpers/validateObjectId.js";
import { Users } from "../../models/user.js";
import { Verification, validate } from "../../models/userVerification.js";
import { mailTransport } from "../../utils/mail.js";
import { emailWelcomeTemplate } from "./../../utils/mail.js";

export const verifyEmail = async (req, res) => {
  const validated = await validate(req.body);
  const { userId, otp } = validated;

  if (!userId || !otp)
    return res.status(401).json({ error: "User ID or OTP missing" });

  if (!validateObjectId(userId)) return res.status(403).send("Invalid User Id");

  const user = await Users.findById(userId);
  if (!user) return res.status(404).send("User not found.");

  if (user.isVerified) return res.status(400).send("User is already verified");

  const token = await Verification.findOne({ user: userId });
  if (!token) return res.status(404).send("User not found");

  const valid = await token.compareOTP(otp);
  if (!valid) return res.status(404).send("Invalid Token");
  console.log(valid);

  user.isVerified = true;

  await user.save();
  await Verification.findByIdAndDelete({ _id: token._id });

  mailTransport.sendMail({
    from: "info@techno.com",
    to: user.email,
    subject: "Welcome to Techno Marketplace",
    html: emailWelcomeTemplate(user.name),
  });

  return res.status(200).send("User Verified");
};

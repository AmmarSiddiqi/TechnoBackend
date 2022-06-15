import asyncHandler from "express-async-handler";
import { Users } from "../../models/user.js";
import bcrypt from "bcrypt";
import { mongoose } from "mongoose";

export const changePassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //   console.log(req.params);

  //   if (!mongoose.Types.ObjectId.isValid(id))
  //     return res.status(403).send(`Invalid Profile ID ${id}`);

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(403).send(`Invalid Profile ID ${id}`);
  }

  const user = await Users.findById(id);
  if (!user) return res.status(404).send("User not found");

  let { oldPassword, newPassword } = req.body;

  const validOldPassword = await bcrypt.compare(oldPassword, user.password);
  console.log(validOldPassword);
  if (!validOldPassword) return res.status(403).send("Invalid Old Password");

  if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
    return res
      .status(400)
      .send(
        "Password should contain atleast one uppercase, one lowercase, one number and should be 8 characters long"
      );

  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(newPassword, salt);

  user.password = newPassword;
  await user.save();

  return res.status(200).send("Password Changed Successfully");
});

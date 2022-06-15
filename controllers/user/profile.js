import expressAsyncHandler from "express-async-handler";
import { Users } from "../../models/user.js";

export const profile = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await Users.findById(id).select(
    "name email countryCode phoneNumber isVerified image"
  );
  if (!user) return res.status(400).send("User Not Found");
  return res.status(200).send(user);
});

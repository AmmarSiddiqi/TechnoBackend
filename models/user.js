import mongoose from "mongoose";
import * as yup from "yup";
import jwt from "jsonwebtoken";

const AccessToken = process.env.ACCESS_TOKEN;
const RefreshToken = process.env.REFRESH_TOKEN;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    min: 5,
  },
  password: {
    type: String,
    min: 8,
    max: 1024,
  },
  phoneNumber: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      phone: this.phoneNumber,
      image: this.image,
      isVerified: this.isVerified,
    },
    AccessToken,
    { expiresIn: "7d" }
  );
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id }, RefreshToken, { expiresIn: "7d" });
  return token;
};

const Users = mongoose.model("Users", userSchema);

const validate = (user) => {
  const schema = yup.object({
    name: yup.string().min(3).max(256),
    email: yup.string().email(),
    password: yup.string().min(8).max(15),
    phoneNumber: yup.number().min(7, "number must be 7 digits long."),
  });
  return schema.validate(user);
};

export { validate, Users };

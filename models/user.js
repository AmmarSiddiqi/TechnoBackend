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
  countryCode: {
    type: String,
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
    // required: true
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, AccessToken, { expiresIn: "7d" });
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
    password: yup
      .string()
      .min(6)
      .max(15)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    countryCode: yup.string().min(2).max(5),
    phoneNumber: yup.number().min(5, "number must be 7 digits long."),
  });
  return schema.validate(user);
};

export { validate, Users };

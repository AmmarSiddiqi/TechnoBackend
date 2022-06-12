import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as yup from "yup";

const verificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

verificationSchema.methods.compareOTP = async function (otp) {
  const result = bcrypt.compare(otp, this.otp);
  return result;
};

const Verification = mongoose.model("Verification", verificationSchema);

const validate = (data) => {
  const schema = yup.object().shape({
    userId: yup.string().required(),
    otp: yup.string().required().min(6).max(6),
  });
  return schema.validate(data);
};

export { Verification, validate };

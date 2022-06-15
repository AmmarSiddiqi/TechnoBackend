import mongoose from "mongoose";
import * as yup from "yup";

const schema = mongoose.Schema;

const bidSchema = new schema({
  bidBy: {
    type: schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  amount: { type: Number, required: true },
  product: {
    type: schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  // adHolder: { type: schema.Types.ObjectId, ref: "User", required: true },
  postedAt: { type: Date, default: Date.now() },
});

const validate = (bid) => {
  const schema = yup.object({
    bidBy: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required(),
    amount: yup.number().required(),
    product: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required(),
  });
  return schema.validate(bid);
};

const Bid = mongoose.model("Bids", bidSchema);

export { Bid, validate };

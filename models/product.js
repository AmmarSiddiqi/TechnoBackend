import mongoose from "mongoose";
import * as yup from "yup";

const schema = mongoose.Schema;

const productSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: true,
  },
  description: {
    type: String,
    minlength: 6,
    maxlength: 999,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  location: { type: schema.Types.ObjectId, ref: "Cities" },
  active: { type: Boolean, default: true },
  publishAt: { type: Date, default: Date.now() },
});

const validate = (product) => {
  const schema = yup.object({
    title: yup.string().min(3).max(256).required(),
    user: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required(),
    location: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required(),
    description: yup.string().min(6).max(999).required(),
    price: yup.number().required(),
    category: yup.string().required(),
    image: yup.string().required(),
    subCategory: yup.string().required(),
  });
  return schema.validate(product);
};

const Products = mongoose.model("Products", productSchema);

export { Products, validate };

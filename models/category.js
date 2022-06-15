import mongoose from "mongoose";
const schema = mongoose.Schema;
import * as yup from "yup";

const categorySchema = new schema({
  name: { type: String, required: true },
  subCategories: { type: Array, required: true },
});

const Categories = mongoose.model("Categories", categorySchema);

const validate = (category) => {
  const schema = yup.object({
    name: yup.string().required(),
    subCategories: yup.array().required(),
  });
  return schema.validate(category);
};

export { Categories, validate };

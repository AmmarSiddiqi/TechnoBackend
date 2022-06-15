import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
});

const Cities = mongoose.model("Cities", citiesSchema);

export { Cities };

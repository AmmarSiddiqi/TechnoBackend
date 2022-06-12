import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

export const validateObjectId = (id) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id; //true or false

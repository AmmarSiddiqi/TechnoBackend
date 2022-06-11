import { mongoose } from "mongoose";
import "./dotenv.js";

let mongoDBUrl = process.env.MONGODB_URL;
mongoose.connect(mongoDBUrl, () => console.log("Connected with database"));

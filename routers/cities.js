import express from "express";
import { addCities } from "../controllers/location/addCities.js";
import { getCities } from "./../controllers/location/getCities.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", addCities);

router.get("/", getCities);

export { router as locationRoute };

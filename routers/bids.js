import { Router } from "express";
import { getBids } from "../controllers/bid/getBids.js";
import { addBid } from "./../controllers/bid/addBid.js";
import { auth } from "./../middleware/auth.js";

const router = Router();

router.use(function (req, res, next) {
  console.log(`Bids API ${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", auth, addBid);
router.get("/", getBids);

export { router as bidRoute };

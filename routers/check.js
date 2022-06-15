import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} @ ${Date.now()}`);
  next();
});

router.get("/ch", async (req, res, next) => {
  return res.send("Checked");
});

export { router as checkRoute };

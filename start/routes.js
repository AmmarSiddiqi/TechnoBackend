import { auth } from "../middleware/auth.js";
import { verifyRefreshToken } from "../middleware/verifyRefreshToken.js";
import { bidRoute } from "../routers/bids.js";
import { catergoryRoute } from "../routers/categories.js";
import { checkRoute } from "../routers/check.js";
import { locationRoute } from "../routers/cities.js";
import { productRoute } from "../routers/products.js";
import { protectedRoute } from "../routers/protected.js";
import { userRoute } from "../routers/users.js";

const routes = (app) => {
  app.use("/api/user", userRoute);
  app.use("/api/check", auth, checkRoute);
  app.use("/api/protected", verifyRefreshToken, protectedRoute);
  app.use("/api/location", locationRoute);
  app.use("/api/category", catergoryRoute);
  app.use("/api/products", productRoute);
  app.use("/api/bids", bidRoute);
};

export default routes;

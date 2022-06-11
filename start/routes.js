import { auth } from "../middleware/auth.js";
import { verifyRefreshToken } from "../middleware/verifyRefreshToken.js";
import { checkRouter } from "../routers/check.js";
import { protectedRoute } from "../routers/protected.js";
import { userRouter } from "../routers/users.js";

const routes = (app) => {
  app.use("/api/user/", userRouter);
  app.use("/api/check", auth, checkRouter);
  app.use("/api/protected", verifyRefreshToken, protectedRoute);
};

export default routes;

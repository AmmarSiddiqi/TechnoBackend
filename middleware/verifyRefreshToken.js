import jwt from "jsonwebtoken";
import { redisClient } from "../redisConnection.js";

const RefreshToken = process.env.REFRESH_TOKEN;

export const verifyRefreshToken = async (req, res, next) => {
  const token = req.header("x-refresh-token");
  // const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const decode = jwt.verify(token, RefreshToken);
    req.user = decode;
    next();

    // await redisClient.get(decode._id.toString(), (err, data) => {
    //   if (err) throw err;
    //   if (data === null)
    //     return res.status(401).send("No data in verifying Refresh Token");
    //   next();
    // });
    // next();
    // if (!data)
    //   return res.status(401).send("No data in verifying Refresh Token");
    // if (data === null)
    //   return res.status(401).json({
    //     status: false,
    //     message: "Invalid request. Token is not in store.",
    //   });
    // if (JSON.parse(data).token != token)
    //   return res.status(401).json({
    //     status: false,
    //     message: "Invalid request. Token is not same in store.",
    //   });
  } catch (ex) {
    res.status(400).send(ex);
  }
};

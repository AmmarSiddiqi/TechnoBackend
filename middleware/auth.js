import jwt from "jsonwebtoken";

const AccessToken = process.env.ACCESS_TOKEN;

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  // const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const decode = jwt.verify(token, AccessToken);
    req.user = decode;
    next();
  } catch (ex) {
    res.status(400).send(ex);
  }
};

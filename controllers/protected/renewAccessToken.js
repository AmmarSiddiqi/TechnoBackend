import jwt from "jsonwebtoken";

const RefreshToken = process.env.REFRESH_TOKEN;
const AccessToken = process.env.ACCESS_TOKEN;

export const renewAccessToken = async (req, res) => {
  const refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken) return res.status(403).send("No Refresh Token Provided");
  jwt.verify(refreshToken, RefreshToken, (err, user) => {
    if (!err) {
      delete user["exp"];
      const token = jwt.sign(user, AccessToken, { expiresIn: "20s" });
      return res.header("x-auth-token", token).status(200).send(user);
    } else {
      return res.status(403).send("Error in Refresh Token");
    }
  });
};

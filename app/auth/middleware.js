const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../user/model");
const { getToken } = require("../utils/get-token");

async function verifyUser(req, res, next) {
  try {
    let token = getToken(req);
    if (!token) {
      return res.json({
        error: 1,
        message: "Token Expired",
      });
    }

    req.user = jwt.verify(token, config.secretKey);

    let user = await User.findOne({ token: { $in: [token] } });

    if (!user) {
      return res.json({
        error: 1,
        message: "Token Expired",
      });
    }

    console.log(user);

    (req.user = user), (req.token = token);
    next();
  } catch (err) {
    if (err && err.name === "JsonWebTokenError") {
      return res.json({
        error: 1,
        message: err.message,
      });
    }
    next(err);
  }
}

module.exports = {
  verifyUser,
};

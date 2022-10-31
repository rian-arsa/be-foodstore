const User = require("../user/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const { getToken } = require("../utils/get-token");

async function register(req, res, next) {
  try {
    const payload = req.body;
    // payload.pasword = bcrypt.hashSync;

    let user = new User(payload);
    await user.save();

    return res.json(user);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.json({ message: "Email belum terdaftar" });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (checkPass) {
      const token = jwt.sign(
        {
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.full_name,
          },
        },
        config.secretKey
      );

      await User.findOneAndUpdate(
        { _id: user._id },
        { token: token },
        { new: true }
      );

      return res.json({ token: token });
    } else {
      return res.json({
        message: "Kata sandi anda salah",
      });
    }
  } catch (error) {
    return res.json({
      messagee: error.message,
    });
  }
}

async function me(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Your're not login or token expired`,
    });
  }
  return res.json(req.user);
}

async function logout(req, res, next) {
  let token = getToken(req);

  let user = await User.findOneAndUpdate(
    { token: token },
    { token: null },
    { useFindAndModify: false }
  );

  console.log(user);

  if (!user || !token) {
    return res.json({
      error: 1,
      message: "User tidak ditemukan",
    });
  }
  // --- logout berhasil ---//
  return res.json({
    error: 0,
    message: "Logout berhasil",
  });
}

module.exports = {
  register,
  login,
  me,
  logout,
};

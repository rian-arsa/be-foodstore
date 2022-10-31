const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var { isEmail } = require("validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { model, Schema } = mongoose;
const HASH_ROUND = 10;

let userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "Nama harus diisi"],
      maxlength: [255, "Panjang nama harus antara 3 - 255 karakter"],
      minlength: [3, "Panjang nama harus antara 3 - 255 karakter"],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxlength: [255, "Panjang email maksimal 255 karakter"],
      validate: [isEmail, "invalid email"],
      unique: [true, "Email sudah terdaftar"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      maxlength: [255, "Panjang password maksimal 255 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);

const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      require: true,
    },
    option: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    profile_image: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      default: "FALSE",
    },
    payerId: {
      type: String,
      default: "FALSE",
    },
    date: {
      type: String,
      default: "DATE",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Register", registerSchema);

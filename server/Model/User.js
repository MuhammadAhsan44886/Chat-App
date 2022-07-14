const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
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
});
module.exports = mongoose.model("Register", registerSchema);

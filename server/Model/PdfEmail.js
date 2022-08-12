const mongoose = require("mongoose");

const PDFEMailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PDFEmailModel", PDFEMailSchema);

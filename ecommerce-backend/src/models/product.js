const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },

    name: {
      type: String,
      required: true,
      maxLength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

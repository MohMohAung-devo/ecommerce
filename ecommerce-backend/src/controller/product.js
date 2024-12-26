const fs = require("fs");
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const { errorHandler } = require("../helper/dbhandlerError");

exports.create = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, files, fields) => {
      if (err) {
        return res.status(400).json({
          error: "No image file uploaded",
        });
      }

      console.log("fields", fields);
      console.log("Files", files);

      let product = new Product(fields);

      if (!files.photo) {
        console.error("No photo uploaded");
      } else {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less 1mb size",
          });
        }

        product.photo.data = fs.readFileSync(files.photo.files);
        product.photo.contentType = files.photo.files;
      }

      console.log("File Path", files.photo?.files);

      try {
        const result = await product.save();
        res.json(result);
      } catch (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

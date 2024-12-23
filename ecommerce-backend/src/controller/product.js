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
          error: "Image could not be uploaded",
        });
      }

      // console.log("Fields", fields);
      // console.log("Files", files);

      let product = new Product(fields);

      if (!files.photo) {
        return res.status(400).json({
          error: "No image file was uploded",
        });
      }

      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less 1mb in size",
          });
        }

        product.photo.data = fs.readFileSync(files.photo.filepath);
        product.photo.contentType = files.photo.mimetype;
      }

      console.log("File Path", files.photo.filepath);

      //   product.save((err, result) => {
      //     if (err) {
      //       return res.status(400).json({
      //         error: errorHandler(err),
      //       });
      //     }

      //     res.json(result);
      //   });

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

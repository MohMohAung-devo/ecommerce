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
          error: "Form data parsing error",
        });
      }

      console.log("fields", fields);
      console.log("Files", files);

      let product = new Product(fields);
      //let photo = files.photo;
      //const photoArray = files.photo;
      //const photo = Array.isArray(photoArray) ? photoArray[0] : photoArray;

      // if (Array.isArray(photo)) {
      //   photo = photo[0];
      // }
      let photo = Array.isArray(files.photo) ? files.photo[0] : files.photo;

      if (!photo) {
        console.log("No photo detected in uploaded files");
        return res.status(400).json({
          error: "No photo uploaded",
        });
      }

      console.log("Photo details", photo);

      // if (files.photo && files.photo.length > 0) {
      //   photo = files.photo[0];
      // } else {
      //   photo = files.photo;
      // }

      // if (!photo) {
      //   console.log("No photo detected in uploaded files.");
      //   return res.status(400).json({
      //     error: console.log(err),
      //   });
      // }
      // console.log("Photo details", photo);

      if (photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb size",
        });
      }

      //console.log("File Path", files.photo?.files);

      try {
        product.photo.data = fs.readFileSync(photo.filepath);
        product.photo.contentType = photo.mimetype;
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


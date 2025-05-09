const Category = require("../models/category");
const { errorHandler } = require("../helper/dbhandlerError");
exports.create = async (req, res) => {
  const category = new Category(req.body);
  //   category.save((err, data) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: errorHandler(err),
  //       });
  //     }
  //     res.json({ data });
  //   });

  try {
    const result = await category.save();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: errorHandler });
  }
};

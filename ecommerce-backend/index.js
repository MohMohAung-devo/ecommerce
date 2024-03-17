const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/ecommerce");
const URL = `http://localhost:3000`;

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

const AddProductCreateSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  amount: Number,
  image: {
    data: Buffer,
    contentType: String,
    path: String,
  },
  date: { type: Date, default: Date.now, required: true },
});

const AddProductModel = mongoose.model("ecommerce", AddProductCreateSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/productApp", upload.single("image"), async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      filename: req.file.filename,
      path: req.file.path,
    };

    const imagePath = `${URL}/images/${req.file.filename}`;

    const AddProduct = new AddProductModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      amount,
      date,
      image,
    });

    await AddProduct.save();

    await AddProductModel.findByIdAndUpdate(
      AddProduct._id,
      { "image.path": imagePath },
      { new: true }
    );

    return res.status(201).json({
      meta: { success: true, message: "Add Product Create Successfully" },
      body: {
        name: AddProduct.name,
        amount: AddProduct.amount,
        image: imagePath,
        date: AddProduct.date,
        filename: req.file.filename,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/productAdd/all", async (req, res) => {
  try {
    const productAll = await AddProductModel.find();
    console.log(productAll);

    return res.status(200).json({
      meta: { success: true, message: "Attend fetch all successfully" },
      body: {
        productAll,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${URL}`);
});

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
  price: Number,
  count: Number,
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
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Check if req.file is undefined
    if (!req.file) {
      return res.status(400).json({
        meta: { success: false, message: "No file uploaded" },
      });
    }
    const { name, price, count, date } = req.body;
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
      price,
      count,
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
        price: AddProduct.price,
        count: AddProduct.count,
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

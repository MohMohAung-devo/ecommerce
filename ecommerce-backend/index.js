const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/ecommerce");
const URL = `http://localhost:3000`;

const multer = require("multer");
const path = require("path");
const secretKey = "123456789";

// const token = jwt.sign(payload, secretKey);

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
  isActive: Boolean,
  image: {
    data: Buffer,
    contentType: String,
    path: String,
  },
  date: { type: Date, default: Date.now, required: true },
});

const websiteUser = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  phone: String,
  email: String,
  // location: String,
  password: String,
  currentLocation: String,
});

const websiteCount = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productList: { type: mongoose.Schema.Types.ObjectId, ref: "ecommerce" },
});

const RegisterWebsiteUserModel = mongoose.model("websiteUser", websiteUser);
const AddProductModel = mongoose.model("ecommerce", AddProductCreateSchema);
const websiteCountModel = mongoose.model("count", websiteCount);

// website user //

app.post("/websiteUser/register", async (req, res) => {
  try {
    const { name, phone, email, password, currentLocation } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const registerUser = await RegisterWebsiteUserModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      phone,
      email,
      currentLocation,
      password: hashPassword,
      isActive: true,
    });
    await registerUser.save();

    await RegisterWebsiteUserModel.findByIdAndUpdate(registerUser._id);

    return res.status(201).json({
      meta: { success: true, message: "Register Successfully" },
      body: {
        name: registerUser.name,
        phone: registerUser.phone,
        email: registerUser.email,
        currentLocation: registerUser.currentLocation,
        password: registerUser.password,
        // isActive: registerUser.isActive,
      },
    });
  } catch (err) {
    console.log(err);
    res.send(500).send("Internal Server Error");
  }
});

// app.post("/websiteUser/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await RegisterWebsiteUserModel.findOne({ email });

//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User is inactive" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Inavlid email or password" });
//     }

//     const token = jwt.sign({ userId: user._id }, secretKey, {
//       expireIn: "1h",
//     });

//     res.status(200).json({
//       success: true,
//       token,
//       user: { name: user.name, email: user.email },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

app.post("/websiteUser/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginUser = await RegisterWebsiteUserModel.findOne({ email });
    console.log(loginUser);

    const isValidPassword = await bcrypt.compare(password, loginUser.password);
    console.log(isValidPassword);

    const token = jwt.sign({ email: loginUser.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/websiteUser/all", async (req, res) => {
  try {
    const websiteUserAll = await RegisterWebsiteUserModel.find();
    console.log(websiteUserAll);

    return res.status(200).json({
      meta: { success: true, message: "Register user fetch all successfully" },
      body: {
        websiteUserAll,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/website/count", async (req, res) => {
  try {
    const productData = await AddProductModel.find();
    console.log(productData);
  } catch (err) {
    console.log(err);
  }
});

app.post(
  "/productApp",
  upload.single("image"),

  async (req, res) => {
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
  }
);

app.put("/product/edit/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const product = await AddProductModel.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({
        meta: { success: false, message: "Product not found" },
      });
    }

    const { name, price, count } = req.body;
    let imageData = product.image;

    if (req.file) {
      imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
      };

      const imagePath = `${URL}/images/${req.file.filename}`;
      product.image.path = imagePath;
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.count = count || product.count;
    product.image = imageData;

    await product.save();

    res.status(200).json({
      meta: { success: true, message: "Product updated successfully" },
      data: product,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/product/delte/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const produt = await AddProductModel.findByIdAndDelete(productId);
    console.log(produt);
  } catch (err) {
    console.log(err);
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

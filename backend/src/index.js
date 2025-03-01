const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const autheRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("DB Connected"));

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", autheRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// app.get("/hello", (req, res) => {
//   res.send("hello from code");
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`, "hello runnigs");
});

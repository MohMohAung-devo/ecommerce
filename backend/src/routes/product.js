const express = require("express");
const router = express.Router();

const { create } = require("../controller/product");
const { userById } = require("../controller/user");
const { requireSignin, isAdmin, isAuth } = require("../controller/auth");

router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);
router.param("userId", userById);

module.exports = router;

const express = require("express");
const router = express.Router();
const { userById } = require("../controller/user");
const { requireSignin, isAdmin, isAuth } = require("../controller/auth");

router.get("/", (req, res) => {
  res.send("hello from node");
});

router.get("/secret/:userId", requireSignin, isAdmin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;

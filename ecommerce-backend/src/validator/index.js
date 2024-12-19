const { check, validationResult } = require("express-validator");

exports.userSignupValidator = [
  check("name", "Name is required").notEmpty(),
  check("email", "Email must be valid and contain @")
    .isEmail()
    .withMessage("Email is invalid")
    .isLength({ min: 3, max: 32 }),
  check("password", "Password is required").notEmpty(),
  check("password", "Password must be at least 6 characters and contain")
    .isLength({ min: 6 })
    .matches(/\d/),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }
    next();
  },
];

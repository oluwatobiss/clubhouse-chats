const { body } = require("express-validator");

const alphaErr = "can contain only letters";
const lengthErr = "must be between 2 and 64 characters";

const signUpValidator = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}.`)
    .isLength({ min: 2, max: 64 })
    .withMessage(`First name ${lengthErr}.`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}.`)
    .isLength({ min: 2, max: 64 })
    .withMessage(`Last name ${lengthErr}.`),
  body("username")
    .trim()
    .isAlpha("en-US", { ignore: [".", "@"] })
    .withMessage(`Username ${alphaErr} or email characters.`)
    .isLength({ min: 6, max: 254 })
    .withMessage("Username must be between 6 and 254 characters."),
  body("password")
    .trim()
    .isLength({ min: 3, max: 70 })
    .withMessage("Username must be between 3 and 70 characters."),
];

module.exports = signUpValidator;

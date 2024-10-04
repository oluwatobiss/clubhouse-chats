const { body } = require("express-validator");

const alphaErr = "can contain only letters";
const lengthErr = (min, max) => `must be between ${min} and ${max} characters`;

const signUp = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}.`)
    .isLength({ min: 2, max: 64 })
    .withMessage(`First name ${lengthErr(2, 64)}.`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}.`)
    .isLength({ min: 2, max: 64 })
    .withMessage(`Last name ${lengthErr(2, 64)}.`),
  body("username")
    .trim()
    .isAlpha("en-US", { ignore: [".", "@"] })
    .withMessage(`Username ${alphaErr} or email characters.`)
    .isLength({ min: 6, max: 254 })
    .withMessage(`Username ${lengthErr(6, 254)}.`),
  body("password")
    .trim()
    .isLength({ min: 3, max: 70 })
    .withMessage(`Password ${lengthErr(3, 70)}.`),
];

const newPost = [
  body("title")
    .trim()
    .isAlpha("en-US", { ignore: [" ", "-"] })
    .withMessage(`Title ${alphaErr}.`)
    .isLength({ min: 4, max: 70 })
    .withMessage(`Title ${lengthErr(4, 70)}.`),
  body("text")
    .trim()
    .isLength({ min: 7, max: 300 })
    .withMessage(`Posts ${lengthErr(7, 300)}.`),
];

module.exports = { signUp, newPost };

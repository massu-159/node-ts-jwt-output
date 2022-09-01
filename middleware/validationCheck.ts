import { body } from "express-validator";

export const validationCheck = () => {
  body("email").isEmail()
  body("password").isLength({ min: 6 });
};

import asyncHandler from "express-async-handler";
import { body } from "express-validator";
import passport from "passport";

import { usernameValidation } from "../common/usernameValidation";
import { validate } from "../middleware/handleValidationErrors";
import * as userQueries from "../../prisma/queries/user";
import * as render from "./render";

export const logIn = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter a username.")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter a password.")
    .escape(),
  validate,
  asyncHandler(async (req, res, next) => {
    if (req.formErrors) return render.login(req, res, next);
    passport.authenticate("local", (err: Error, user: Express.User) => {
      if (err) return next(err);
      if (!user) {
        req.formErrors = { username: "Incorrect username or password." };
        return render.login(req, res, next);
      } else
        req.logIn(user, (err) => {
          if (err) return next(err);
          return res.redirect("/");
        });
    })(req, res, next);
  }),
];

export const signUp = [
  usernameValidation,
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter a password.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .escape(),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your password.")
    .bail()
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Both passwords do not match.");
    })
    .escape(),
  validate,
  asyncHandler(async (req, res, next) => {
    if (req.formErrors) return render.signup(req, res, next);
    await userQueries.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.flash(
      "success",
      "Your account has been created. Please proceed to log in to your new account."
    );
    req.flash("loginUsernamePrefill", req.body.username);
    return res.redirect("/login");
  }),
];

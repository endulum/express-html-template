import asyncHandler from "express-async-handler";

export const account = asyncHandler(async (req, res) => {
  if (!req.user) {
    req.flash("warning", "You must be logged in to edit your account details.");
    return res.redirect("/login");
  }
  return res.status(req.formErrors ? 400 : 200).render("layout", {
    page: "forms/update-account",
    title: "Account Settings",
    prevForm: {
      ...req.body,
      username: "username" in req.body ? req.body.username : req.user.username,
    },
    formErrors: req.formErrors,
  });
});

export const login = asyncHandler(async (req, res) => {
  const loginUsernamePrefill = req.flash("loginUsernamePrefill");
  return res.render("layout", {
    page: "login",
    title: "Log In",
    prevForm: {
      ...req.body,
      username:
        loginUsernamePrefill.length > 0
          ? loginUsernamePrefill
          : req.body.username,
    },
    formErrors: req.formErrors,
  });
});

export const signup = asyncHandler(async (req, res) => {
  return res.render("layout", {
    page: "signup",
    title: "Sign Up",
    prevForm: req.body,
    formErrors: req.formErrors,
  });
});

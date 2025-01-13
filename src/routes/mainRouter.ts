import express from "express";
import asyncHandler from "express-async-handler";

import * as user from "../controllers/user";
import * as render from "../controllers/render";

const router = express.Router();

const renderIndex = asyncHandler(async (_req, res) => {
  return res.render("layout", {
    page: "index",
    title: "Index",
  });
});

const logOut = asyncHandler(async (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out.");
    return res.redirect("/login");
  });
});

router.route("/").get(renderIndex);
router.route("/account").get(render.account).post(user.edit);
router.route("/logout").get(logOut);
router.route("*").all(render.notFound);

export { router };

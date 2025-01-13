import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

export const validate = asyncHandler(async (req, res, next) => {
  const errorsArray = validationResult(req).array();
  if (errorsArray.length > 0) {
    req.formErrors = {};
    errorsArray.forEach((error) => {
      if (req.formErrors && error.type === "field")
        req.formErrors[error.path] = error.msg;
    });
  }
  return next();
});

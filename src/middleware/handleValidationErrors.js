const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')

module.exports = asyncHandler(async (req, res, next) => {
  const errorsArray = validationResult(req).array()
  if (errorsArray.length > 0) {
    req.inputErrors = errorsArray.map(error => error.msg)
  }
  next()
})
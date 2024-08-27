const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async (req, res, next) => {
  console.log(req.session || '(no session)')
  console.log(req.user || '(no user)')
  next()
})
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    req.loginMessage = 'You must be logged in to view this page.'
    return renderLogin(req, res)
  }
  return next()
})
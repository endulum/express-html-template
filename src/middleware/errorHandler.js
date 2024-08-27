module.exports = (err, req, res, next) => {
  if (err instanceof AggregateError) {
    console.error(err['errors'])
  } else console.error(err)

  // currently don't know of a way to handle session store connection error
  // so this will have to do.
  if (err instanceof AggregateError && err['errors'][0].code === 'ECONNREFUSED') {
    return res.render('sample/error', {
      code: 500,
      message: 'The database cannot be accessed at this time.'
    })
  }

  return res.render('sample/error', {
    code: err.statusCode,
    message: err.message || 'Something went wrong when handling your request.'
  })
}
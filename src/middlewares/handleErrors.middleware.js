import HttpException from "#Utils/HttpException.js"

/**
 * Custom error handler to standardize error objects returned
 * to client
 * @param err Error caught by Express.js
 * @param _req Request object provided by Express
 * @param res Response object provided by Express
 * @param _next NextFunction function provided by Express
 */
const handleErrors = (err, _req, res, _next) => {

  if (err instanceof HttpException) {
    const { status, message = 'Something went wrong' } = err
    return res.status(status).json({ errors: message })
  }

  return res.status(500).json({ errors: err.message })
}

/**
 * Error 404 - Resource Not Found
 * @param _req Request
 * @param res Response
 */
const unknownEndpoint = (_req, res) => {
  res.status(404).send({ errors: 'Unknown endpoint' })
}

export default {
  handleErrors,
  unknownEndpoint
}
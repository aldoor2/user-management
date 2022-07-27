class HttpException extends Error {
  message
  status
  additionalInfo

  constructor(status = 500, message) {
    super(message)
    this.message = message
    this.status = status
  }
}

export default HttpException

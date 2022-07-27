import HttpException from "#Utils/HttpException.js"

export const validationDTO =
  (validateDTO) =>
    (req, _res, next) => {
      const isDTOValid = validateDTO(req.body)

      if (!isDTOValid)
        return next(new HttpException(400, JSON.stringify(
          validateDTO.errors.map(error => error.message)
        )));


      next()
    }
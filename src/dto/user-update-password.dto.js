import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import { passwordDTOSchema } from '#Dto/dto-types.js'

const UpdatePasswordDTOSchema = Type.Object({
  oldPassword: passwordDTOSchema,
  newPassword: passwordDTOSchema
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'El formato del objeto no es válido',
  }
})

const ajv = new Ajv({ allErrors: true })
  .addKeyword('kind')
  .addKeyword('modifier');

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addErrors(ajv)

const validateUserUpdatePasswordDTO = ajv.compile(UpdatePasswordDTOSchema)

export default validateUserUpdatePasswordDTO
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import {
  emailDTOSchema,
  passwordDTOSchema
} from '#Dto/dto-types.js'

const LoginDTOSchema = Type.Object({
  email: emailDTOSchema,
  password: passwordDTOSchema
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
addFormats(ajv, ['email'])
addErrors(ajv)

const validateUserLoginDTO = ajv.compile(LoginDTOSchema)

export default validateUserLoginDTO
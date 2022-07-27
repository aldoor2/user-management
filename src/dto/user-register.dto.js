import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import {
  emailDTOSchema,
  idDTOSchema,
  nameDTOSchema,
  passwordDTOSchema,
  surnameDTOSchema
} from '#Dto/dto-types.js'

const RegisterDTOSchema = Type.Object({
  _id: idDTOSchema,
  name: nameDTOSchema,
  surname: surnameDTOSchema,
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
addFormats(ajv, ['email', 'uuid'])
addErrors(ajv)

const validateUserRegisterDTO = ajv.compile(RegisterDTOSchema)

export default validateUserRegisterDTO
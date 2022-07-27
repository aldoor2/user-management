import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import {
  nameDTOSchema,
  surnameDTOSchema
} from '#Dto/dto-types.js'

const UpdateDataDTOSchema = Type.Object({
  name: nameDTOSchema,
  surname: surnameDTOSchema,
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'El formato del objeto no es válido',
  }
})

const ajv = new Ajv({ allErrors: true })
  .addKeyword('kind')
  .addKeyword('modifier');

addErrors(ajv)

const validateUserUpdateDataDTO = ajv.compile(UpdateDataDTOSchema)

export default validateUserUpdateDataDTO
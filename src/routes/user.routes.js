import { Router } from 'express'
import validateUserRegisterDTO from '#Dto/user-register.dto.js'
import validateUserLoginDTO from '#Dto/user-login.dto.js'
import validateUserUnregisterDTO from '#Dto/user-unregister.dto.js'
import validateUserUpdateDataDTO from '#Dto/user-update-data.dto.js'
import validateUserUpdateEmailDTO from '#Dto/user-update-email.dto.js'
import validateUserUpdatePasswordDTO from '#Dto/user-update-password.dto.js'
import { validationDTO } from '#Middlewares/validatorDTO.middleware.js'
import {
  userLoginController,
  userRegisterController
} from '#Controllers/auth.controller.js'
import {
  userProfileController,
  userUnregisterController,
  userUpdateDataController,
  userUpdateEmailController,
  userUpdatePasswordController
} from '#Controllers/user.controller.js'
import authenticateUserByJWT from '#Middlewares/authenticate-user.middleware.js'

const userRouter = Router()

userRouter.post('/register', validationDTO(validateUserRegisterDTO), userRegisterController)

userRouter.post('/login', validationDTO(validateUserLoginDTO), userLoginController)

userRouter.get('/profile', authenticateUserByJWT, userProfileController)

userRouter.patch(
  '/update-data',
  authenticateUserByJWT,
  validationDTO(validateUserUpdateDataDTO),
  userUpdateDataController
)

userRouter.patch(
  '/update-email',
  authenticateUserByJWT,
  validationDTO(validateUserUpdateEmailDTO),
  userUpdateEmailController
)

userRouter.patch(
  '/update-password',
  authenticateUserByJWT,
  validationDTO(validateUserUpdatePasswordDTO),
  userUpdatePasswordController
)

userRouter.delete(
  '/unregister',
  authenticateUserByJWT,
  validationDTO(validateUserUnregisterDTO),
  userUnregisterController
)

export default userRouter
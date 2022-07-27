import express from 'express'
import userRouter from '#Routes/user.routes.js'
import errorHandle from '#Middlewares/handleErrors.middleware.js'

const expressApp = express()

// Midlewares
expressApp.use(express.json())

// Routes
expressApp.use('/api/user', userRouter)
expressApp.use(errorHandle.unknownEndpoint)
expressApp.use(errorHandle.handleErrors)

export default expressApp
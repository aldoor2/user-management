import express from 'express'
import userRouter from '#Routes/user.routes.js'

const expressApp = express()

// Midlewares
expressApp.use(express.json())

// Routes
expressApp.use('/api/user', userRouter)

export default expressApp
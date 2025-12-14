import express from 'express'
import { login, signUp, logout, refresh } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/refresh', refresh)

export default authRouter
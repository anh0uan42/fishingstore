import express from 'express'
import { login, signUp, logout, updateProfile, refresh } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.patch('/update', updateProfile)
authRouter.get('/refresh', refresh)

export default authRouter
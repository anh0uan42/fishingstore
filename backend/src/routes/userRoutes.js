import express from 'express'
import { getAllUser, updateProfile } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.patch('/', updateProfile)

export default userRouter
import { Router } from 'express'
import { getOne, getMany } from './user.controllers'

export const userRouter = Router()

userRouter.route('/').get(getMany)
userRouter.route('/:id').get(getOne)

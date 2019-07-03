import { Router } from 'express'
import controllers from './user.controllers'

export const userRouter = Router()

userRouter.route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

userRouter.route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

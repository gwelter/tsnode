import { Router } from 'express'
import controllers from './register.controllers'

export const userRouter = Router()

userRouter
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

userRouter
  .route('/:id')
  .get(controllers.getById)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

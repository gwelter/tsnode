import { Router } from 'express'
import { getOne, getMany, createOne, updateOne, removeOne } from './user.controllers'

export const userRouter = Router()

userRouter
  .route('/')
  .get(getMany)
  .post(createOne)

userRouter
  .route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(removeOne)

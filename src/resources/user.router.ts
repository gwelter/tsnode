import { Router } from 'express'
import { me } from './user.controllers'

const router = Router()

router.route('/')
  .get(me)

export default router

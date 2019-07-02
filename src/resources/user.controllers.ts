import { User } from './user.model'
import { Request, Response } from 'express'

export const getOne = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const user = await User.findById(req.params.id).lean().exec()

    if (!user) {
      return res.status(404).send('não encontrado')
    }

    return res.status(200).json({ data: user })
  } catch (error) {
    console.error(error)
    return res.status(404).send('não encontrado')
  }
}

export const getMany = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: users })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

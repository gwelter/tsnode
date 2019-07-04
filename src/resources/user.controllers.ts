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

export const getMany = async (_req: Request, res: Response): Promise<Response | void> => {
  try {
    const users = await User
      .find({})
      .lean()
      .exec()

    return res.status(200).json({ data: users })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const createOne = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const doc = await User.create({ ...req.body })
    return res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const updateOne = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const updatedDoc = await User
      .findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id)

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

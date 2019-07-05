import { Model, Document } from 'mongoose'
import { Request, Response } from 'express'

interface CrudRequest {
  (req: Request, res: Response): Promise<void | Response>
}

export const getById = (model: Model<Document>): CrudRequest => async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const user = await model.findById(req.params.id).lean().exec()

    if (!user) {
      return res.status(404).send('não encontrado')
    }

    return res.status(200).json({ data: user })
  } catch (error) {
    console.error(error)
    return res.status(404).send('não encontrado')
  }
}

export const getOne = (model: Model<Document>): CrudRequest => async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const doc = await model
      .findOne({ ...req.body })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = (model: Model<Document>): CrudRequest => async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const users = await model
      .find({})
      .lean()
      .exec()

    return res.status(200).json({ data: users })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const createOne = (model: Model<Document>): CrudRequest => async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const doc = await model.create({ ...req.body })
    return res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const updateOne = (model: Model<Document>): CrudRequest => async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const updatedDoc = await model
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

export const removeOne = (model: Model<Document>): CrudRequest => async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const removed = await model.findByIdAndDelete(req.params.id)

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

interface CrudControllersInterface {
  getById: CrudRequest
  getOne: CrudRequest
  getMany: CrudRequest
  createOne: CrudRequest
  updateOne: CrudRequest
  removeOne: CrudRequest
}

export const crudControllers = (model: Model<Document>): CrudControllersInterface => ({
  getById: getById(model),
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
})

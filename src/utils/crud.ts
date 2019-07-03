import { Model, Document } from 'mongoose'
import { Request, Response } from 'express'

class Crud {
  private model: Model<Document>
  public constructor (model: Model<Document>) {
    this.model = model
  }

  public async getById (req: Request, res: Response): Promise<void> {
    try {
      const doc = await this.model
        .findById({ ...req.params.id })
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

  public async getOne (req: Request, res: Response): Promise<void> {
    try {
      const doc = await this.model
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

  public async getMany (_req: Request, res: Response): Promise<void> {
    try {
      const docs = await this.model
        .find({ })
        .lean()
        .exec()

      res.status(200).json({ data: docs })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  public async createOne (req: Request, res: Response): Promise<void> {
    try {
      const doc = await this.model.create(...req.body)
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  public async updateOne (req: Request, res: Response): Promise<void> {
    try {
      const updatedDoc = await this.model
        .findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        )
        .lean()
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

  public async removeOne (req: Request, res: Response): Promise<void> {
    try {
      const removed = await this.model.findOneAndRemove({ _id: req.params.id })

      if (!removed) {
        return res.status(400).end()
      }

      res.status(200).json({ data: removed })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
}

export default Crud

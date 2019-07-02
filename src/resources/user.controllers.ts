import { Request, Response } from 'express'

export const me = (req: Request, res: Response): void => {
  res.status(200).send('Hello World')
}

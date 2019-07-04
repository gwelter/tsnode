import mongoose from 'mongoose'
import { config } from '../config'

export const connect = (url: string = config.dbUrl, opts = {}): Promise<typeof mongoose> => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true, useFindAndModify: false }
  )
}

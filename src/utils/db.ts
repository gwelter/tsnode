import mongoose from 'mongoose'
import options from '../config'

export const connect = (url: string = options.dbUrl, opts = {}): Promise<typeof mongoose> => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true }
  )
}

export default connect

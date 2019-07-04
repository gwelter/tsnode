import mongoose from 'mongoose'
import _ from 'lodash'
import { connect } from './src/utils/db'

beforeEach(async (done): Promise<void> => {
  function clearDB (): void {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteOne(function (): void {})
    }
    return done()
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await connect()
      clearDB()
    } catch (e) {
      throw e
    }
  } else {
    clearDB()
  }
})
afterEach((done): Promise<void> => {
  return done()
})
afterAll((done): Promise<void> => {
  mongoose.disconnect()
  return done()
})

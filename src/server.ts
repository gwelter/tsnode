import express, { Response } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import config from './config'
import { connect } from './utils/db'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(cors())
    this.express.use(json())
    this.express.use(urlencoded({ extended: true }))
  }

  private routes (): void {
    this.express.get('/', (req, res): Response => {
      return res.send('hello world')
    })
  }
}

export const start = async (): Promise<void> => {
  const app = new App().express
  try {
    await connect()
    app.listen(config.port, (): void => {
      console.log(`REST API on http://${config.host}:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

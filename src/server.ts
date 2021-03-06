import express, { Response } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import { config } from './config'
import { connect } from './utils/db'
import { userRouter } from './resources/register.router'

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
    this.express.use('/api/user', userRouter)

    this.express.get('/api', (_req, res): Response => {
      return res.send('hello world')
    })
  }
}

export const app = new App().express

export const start = async (): Promise<void> => {
  try {
    await connect()
    app.listen(config.port, (): void => {
      console.log(`REST API on http://${config.host}:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

import { merge } from 'lodash'

interface ConfigInterface {
  env: string
  host: string
  port: number | string
}
interface DBConfigInterface { dbUrl: string }

const env = process.env.NODE_ENV || 'development'

const baseConfig: ConfigInterface = {
  env,
  port: process.env.PORT || 3000,
  host: process.env.HTTP_HOST || '0.0.0.0'
}

let envConfig: DBConfigInterface = require('./prod').config

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  default:
    envConfig = require('./dev').config
    break
}

export const config: ConfigInterface & DBConfigInterface = merge(baseConfig, envConfig)

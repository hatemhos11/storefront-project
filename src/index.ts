import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import config from './config'
import MainRouter from './handlers'

// create an instance server
const PORT: number | string = config.port || 3000
const app: Application = express()

// Secure Requests
app.use(helmet())

// HTTP request logger middleware
app.use(morgan('short'))

// Add parser middleware
app.use(express.json())

// All Routes Middlewares in Application
app.use('/', MainRouter)

// Start express server
app.listen(PORT, async () => {
    console.log(`server is listening on: http://localhost:${PORT}`)
})

export default app

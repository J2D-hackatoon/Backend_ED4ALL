import express, { json } from 'express'
import { Mongo } from '../db/mongo.js'
import cors from 'cors'
import morgan from 'morgan'
import { districtsRouter } from './routes/districts.js'
import { centersRouter } from './routes/centers.js'
// import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT

const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(json())
app.use(cors('*'))
// app.use(corsMiddleware())
app.use(morgan('dev'))

// Routes
app.use('/districts', districtsRouter)
app.use('/centers', centersRouter)

app.use((req, res) => {
  res.status(404).send('404 - Not Found')
})

// Server listening
app.listen(PORT, async () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
  await Mongo.init()
  console.log('Connected to database!')
})

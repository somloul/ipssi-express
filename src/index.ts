import express from 'express'
import * as dotenv from 'dotenv'
import db from './db'

dotenv.config()

const app = express()
const PORT = 1234

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 1234

app.use(express.json())

app.get('/', (req, res) => {
  console.log(process.env.DATABASE_URL)
  res.status(200).json({ message: 'hello' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
import { Router } from 'express'

const app = Router()

app.get('/', (req, res) => {
  res.status(200).json([])
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).json([])
})

export default app
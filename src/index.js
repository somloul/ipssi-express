import express from 'express'
import userRoutes from './routes/user.js'

const app = express()
const PORT = 1234

app.use(express.json())
app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
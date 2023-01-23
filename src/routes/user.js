import { Router } from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const app = Router()

const getFileData = async () => {
  const data = await fs.readFile(path.resolve('public/data.json'), 'utf-8')
  return JSON.parse(data)
}

const writeFileData = async (data) => {
  return fs.writeFile(path.resolve('public/data.json'), JSON.stringify(data))
}

app.get('/', async (req, res) => {
  const data = await getFileData()
  res.json(data)
})

app.post('/', async (req, res) => {
  if(
    req.body.username &&
    req.body.password &&
    req.body.gender &&
    req.body.age &&
    req.body.name &&
    req.body.firstName
  ) {
    const data = await getFileData()
    const newUser = {
      ...req.body,
      id: crypto.randomUUID()
    }
    data.push(newUser)
    try {
      await writeFileData(data)
      return res.status(201).json(newUser)
    } catch (e) {
      return res.status(400).json({ error: e })
    }
  }
  return res.status(400).json({ message: 'BadRequest' })
})

app.put('/:uuid', async (req, res) => {
  if(
    req.body.username ||
    req.body.password ||
    req.body.gender ||
    req.body.age ||
    req.body.name ||
    req.body.firstName
  ) {
    const data = await getFileData()

    const newData = data.map((user) => user.id === req.params.uuid ? { ...user, ...req.body } : user)
    try {
      await writeFileData(newData)
      return res.status(200).json(newData.find((user) => user.id === req.params.uuid))
    } catch(e) {
      console.log(e)
      return res.status(400).json({ error: e })
    }
  }
})

app.delete('/:uuid', async (req, res) => {
  const data = await getFileData()

  const newData = data.filter(user => user.id !== req.params.uuid)
  try {
    await writeFileData(newData)
    return res.status(200).json({ message: 'user has been deleted' })
  } catch(e) {
    console.log(e)
    return res.status(400).json({ error: e })
  }
})
app.get('/:uuid', async (req, res) => {
  const data = await getFileData()
  const user = data.find((u) => u.id === req.params.uuid)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  return res.status(200).json(user)

})

export default app
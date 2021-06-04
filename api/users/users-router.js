const server = require('express')
const router = server.Router()

const User = require('./model')

router.get('/', async (req, res, next) => {
  try {
    const data = await User.find()
    res.status(200).json(data)
  } catch (error) {
    next({status: 500, message: 'The users information could not be retrieved'})
  }
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const data = await User.findById(id)
    res.status(200).json(data)
  } catch (error) {
    next({
      status: 404,
      message: 'The user with the specified ID does not exist',
    })
  }
})

router.post('/', async (req, res, next) => {
  const {name, bio} = req.body
  if (!name || !bio) {
    next({status: 400, message: 'Please provide name and bio for the user'})
  }

  try {
    const data = await User.insert({name, bio})
    res.status(201).json(data)
  } catch (error) {
    next({
      status: 500,
      message: 'There was an error while saving the user to the database',
    })
  }
})

router.put('/:id', async (req, res, next) => {
  const {name, bio} = req.body
  const {id} = req.params
  if (!name || !bio) {
    next({status: 400, message: 'Please provide name and bio for the user'})
  }

  try {
    const data = await User.update(id, {name, bio})
    res.status(200).json(data)
  } catch (error) {
    next({
      status: 500,
      message: 'The user information could not be modified',
    })
  }
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params

  const data = await User.remove(id)
  res.status(200).json({message: 'Item deleted'})
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  })
})
module.exports = router

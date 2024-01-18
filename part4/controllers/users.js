const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// The populate method is chained after the find method making the initial query.
// The parameter given to the populate method defines that the
// ids referencing blog objects in the blogs field of the user document will be replaced by the referenced blog documents.
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, likes: 1, url: 1}) // populate simulates a join in MongoDB
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter

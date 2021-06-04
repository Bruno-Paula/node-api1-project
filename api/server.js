const express = require('express')
const morgan = require('morgan')
const server = express()
const userController = require('./users/users-router')
server.use(express.json())
server.use(morgan('tiny'))
server.use('/api/users/', userController)

module.exports = server

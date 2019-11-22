const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

// Authenticate
const authController = require ('./controllers/authController')

//Profile
const profileController = require('./controllers/profileController')

// Login
const sessionController = require('./controllers/SessionController')

// Post
const postController = require('./controllers/postController')

// Music
const musicController = require('./controllers/musicController')

const routes = new express.Router()
const upload = multer(uploadConfig)

const authMiddleware = require('./middlewares/auth')

routes.post('/auth', authController.index)

routes.post('/login', sessionController.login)

routes.post('/profiles', upload.single('image'), profileController.store)
routes.get('/profiles', profileController.index)

routes.use(authMiddleware).post('/posts', upload.single('image'), postController.store)
routes.get('/posts', postController.index)
routes.get('/posts/:postId', postController.list)
routes.delete('/posts/:postId', postController.delete)
routes.put('/posts/:postId', postController.update)

routes.use(authMiddleware).post('/music', upload.fields([
    {name: 'image'},
    {name: 'audio'}
]), musicController.store)

routes.get('/music', musicController.index)
routes.get('/music/:musicId', musicController.list)
routes.delete('/music/:musicId', musicController.delete)
routes.put('/music/:musicId', musicController.update)

module.exports = routes
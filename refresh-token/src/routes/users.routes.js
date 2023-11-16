const express = require('express')
const router = express.Router()

// controller
const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const RefreshTokenCotroller = require('../controllers/RefreshTokenController')
const refreshTokenCotroller = new RefreshTokenCotroller()

// middlewares
const AuthMiddlewares = require('../middlewares/AuthMiddlewares')
const authMiddlewares = new AuthMiddlewares()

router.get('/', authMiddlewares.auth, usersController.index)

router.post('/', usersController.create)

router.post('/auth', usersController.auth)
router.post('/refresh-token', refreshTokenCotroller.execute)

module.exports = router
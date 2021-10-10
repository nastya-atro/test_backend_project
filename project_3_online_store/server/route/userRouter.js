const Router  = require('express')
const UserController = require("../controllers/UserController");
const authMiddleware = require('./../middleware/AuthMiddleware')

const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login',  UserController.login)
router.get('/auth', authMiddleware, UserController.checkAuth)

module.exports = router
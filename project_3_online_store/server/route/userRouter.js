const Router  = require('express')
const UserController = require("../controllers/UserController");

const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login',  UserController.login)
router.get('/auth', UserController.checkAuth)

module.exports = router
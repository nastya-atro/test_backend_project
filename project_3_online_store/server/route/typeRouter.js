const Router  = require('express')
const TypeController = require("../controllers/TypeController");
const checkAuthMiddleware = require('./../middleware/CheckRoleMiddleware')

const router = new Router()

router.post('/', checkAuthMiddleware('ADMIN'), TypeController.create)
router.get('/', TypeController.get)

module.exports =router
const Router  = require('express')
const BrandController = require("../controllers/BrandController");
const checkAuthMiddleware = require('./../middleware/CheckRoleMiddleware')

const router = new Router()

router.post('/',checkAuthMiddleware('ADMIN'), BrandController.create)
router.get('/',  BrandController.get)

module.exports =router
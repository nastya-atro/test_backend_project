const Router  = require('express')
const DeviceController = require("../controllers/DeviceController");
const checkAuthMiddleware = require('./../middleware/CheckRoleMiddleware')

const router = new Router()

router.post('/', checkAuthMiddleware('ADMIN'), DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

module.exports =router
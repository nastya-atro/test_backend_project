const Router  = require('express')
const TypeController = require("../controllers/TypeController");

const router = new Router()

router.post('/', TypeController.create)
router.get('/', TypeController.get)

module.exports =router
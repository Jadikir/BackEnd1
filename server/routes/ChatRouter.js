const Router = require('express')
const router = new Router()
const ChatController = require('../controllers/ChatController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', ChatController.create)
router.get('/', ChatController.getAll)
router.delete('/', ChatController.del)


module.exports = router
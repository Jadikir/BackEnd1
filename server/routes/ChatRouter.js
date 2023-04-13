const Router = require('express')
const router = new Router()
const ChatController = require('../controllers/ChatController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, ChatController.create)
router.get('/', ChatController.getAll)
router.delete('/', ChatController.del)


module.exports = router
const Router = require('express')
const router = new Router()
const OtzyvController = require('../controllers/OtzyvController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', OtzyvController.create)
router.get('/', OtzyvController.getAll)
router.delete('/', OtzyvController.del)

module.exports = router
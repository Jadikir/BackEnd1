const Router=require('express')
const router =new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('2'), typeController.create)
router.get('/',typeController.getAll)
router.delete('/',typeController.del)


module.exports = router
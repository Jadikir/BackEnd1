const Router = require('express')
const router = new Router()
const ZakazController = require('../controllers/ZakazController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, ZakazController.create)
router.get('/', ZakazController.getAll)
router.delete('/:id',authMiddleware, ZakazController.del)
router.post('/:id/update',authMiddleware, ZakazController.updateStatus)
router.post('/:id/update/Whom',authMiddleware, ZakazController.updateWhomId)


module.exports = router
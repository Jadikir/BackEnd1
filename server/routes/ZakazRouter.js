const Router = require('express')
const router = new Router()
const ZakazController = require('../controllers/ZakazController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, ZakazController.create)
router.get('/', ZakazController.getAll)
router.delete('/', ZakazController.del)


module.exports = router
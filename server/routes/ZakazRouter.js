const Router = require('express')
const router = new Router()
const ZakazController = require('../controllers/ZakazController')


router.post('/', ZakazController.create)
router.get('/', ZakazController.getAll)
router.delete('/', ZakazController.del)


module.exports = router
const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/otzyvs', authMiddleware, userController.GetUserInfo)
router.get('/', userController.getAll)
router.get('/wallet',authMiddleware, userController.getMoney)
router.post('/wallet:id/popolnenie',authMiddleware, userController.Popolnenie)
router.post('/wallet:id/transaction',authMiddleware, userController.Transaction)
router.post('/photo',authMiddleware, userController.UpdatePhoto)

module.exports = router
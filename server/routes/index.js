const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const ChatRouter = require('./ChatRouter')
const OtzyvRouter = require('./OtzyvRouter')
const ZakazRouter = require('./ZakazRouter')

router.use('/user', userRouter)
router.use('/chat', ChatRouter)
router.use('/otzyv', OtzyvRouter)
router.use('/zakaz', ZakazRouter)


module.exports = router


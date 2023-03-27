const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const modelRouter = require('./modelRouter')

router.use('/user',userRouter)
router.use('/type',typeRouter)
router.use('/model',modelRouter)


module.exports = router


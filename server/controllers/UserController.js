const ApiError = require('../Error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')
const {User, type, userWallet, Otzyv} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
        {}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Неверный пароль или email'))
        }
        const chel = await User.findOne({where: {email}})
        if (chel) {
            return next(ApiError.badRequest('Этот email уже использует другой челик!'))
        }
        const hashPas = await bcrypt.hash(password, 5)
        const temp = await User.create({email, role, password: hashPas})
        const wallet = await userWallet.create({UserId: temp.id})
        const token = generateJwt(temp.id, temp.email,  temp.role)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const temp = await User.findOne({where: {email}})
        if (!temp) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let compPas = bcrypt.compareSync(password, temp.password)
        if (!compPas) {
            return next(ApiError.internal('Пароль неверный, записывайте пароль на листочке'))
        }
        const token = generateJwt(temp.id, temp.email, temp.role)
        return res.json({token})
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email,  req.user.role)
        return res.json({token})
    }
    async GetUserInfo(req, res){
        let {id} = req.query
        const t = await sequelize.transaction()
        try{
            let UserInf= await User.findOne({where:{id}},{transaction:t})
            let WhomId = id
            let OtzyvInfo = await Otzyv.findAll({where:{WhomId}},{transaction:t})
            await t.commit()
            let {email} = UserInf
            let Us = {email}
            let Obj = {Us, OtzyvInfo}
            return res.json(Obj)
        }
        catch (e) {
            await t.rollback()
        }
    }
}

module.exports = new UserController()


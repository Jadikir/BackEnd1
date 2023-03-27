const ApiError = require('../Error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {user, type} = require('../models/models')

const generateJwt = (id, email, phoneNumber, role) => {
    return jwt.sign(
        {id, email, phoneNumber, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
        {}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password, phoneNumber, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Неверный пароль или email'))
        }
        const chel = await user.findOne({where: {email}})
        if (chel) {
            return next(ApiError.badRequest('Этот email уже использует другой челик!'))
        }
        const hashPas = await bcrypt.hash(password, 5)
        const User = await user.create({email, role, phoneNumber, password: hashPas})
        const token = generateJwt(User.id, User.email, User.phoneNumber, User.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const User = await user.findOne({where: {email}})
        if (!User) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let compPas = bcrypt.compareSync(password, User.password)
        if (!compPas) {
            return next(ApiError.internal('Пароль неверный, записывайте пароль на листочке'))
        }
        const token = generateJwt(User.id, User.email, User.phoneNumber, User.role)
        return res.json({token})
    }
    async check(req, res) {
        res.json({message: "All Right"})
        const token = generateJwt(req.user.id, req.user.email, req.user.phoneNumber, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()


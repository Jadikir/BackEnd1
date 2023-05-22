const ApiError = require('../Error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const {User, type, userWallet, Otzyv, Zakaz} = require('../models/models')



const generateJwt = (id, email,name, role) => {
    return jwt.sign(
        {id, email,name, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
        {}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password,name, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Неверный пароль или email'))
        }
        const chel = await User.findOne({where: {email}})
        if (chel) {
            return next(ApiError.badRequest('Этот email уже использует другой челик!'))
        }
        const hashPas = await bcrypt.hash(password, 5)
        const temp = await User.create({email, role,name, password: hashPas})
        const wallet = await userWallet.create({UserId: temp.id})
        const token = generateJwt(temp.id, temp.email,temp.name , temp.role)
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
        const token = generateJwt(temp.id, temp.email,temp.name, temp.role)
        return res.json({token})
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email,req.user.name,  req.user.role)
        return res.json({token})
    }
    async getAll(req, res) {
        const user = await User.findAll()
    return res.json(user)
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
    async getMoney(req, res, next){
        let UserId = req.user.id
        const wallet = await userWallet.findOne({where: {UserId}})

        return res.json(wallet)
    }
    async Popolnenie(req, res, next){
        try{
        let UserId = req.user.id
        const{summa} = req.body
        const wallet = await userWallet.findOne({where: {UserId}})
        let temp = wallet.Sushki
        wallet.Sushki = Number(summa)+Number(temp);
        await wallet.save();
        return res.json(wallet);}
        catch(e){return next(ApiError.internal('ПРОИЗОШЛО что-то ужасное'))}
    }
    async Transaction(req, res, next){
        try{
            let UserId = req.user.id
            const{summa,WhomId} = req.body
            const wallet = await userWallet.findOne({where: {UserId}})
            const wallet2 =  await userWallet.findOne({UserId:{WhomId}})
            let temp = wallet.Sushki
            let temp2 = wallet2.Sushki
            console.log(temp,temp2,summa)
            wallet.Sushki = Number(summa)+Number(temp);
            wallet2.Sushki = Number(temp2)-Number(summa);
            console.log(wallet.Sushki,wallet2.Sushki)
            await wallet.save();
            await wallet2.save();
            return res.json(wallet);}
        catch(e){return next(ApiError.internal('ПРОИЗОШЛО что-то ужасное'))}
    }
    async UpdatePhoto(req, res, next) {
        console.log("s11111111")
        try {
            console.log("s1111111122")
            const{Id} = req.body
            console.log(Id)
            let photo = req.files.photo
            console.log(photo)
            console.log(Id,photo,"hui")
            let Maxim = await User.findOne({where:{id:Id}})
            if(Maxim.photo){
                fs.unlink(`../server/static/${Maxim.photo}`,(err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

            })}
                let filename = uuid.v4() + ".jpg"
                await photo.mv(path.resolve(__dirname, '..', 'static', filename))
                Maxim.photo = filename
                await Maxim.save()
                return res.json(Maxim)
            }
         catch (e) {
            next(ApiError.badRequest("Something wrong"))
        }
    }



}

module.exports = new UserController()


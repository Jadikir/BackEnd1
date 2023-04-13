const {Otzyv, Chat} = require('../models/models')
const ApiError = require('../error/ApiError')

class OtzyvController{
    async create(req,res){
        const {Soderjanie,idWhom} = req.body
        let UserId = req.user.id
        const Otz = await Otzyv.create({Soderjanie,UserId,idWhom})
        return res.json(Otz)
    }
    async getAll(req,res) {
        let {UserId}=req.query
        const Otz = await  Otzyv.findAll({where:UserId})
        return res.json(Otz)
    }
    async del(req,res,next) {
        try{
            const {id} = req.body
            await Otzyv.destroy( {
                where:{id:id}
            })
            return res.json()
        }
        catch (e){
            next(ApiError.badRequest("Something wrong"))
        }
    }
}

module.exports = new OtzyvController()
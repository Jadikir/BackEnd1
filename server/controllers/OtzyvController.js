const {Otzyv} = require('../models/models')
const ApiError = require('../error/ApiError')

class OtzyvController{
    async create(req,res){
        const {Soderjanie} = req.body
        const Otz = await Otzyv.create({Soderjanie})
        return res.json(Otz)

    }
    async getAll(req,res) {
        const Otz = await  Otzyv.findAll()
        return res.json(Otz)
    }
    async del(req,res,next) {
        try{
            await Otzyv.destroy( {
                where:{id:req.body}
            })}
        catch (e){
            next(ApiError.badRequest("Something wrong"))
        }
    }
}

module.exports = new OtzyvController()
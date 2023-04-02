const {Otzyv, Chat} = require('../models/models')
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
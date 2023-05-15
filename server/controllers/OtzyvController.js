const {Otzyv, Chat} = require('../models/models')
const ApiError = require('../error/ApiError')

class OtzyvController{
    async create(req,res){
        const {Soderjanie,WhomId} = req.body
        let UserId = req.user.id
        const Otz = await Otzyv.create({Soderjanie,UserId,WhomId})
        return res.json(Otz)
    }
    async getAll(req,res) {
        let {UserId,WhomId}=req.query
        let Otz
        if(!UserId&&!WhomId){Otz = await  Otzyv.findAndCountAll()}
        else if (!UserId && WhomId){Otz = await  Otzyv.findAll({where:{WhomId}})}
        else if((UserId && !WhomId)){Otz = await  Otzyv.findAll({where:{UserId}})}
        else if((UserId && WhomId)){Otz = await  Otzyv.findAll({where:{UserId,WhomId}})}
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
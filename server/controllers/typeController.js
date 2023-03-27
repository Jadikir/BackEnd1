const {type}=require('../models/models')
const ApiError = require('../error/ApiError')



class TypeController{
    async create(req,res){
        const {name} = req.body
        const Type = await type.create({name})
        return res.json(Type)

    }
    async getAll(req,res) {
        const types = await  type.findAll()
        return res.json(types)
    }
    async del(req,res,next) {
        try{
            await type.destroy( {
                where:{name:req.body}
            })}
        catch (e){
            next(ApiError.badRequest("Something wrong"))
        }
    }

}
module.exports = new TypeController()
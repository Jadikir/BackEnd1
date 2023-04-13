const {Chat, Otzyv} = require('../models/models')
const ApiError = require('../error/ApiError')

class ChatController{
    async create(req,res){
        const {Text,WhomId} = req.body
        let UserId = req.user.id
        const Ch = await Chat.create({Text,UserId,WhomId})
        return res.json(Ch)

    }
    async getAll(req,res) {
        let {UserId,WhomId}=req.query
        const Ch = await  Chat.findAll({where:{UserId,WhomId}})
        return res.json(Ch)
    }
    async del(req,res,next) {
        try{
            const {id} = req.body
            await Chat.destroy( {
                where:{id:id}
            })
        return res.json()
        }
        catch (e){
            next(ApiError.badRequest("Something wrong"))
        }
    }

}
module.exports = new ChatController()
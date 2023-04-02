const {Chat} = require('../models/models')
const ApiError = require('../error/ApiError')

class ChatController{
    async create(req,res){
        const {Text} = req.body
        const Ch = await Chat.create({Text})
        return res.json(Ch)

    }
    async getAll(req,res) {
        const Ch = await  Chat.findAll()
        return res.json(Ch)
    }
    async del(req,res,next) {
        try{
            await Chat.destroy( {
                where:{id:req.body}
            })}
        catch (e){
            next(ApiError.badRequest("Something wrong"))
        }
    }

}
module.exports = new ChatController()
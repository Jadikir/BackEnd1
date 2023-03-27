const {Zakaz,User} = require('../models/models')
const  ApiError=require('../error/ApiError')
const fs = require('fs');
class modelController {

        async create(req, res, next) {
                try {

                        const {name,price,description} = req.body
                        var id_Zakazchika = User.id
                        const zakaz = await Zakaz.create({name,id_Zakazchika,price,description})
                        return res.json(zakaz)
                } catch (e) {
                        next(ApiError.badRequest("Something wrong"))
                }
        }

        async getAll(req, res) {
                let {name,author,typeId,limit,page}=req.query
                page = page||1
                limit = limit||9
                let offset = page * limit - limit
                let model
                if(!name && !author && !typeId){
                        model = await setOfModel.findAndCountAll({limit,offset})}
                else if(name && !author && !typeId){
                        model = await setOfModel.findAndCountAll({where: {name},limit,offset})}
                else if(!name && author && !typeId){
                        model = await setOfModel.findAndCountAll({where: {author},limit,offset})}
                else if(!name && !author && typeId){
                        model = await setOfModel.findAndCountAll({where: {typeId},limit,offset})}
                else if(name && !author && typeId){
                        model = await setOfModel.findAndCountAll({where: {name,typeId},limit,offset})}
                else if(!name && author && typeId){
                        model = await setOfModel.findAndCountAll({where: {author,typeId},limit,offset})}
                else if(name && author && !typeId){
                        model = await setOfModel.findAndCountAll({where: {name,author},limit,offset})}
                else if(name && author && typeId){
                        model = await setOfModel.findAndCountAll({where: {name,author,typeId},limit,offset})}
                return res.json(model)
        }
        async del(req,res,next) {
                try{
                        await Zakaz.destroy( {
                                where:{id:this.getAll()}
                        })
                        return res.json()
                        }
        catch (e){
                next(ApiError.badRequest("Something wrong"))
        }
        }

}
module.exports = new modelController()

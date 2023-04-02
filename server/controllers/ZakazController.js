const {Zakaz, User} = require('../models/models')
const  ApiError = require('../error/ApiError')
const fs = require('fs');

class ZakazController {

        async create(req, res, next) {
                try {

                        const {name,price,description} = req.body
                        const zakaz = await Zakaz.create({name,price,description})
                        return res.json(zakaz)
                } catch (e) {
                        next(ApiError.badRequest("Something wrong"))
                }
        }

        async getAll(req, res) {
                let {name,price,limit,page}=req.query
                page = page||1
                limit = limit||9
                let offset = page * limit - limit
                let zakaz
                if(!name && !price){
                        zakaz = await Zakaz.findAndCountAll({limit,offset})}
                else if(name && !price){
                        zakaz = await Zakaz.findAndCountAll({where: {name},limit,offset})}
                else if(!name && price){
                        zakaz = await Zakaz.findAndCountAll({where: {author},limit,offset})}
                else if(name && price){
                        zakaz = await Zakaz.findAndCountAll({where: {typeId},limit,offset})}
                else if(name && !author && typeId){
                        zakaz = await Zakaz.findAndCountAll({where: {name,typeId},limit,offset})}
                else if(!name && author && typeId){
                        zakaz = await Zakaz.findAndCountAll({where: {author,typeId},limit,offset})}
                else if(name && author && !typeId){
                        zakaz = await Zakaz.findAndCountAll({where: {name,author},limit,offset})}
                else if(name && author && typeId){
                        zakaz = await Zakaz.findAndCountAll({where: {name,author,typeId},limit,offset})}
                return res.json(zakaz)
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
module.exports = new ZakazController()

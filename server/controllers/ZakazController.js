const {Zakaz} = require('../models/models')
const  ApiError = require('../error/ApiError')

class ZakazController {

        async create(req, res, next) {
                try {

                        const {name,price,description} = req.body
                        let UserId = req.user.id
                        const zakaz = await Zakaz.create({name,price,description,UserId})
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
                        zakaz = await Zakaz.findAndCountAll({where: {price},limit,offset})}
                else if(name && price){
                        zakaz = await Zakaz.findAndCountAll({where: {name, price},limit,offset})}
                return res.json(zakaz)
        }

        async del(req, res, next) {
                try {
                        const Id = req.params.id;
                        await Zakaz.destroy({
                                where: { id: Id }
                        });
                        return res.json('Удалено');
                } catch (e) {
                        next(ApiError.badRequest("Something wrong"));
                }
        }
}
module.exports = new ZakazController()

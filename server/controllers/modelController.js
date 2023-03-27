const uuid = require('uuid')
const path = require('path')
const mimeE=require('mime')
const {setOfModel} = require('../models/models')
const  ApiError=require('../error/ApiError')
const myArray = ["image/jpeg","image/png"];
const myArray1 = ["application/rar","application/zip","application/vnd.rar","application/x-7z-compressed"];
const fs = require('fs');
class modelController {

        async create(req, res, next) {
                try {
                        const {name, author, price, typeId} = req.body
                        const {render} = req.files
                        const {file_model} = req.files
                        if (myArray.includes(mimeE.getType(render.name)) && myArray1.includes(mimeE.getType(file_model.name))) {
                                let filename = uuid.v4() + ".jpg"
                                let file_filename = uuid.v4() + ".zip"
                                await render.mv(path.resolve(__dirname, '..', 'static', filename))
                                await file_model.mv(path.resolve(__dirname, '..', 'static', file_filename))
                                const oneModel = await setOfModel.create({
                                        name,
                                        author,
                                        file_model: file_filename,
                                        price,
                                        render: filename,
                                        typeId
                                })
                                return res.json(oneModel)
                        } else {
                                next(ApiError.badRequest("Bad files"))
                        }
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
                        let temp = req.body
                        let temp2 = JSON.stringify(await setOfModel.findAll( {where:{name:'Dodster3'},attributes: ['render'],raw: true}))
                        let temp3 = JSON.stringify(await setOfModel.findAll( {where:{name:'Dodster3'},attributes: ['file_model'],raw: true}))
                        console.log(temp2,temp3)
                        temp2=temp2.slice(12,temp2.length-3)
                        temp3=temp3.slice(16,temp3.length-3)
                        console.log(path.resolve(__dirname, '..', 'static', temp2))
                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', temp2))
                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', temp3))
                        await setOfModel.destroy( {
                                where:{name:'Dodster3'}
                        })
                        return res.json()
                        }
        catch (e){
                next(ApiError.badRequest("Something wrong"))
        }
        }

}
module.exports = new modelController()

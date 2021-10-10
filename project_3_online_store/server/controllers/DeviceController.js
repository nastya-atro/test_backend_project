const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require("../models/models");
const ApiError = require("../error/ApiErrors");

class DeviceController{
    async create(req, res, next){
        try{
            const {name, price, info, typeId, brandId} = req.body
            const {img} = req.files

            const fileName = uuid.v4() + '.jpg'
            const pathFile = path.resolve('static', fileName)
            img.mv(pathFile)

            const device = await Device.create({name, price, brandId, typeId, img: fileName })

            if(info){
              let infoArray = JSON.parse(info);
                infoArray.forEach((el)=>{
                    const deviceInfo = DeviceInfo.create({
                        title: el.title,
                        description: el.description,
                        deviceId: device.id
                    })
                })

            }


            return res.json(device)

        } catch(e){
            next(ApiError.badRequest(e.message))
        }


    }
    async getAll(req, res){
        let {brandId, typeId, page, limit} = req.query;
        let brands;

        page = page || 1;
        limit = limit || 1;
        let offset = page * limit - limit

        if(!brandId && !typeId){
            brands = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            brands = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId){
            brands = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId){
            brands = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(brands)

    }
    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        return res.json(device)

    }
}

module.exports = new DeviceController()
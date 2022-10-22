const uuid = require('uuid')
const path = require('path');
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError');

class  ProductController{
    async create(req, res) {
       try {
           const {name, price, brandId, typeId, info} = req.body
           const {img} = req.files
           let filename = uuid.v4() + ".jpg"
           img.mv(path.resolve(__dirname, '..', 'static', filename))

           const product = await Product.create({name, price, brandId, typeId, img: filename})

           return res.json(product)

       } catch (e) {
           next(ApiError.badRequest(e.message))
       }
    }

    async getAll(req, res) {
        const {brandId, typeId} = req.query
        let product;
        if (!brandId && !typeId){
            product = await Product.findAll()
        }
        if (brandId && !typeId){
            product = await Product.findAll({where:{brandId}})
        }
        if (!brandId && typeId){
            product = await Product.findAll({where:{typeId}})
        }

        if (brandId && typeId){
            product = await Product.findAll({where:{typeId, brandId}})
        }

        return res.json(product)

    }

    async getOne(req, res) {

    }


}

module.exports = new ProductController()
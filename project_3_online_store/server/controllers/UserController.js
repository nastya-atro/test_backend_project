const ApiError = require('../error/ApiErrors')

class UserController{
    async registration(req, res){

    }
    async login(req, res){

    }
    async checkAuth(req, res, next){
        const {id} = req.query;
        if(!id){
           return next(ApiError.badRequest('Id is required'))
        }
        res.json({id})
    }
}

module.exports = new UserController()
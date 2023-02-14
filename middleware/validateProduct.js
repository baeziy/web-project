const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');

const validateProduct = (req, res, next)=>{
    const productSchemaJoi = Joi.object({
        product: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
            productType: Joi.string().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
        }).required()
    });
    const {error} = productSchemaJoi.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }

    

}

module.exports = validateProduct;




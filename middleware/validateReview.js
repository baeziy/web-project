const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');

const validateReview = (req, res, next)=>{
    const reviewSchemaJoi = Joi.object({
        review: Joi.object({
            body: Joi.string().required(),
            rating: Joi.number().required().min(1).max(5),
        }).required()
    });
    const {error} = reviewSchemaJoi.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
}


module.exports = validateReview;
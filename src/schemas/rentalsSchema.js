import joi from 'joi';

const rentalsSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    rentDate: joi.string().pattern(/^\d{4}\-\d{2}\-\d{2}$/).required(),
    daysRented: joi.number().min(1).required(),
    returnDate: joi.string().pattern(/^\d{4}\-\d{2}\-\d{2}$/).allow(null),
    originalPrice: joi.number.min(1).required(),
    dalayFee: joi.number.min(1).allow(null)
});

export default rentalsSchema;
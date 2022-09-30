import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/[0-9]/).min(10).max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
    birthday: joi.string().pattern(/^\d{4}\-\d{2}\-\d{2}$/).required()
});

export default customersSchema;
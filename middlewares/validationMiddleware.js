import Joi from 'joi';

// Validación de usuario
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  roleName: Joi.string().required(),
  lastname: Joi.string().required(),
  name: Joi.string().required(),
  phone_number: Joi.string().when('roleName', {
    is: 'partner',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  partner_number: Joi.number().when('roleName', {
    is: 'partner',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Validación de categoría
const categorySchema = Joi.object({
  name: Joi.string().required()
});

export const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

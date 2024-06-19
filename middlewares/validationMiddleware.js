import Joi from 'joi';

// Validación de usuario
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  roleName: Joi.string().required(),
  lastname: Joi.string().required(),
  name: Joi.string().required(),
  phone_number: Joi.string().allow(null, '').when('roleName', {
    is: 'partner',
    then: Joi.string().required().messages({
      'any.required': 'El número de teléfono es obligatorio para los socios',
      'string.empty': 'El número de teléfono no puede estar vacío'
    }),
    otherwise: Joi.string().optional()
  }),
  partner_number: Joi.number().allow(null, '').when('roleName', {
    is: 'partner',
    then: Joi.number().required().messages({
      'any.required': 'El número de socio es obligatorio para los socios',
      'number.base': 'El número de socio debe ser un número',
      'number.empty': 'El número de socio no puede estar vacío'
    }),
    otherwise: Joi.number().optional()
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

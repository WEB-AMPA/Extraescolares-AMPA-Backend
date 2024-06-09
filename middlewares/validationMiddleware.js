import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  roleName: Joi.string().required(),
  lastname: Joi.string().required(),
  name: Joi.string().required(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

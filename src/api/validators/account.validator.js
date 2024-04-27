import Joi from 'joi';

export function validateLogin(body) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).max(20).required(),
  });
  return schema.validate(body);
}

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required(),
  });
  return schema.validate(body);
}
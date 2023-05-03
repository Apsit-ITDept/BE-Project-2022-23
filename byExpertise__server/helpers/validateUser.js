const Joi = require("joi");

function validateUser(user) {
  const schema = {
    fname: Joi.string().min(5).max(50).required(),
    lname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required(),
  };

  return Joi.validate(user, schema);
}
module.exports = validateUser;

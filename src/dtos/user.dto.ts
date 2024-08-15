import Joi from "joi";

const userDtoSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  fullName: Joi.string().min(3).max(30),
});

export default userDtoSchema;

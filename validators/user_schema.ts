import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required(),
  hobbies: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
});

export default userSchema;

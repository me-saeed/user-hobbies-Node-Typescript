import Joi from "joi";

const userIdSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

export default userIdSchema;

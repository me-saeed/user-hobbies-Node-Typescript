import Joi from "joi";

const hobbyValidationSchema = Joi.object({
  passionLevel: Joi.string()
    .valid("Low", "Medium", "High", "Very-High")
    .required(),
  name: Joi.string().required(),
  year: Joi.string().required(),
  userId: Joi.string().required(),
});

export default hobbyValidationSchema;

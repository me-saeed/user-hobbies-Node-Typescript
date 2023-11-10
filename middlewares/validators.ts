import { Validators } from "../validators";
import createHttpError from "http-errors";
import Joi from "joi";

export default function (validator: keyof typeof Validators) {
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`);
  }

  return async function (req: any, res: any, next: any) {
    try {
      let payload = req.body;

      if (!payload || Object.keys(payload).length === 0) {
        payload = req.params;
      }

      console.log("my payload ------", payload);

      const validated = await Validators[validator].validateAsync(payload);
      payload = validated;

      next();
    } catch (err) {
      if (Joi.isError(err)) {
        return res
          .status(422)
          .json({ status: false, error: err.message, message: err.message });
      }

      next(createHttpError(500));
    }
  };
}

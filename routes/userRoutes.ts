import { Router } from "express";
import { UserController } from "../controllers/userController";

import Validators from "../middlewares/validators";

export const userRoutes = (userController: UserController) => {
  const router = Router();

  /// here I used middleware to validate request
  router.get("/getusers", userController.getAllUsers);

  router.post(
    "/createUser",
    Validators("userSchema"),
    userController.createUser
  );
  router.post(
    "/createHobby",
    Validators("hobbySchema"),
    userController.createHobby
  );

  router.get(
    "/getUserWithHobbies/:userId",
    Validators("userIdSchema"),

    userController.getUserWithHobbies
  );

  router.delete(
    "/deleteHobby/:userId/:hobbyId",
    Validators("userIdAndHobbyId_schema"),

    userController.deleteHobby
  );

  return router;
};

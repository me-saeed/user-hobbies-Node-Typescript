import { Router } from "express";
import { userRoutes } from "./userRoutes";

export function createRoutes(controllers: any) {
  const router = Router();

  // User route
  router.use("/users", userRoutes(controllers.userController));

  return router;
}

import { UserController } from "./userController";

export function controllersFactory() {
  return {
    userController: new UserController(),
    // Other controllers...
  };
}

import authErrors from "./auth.error.js";
import routeError from "./route.error.js";
import systemError from "./system.error.js";
import userError from "./user.error.js";

export const Errors = {
  auth: authErrors,
  route: routeError,
  user: userError,
  system: systemError,
};

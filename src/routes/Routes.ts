import Home from "../containers/Home/Home";
import SignUp from "../containers/SignUp/SignUp";
import SignIn from "../containers/SignIn/SignIn";
import NotFound from "../pages/NotFound/NotFound";
import ResetPassword from "../containers/ResetPassword/ResetPassword";
import ForgotPassword from "../containers/ForgotPassword/ForgotPassword";

export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "*",
  SIGN_IN: "/signIn",
  SIGN_UP: "/signUp",
  RESET_PWD: "/reset",
  FORGOT_PWD: "/forgot",
};

export const ROUTES_GROUP = [
  {
    path: ROUTES.HOME,
    component: Home,
    isPrivate: true,
  },
  {
    path: ROUTES.NOT_FOUND,
    component: NotFound,
    isPrivate: false,
  },
  {
    path: ROUTES.SIGN_IN,
    component: SignIn,
    isPrivate: false,
  },
  {
    path: ROUTES.SIGN_UP,
    component: SignUp,
    isPrivate: false,
  },
  {
    path: ROUTES.RESET_PWD,
    component: ResetPassword,
    isPrivate: false,
  },
  {
    path: ROUTES.FORGOT_PWD,
    component: ForgotPassword,
    isPrivate: false,
  },
];

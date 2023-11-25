import LoginPage from '../view/pages/auth/login-page';
import RegisterPage from '../view/pages/auth/register-page';

const { default: LandingPage } = require('../view/pages/landing-page');

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/daftar': RegisterPage,
};

export default routes;

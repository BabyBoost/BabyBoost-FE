import LoginPage from '../view/pages/auth/login-page';
import RegisterPage from '../view/pages/auth/register-page';
import CatatanGizi from '../view/pages/feature/catatan-gizi';
import KalkulatorGizi from '../view/pages/feature/kalkulator-gizi';
import RekomendasiBahanPage from '../view/pages/feature/rekomendasi-bahan';
import PasswordChangePage from '../view/pages/profile/password-change';
import Profile from '../view/pages/profile/profile-change';
import User from '../view/pages/profile/user';
import FormInput from '../view/templates/formInputAnak';

const { default: LandingPage } = require('../view/pages/landing-page');

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/daftar': RegisterPage,
  '/user': User,
  '/profile': Profile,
  '/ubah-password': PasswordChangePage,
  '/kalkulator-gizi': KalkulatorGizi,
  '/catatan-gizi': CatatanGizi,
  '/rekomendasi-bahan': RekomendasiBahanPage,
  '/form-input': FormInput,
};

export default routes;

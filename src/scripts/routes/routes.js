import LoginPage from '../view/pages/auth/login-page';
import RegisterPage from '../view/pages/auth/register-page';
import CatatanGizi from '../view/pages/feature/catatan-gizi';
import KalkulatorGizi from '../view/pages/feature/kalkulator-gizi';
import RekomendasiBahanPage from '../view/pages/feature/rekomendasi-bahan';
import PasswordChangePage from '../view/pages/profile/password-change';
import Profile from '../view/pages/profile/profile-change';
import User from '../view/pages/profile/user';
import FormInput from '../view/templates/formInputAnak';
import ShowOption from '../view/templates/showOption';
import Dashboard from '../view/templates/dashboard';
import UpdateInput from '../view/templates/updateFormAnak';
import Karbohidrat from '../view/templates/karbohidrat';
import Protein from '../view/templates/protein';
import Lemak from '../view/templates/lemak';

const { default: LandingPage } = require('../view/pages/landing-page');

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/daftar': RegisterPage,
  '/users/:id': User,
  '/profile': Profile,
  '/passwordchange': PasswordChangePage,
  '/kalkulatorgizi': KalkulatorGizi,
  '/catatangizi': CatatanGizi,
  '/rekomendasibahan': RekomendasiBahanPage,
  '/tambahidentitasanak': FormInput,
  '/updateanak': UpdateInput,
  '/option': ShowOption,
  '/dashboard': Dashboard,
  '/karbohidrat': Karbohidrat,
  '/protein': Protein,
  '/lemak': Lemak,
};

export default routes;

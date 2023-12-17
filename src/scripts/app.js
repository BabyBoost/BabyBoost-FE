import routes from './routes/routes';
import UrlParser from './routes/url-parser';
import DrawerInitiator from './utils/drawer-toggle';
import btnInitiator from './utils/go-to-topBtn-initiator';
import LandingPage from './view/pages/landing-page';
import LoginPage from './view/pages/auth/login-page';
import RegisterPage from './view/pages/auth/register-page';
import Profile from './view/pages/profile/profile-change';
import PasswordChangePage from './view/pages/profile/password-change';
import NavbarChanger from './utils/navbar-changer';
import User from './view/pages/profile/user';
import KalkulatorGizi from './view/pages/feature/kalkulator-gizi';
import ShowLoginMessage from './view/templates/showLoginMessage';
import * as utilAuth from './utils/atuh';
import CatatanGizi from './view/pages/feature/catatan-gizi';
import FormInput from './view/templates/formInputAnak';
import Dashboard from './view/templates/dashboard';
import ShowDataMessage from './view/templates/showDataMessage';
import UpdateInput from './view/templates/updateFormAnak';
import RekomendasiBahanPage from './view/pages/feature/rekomendasi-bahan';
import Karbohidrat from './view/templates/karbohidrat';
import Protein from './view/templates/protein';
import Lemak from './view/templates/lemak';

class Main {
  constructor({
    navbarList, hamburgerBtn, content, navbar, goToTopBtn, btnNavGroup,
  }) {
    this._navbarList = navbarList;
    this._hamburgerBtn = hamburgerBtn;
    this._content = content;
    this._navbar = navbar;
    this._goToToBtn = goToTopBtn;
    this._btnNavGroup = btnNavGroup;

    this.navbarChanger = new NavbarChanger(btnNavGroup);

    this.onLoginSuccess = this.onLoginSuccess.bind(this);

    this.InitialAppShell();
  }

  InitialAppShell() {
    DrawerInitiator.init({
      navbarList: this._navbarList,
      hamburgerBtn: this._hamburgerBtn,
    });
    btnInitiator.init({
      goToTopBtn: this._goToToBtn,
    });
  }

  renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const Page = routes[url];

    if (Page) {
      const page = new Page();
      this._content.innerHTML = '';
      this._content.appendChild(page._render());

      if (url === '/login') {
        const loginPage = new LoginPage();
        loginPage.onLoginSuccess = this.onLoginSuccess;
        loginPage._setupEventListeners();
      }
      if (url === '/daftar') {
        const registerPage = new RegisterPage();
        registerPage._setupEventListeners();
      }
      if (url === '/') {
        const landingPage = new LandingPage();
        landingPage.InitializeEvent();
      }
      if (url === '/profile') {
        const profilePage = new Profile();
        profilePage.intializeEvent();
      }
      if (url === '/passwordchange') {
        const changePasswordPage = new PasswordChangePage();
        changePasswordPage.intializeEvent();
      }
      if (url === '/tambahidentitasanak') {
        const formInput = new FormInput();
        formInput.InitializeEvent();
      }
      if (url === '/updateanak') {
        const updateAnakPage = new UpdateInput();
        updateAnakPage.InitializeEvent();
      }
      if (url === '/kalkulatorgizi') {
        this._content.innerHTML = '';
        if (utilAuth.isUserLoggedIn()) {
          const kalkulatorGiziPage = new KalkulatorGizi();
          this._content.appendChild(kalkulatorGiziPage._render());
          kalkulatorGiziPage.InitializeEvent();
          if (!utilAuth.isDataAvail()) {
            this._content.innerHTML = '';
            const dataMessage = new ShowDataMessage();
            this._content.appendChild(dataMessage._render());
          }
        } else {
          const loginMessage = new ShowLoginMessage();
          this._content.appendChild(loginMessage._render());
        }
      }
      if (url === '/rekomendasibahan') {
        const rekomendasibahanPage = new RekomendasiBahanPage();
        rekomendasibahanPage.InitializeEvent();
      }

      if (url === '/karbohidrat') {
        const karbohidratPage = new Karbohidrat();
        karbohidratPage.InitializeEvent();
      }
      if (url === '/protein') {
        const proteinPage = new Protein();
        proteinPage.InitializeEvent();
      }
      if (url === '/lemak') {
        const lemakPage = new Lemak();
        lemakPage.InitializeEvent();
      }
      if (url === '/catatangizi') {
        this._content.innerHTML = '';
        if (utilAuth.isUserLoggedIn()) {
          const catatanGiziPage = new CatatanGizi();
          this._content.appendChild(catatanGiziPage._render());
          catatanGiziPage.InitializeEvent();
          if (!utilAuth.isDataAvail()) {
            this._content.innerHTML = '';
            const dataMessage = new ShowDataMessage();
            this._content.appendChild(dataMessage._render());
          }
        } else {
          const loginMessage = new ShowLoginMessage();
          this._content.appendChild(loginMessage._render());
        }
      }
      if (url === '/users/:id') {
        const userPage = new User();
        userPage.InitializeEvent();
      }
      if (url === '/dashboard') {
        this._content.innerHTML = ' ';
        if (utilAuth.isUserLoggedIn()) {
          const dashboardPage = new Dashboard();
          this._content.appendChild(dashboardPage._render());
          dashboardPage.InitializeEvent();
        } else {
          const loginMessage = new ShowLoginMessage();
          this._content.appendChild(loginMessage._render());
        }
      }
    }
  }

  onLoginSuccess(fullname) {
    this.navbarChanger.updateNavbar(fullname);
  }
}

export default Main;

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
import isUserLoggedIn from './utils/atuh';
import CatatanGizi from './view/pages/feature/catatan-gizi';
import FormInput from './view/templates/formInputAnak';

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
        landingPage.initializeBtnDynamicContentListener();
        landingPage.initializeLikeButton();
      }
      if (url === '/profile') {
        const profilePage = new Profile();
        profilePage.intializeEvent();
      }
      if (url === '/ubah-password') {
        const changePasswordPage = new PasswordChangePage();
        changePasswordPage.intializeEvent();
      }
      if (url === '/form-input') {
        const formInput = new FormInput();
        formInput.InitializeEvent();
      }
      if (url === '/kalkulator-gizi') {
        this._content.innerHTML = '';
        if (isUserLoggedIn()) {
          const kalkulatorGiziPage = new KalkulatorGizi();
          this._content.appendChild(kalkulatorGiziPage._render());
        } else {
          const loginMessage = new ShowLoginMessage();
          this._content.appendChild(loginMessage._render());
        }
      }
      if (url === '/catatan-gizi') {
        this._content.innerHTML = '';
        if (isUserLoggedIn()) {
          const catatanGiziPage = new CatatanGizi();
          this._content.appendChild(catatanGiziPage._render());
        } else {
          const loginMessage = new ShowLoginMessage();
          this._content.appendChild(loginMessage._render());
        }
      }
      if (url === '/user') {
        const userPage = new User();
        userPage.fetchUserData();
      }
    }
  }

  onLoginSuccess(fullname) {
    this.navbarChanger.updateNavbar(fullname);
  }
}

export default Main;

import routes from './routes/routes';
import UrlParser from './routes/url-parser';
import DrawerInitiator from './utils/drawer-toggle';
import btnInitiator from './utils/go-to-topBtn-initiator';
import LandingPage from './view/pages/landing-page';
import LoginPage from './view/pages/auth/login-page';
import RegisterPage from './view/pages/auth/register-page';

class Main {
  constructor({
    navbarList, hamburgerBtn, content, navbar, goToTopBtn,
  }) {
    this._navbarList = navbarList;
    this._hamburgerBtn = hamburgerBtn;
    this._content = content;
    this._navbar = navbar;
    this._goToToBtn = goToTopBtn,

    this.InitialAppShell();
    this.renderPage();
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
    }
  }
}

export default Main;

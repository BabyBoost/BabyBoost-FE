import routes from './routes/routes';
import UrlParser from './routes/url-parser';
import DrawerInitiator from './utils/drawer-toggle';
import btnInitiator from './utils/go-to-topBtn-initiator';
import LandingPage from './view/pages/landing-page';

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

    this._landingPage = new LandingPage();
    this._landingPage.initializeBtnDynamicContentListener();
    this._landingPage.initializeLikeButton();
  }

  InitialAppShell() {
    DrawerInitiator.init({
      navbarList: this._navbarList,
      hambuergerBtn: this._hamburgerBtn,
    });
    btnInitiator.init({
      goToTopBtn: this._goToToBtn,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const Page = routes[url];

    if (Page) {
      const page = new Page();
      this._content.innerHTML = '';
      this._content.appendChild(page._render());
    }
  }
}

export default Main;

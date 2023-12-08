import 'lazysizes';
import '../styles/main.css';
import Main from './app';
import LoadingCircle from './utils/loading';

const app = new Main({
  hamburgerBtn: document.getElementById('hamburger-button'),
  navbarList: document.querySelector('#navbar .navbar-nav .list'),
  content: document.querySelector('#content'),
  goToTopBtn: document.querySelector('#on-top-btn'),
  btnNavGroup: document.querySelector('#navbar .extra'),
});

const loadingBar = new LoadingCircle();

window.addEventListener('hashchange', () => {
  loadingBar.show();
  setTimeout(() => {
    app.renderPage();
    loadingBar.hide();
  }, 900);
  window.scrollTo(0, 0);
});

window.addEventListener('load', async () => {
  loadingBar.show();
  app.renderPage();
  loadingBar.hide();
  // swRegister();
});

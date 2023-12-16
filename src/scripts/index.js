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
  document.querySelectorAll('.nav-links').forEach(link => {
    const pathName = window.location.hash.slice(1);
    if (link.getAttribute('href').slice(1) === pathName) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current', 'page');
    }
  });
  loadingBar.show();
  setTimeout(() => {
    app.renderPage();
    loadingBar.hide();
  }, 900);
  window.scrollTo(0, 0);
});

window.addEventListener('load', async () => {
  document.querySelectorAll('.nav-links').forEach(link => {
    const pathName = window.location.hash.slice(1);
    if (link.getAttribute('href').slice(1) === pathName) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current', 'page');
    }
  });
  loadingBar.show();
  app.renderPage();
  loadingBar.hide();
  // swRegister();
});

import 'lazysizes';
import '../styles/main.css';
import Main from './app';

const app = new Main({
  hamburgerBtn: document.getElementById('hamburger-button'),
  navbarList: document.querySelector('#navbar .navbar-nav .list'),
  content: document.querySelector('#content'),
  goToTopBtn: document.querySelector('#on-top-btn'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  window.scrollTo(0, 0);
});

// window.addEventListener('load', async () => {
//   app.loadingProgress();
//   app.renderPage();
//   swRegister();
// });

const btnInitiator = {
  init({ goToTopBtn }) {
    let prevScrollHeight = window.scrollY;

    window.addEventListener('scroll', () => {
      const scrollHeight = window.scrollY;
      const scrollThreshold = 800;

      if (scrollHeight > scrollThreshold) {
        goToTopBtn.classList.add('scrolled');
      } else {
        goToTopBtn.classList.remove('scrolled');
      }

      if (scrollHeight < prevScrollHeight) {
        goToTopBtn.classList.remove('scrolled');
      }

      prevScrollHeight = scrollHeight;
    });

    goToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  },
};

export default btnInitiator;

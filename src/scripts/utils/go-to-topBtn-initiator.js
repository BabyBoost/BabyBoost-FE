const btnInitiator = {
  init({ goToTopBtn }) {
    window.addEventListener('scroll', () => {
      const scrollHeight = window.scrollY;

      const scrollThreshold = 800;

      if (scrollHeight > scrollThreshold) {
        goToTopBtn.classList.add('scrolled');
      } else {
        goToTopBtn.classList.remove('scrolled');
      }
    });

    goToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Efek scroll mulus
      });
    });
  },
};

export default btnInitiator;

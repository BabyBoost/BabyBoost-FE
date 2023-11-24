const DrawerInitiator = {
  init({ hambuergerBtn, navbarList }) {
    hambuergerBtn.addEventListener('click', (event) => {
      this._toggleDrawer(event, navbarList);
    });

    document.addEventListener('click', (e) => {
      if (!hambuergerBtn.contains(e.target) && !navbarList.contains(e.target)) {
        this._closeDrawer(e, navbarList);
      }
    });
  },

  _toggleDrawer(event, navbarList) {
    event.stopPropagation();
    navbarList.classList.toggle('active');
  },

  _closeDrawer(event, navbarList) {
    event.stopPropagation();
    navbarList.classList.remove('active');
  },
};

export default DrawerInitiator;

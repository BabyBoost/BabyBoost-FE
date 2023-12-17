class NavbarChanger {
  constructor(btnNavGroup) {
    this.btnNavGroup = btnNavGroup;
    this.loggedIn = this.checkLoggedIn();
    this.fullname = localStorage.getItem('db95dc5a-9739-11ee-b9d1-0242ac120002') || '';
    this.renderNavbar();
  }

  checkLoggedIn() {
    const accessToken = localStorage.getItem('1de9d40a-9738-11ee-b9d1-0242ac120002');
    return !!accessToken;
  }

  renderNavbar() {
    if (this.loggedIn) {
      this.renderLoggedInNavbar();
    } else {
      this.renderVisitorNavbar();
    }
  }

  renderLoggedInNavbar() {
    const userId = localStorage.getItem('1223afd8-9738-11ee-b9d1-0242ac120002');
    const truncatedFullname = this.getTruncatedFullname();

    this.btnNavGroup.innerHTML = `
      <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${truncatedFullname}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#/users/${userId}">Profile</a></li>
          <li><a class="dropdown-item" href="#/dashboard">Dashboard</a></li>
          <li><a class="dropdown-item" href="#" id="logoutAnchor">Log Out</a></li>
        </ul>
      </div>
    `;

    const logoutAnchor = document.getElementById('logoutAnchor');
    if (logoutAnchor) {
      logoutAnchor.addEventListener('click', () => {
        this.logout();
      });
    }
  }

  renderVisitorNavbar() {
    this.btnNavGroup.innerHTML = `
      <a id="btn-login" href="#/login">Masuk</a>
      <a id="btn-regis" href="#/daftar">Daftar</a>
    `;
  }

  updateNavbar(fullname) {
    this.loggedIn = true;
    this.fullname = fullname;
    this.renderNavbar();
    localStorage.setItem('db95dc5a-9739-11ee-b9d1-0242ac120002', fullname);
  }

  getTruncatedFullname() {
    const maxDisplayLength = 20;
    return this.fullname.length >= maxDisplayLength
      ? `${this.fullname.slice(0, maxDisplayLength)}...`
      : this.fullname;
  }

  logout() {
    this.loggedIn = false;
    this.fullname = '';
    this.renderNavbar();

    localStorage.removeItem('1de9d40a-9738-11ee-b9d1-0242ac120002');
    localStorage.removeItem('db95dc5a-9739-11ee-b9d1-0242ac120002');
    localStorage.removeItem('1223afd8-9738-11ee-b9d1-0242ac120002');
    localStorage.removeItem('c3f36ae8-9844-11ee-b9d1-0242ac120002');
    localStorage.removeItem('bfdb816a-fed1-4b2f-a68f-5fecc9c7e04c');
  }

  updateNavbarFromServer() {
    const accessToken = localStorage.getItem('1de9d40a-9738-11ee-b9d1-0242ac120002');

    if (!accessToken) {
      return;
    }

    fetch('https://api-babyboost.cyclic.app/api/user/profile', {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        const updatedFullname = userData.fullname;
        this.updateNavbar(updatedFullname);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating Navbar from server:', error);
      });
  }
}

export default NavbarChanger;

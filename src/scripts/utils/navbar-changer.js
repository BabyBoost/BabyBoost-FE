class NavbarChanger {
  constructor(btnNavGroup) {
    this.btnNavGroup = btnNavGroup;
    this.loggedIn = this.checkLoggedIn();
    this.fullname = localStorage.getItem('fullname') || '';
    this.renderNavbar();
  }

  checkLoggedIn() {
    const accessToken = localStorage.getItem('accessToken');
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
    const truncatedFullname = this.getTruncatedFullname();

    this.btnNavGroup.innerHTML = `
      <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${truncatedFullname}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#/user">Profile</a></li>
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
    localStorage.setItem('fullname', fullname);
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

    localStorage.removeItem('accessToken');
    localStorage.removeItem('fullname');
  }

  updateNavbarFromServer() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    fetch('http://localhost:3000/api/user/profile', {
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
      })
      .catch((error) => {
        console.error('Error updating Navbar from server:', error);
      });
  }
}

export default NavbarChanger;

class User {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Profile';

    const elementContainer = document.createElement('div');
    elementContainer.className = 'element-container';
    elementContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    elementContainer.innerHTML = `
     <div class="element-inner-container">
         <div class="form-container">
          <div class="waiting-indicator-cat" id="waitingIndicatorCat" style="display: none;">
              <div class="spinner-waiting-cat"></div>
          </div>
               <h1>Profile</h1>
                    <form action="#" class="form" method="GET">
                         <div class="form-group-profile">
                              <label for="namaProfile">Nama Profile</label>
                              <input type="text" id="namaProfile" name="namaProfile" readonly />
                         </div>
                         <div class="form-group-profile">
                              <label for="email">Email</label>
                              <input type="text" id="email" name="email" readonly />
                         </div>
                         <div class="form-group-profile-button">
                              <a id="btn-profile-change" href="#/profile">Ubah Profile</a>
                         </div>
                         
                         <hr>
                         <a href="#/passwordchange">Ubah Password</a>
                    </form>
         </div>
     </div>
     `;

    return elementContainer;
  }

  async InitializeEvent() {
    const Indicator = document.getElementById('waitingIndicatorCat');

    try {
      Indicator.style.display = 'flex';

      await this.fetchUserData();
    } finally {
      Indicator.style.display = 'none';
    }
  }

  async fetchUserData() {
    try {
      const accessToken = localStorage.getItem('1de9d40a-9738-11ee-b9d1-0242ac120002');

      if (!accessToken) {
        console.error('User is not found');
        return;
      }

      const response = await fetch('http://localhost:80/api/user/profile', {
        headers: {
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();

      document.getElementById('namaProfile').value = userData.fullname;
      document.getElementById('email').value = userData.email;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
}

export default User;

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
                              <a id="btn-form-input-ex" href="#/form-input">+ Tambah Identitas Anak &#8599;</a>
                         </div>
                         
                         <hr>
                         <a href="#/ubah-password">Ubah Password</a>
                    </form>
         </div>
     </div>
     `;

    return elementContainer;
  }

  async fetchUserData() {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found');
        return;
      }

      const response = await fetch('http://localhost:3000/api/user/profile', {
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

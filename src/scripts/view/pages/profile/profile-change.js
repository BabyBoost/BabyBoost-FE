/* eslint-disable prefer-destructuring */
import LoadingCircle from '../../../utils/loading';
import NavbarChanger from '../../../utils/navbar-changer';

class Profile {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Ubah Profile';

    const elementContainer = document.createElement('div');
    elementContainer.className = 'element-container';
    elementContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    elementContainer.innerHTML = `
     <div class="element-inner-container">
          <div class="form-container">
               <h1>Profile</h1>
                    <form action="#" class="form" method="POST">
                         <div class="form-group-profile">
                              <label for="namaProfile">Nama Profile</label>
                              <input type="text" id="namaProfile" name="namaProfile" required/>
                              <span class="char-indicator"></span>
                         </div>
                         <div class="form-group-profile">
                              <label for="email">Email</label>
                              <input type="text" id="email" name="email" required/>
                         </div>
                         <div class="form-group-profile-button-after-change">
                              <button id="btn-back">Kembali</button>
                              <button type="button" id="btn-update-profile" name="btn-update-profile">Simpan</button>
                         </div>
                    </form>
          </div>
     </div>`;
    return elementContainer;
  }

  intializeEvent() {
    const nameInput = document.getElementById('namaProfile');
    const charIndicator = document.querySelector('.char-indicator');

    const btnBack = document.querySelector('#btn-back');
    const btnUpdateProfile = document.querySelector('#btn-update-profile');

    nameInput.addEventListener('input', () => {
      this._handleNameInput(nameInput, charIndicator);
    });

    btnBack.addEventListener('click', () => {
      // eslint-disable-next-line no-alert
      const userConfirmation = confirm('Anda akan kembali ke halaman sebelumnya. Apakah Anda yakin ingin melanjutkan?');

      if (userConfirmation) {
        window.history.back();
      }
    });

    btnUpdateProfile.addEventListener('click', () => {
      this._handleUpdateProfile();
    });
  }

  async _handleUpdateProfile() {
    const namaProfileInput = document.getElementById('namaProfile');
    const emailInput = document.getElementById('email');

    const loadingIndicator = new LoadingCircle();

    const inputFullname = namaProfileInput.value;
    const email = emailInput.value;

    try {
      loadingIndicator.show();

      const accessToken = localStorage.getItem('1de9d40a-9738-11ee-b9d1-0242ac120002');

      const response = await fetch('https://api-babyboost.cyclic.app/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ fullname: inputFullname, email }),
      });

      const data = await response.json();

      if (response.ok) {
        const navbarChanger = new NavbarChanger(document.querySelectorAll('#navbar .extra'));
        navbarChanger.updateNavbarFromServer();
        window.history.back();
      } else {
        console.error('Error updating profile:', data);
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      alert('Terjadi kesalahan selama pembaruan profil');
    } finally {
      loadingIndicator.hide();
    }
  }

  _handleNameInput(nameInput, charIndicator) {
    const maxCharLimit = 20;

    if (nameInput.value.length >= maxCharLimit) {
      charIndicator.innerHTML = 'Nama anda melebihi batas <span>(batas maximum karakter : 20)</span> ';
      charIndicator.style.display = 'block';
      nameInput.style.border = '1px solid #FF0000';
      nameInput.style.color = '#FF0000';
    } else {
      charIndicator.style.display = 'none';
      nameInput.style.border = '';
      nameInput.style.color = '#000';
    }
  }
}

export default Profile;

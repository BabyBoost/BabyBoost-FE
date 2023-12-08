import LoadingCircle from '../../../utils/loading';
import NavbarChanger from '../../../utils/navbar-changer';

class PasswordChangePage {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Ubah Password';

    const elementContainer = document.createElement('div');
    elementContainer.className = 'element-container';
    elementContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    elementContainer.innerHTML = `
     <div class="element-inner-container">
         <div class="form-container">
               <h1>Profile</h1>
                    <form action="#" class="form">
                         <div class="form-group-profile">
                              <label for="password">Password Lama</label>
                              <div class="password-input-container">
                                   <input type="password" id="password" name="password" required />
                                   <span class="show-password-icon" id="showPasswordIcon">&#x1F441;</span>     
                              </div>
                              <span class="password-same-indicator"></span>
                         </div>
                         <div class="form-group-profile">
                              <label for="newPassword">Password Baru</label>
                              <div class="password-input-container">
                                   <input type="password" id="newPassword" name="password" required />
                                   <span class="show-password-icon" id="showPasswordIconConfirmation">&#x1F441;</span>     
                              </div>
                         </div>
                         <div class="form-group-profile-button-after-change">
                              <button id="btn-back">Kembali</button>
                              <button type = "button" id="btn-update-password" name="btn-update-password">Simpan</button>
                         </div>
                    </form>
         </div>
     </div>
     `;
    return elementContainer;
  }

  intializeEvent() {
    const btnPassChange = document.querySelector('#btn-update-password');

    const showPasswordIcon = document.getElementById('showPasswordIcon');
    const passwordInput = document.getElementById('password');

    const showPasswordIconConfirmation = document.getElementById('showPasswordIconConfirmation');
    const passwordInputConfirmation = document.getElementById('newPassword');

    showPasswordIcon.style.display = 'none';
    showPasswordIconConfirmation.style.display = 'none';

    btnPassChange.addEventListener('click', () => {
      this._handlerPassChange();
    });

    passwordInput.addEventListener('input', () => {
      this._toggleShowPasswordIconVisibility(passwordInput, showPasswordIcon);
    });

    showPasswordIcon.addEventListener('click', () => {
      this._togglePasswordVisibility(passwordInput);
    });

    passwordInputConfirmation.addEventListener('input', () => {
      this._toggleShowPasswordIconVisibility(passwordInputConfirmation, showPasswordIconConfirmation);
    });

    showPasswordIconConfirmation.addEventListener('click', () => {
      this._togglePasswordVisibility(passwordInputConfirmation);
    });

    const btnBack = document.getElementById('btn-back');
    btnBack.addEventListener('click', () => {
      // eslint-disable-next-line no-alert
      const userConfirmation = confirm('Anda akan kembali ke halaman sebelumnya. Apakah Anda yakin ingin melanjutkan?');

      if (userConfirmation) {
        window.history.back();
      }
    });
  }

  async _handlerPassChange() {
    const loadingIndicator = new LoadingCircle();
    try {
      loadingIndicator.show();

      const oldPasswordStyle = document.getElementById('password');
      const oldPassword = document.getElementById('password').value;
      const newPassword = document.getElementById('newPassword').value;
      const passSameIndicator = document.querySelector('.password-same-indicator');

      // You can add additional client-side validation if needed

      // Make a request to the backend to update the password
      const response = await fetch('http://localhost:3000/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        passSameIndicator.textContent = 'Password Tidak Sama!';
        passSameIndicator.style.color = '#FF0000';
        passSameIndicator.style.fontWeight = '600';
        oldPasswordStyle.style.border = '1px solid #FF0000';
      } else {
        // Handle success, you may want to show a success message
        const navbarChanger = new NavbarChanger(document.querySelector('#navbar .extra'));
        navbarChanger.logout();
        window.location.href = '/#/login';
        location.reload();
      }
    } catch (error) {
      // Handle errors, you may want to show an error message
      console.error('Error updating password:', error);
    } finally {
      loadingIndicator.hide();
    }
  }

  _toggleShowPasswordIconVisibility(passwordInput, showPasswordIcon) {
    const isPasswordEmpty = passwordInput.value.trim() === '';
    showPasswordIcon.style.display = isPasswordEmpty ? 'none' : 'inline';
  }

  _togglePasswordVisibility(passwordInput) {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  }
}

export default PasswordChangePage;

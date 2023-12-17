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
                              <div class="indicator-password">
                                  <span class="weak"></span>
                                  <span class="medium"></span>
                                  <span class="strong"></span>
                              </div>
                              <div class="txt-indicator-password"></div>
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
      this._handleIndicatorNewPasswordInput(passwordInputConfirmation);
    });

    showPasswordIconConfirmation.addEventListener('click', () => {
      this._togglePasswordVisibility(passwordInputConfirmation);
    });

    const btnBack = document.getElementById('btn-back');
    btnBack.addEventListener('click', () => {
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

      const response = await fetch('https://api-babyboost.cyclic.app/api/user/put/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('1de9d40a-9738-11ee-b9d1-0242ac120002')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        passSameIndicator.textContent = 'Password Tidak Sama!';
        passSameIndicator.style.color = '#FF0000';
        passSameIndicator.style.fontWeight = '600';
        oldPasswordStyle.style.border = '1px solid #FF0000';
      } else {
        const navbarChanger = new NavbarChanger(document.querySelector('#navbar .extra'));
        navbarChanger.logout();
        window.location.href = '/#/login';
        location.reload();
      }
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      loadingIndicator.hide();
    }
  }

  _handleIndicatorNewPasswordInput(input) {
    const indicator = document.querySelector('.indicator-password');
    const weak = document.querySelector('.indicator-password .weak');
    const medium = document.querySelector('.indicator-password .medium');
    const strong = document.querySelector('.indicator-password .strong');
    const text = document.querySelector('.txt-indicator-password');

    const regExpWeak = /(?=.{1,3})/;
    const regExpMedium = /(?=.{6,})/;
    const regExpStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

    let strength = 0;

    if (input.value.match(regExpWeak)) {
      strength = 1;
    }

    if (input.value.match(regExpMedium)) {
      strength = 2;
    }

    if (input.value.match(regExpStrong)) {
      strength = 3;
    }

    indicator.style.display = 'flex';
    [weak, medium, strong].forEach((el, index) => {
      el.classList.toggle('active', index < strength);
    });

    text.style.display = 'block';

    switch (strength) {
      case 1:
        text.textContent = 'Your password is too weak';
        text.classList.add('weak');
        text.classList.remove('medium', 'strong');
        break;
      case 2:
        text.textContent = 'Your password is medium';
        text.classList.add('medium');
        text.classList.remove('weak', 'strong');
        break;
      case 3:
        text.textContent = 'Your password is strong';
        text.classList.add('strong');
        text.classList.remove('weak', 'medium');
        break;
      default:
        text.style.display = 'none';
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

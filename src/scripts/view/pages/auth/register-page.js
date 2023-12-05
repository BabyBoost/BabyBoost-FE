/* eslint-disable arrow-parens */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */

import LoadingCircle from '../../../utils/loading';

class RegisterPage {
  constructor() {
    this._onRegisterSuccess = null;
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Masuk & Daftar';

    const registerContainer = document.createElement('div');
    registerContainer.className = 'regis-container';
    registerContainer.innerHTML = `
    <div class="regis-content-container" style="background-image: url(./images/auth-assets/register-bg.png)">
          <div class="inner-regis-container">
               <a href="#/" id="login-header"
                    ><img src="./icon.png" alt="header-logo" />Baby<span>Boost</span>
               </a>
               <h4>Halo selamat datang! Saatnya penuhi gizi anak sekarang</h4>
               <form id="register-form" action="#" method="POST">
                    <div class="form-group">
                         <label for="username">Nama Pengguna</label>
                         <input type="text" id="username" name="username" placeholder="Masukan Nama Pengguna"required />
                         <span class="username-indicator"></span>
                    </div>
                    <div class="form-group">
                         <label for="namaProfile">Nama Profile<span></span></label>
                         <input type="text" id="namaProfile" name="namaProfile" placeholder="E.g. John Doe"required />
                         <span class="char-indicator"></span>
                    </div>
                    <div class="form-group">
                         <label for="email">Email</label>
                         <input type="text" id="email" name="email" placeholder="Masukan Email" required />
                         <span class="same-email-indicators">Email Sudah Terdaftar, masukan Email yang baru!</span>
                    </div>
                    <div class="form-group">
                         <label for="password">Kata Sandi</label>
                              <div class="password-input-container">
                                   <input type="password" id="password" placeholder="Masukan Kata Sandi" required />
                                   <span class="show-password-icon" id="showPasswordIcon">&#x1F441;</span>     
                              </div>
                              <div class="indicator-password">
                                  <span class="weak"></span>
                                  <span class="medium"></span>
                                  <span class="strong"></span>
                              </div>
                              <div class="txt-indicator-password"></div>   
                    </div>
                    <div class="form-group">
                         <label for="passwordConfirmation">Konfirmasi Kata Sandi</label>
                              <div class="password-input-container">
                                   <input type="password" id="passwordConfirmation" name="password" placeholder="Konfirmasi Kata Sandi" required />
                                   <span class="show-password-icon" id="showPasswordIconConfirmation">&#x1F441;</span>     
                              </div>
                         <span class="wrong-credential-txt">Kata Sandi tidak cocok</span>
                    </div>
                    <div class="form-group-button">
                         <div class="group-button-register">
                              <button type="submit" name="register-button" id="register-button">
                                   Daftar
                              </button>
                         </div>
                    </div>
               </form>
          </div>
    </div>`;

    return registerContainer;
  }

  _setupEventListeners() {
    const registerForm = document.getElementById('register-form');

    const usernameInput = document.getElementById('username');
    const usernameIndicator = document.querySelector('.username-indicator');

    const nameInput = document.getElementById('namaProfile');
    const charIndicator = document.querySelector('.char-indicator');

    const showPasswordIcon = document.getElementById('showPasswordIcon');
    const passwordInput = document.getElementById('password');

    const showPasswordIconConfirmation = document.getElementById('showPasswordIconConfirmation');
    const passwordInputConfirmation = document.getElementById('passwordConfirmation');

    showPasswordIcon.style.display = 'none';
    showPasswordIconConfirmation.style.display = 'none';

    showPasswordIcon.style.display = 'none';

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleRegister();
    });

    usernameInput.addEventListener('input', () => {
      this._handleUsernameInput(usernameInput, usernameIndicator);
    });

    nameInput.addEventListener('input', () => {
      this._handleNameInput(nameInput, charIndicator);
    });

    passwordInput.addEventListener('input', () => {
      this._toggleShowPasswordIconVisibility(passwordInput, showPasswordIcon);
      this._handlePasswordInput(passwordInput);
    });

    showPasswordIcon.addEventListener('click', () => {
      this._togglePasswordVisibility(passwordInput);
    });

    passwordInputConfirmation.addEventListener('input', () => {
      this._toggleShowPasswordIconVisibility(passwordInputConfirmation, showPasswordIconConfirmation);
      this._handlePasswordConfirmation(passwordInputConfirmation);
    });

    showPasswordIconConfirmation.addEventListener('click', () => {
      this._togglePasswordVisibility(passwordInputConfirmation);
    });
  }

  async _handleRegister() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const sameEmailIndicator = document.querySelector('.same-email-indicators');
    const nameInput = document.getElementById('namaProfile');
    const charIndicator = document.querySelector('.char-indicator');
    const passwordInput = document.getElementById('password');

    const loadingIndicator = new LoadingCircle();

    const fullname = nameInput.value;
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      loadingIndicator.show();

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        alert('Format Nama Pengguna Tidak Valid');
        return;
      }

      if (username.length < 3 || username.length > 20) {
        alert('Panjang Nama Pengguna harus antara 3 dan 20 karakter');
        return;
      }

      if (fullname.length <= 8) {
        charIndicator.textContent = 'Masukan Setidaknya 8 Karakter';
        charIndicator.style.display = 'block';
        nameInput.style.border = '1px solid #FF0000';
        return;
      }

      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, email, password, fullname,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/#/login';
        if (this._onRegisterSuccess) {
          this._onRegisterSuccess(data.user);
        }
      } else if (response.status === 400 && data.error === 'Email sudah terdaftar') {
        sameEmailIndicator.style.display = 'block';
        emailInput.style.border = '1px solid #FF0000';
      } else {
        alert(data.error || 'Registrasi gagal');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Terjadi kesalahan selama registrasi');
    } finally {
      loadingIndicator.hide();
    }
  }

  _handleUsernameInput(usernameInput, usernameIndicator) {
    const username = usernameInput.value;

    if (username.trim() === '') {
      usernameIndicator.textContent = '';
      usernameIndicator.style.color = '#000';
    } else {
      const usernameRegex = /^[a-zA-Z0-9_]+$/;

      if (!usernameRegex.test(username)) {
        usernameIndicator.textContent = 'Format Nama Pengguna Tidak Valid';
        usernameIndicator.style.color = 'red';
      } else if (username.length < 3 || username.length > 20) {
        usernameIndicator.textContent = 'Panjang Nama Pengguna harus antara 3 dan 20 karakter';
        usernameIndicator.style.color = 'red';
      } else {
        usernameIndicator.textContent = 'Nama Pengguna Valid';
        usernameIndicator.style.color = 'green';
      }
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

  _handlePasswordInput(input) {
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

  _handlePasswordConfirmation(passwordConfirmationInput) {
    const password = document.getElementById('password').value;
    const passwordConfirmation = passwordConfirmationInput.value;
    const wrongCredentialTxt = document.querySelector('.wrong-credential-txt');

    if (password !== passwordConfirmation) {
      passwordConfirmationInput.style.border = '1px solid #FF0000';
      wrongCredentialTxt.style.visibility = 'visible';
    } else {
      passwordConfirmationInput.style.border = '';
      wrongCredentialTxt.style.visibility = 'hidden';
    }
  }

  // -----------------------------------------------  Additional Utility -------------------------------------------------------//
  _toggleShowPasswordIconVisibility(passwordInput, showPasswordIcon) {
    const isPasswordEmpty = passwordInput.value.trim() === '';
    showPasswordIcon.style.display = isPasswordEmpty ? 'none' : 'inline';
  }

  _togglePasswordVisibility(passwordInput) {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  }
}

export default RegisterPage;

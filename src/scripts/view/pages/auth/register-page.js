class RegisterPage {
  constructor() {
    this._render();
  }

  _render() {
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
                         <input type="text" id="username" name="username" required />
                    </div>
                    <div class="form-group">
                         <label for="email">Email</label>
                         <input type="text" id="email" name="email" required />
                    </div>
                    <div class="form-group">
                         <label for="password">Kata Sandi</label>
                              <div class="password-input-container">
                                   <input type="password" id="password" required />
                                   <span class="show-password-icon" id="showPasswordIcon">&#x1F441;</span>     
                              </div>
                    </div>
                    <div class="form-group">
                         <label for="passwordConfirmation">Konfirmasi Kata Sandi</label>
                              <div class="password-input-container">
                                   <input type="password" id="passwordConfirmation" name="password" required />
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
    const showPasswordIcon = document.getElementById('showPasswordIcon');
    const passwordInput = document.getElementById('password');

    const showPasswordIconConfirmation = document.getElementById('showPasswordIconConfirmation');
    const passwordInputConfirmation = document.getElementById('passwordConfirmation');

    showPasswordIcon.style.display = 'none';
    showPasswordIconConfirmation.style.display = 'none';

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

export default RegisterPage;

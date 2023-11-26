class LoginPage {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Masuk & Daftar';

    const loginContainer = document.createElement('div');
    loginContainer.className = 'login-container';
    loginContainer.innerHTML = `
    <div class = 'login-content-container' style="background-image: url(./images/auth-assets/login-bg.png)">
          <div class="inner-login-container">
               <a href="#/" id="login-header"
                    ><img src="./icon.png" alt="header-logo" />Baby<span>Boost</span>
               </a>
               <h4>Selamat datang kembali! Silakan masuk ke akun Anda </h4>
               <form id="login-form" action="#" method="POST">
                    <div class="form-group">
                         <label for="username">Nama Pengguna</label>
                         <input type="text" id="username" name="username" required />
                    </div>
                    <div class="form-group">
                         <label for="password">Kata Sandi</label>
                              <div class="password-input-container">
                                   <input type="password" id="password" name="password" required />
                                   <span class="show-password-icon" id="showPasswordIcon">&#x1F441;</span>     
                              </div>
                         <span class="wrong-credential-txt">Kata Sandi atau Nama Pengguna Salah</span>
                    </div>
                    <div class="form-group-row">
                         <div class="checkbox">
                              <input type="checkbox" id="rememberMe" />
                              <label for="rememberMe">Ingat Saya</label>
                         </div>
                         <a href="#">Lupa Kata Sandi?</a>
                    </div>
                    <div class="form-group-button">
                         <div class="group-button-login">
                              <button type="submit" name="login-button">Masuk</button>
                         </div>
                         <div class="group-button-register">
                              <p>Belum mempunyai Akun?</p>
                              <a href="#/daftar" name="register-button">
                                   Daftar
                              </a>
                         </div>
                    </div>
               </form>
          </div>
    </div>
    `;

    return loginContainer;
  }

  _setupEventListeners() {
    const showPasswordIcon = document.getElementById('showPasswordIcon');
    const passwordInput = document.getElementById('password');

    showPasswordIcon.style.display = 'none';

    passwordInput.addEventListener('input', () => {
      this._toggleShowPasswordIconVisibility(passwordInput, showPasswordIcon);
    });

    showPasswordIcon.addEventListener('click', () => {
      this._togglePasswordVisibility(passwordInput);
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

export default LoginPage;

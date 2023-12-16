class ShowOption {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Saatnya Penuhi Gizi Anak!';

    const container = document.createElement('div');
    container.className = 'container-with-background';
    container.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    container.innerHTML = `
    <div class="show-option-content-container">
          <div class="show-option-content">
               <h1>Sudah Memasukan identitas Anak?</h1>
               <div class="show-option-content-btn-grp">
                    <a class="btn-loc-show" href="#/tambahidentitasanak">+ Tambah Identitas Anak &#8599;</a>
                    <a class="btn-loc-show" href="#/dashboard">Sudah Memiliki Anak &#8599</a>
               </div>
          </div>
    </div>
    `;

    return container;
  }
}

export default ShowOption;

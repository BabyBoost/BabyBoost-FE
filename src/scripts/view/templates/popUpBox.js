class PopUpBox {
  constructor() {
    this._render();
  }

  _render() {
    const contentContainer = document.querySelector('.cal-content');

    const popBoxContainer = document.createElement('div');
    popBoxContainer.className = 'popup-box-container';

    popBoxContainer.innerHTML = `
     <div class="popup-box">
          <div class="popup-box-content">
               <h1>Catatan Berhasil Disimpan</h1>
               <button class="pop-back-btn" id="pop-back-btn">Kembali</button>
          </div>
     </div>     
     `;

    contentContainer.appendChild(popBoxContainer);
  }

  IntializeEvent() {
    this.setupEvent();
  }

  setupEvent() {
    const backBtn = document.getElementById('pop-back-btn');
    backBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

export default PopUpBox;

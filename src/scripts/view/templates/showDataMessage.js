class ShowDataMessage {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Saatnya Penuhi Gizi Anak Sekarang!';

    const ShowMessageContentContainer = document.createElement('div');
    ShowMessageContentContainer.className = 'showMessage-content-container-before';
    ShowMessageContentContainer.style.backgroundImage = 'url(./images/bg-hero.png)';
    ShowMessageContentContainer.innerHTML = `
          <div class="showMessage-content-before">
            <h1>Silahkan Pilih Identitas Anak Terlebih Dahulu!</h1>
            <h4>Klik <a href="#/dashboard">disini</a></h4>
          </div>
          `;
    return ShowMessageContentContainer;
  }
}

export default ShowDataMessage;

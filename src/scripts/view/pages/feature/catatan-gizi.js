class CatatanGizi {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Catatan Gizi';
    const catatanContentContainer = document.createElement('div');
    catatanContentContainer.className = 'catatan-content-container';
    catatanContentContainer.innerHTML = `

    `;
    return catatanContentContainer;
  }
}

export default CatatanGizi;

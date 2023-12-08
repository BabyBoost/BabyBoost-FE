class KalkulatorGizi {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Kalkulator Gizi';

    const calcContentContainer = document.createElement('div');
    calcContentContainer.className = 'calc-content-container';
    calcContentContainer.innerHTML = `
    
    
    `;
    return calcContentContainer;
  }
}

export default KalkulatorGizi;

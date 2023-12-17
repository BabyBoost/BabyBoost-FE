import LoadingCircle from '../../utils/loading';

class FormInput {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Masukan Identitas Anak';

    const inputFormContainer = document.createElement('div');
    inputFormContainer.className = 'input-form-container';
    inputFormContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    inputFormContainer.innerHTML = `
     <div class="input-form-content-container">
         <h1>Identitas Anak</h1>
         <form class="input-form" id="inputForm" action="#" method="POST">
              <div class="input-form-group">
                    <label for="namaAnak">Nama Lengkap Anak</label>
                    <input type="text" id="namaAnak" name="namaAnak" required>
              </div>
              <div class="input-form-group">
                    <label for="usia">Usia</label>
                    <input type="number" id="usia" name="usia" required>
              </div>
              <div class="input-radio">
                    <h4>Jenis Kelamin</h4>
                    <div class="input-radio-group">
                              <label for="jenis_kelamin_laki_laki"><input type="radio" id="jenis_kelamin_laki_laki" name="jenis_kelamin" value="laki-laki"> Laki-laki</label>
                              <label for="jenis_kelamin_perempuan"><input type="radio" id="jenis_kelamin_perempuan" name="jenis_kelamin" value="perempuan"> Perempuan</label>     
                    </div>
              </div>
              <input type="hidden" id="userId" name="userId" value="${localStorage.getItem('1223afd8-9738-11ee-b9d1-0242ac120002')}">
              <button type="submit" class="input-btn-child" id="input-btn-child">Simpan</button>
         </form>
     </div>
    `;

    return inputFormContainer;
  }

  InitializeEvent() {
    const inputForm = document.getElementById('inputForm');
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }

  async _handleFormSubmit() {
    const loadingIndicator = new LoadingCircle();
    const userId = document.getElementById('userId').value;
    const namaAnak = document.getElementById('namaAnak').value;
    const usiaAnak = document.getElementById('usia').value;
    const jenisKelamin = document.querySelector('input[name="jenis_kelamin"]:checked');

    try {
      loadingIndicator.show();

      if (!jenisKelamin) {
        throw new Error('Pilih jenis kelamin.');
      }

      const response = await fetch('https://api-babyboost.cyclic.app/api/form/post/inputData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          namaAnak,
          usiaAnak,
          jenisKelamin: jenisKelamin.value,
        }),
      });

      if (response.ok) {
        window.location.href = '/#/dashboard';
      } else {
        const errorMessage = await response.text();
        console.error('Failed to save anak data:', errorMessage);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during anak input:', error.message);
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      loadingIndicator.hide();
    }
  }
}

export default FormInput;

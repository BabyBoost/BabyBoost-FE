class FormInput {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Input Identitas Anak';

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
                    <label for="tanggalLahir">Tanggal Lahir</label>
                    <input type="date" id="tanggalLahir" name="tanggalLahir" required>
              </div>
              <div class="input-radio">
                    <h4>Jenis Kelamin</h4>
                    <div class="input-radio-group">
                              <label for="jenis_kelamin_laki_laki"><input type="radio" id="jenis_kelamin_laki_laki" name="jenis_kelamin" value="laki-laki"> Laki-laki</label>
                              <label for="jenis_kelamin_perempuan"><input type="radio" id="jenis_kelamin_perempuan" name="jenis_kelamin" value="perempuan"> Perempuan</label>     
                    </div>
              </div>
              <button type="submit" class="input-btn-child" id="input-btn-child">Simpan</button>
         </form>
     </div>
    `;

    return inputFormContainer;
  }

  InitializeEvent() {
    const inputForm = document.getElementById('inputForm');
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Matikan peristiwa formulir default
      this._handleFormSubmit();
    });
  }

  async _handleFormSubmit() {
    const namaAnak = document.getElementById('namaAnak').value;
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelamin = document.querySelector('input[name="jenis_kelamin"]:checked');

    try {
      if (!jenisKelamin) {
        throw new Error('Pilih jenis kelamin.');
      }

      const response = await fetch('http://localhost:3000/api/form/input-anak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaAnak,
          tanggalLahir,
          jenisKelamin: jenisKelamin.value,
        }),
      });

      if (response.ok) {
        window.location.href = '/#/'; // Redirect jika respons berhasil
      } else {
        const errorMessage = await response.text();
        console.error('Failed to save anak data:', errorMessage);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during anak input:', error.message);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  }
}

export default FormInput;

import LoadingCircle from '../../utils/loading';

class UpdateInput {
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
            <h1>Update Identitas Anak</h1>
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
                 <button type="submit" class="updateBtn-child" id="updateBtn-child">Ubah</button>
            </form>
        </div>
       `;

    return inputFormContainer;
  }

  InitializeEvent() {
    this.handleUpdate();
  }

  async handleUpdate() {
    const loadingIndicator = new LoadingCircle();
    const updateForm = document.getElementById('inputForm');
    updateForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const namaAnak = document.getElementById('namaAnak').value;
      const usia = document.getElementById('usia').value;
      const jenisKelamin = document.querySelector('input[name="jenis_kelamin"]:checked').value;

      const idAnak = localStorage.getItem('c3f36ae8-9844-11ee-b9d1-0242ac120002');

      try {
        loadingIndicator.show();
        const response = await fetch(`http://localhost:80/api/dashboard/put/${idAnak}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ namaAnak, usia, jenisKelamin }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          window.location.href = '/#/dashboard';
        } else {
          alert('Gagal Update');
        }
      } catch (error) {
        console.error('Error during PUT operation:', error);
      } finally {
        loadingIndicator.hide();
      }
    });
  }
}

export default UpdateInput;

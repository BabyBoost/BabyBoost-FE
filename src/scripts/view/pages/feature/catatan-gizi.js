import LoadingCircle from '../../../utils/loading';
import MyApp from '../../../utils/sharedData';

class CatatanGizi {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Catatan Gizi';
    const catatanContentContainer = document.createElement('div');
    catatanContentContainer.className = 'catatan-content-container';
    catatanContentContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';
    catatanContentContainer.innerHTML = `
    <div class="catatan-inner-content">
        <div class="waiting-indicator-cat" id="waitingIndicatorCat" style="display: none;">
          <div class="spinner-waiting-cat"></div>
        </div>
        <h1>Identitas Anak</h1>
        <table class="identity-table">
          <tr>
            <td>Nama Lengkap</td>
            <td class="data" id="data-nama">${MyApp.getSharedData('nama')}</td>
            <td>Usia</td>
            <td class="data" id="data-usia">${MyApp.getSharedData('usia')}</td>
          </tr>
          <tr>
            <td>Jenis Kelamin</td>
            <td class="data" id="data-kelamin">${MyApp.getSharedData('gender')}</td>
          </tr>
          <tr>
            <td>
              <a href="/#/updateanak" id="update-identity-btn" class="text-decoration-none update-identity-btn">Ubah</a>
            </td>
          </tr>
        </table>

        <div class="gizi-container">
          <h1>Catatan Gizi</h1>
          <div class="gizi-content">
            <table class="user-gizi-table">
              <tr class="keterangan">
                <td>Tanggal</td>
                <td>Berat Badan</td>
                <td>Tinggi Badan</td>
                <td>Status Gizi</td>
                <td>Aksi</td>
              </tr>
              <tr>
                <td colspan="5"><hr /></td>
              </tr>
            </table>
          </div>
        </div>
    </div>
    `;
    return catatanContentContainer;
  }

  async InitializeEvent() {
    const Indicator = document.getElementById('waitingIndicatorCat');
    try {
      Indicator.style.display = 'flex';

      await this.fetchChildData();
    } finally {
      Indicator.style.display = 'none';
    }
  }

  async fetchChildData() {
    try {
      const childId = localStorage.getItem('c3f36ae8-9844-11ee-b9d1-0242ac120002');
      const apiUrl = `https://api-babyboost.cyclic.app/api/catatan/get/${childId}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const responseData = await response.json();

      this.displayCatatanGizi(responseData.data);
    } catch (error) {
      console.error('Error While Fetching data', error);
    }
  }

  displayCatatanGizi(data) {
    const dataKelamin = document.getElementById('data-kelamin');
    dataKelamin.textContent = dataKelamin.textContent.charAt(0).toUpperCase() + dataKelamin.textContent.slice(1);

    const tabelCatatanGizi = document.querySelector('.user-gizi-table');
    const tbody = tabelCatatanGizi.querySelector('tbody');

    if (data.length === 0) {
      const noDataRow = document.createElement('tr');
      noDataRow.innerHTML = `
        <td colspan="5" id="no-data-row">Tidak ada Catatan</td>
      `;
      tbody.appendChild(noDataRow);
    } else {
      data.forEach((catatan) => {
        // Formatted Date into MM/DD/YYYY
        const formattedDate = new Date(catatan.tanggal).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="data-gizi">${formattedDate}</td>
          <td class="data-gizi">${catatan.beratbadan}</td>
          <td class="data-gizi">${catatan.tinggibadan}</td>
          <td><h2 class="status-gizi">${catatan.statusgizi}</h2></td>
          <td><h2 class="delete-user-gizi">Hapus</h2></td>
        `;

        const statusGiziElement = row.querySelector('.status-gizi');
        if (catatan.statusgizi === 'Gizi Buruk') {
          statusGiziElement.style.backgroundColor = 'rgb(239, 46, 47)';
        }
        if (catatan.statusgizi === 'Gizi Kurang') {
          statusGiziElement.style.backgroundColor = 'rgb(254, 191, 38)';
        }
        if (catatan.statusgizi === 'Gizi Baik') {
          statusGiziElement.style.backgroundColor = 'rgb(59, 146, 67)';
        }
        if (catatan.statusgizi === 'Berisiko Gizi Lebih') {
          statusGiziElement.style.backgroundColor = 'rgb(254, 191, 38)';
        }
        if (catatan.statusgizi === 'Gizi Berlebih') {
          statusGiziElement.style.backgroundColor = 'rgb(243, 122, 31)';
        }
        if (catatan.statusgizi === 'Obesitas') {
          statusGiziElement.style.backgroundColor = 'rgb(239, 46, 47)';
        }

        const deleteButton = row.querySelector('.delete-user-gizi');
        deleteButton.addEventListener('click', () => {
          this.deleteCatatanGizi(catatan.id);
        });

        tbody.appendChild(row);
      });
    }
  }

  async deleteCatatanGizi(catatanId) {
    const loadingIndicator = new LoadingCircle();
    try {
      loadingIndicator.show();
      const apiUrl = `https://api-babyboost.cyclic.app/api/catatan/delete/${catatanId}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete catatan gizi: ${response.statusText}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        window.location.reload();
        this.fetchChildData();
      } else {
        console.error('Gagal menghapus catatan gizi:', responseData);
      }
    } catch (error) {
      console.error('Error during deleteCatatanGizi:', error);
    } finally {
      loadingIndicator.hide();
    }
  }
}

export default CatatanGizi;

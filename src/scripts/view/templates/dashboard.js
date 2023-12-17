import LoadingCircle from '../../utils/loading';
import MyApp from '../../utils/sharedData';

class Dashboard {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Dashboard';

    const dashboardContainer = document.createElement('div');
    dashboardContainer.className = 'dash-container';
    dashboardContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    dashboardContainer.innerHTML = `
         <div class="dash-content">
           <h1>Pilih Identitas Anak</h1>
           <div class="dash-container-cards" id="dataContainer">
              <div class="waiting-indicator" id="waitingIndicator" style="display: none;">
                <h4>Memuat</h4>  
                <div class="spinner-waiting"></div>
              </div>
           </div>
           <a href="#/tambahidentitasanak" class="add-data-btn">Tambah Identitas Anak &#8599</a>
         </div>
       `;

    return dashboardContainer;
  }

  async InitializeEvent() {
    const userId = localStorage.getItem('1223afd8-9738-11ee-b9d1-0242ac120002');
    const Indicator = document.getElementById('waitingIndicator');

    try {
      Indicator.style.display = 'flex';

      await this._fetchChildrenNames(userId);
    } finally {
      Indicator.style.display = 'none';
    }
  }

  async _fetchChildrenNames(userId) {
    try {
      const response = await fetch(`https://api-babyboost.cyclic.app/api/dashboard/get/${userId}`);
      const data = await response.json();

      if (response.ok) {
        const children = data.anak;
        this._displayChildren(children);
      } else {
        console.error('Gagal mengambil data anak:', data.error);
      }
    } catch (error) {
      console.error('Error saat mengambil data anak:', error.message);
    }
  }

  async _deleteChild(idAnak) {
    const loadingIndicator = new LoadingCircle();
    loadingIndicator.show();
    try {
      const response = await fetch(`https://api-babyboost.cyclic.app/api/dashboard/delete/${idAnak}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.removeItem('c3f36ae8-9844-11ee-b9d1-0242ac120002');
        localStorage.removeItem('bfdb816a-fed1-4b2f-a68f-5fecc9c7e04c');

        location.reload();
      } else {
        alert('Gagal Menghapus Data');
      }
    } catch (error) {
      console.error('Error during DELETE operation:', error);
    } finally {
      loadingIndicator.hide();
    }
  }

  _displayChildren(children) {
    const dataContainer = document.getElementById('dataContainer');

    if (children) {
      children.forEach((child) => {
        const childCard = document.createElement('div');
        childCard.className = 'dash-cards';
        childCard.innerHTML = `
          <h5 data-name="${child.nama}">${child.nama}</h5>
          <div class="btn-cards-group">
            <a href="javascript:void(0);" class="calcBtnData" data-child-id="${child.id}" data-gender="${child.kelamin}" data-usia="${child.usia}">Kalkulator Gizi &#8599</a>
            <a href="javascript:void(0);" class="catBtnData" data-child-id="${child.id}" data-gender="${child.kelamin}" data-usia="${child.usia}">Catatan Gizi &#8599</a>
            <a href="javascript:void(0);" class="update-child-btn" data-child-id="${child.id}">Ubah</a>
            <a href="javascript:void(0);" class="delete-child-btn" data-child-id="${child.id}">Hapus</a>
          </div>
        `;

        dataContainer.appendChild(childCard);
      });

      const calcBtns = document.querySelectorAll('.calcBtnData');
      calcBtns.forEach((calcBtn) => {
        calcBtn.addEventListener('click', (event) => this._handleClickActionToCalc(event));
      });
      const catBtns = document.querySelectorAll('.catBtnData');
      catBtns.forEach((catBtn) => {
        catBtn.addEventListener('click', (event) => this._handleClickActionToCat(event));
      });
      const updateBtns = document.querySelectorAll('.update-child-btn');
      updateBtns.forEach((updateBtn) => {
        updateBtn.addEventListener('click', (event) => this._handleClickActionUpdate(event));
      });

      const deleteBtns = document.querySelectorAll('.delete-child-btn');
      deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (event) => this._handleClickActionDelete(event));
      });
    }
  }

  _handleClickActionToCalc(event) {
    const childId = event.target.dataset.childId;
    const gender = event.target.dataset.gender;
    const usia = event.target.dataset.usia;
    const nama = event.target.closest('.dash-cards').querySelector('h5').getAttribute('data-name');

    localStorage.setItem('c3f36ae8-9844-11ee-b9d1-0242ac120002', childId);
    MyApp.setSharedData('usia', usia);
    MyApp.setSharedData('gender', gender);
    MyApp.setSharedData('nama', nama);

    window.location.href = '/#/kalkulatorgizi';
  }

  _handleClickActionToCat(event) {
    const childId = event.target.dataset.childId;
    const gender = event.target.dataset.gender;
    const usia = event.target.dataset.usia;
    const nama = event.target.closest('.dash-cards').querySelector('h5').getAttribute('data-name');

    localStorage.setItem('c3f36ae8-9844-11ee-b9d1-0242ac120002', childId);
    MyApp.setSharedData('gender', gender);
    MyApp.setSharedData('usia', usia);
    MyApp.setSharedData('nama', nama);

    window.location.href = '/#/catatangizi';
  }

  _handleClickActionUpdate(event) {
    const childId = event.target.dataset.childId;
    localStorage.setItem('c3f36ae8-9844-11ee-b9d1-0242ac120002', childId);

    window.location.href = '/#/updateanak';
  }

  _handleClickActionDelete(event) {
    const idAnak = event.target.dataset.childId;

    if (confirm('Apakah Anda yakin ingin menghapus anak ini?')) {
      this._deleteChild(idAnak);
    }
  }
}

export default Dashboard;

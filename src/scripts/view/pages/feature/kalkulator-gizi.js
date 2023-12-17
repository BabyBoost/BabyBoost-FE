import DataIMTBoys from '../../../../data/IMT/IMTboy';
import DataIMTGirls from '../../../../data/IMT/IMTgirl';
import DataSDBoys from '../../../../data/SD/SDboy';
import DataSDGirls from '../../../../data/SD/SDgirl';
import LoadingCircle from '../../../utils/loading';
import MyApp from '../../../utils/sharedData';
import PopUpBox from '../../templates/popUpBox';
import {
  beresikoGiziLebihContent, giziBaikContent, giziBerlebih, giziBurukContent, giziKurangContent, obesitas,
} from '../../templates/templateCreator';

class KalkulatorGizi {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Kalkulator Gizi';

    const calcContentContainer = document.createElement('div');
    calcContentContainer.className = 'calc-content-container';
    calcContentContainer.style.backgroundImage = 'url(./images/profile-assets/user-bg-container.png)';

    calcContentContainer.innerHTML = `
    <div class = "cal-content">
       <h1>Kalkulator Gizi</h1>
       <h5 class="desc-slogan">Hitung Kebutuhan Kalori <span id="nameSlogan"></span>, Ciptakan Masa Depan Sehat bersama Orang Tua Bijak</h5>
       <form class="input-field-container">
          <div class="input-field">
             <label for="tinggiBadan">Tinggi Badan</label>
             <input type="number" id="tinggiBadan" name="tinggiBadan" required>
          </div>
          <div class="input-field">
              <label for="beratBadan">Berat Badan</label>
              <input type="number" id="beratBadan" name="beratBadan" required>
          </div>
          <input type="hidden" id="tanggalCatat" name="tanggalCatat" value="">
       </form>
       <button type="submit" id="btnHitungCal" class="btnHitungCal">Hitung Kebutuhan Kalori</button>
        <div class="result-calc" id="result-container">
          <h3>Hasil Status Gizi</h3>
          <div class="result-row">
              <div class="row1-result-gizi" id="row1-result-gizi">
                <h1 id="statusGizi" class="statusGizi"></h1>
                <p id="statusDesc" class="statusDesc"></p>
              </div>
              <div class="row2-result-kal">
                  <h4>Total Kalori</h4>
                  <div class="d-flex align-items-center justify-content-between"><h1 id="kebutuhanEnergi">2000 </h1><h6>kkal</h6></div>
                  <div class="d-flex flex-column">
                      <div class="d-flex flex-row align-items-center justify-content-between p-0 detail-result-type"><h5>Karbohidrat</h5> <h6 class="kal-display"><span id="jumlahKarbo" class="resultKalBaseType">1000</span> kkal</h6></div>
                      <hr>
                      <div class="d-flex flex-row align-items-center justify-content-between p-0 detail-result-type"><h5>Lemak</h5> <h6 class="kal-display"><span id="jumlahLemak" class="resultKalBaseType">1000</span> kkal</h6></div>
                      <hr>
                      <div class="d-flex flex-row align-items-center justify-content-between p-0 detail-result-type"><h5>Protein</h5> <h6 class="kal-display"><span id="jumlahProtein" class="resultKalBaseType">1000</span> kkal</h6></div>
                  </div>
                  <a href="/#/rekomendasibahan" class="anchor-rek-bahan">Periksa Kalori Bahan Makanan &#8599</a>
              </div>
          </div>
          <button id="saveNutritionData" class="saveNutritionData">Simpan Hasil Pemeriksaan ke Catatan Gizi</button>
       </div>
    </div>
    `;
    return calcContentContainer;
  }

  InitializeEvent() {
    this._setupEvent();
  }

  _setupEvent() {
    const btnHitung = document.getElementById('btnHitungCal');
    const btnSaveNutrition = document.getElementById('saveNutritionData');

    const resultContainer = document.getElementById('result-container');

    const jenisKelaminData = MyApp.getSharedData('gender');
    const usiaAnakData = MyApp.getSharedData('usia');

    if (!localStorage.getItem('c3f36ae8-9844-11ee-b9d1-0242ac120002')) {
      MyApp.deleteSharedData('nama');
      return;
    }

    const nameSlogan = document.getElementById('nameSlogan');
    const showName = MyApp.getSharedData('nama').split(' ')[0];
    nameSlogan.textContent = showName;

    btnHitung.addEventListener('click', (e) => {
      e.preventDefault();

      const tinggiBadanInput = parseFloat(document.getElementById('tinggiBadan').value);
      const beratBadanInput = parseFloat(document.getElementById('beratBadan').value);

      if (!tinggiBadanInput && !beratBadanInput) {
        alert('Masukan Data Anak!');
      } else {
        this._showResultContainer(resultContainer);
        this._hitungKebutuhanEnergi(tinggiBadanInput, beratBadanInput, jenisKelaminData, usiaAnakData);
        this._hitungStatusGizi(tinggiBadanInput, beratBadanInput, jenisKelaminData, usiaAnakData);
      }
    });

    btnSaveNutrition.addEventListener('click', (e) => {
      e.preventDefault();

      const childId = localStorage.getItem('c3f36ae8-9844-11ee-b9d1-0242ac120002');
      const statusGiziData = document.querySelector('#statusGizi');
      const statusGiziValue = statusGiziData.textContent;

      const tinggiBadanInput = parseFloat(document.getElementById('tinggiBadan').value);
      const beratBadanInput = parseFloat(document.getElementById('beratBadan').value);

      // Date setting's //
      const tanggalCatatInput = document.getElementById('tanggalCatat');
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      tanggalCatatInput.value = formattedDate;

      this._saveNutritionData(childId, tinggiBadanInput, beratBadanInput, statusGiziValue, formattedDate);
    });
  }

  _showResultContainer(container) {
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  _hitungKebutuhanEnergi(tinggiBadan, beratBadan, jenisKelamin, usiaAnak) {
    let kebutuhanEnergi;

    if (jenisKelamin === 'laki-laki') {
      if (usiaAnak >= 0 && usiaAnak <= 3) {
        kebutuhanEnergi = (0.167 * beratBadan) + (15.174 * tinggiBadan) - 617.6;
      } else if (usiaAnak > 3 && usiaAnak <= 10) {
        kebutuhanEnergi = (19.49 * beratBadan) + (1.303 * tinggiBadan) + 414.9;
      } else if (usiaAnak > 10 && usiaAnak <= 18) {
        kebutuhanEnergi = (16.25 * beratBadan) + (1.372 * tinggiBadan) + 510.5;
      }
    } else if (jenisKelamin === 'perempuan') {
      if (usiaAnak >= 0 && usiaAnak <= 3) {
        kebutuhanEnergi = (1.618 * beratBadan) + (16.252 * tinggiBadan) - 413.5;
      } else if (usiaAnak > 3 && usiaAnak <= 10) {
        kebutuhanEnergi = (16.969 * beratBadan) + (1.618 * tinggiBadan) + 371.2;
      } else if (usiaAnak > 10 && usiaAnak <= 18) {
        kebutuhanEnergi = (8.365 * beratBadan) + (4.56 * tinggiBadan) + 20;
      }
    }

    // Display the calculated total calories
    const kebutuhanEnergiElement = document.getElementById('kebutuhanEnergi');
    kebutuhanEnergiElement.textContent = kebutuhanEnergi.toFixed(2);

    // Calculate and display the breakdown of carbohydrates, fats, and proteins
    const jumlahKarbo = (50 / 100) * kebutuhanEnergi;
    const jumlahLemak = (20 / 100) * kebutuhanEnergi;
    const jumlahProtein = (10 / 100) * kebutuhanEnergi;

    document.getElementById('jumlahKarbo').textContent = jumlahKarbo.toFixed(2);
    document.getElementById('jumlahLemak').textContent = jumlahLemak.toFixed(2);
    document.getElementById('jumlahProtein').textContent = jumlahProtein.toFixed(2);
  }

  _hitungStatusGizi(tinggiBadan, beratBadan, jenisKelamin, usiaAnakTahun) {
    const statusGiziElement = document.querySelector('#statusGizi');
    const statusDescElement = document.querySelector('#statusDesc');

    // Age Convert
    const usiaAnakBulan = usiaAnakTahun * 12;

    // Calculate the IMT
    const imtAnak = beratBadan / (tinggiBadan / 100) ** 2;

    const dataIMT = jenisKelamin === 'laki-laki' ? DataIMTBoys : DataIMTGirls;
    const dataSD = jenisKelamin === 'laki-laki' ? DataSDBoys : DataSDGirls;

    const imtMedian = dataIMT[usiaAnakBulan];
    const sdValue = dataSD[usiaAnakBulan];

    const zScore = imtAnak - imtMedian / imtMedian - sdValue;

    if (zScore < -3) {
      giziBurukContent(statusGiziElement, statusDescElement);
    } else if (zScore >= -3 && zScore < -2) {
      giziKurangContent(statusGiziElement, statusDescElement);
    } else if (zScore >= -2 && zScore <= 1) {
      giziBaikContent(statusGiziElement, statusDescElement);
    } else if (zScore > 1 && zScore <= 2) {
      beresikoGiziLebihContent(statusGiziElement, statusDescElement);
    } else if (zScore > 2 && zScore <= 3) {
      giziBerlebih(statusGiziElement, statusDescElement);
    } else if (zScore > 3) {
      obesitas(statusGiziElement, statusDescElement);
    }
  }

  async _saveNutritionData(childId, tinggiBadan, beratBadan, statusGizi, tanggalCatat) {
    const loadingIndicator = new LoadingCircle();
    try {
      loadingIndicator.show();

      const apiUrl = 'https://api-babyboost.cyclic.app/api/catatan/post';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tanggal: tanggalCatat,
          tinggibadan: tinggiBadan,
          beratbadan: beratBadan,
          statusgizi: statusGizi,
          id_anak: childId,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const popUp = new PopUpBox();
        popUp.IntializeEvent();
      } else {
        console.error('Gagal menyimpan data catatan gizi:', responseData);
        alert('Terjadi kesalahan saat menyimpan data catatan gizi.');
      }
    } catch (error) {
      console.error('Error during saveNutritionData:', error);
      alert('Terjadi kesalahan saat menyimpan data catatan gizi.');
    } finally {
      loadingIndicator.hide();
    }
  }
}

export default KalkulatorGizi;

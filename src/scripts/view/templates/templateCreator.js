const rowContent1 = () => `
      <img data-src="./images/img-content-1.png" alt="img-content-1" class="lazyload"/>
        <div class="content-text">
          <h2>Menghitung kebutuhan kalori sesuai kondisi anak</h2>
          <p>
            BabyBoost membantu kamu untuk memenuhi kebutuhan kalori anak dan
            memberikan rekomendasi bahan makanan dengan disertai informasi gizi dan memeriksa status gizi untuk memastikan bahwa si kecil berada dalam kondisi ideal. 
          </p>
          <div class="btn-cta-anchor">
            <a href="#/kalkulatorgizi" id="cta-content-1">
              Kalkulator Gizi &#8599;
            </a>
          </div>
        </div>`;

const rowContent2 = () => `
       <img data-src="./images/img-content-3.png" alt="img-content-3" class="lazyload"/>
       <div class="content-text">
         <h2>Mendokumentasikan setiap pertumbuhan anak</h2>
         <p>
            Bersama BabyBoost, kamu dapat mencatat setiap pertumbuhan berat badan, tinggi badan, dan juga status gizi anak
         </p>
         <div class="btn-cta-anchor">
            <a href="/#/catatangizi" id="cta-content-1">
             Catatan Gizi &#8599;
            </a>
         </div>
       </div>
     `;

const rowContent3 = () => `
     <img data-src="./images/img-content-4.png" alt="img-content-4" class="lazyload"/>
     <div class="content-text">
       <h2>Memberikan rekomendasi bahan makanan untuk si kecil</h2>
       <p>
          BabyBoost akan memberikan kamu rekomendasi bahan makanan untuk si kecil yang disertai informasi gizi agar kebutuhan anak terpenuhi
       </p>
       <div class="btn-cta-anchor">
            <a href="#/rekomendasibahan" id="cta-content-1">
              Rekomendasi Bahan &#8599;
            </a>
        </div>
     </div>
   `;

const giziBurukContent = (statusGizi, statusDesc) => {
  statusGizi.textContent = 'Gizi Buruk';
  statusGizi.style.color = '#FFA450';
  statusGizi.style.border = '2px solid #FFA450';
  statusGizi.style.backgroundColor = 'rgb(254, 232, 211)';

  statusDesc.textContent = `
        Merupakan kondisi serius di mana asupan makan sangat tidak sesuai dengan nutrisi yang semestinya diperlukan tubuh si kecil. 
        Anak dengan gizi buruk cenderung memiliki daya tahan tubuh yang sangat lemah sehingga berisiko terkena penyakit parah.
    `;
};

const giziKurangContent = (statusGizi, statusDesc) => {
  statusGizi.textContent = 'Gizi Kurang';
  statusGizi.style.color = '#5350FF';
  statusGizi.style.border = '2px solid #5350FF';
  statusGizi.style.backgroundColor = 'rgb(211, 210, 253)';

  statusDesc.textContent = `
        Merupakan kondisi di mana asupan makan anak kurang memadai baik dari segi kualitas maupun kuantitas, 
        akibatnya kekebalan atau sistem imunitas tubuh anak rendah dan dapat mudah menderita penyakit infeksi
    `;
};

const giziBaikContent = (statusGizi, statusDesc) => {
  statusGizi.textContent = 'Gizi Baik';
  statusGizi.style.color = '#27b1ff';
  statusGizi.style.border = '2px solid #27b1ff';
  statusGizi.style.backgroundColor = 'rgb(201, 235, 254)';

  statusDesc.textContent = `
      Status gizi baik mengindikasikan bahwa anak memiliki asupan nutrisi yang memadai dan seimbang untuk mendukung pertumbuhan, perkembangan, dan fungsi tubuh yang optimal. 
      Anak dengan gizi baik memiliki berat badan proporsional terhadap tinggi badan, fungsi organ tubuh berjalan normal, dan memiliki daya tahan tubuh yang baik terhadap penyakit.
  `;
};

const beresikoGiziLebihContent = (statusGizi, statusDesc) => {
  statusGizi.textContent = 'Berisiko Gizi Lebih';
  statusGizi.style.color = '#D7489D';
  statusGizi.style.border = '2px solid #D7489D';
  statusGizi.style.backgroundColor = 'rgb(244, 208, 229)';

  statusDesc.textContent = `
      Gizi berelebih terjadi ketika pemasukan kalori dan energi tidak seimbang dengan yang dikeluarkan. 
      Akibat dari gizi lebih adalah gangguan metabolisme, sumbatan pembuluh darah, dan diabetes.
  `;
};

const giziBerlebih = (statusGizi, statusDesc) => {
  statusGizi.textContent = 'Gizi Berlebih';
  statusGizi.style.color = '#FF5050';
  statusGizi.style.border = '2px solid #FF5050';
  statusGizi.style.backgroundColor = 'rgb(253, 210, 210)';

  statusDesc.textContent = `
      Gizi berlebih terjadi ketika seseorang mengonsumsi lebih banyak nutrisi daripada yang diperlukan oleh tubuh yang dapat menyebabkan penumpukan lemak atau masalah kesehatan terkait nutrisi serta berisiko terjadi gangguan fungsi organ tubuh.
  `;
};

const obesitas = (statusGizi, statusDesc) => {
  statusGizi.textContent = 'Obesitas';
  statusGizi.style.color = '#B456C4';
  statusGizi.style.border = '2px solid #B456C4';
  statusGizi.style.backgroundColor = 'rgb(235, 211, 239)';

  statusDesc.textContent = `
      Obesitas adalah suatu kondisi medis yang ditandai oleh akumulasi lemak tubuh berlebih, yang dapat membahayakan kesehatan dan memiliki risiko tinggi untuk masalah kesehatan seperti diabetes, tekanan darah tinggi, penyakit jantung, dan gangguan pernapasan.
  `;
};
export {
  rowContent1, rowContent2, rowContent3, giziBurukContent, giziKurangContent, giziBaikContent, beresikoGiziLebihContent, giziBerlebih, obesitas,
};

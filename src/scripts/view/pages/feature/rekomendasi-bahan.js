class RekomendasiBahanPage {
  constructor() {
    this._render();
  }

  _render() {
    document.title = 'BabyBoost - Rekomendasi Bahan';

    const rekomendasiBahanContainer = document.createElement('div');
    rekomendasiBahanContainer.className = 'rekomendasi-bahan-container';

    rekomendasiBahanContainer.innerHTML = `
    <div class="rekomendasi-bahan-header-content" style="background-image: url(./images/cek-gizi-header.png)">
      <div class="text-content">
        <h1>Rekomendasi Bahan Makanan</h1>
        <p>BabyBoost akan memberikan kamu rekomendasi bahan makanan untuk si kecil yang disertai informasi gizi agar kebutuhan anak terpenuhi
        </p>
      </div>
    </div>
    <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="rekomendasi-bahan-content-container">
        <div class="rekomendasi-bahan-content">
            <div class="rekomendasi-bahan-top">
              <div class="food-type">
                  <img src="./images/kacang.png" alt="food-type-img">
                  <h2>Karbohidrat</h2>
              </div>
              <a href="#">Lihat Semua</a>  
            </div>
            <div class="carousel-item active">
            <div class="card-container">
                <div class="card">
                  <div class="card-body">
                    <img src="./images/img-food.png" alt="img-food">
                    <div class="card-body-details">
                      <h5>Bihun</h5>
                      <h6 class="type-of-food">Karbohidrat</h6>
                      <div class="dose-detail">
                          <svg width="22" height="20" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.0874 0C21.216 0 22.13 0.915076 22.13 2.0426V4.426C22.13 6.48572 21.4916 8.49481 20.3026 10.1767C19.1137 11.8587 17.4327 13.1308 15.491 13.818V14.9378C15.491 15.3779 15.3161 15.8001 15.0049 16.1114C14.6936 16.4226 14.2714 16.5975 13.8312 16.5975H8.29875C7.85856 16.5975 7.43639 16.4226 7.12513 16.1114C6.81387 15.8001 6.639 15.3779 6.639 14.9378V13.818C4.69729 13.1308 3.01629 11.8587 1.82736 10.1767C0.638435 8.49481 2.501e-05 6.48572 0 4.426V2.0426C0 0.913969 0.915075 0 2.0426 0H20.0874Z" fill="#7C766B"/>
                          </svg>
                          <h6>1/2 gelas</h6>
                      </div>
                      <div class="weight-detail">
                          <svg width="23" height="21" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0674 5.39741C11.5207 5.39741 11.901 5.24381 12.2082 4.93661C12.5154 4.62941 12.6684 4.24968 12.6674 3.79741C12.6674 3.34408 12.5138 2.96381 12.2066 2.65661C11.8994 2.34941 11.5196 2.19635 11.0674 2.19741C10.614 2.19741 10.2338 2.35101 9.92657 2.65821C9.61937 2.96541 9.46631 3.34515 9.46737 3.79741C9.46737 4.25075 9.62097 4.63101 9.92817 4.93821C10.2354 5.24541 10.6151 5.39848 11.0674 5.39741ZM13.8034 5.39741H17.557C18.213 5.39741 18.7783 5.60755 19.253 6.02781C19.7266 6.44808 20.0092 6.98355 20.101 7.63421L22.1042 21.6662C22.2172 22.4406 22.0167 23.1233 21.5026 23.7142C20.9884 24.303 20.3303 24.5974 19.5282 24.5974H2.60657C1.80444 24.5974 1.14631 24.3025 0.632174 23.7126C0.118041 23.1227 -0.0824925 22.4401 0.0305742 21.6646L2.03377 7.63421C2.12551 6.98355 2.40817 6.44808 2.88177 6.02781C3.35751 5.60755 3.92337 5.39741 4.57937 5.39741H8.33298C8.19217 5.17128 8.07964 4.92168 7.99537 4.64861C7.91004 4.37448 7.86737 4.09075 7.86737 3.79741C7.86737 2.89501 8.17511 2.13608 8.79057 1.52061C9.40604 0.905146 10.165 0.597412 11.0674 0.597412C11.9698 0.597412 12.7287 0.905146 13.3442 1.52061C13.9596 2.13608 14.2674 2.89501 14.2674 3.79741C14.2674 4.09075 14.2252 4.37448 14.141 4.64861C14.0567 4.92168 13.9442 5.17128 13.8034 5.39741Z" fill="#7C766B"/>
                          </svg>
                          <h6>50 gram</h6>
                      </div>
                    </div>
                    <button aria-label="like this restaurant" id="likeButton" class="like">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="card">
                <div class="card-body">
                <img src="./images/img-food.png" alt="img-food">
                <div class="card-body-details">
                  <h5>Bihun</h5>
                  <h6 class="type-of-food">Karbohidrat</h6>
                  <div class="dose-detail">
                      <svg width="22" height="20" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0874 0C21.216 0 22.13 0.915076 22.13 2.0426V4.426C22.13 6.48572 21.4916 8.49481 20.3026 10.1767C19.1137 11.8587 17.4327 13.1308 15.491 13.818V14.9378C15.491 15.3779 15.3161 15.8001 15.0049 16.1114C14.6936 16.4226 14.2714 16.5975 13.8312 16.5975H8.29875C7.85856 16.5975 7.43639 16.4226 7.12513 16.1114C6.81387 15.8001 6.639 15.3779 6.639 14.9378V13.818C4.69729 13.1308 3.01629 11.8587 1.82736 10.1767C0.638435 8.49481 2.501e-05 6.48572 0 4.426V2.0426C0 0.913969 0.915075 0 2.0426 0H20.0874Z" fill="#7C766B"/>
                      </svg>
                      <h6>1/2 gelas</h6>
                  </div>
                  <div class="weight-detail">
                      <svg width="23" height="21" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0674 5.39741C11.5207 5.39741 11.901 5.24381 12.2082 4.93661C12.5154 4.62941 12.6684 4.24968 12.6674 3.79741C12.6674 3.34408 12.5138 2.96381 12.2066 2.65661C11.8994 2.34941 11.5196 2.19635 11.0674 2.19741C10.614 2.19741 10.2338 2.35101 9.92657 2.65821C9.61937 2.96541 9.46631 3.34515 9.46737 3.79741C9.46737 4.25075 9.62097 4.63101 9.92817 4.93821C10.2354 5.24541 10.6151 5.39848 11.0674 5.39741ZM13.8034 5.39741H17.557C18.213 5.39741 18.7783 5.60755 19.253 6.02781C19.7266 6.44808 20.0092 6.98355 20.101 7.63421L22.1042 21.6662C22.2172 22.4406 22.0167 23.1233 21.5026 23.7142C20.9884 24.303 20.3303 24.5974 19.5282 24.5974H2.60657C1.80444 24.5974 1.14631 24.3025 0.632174 23.7126C0.118041 23.1227 -0.0824925 22.4401 0.0305742 21.6646L2.03377 7.63421C2.12551 6.98355 2.40817 6.44808 2.88177 6.02781C3.35751 5.60755 3.92337 5.39741 4.57937 5.39741H8.33298C8.19217 5.17128 8.07964 4.92168 7.99537 4.64861C7.91004 4.37448 7.86737 4.09075 7.86737 3.79741C7.86737 2.89501 8.17511 2.13608 8.79057 1.52061C9.40604 0.905146 10.165 0.597412 11.0674 0.597412C11.9698 0.597412 12.7287 0.905146 13.3442 1.52061C13.9596 2.13608 14.2674 2.89501 14.2674 3.79741C14.2674 4.09075 14.2252 4.37448 14.141 4.64861C14.0567 4.92168 13.9442 5.17128 13.8034 5.39741Z" fill="#7C766B"/>
                      </svg>
                      <h6>50 gram</h6>
                  </div>
                </div>
                <button aria-label="like this restaurant" id="likeButton" class="like">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                </button>
              </div>
                </div>
                <div class="card">
                <div class="card-body">
                <img src="./images/img-food.png" alt="img-food">
                <div class="card-body-details">
                  <h5>Bihun</h5>
                  <h6 class="type-of-food">Karbohidrat</h6>
                  <div class="dose-detail">
                      <svg width="22" height="20" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0874 0C21.216 0 22.13 0.915076 22.13 2.0426V4.426C22.13 6.48572 21.4916 8.49481 20.3026 10.1767C19.1137 11.8587 17.4327 13.1308 15.491 13.818V14.9378C15.491 15.3779 15.3161 15.8001 15.0049 16.1114C14.6936 16.4226 14.2714 16.5975 13.8312 16.5975H8.29875C7.85856 16.5975 7.43639 16.4226 7.12513 16.1114C6.81387 15.8001 6.639 15.3779 6.639 14.9378V13.818C4.69729 13.1308 3.01629 11.8587 1.82736 10.1767C0.638435 8.49481 2.501e-05 6.48572 0 4.426V2.0426C0 0.913969 0.915075 0 2.0426 0H20.0874Z" fill="#7C766B"/>
                      </svg>
                      <h6>1/2 gelas</h6>
                  </div>
                  <div class="weight-detail">
                      <svg width="23" height="21" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0674 5.39741C11.5207 5.39741 11.901 5.24381 12.2082 4.93661C12.5154 4.62941 12.6684 4.24968 12.6674 3.79741C12.6674 3.34408 12.5138 2.96381 12.2066 2.65661C11.8994 2.34941 11.5196 2.19635 11.0674 2.19741C10.614 2.19741 10.2338 2.35101 9.92657 2.65821C9.61937 2.96541 9.46631 3.34515 9.46737 3.79741C9.46737 4.25075 9.62097 4.63101 9.92817 4.93821C10.2354 5.24541 10.6151 5.39848 11.0674 5.39741ZM13.8034 5.39741H17.557C18.213 5.39741 18.7783 5.60755 19.253 6.02781C19.7266 6.44808 20.0092 6.98355 20.101 7.63421L22.1042 21.6662C22.2172 22.4406 22.0167 23.1233 21.5026 23.7142C20.9884 24.303 20.3303 24.5974 19.5282 24.5974H2.60657C1.80444 24.5974 1.14631 24.3025 0.632174 23.7126C0.118041 23.1227 -0.0824925 22.4401 0.0305742 21.6646L2.03377 7.63421C2.12551 6.98355 2.40817 6.44808 2.88177 6.02781C3.35751 5.60755 3.92337 5.39741 4.57937 5.39741H8.33298C8.19217 5.17128 8.07964 4.92168 7.99537 4.64861C7.91004 4.37448 7.86737 4.09075 7.86737 3.79741C7.86737 2.89501 8.17511 2.13608 8.79057 1.52061C9.40604 0.905146 10.165 0.597412 11.0674 0.597412C11.9698 0.597412 12.7287 0.905146 13.3442 1.52061C13.9596 2.13608 14.2674 2.89501 14.2674 3.79741C14.2674 4.09075 14.2252 4.37448 14.141 4.64861C14.0567 4.92168 13.9442 5.17128 13.8034 5.39741Z" fill="#7C766B"/>
                      </svg>
                      <h6>50 gram</h6>
                  </div>
                </div>
                <button aria-label="like this restaurant" id="likeButton" class="like">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                </button>
              </div>
                </div>
            </div>
        </div>
        </div>
    </div>`;
    return rekomendasiBahanContainer;
  }
}

export default RekomendasiBahanPage;

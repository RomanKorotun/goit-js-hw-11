import axios from 'axios';
import Notiflix from 'notiflix';

const selectors = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.js-load-more'),
};

selectors.form.addEventListener('submit', handlerSearch);
selectors.btnLoadMore.addEventListener('click', handlerLoadMore);

let page = 1;
let hitsCounter = 0;

function handlerSearch(evt) {
  evt.preventDefault();
  selectors.container.innerHTML = '';
  selectors.btnLoadMore.classList.replace('load-more', 'load-more-hidden');
  const { searchQuery } = evt.currentTarget.elements;
  serviceSearch(searchQuery.value, page)
    .then(response => {
      const {
        data: { hits, totalHits },
      } = response;
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images"`);
      selectors.container.insertAdjacentHTML('beforeend', createMarkup(hits));
      hitsCounter += hits.length;

      if (hitsCounter < totalHits) {
        selectors.btnLoadMore.classList.replace(
          'load-more-hidden',
          'load-more'
        );
      }
    })
    .catch(error => Notiflix.Notify.failure(error.message));
}

async function serviceSearch(inputValue, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '39170580-8c73c06b0fce5ecb6f9d6ab10',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: '40',
    page: currentPage,
  });
  return await axios.get(`${BASE_URL}?${params}`);
}

// largeImageURL - посилання на велике зображення.

function handlerLoadMore() {
  page += 1;
  serviceSearchLoadMore(page)
    .then(response => {
      const {
        data: { hits, totalHits },
      } = response;
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      selectors.container.insertAdjacentHTML('beforeend', createMarkup(hits));

      hitsCounter += hits.length;

      if (hitsCounter >= totalHits) {
        selectors.btnLoadMore.classList.replace(
          'load-more',
          'load-more-hidden'
        );
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => Notiflix.Notify.failure(error.message));
}

async function serviceSearchLoadMore(currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '39170580-8c73c06b0fce5ecb6f9d6ab10',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: '40',
    page: currentPage,
  });
  return await axios.get(`${BASE_URL}?${params}`);
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="340" height="230"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
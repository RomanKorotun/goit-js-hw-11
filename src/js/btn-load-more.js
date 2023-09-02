import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './fn-createmarkup';
import { serviceSearch } from './fn-request-api';

const gallery = new SimpleLightbox('.gallery a');

const selectors = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form-input'),
  container: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.js-load-more'),
};

let page = 1;
let hitsCounter = 0;

selectors.form.addEventListener('submit', handlerSearch);
selectors.btnLoadMore.addEventListener('click', handlerLoadMore);

function handlerSearch(evt) {
  evt.preventDefault();
  selectors.container.innerHTML = '';
  selectors.btnLoadMore.classList.replace('load-more', 'load-more-hidden');

  if (selectors.input.value.trim() === '') {
    Notiflix.Notify.info('Please enter the details of your request');
    return;
  }

  page = 1;

  //
  serviceSearch(selectors.input.value, page)
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

      gallery.refresh();
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

function handlerLoadMore() {
  page += 1;
  serviceSearch(selectors.input.value, page)
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

      const { height: cardHeight } =
        selectors.container.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 1.6,
        behavior: 'smooth',
      });

      gallery.refresh();
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

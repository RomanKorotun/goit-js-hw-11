import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './fn-createmarkup';
import { serviceSearch, serviceSearchLoadMore } from './fn-request-api';

const gallery = new SimpleLightbox('.gallery a');

const selectors = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  guard: document.querySelector('.guard'),
};

let page = 1;
let hitsCounter = 0;

const options = {
  root: null,
  rootMargin: '300px',
};
const observer = new IntersectionObserver(handlerLoadMore, options);

selectors.form.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
  evt.preventDefault();
  selectors.container.innerHTML = '';
  const { searchQuery } = evt.currentTarget.elements;

  if (searchQuery.value.trim() === '') {
    Notiflix.Notify.info('Please enter the details of your request');
    return;
  }

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

      gallery.refresh();
      hitsCounter += hits.length;

      if (hitsCounter < totalHits) {
        observer.observe(selectors.guard);
      }
    })
    .catch(error => Notiflix.Notify.failure(error.message));
}

// function handlerLoadMore() {
//   page += 1;
//   serviceSearchLoadMore(page)
//     .then(response => {
//       const {
//         data: { hits, totalHits },
//       } = response;

//       selectors.container.insertAdjacentHTML('beforeend', createMarkup(hits));

//       gallery.refresh();
//       hitsCounter += hits.length;

//       if (hitsCounter >= totalHits) {
//         observer.unobserve(selectors.guard);
//         Notiflix.Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     })
//     .catch(error => Notiflix.Notify.failure(error.message));
// }

function handlerLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      serviceSearchLoadMore(page)
        .then(response => {
          const {
            data: { hits, totalHits },
          } = response;
          selectors.container.insertAdjacentHTML(
            'beforeend',
            createMarkup(hits)
          );
          gallery.refresh();
          hitsCounter += hits.length;
          if (hitsCounter >= totalHits) {
            observer.unobserve(selectors.guard);
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(error => Notiflix.Notify.failure(error.message));
    }
  });
}

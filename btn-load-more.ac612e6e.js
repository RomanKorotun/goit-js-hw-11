!function(){function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=r.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){o[e]=r},r.parcelRequired7c6=n);var a=n("6JpON");n("5IjG7");var i=n("4AS3O"),l=n("bu6fV"),c=new SimpleLightbox(".gallery a"),u={form:document.querySelector(".search-form"),input:document.querySelector(".search-form-input"),container:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".js-load-more")},s=1,d=0;u.form.addEventListener("submit",(function(r){if(r.preventDefault(),u.container.innerHTML="",u.btnLoadMore.classList.replace("load-more","load-more-hidden"),""===u.input.value.trim())return void e(a).Notify.info("Please enter the details of your request");s=1,(0,l.serviceSearch)(u.input.value,s).then((function(r){var t=r.data,o=t.hits,n=t.totalHits;0!==o.length?(e(a).Notify.success("Hooray! We found ".concat(n,' images"')),u.container.insertAdjacentHTML("beforeend",(0,i.createMarkup)(o)),c.refresh(),(d+=o.length)<n&&u.btnLoadMore.classList.replace("load-more-hidden","load-more")):e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again.")})).catch((function(r){return e(a).Notify.failure(r.message)}))})),u.btnLoadMore.addEventListener("click",(function(){s+=1,(0,l.serviceSearch)(u.input.value,s).then((function(r){var t=r.data,o=t.hits,n=t.totalHits;if(0!==o.length){u.container.insertAdjacentHTML("beforeend",(0,i.createMarkup)(o));var l=u.container.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:1.6*l,behavior:"smooth"}),c.refresh(),(d+=o.length)>=n&&(u.btnLoadMore.classList.replace("load-more","load-more-hidden"),e(a).Notify.info("We're sorry, but you've reached the end of search results."))}else e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again.")})).catch((function(r){return e(a).Notify.failure(r.message)}))}))}();
//# sourceMappingURL=btn-load-more.ac612e6e.js.map
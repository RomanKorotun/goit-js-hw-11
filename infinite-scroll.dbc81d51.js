!function(){function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=r.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){n[e]=r},r.parcelRequired7c6=o);var a=o("6JpON");o("5IjG7");var i=o("4AS3O"),u=o("bu6fV"),c=new SimpleLightbox(".gallery a"),f={form:document.querySelector(".search-form"),input:document.querySelector(".search-form-input"),container:document.querySelector(".gallery"),guard:document.querySelector(".guard")},s=1,l=0,d=new IntersectionObserver((function(r){r.forEach((function(r){r.isIntersecting&&(s+=1,(0,u.serviceSearch)(f.input.value,s).then((function(r){var t=r.data,n=t.hits,o=t.totalHits;f.container.insertAdjacentHTML("beforeend",(0,i.createMarkup)(n)),c.refresh(),(l+=n.length)>=o&&(d.unobserve(f.guard),e(a).Notify.info("We're sorry, but you've reached the end of search results."))})).catch((function(r){return e(a).Notify.failure(r.message)})))}))}),{root:null,rootMargin:"300px"});f.form.addEventListener("submit",(function(r){if(r.preventDefault(),f.container.innerHTML="",d.unobserve(f.guard),""===f.input.value.trim())return void e(a).Notify.info("Please enter the details of your request");s=1,(0,u.serviceSearch)(f.input.value,s).then((function(r){var t=r.data,n=t.hits,o=t.totalHits;0!==n.length?(e(a).Notify.success("Hooray! We found ".concat(o,' images"')),f.container.insertAdjacentHTML("beforeend",(0,i.createMarkup)(n)),c.refresh(),(l+=n.length)<o&&d.observe(f.guard)):e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again.")})).catch((function(r){return e(a).Notify.failure(r.message)}))}))}();
//# sourceMappingURL=infinite-scroll.dbc81d51.js.map
import galleryItems from './data/gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const lightbox = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

const makeAnImageGallery = galleryItems
  .map(
    ({ preview, original, description }) => `
<li class = "gallery__item"><a class="gallery__link" href="${original}"> <image class = "gallery__image" src = "${preview}" data-source="${original}" alt = "${description}"></a></li>`,
  )
  .join('');

galleryListEl.insertAdjacentHTML('beforeend', makeAnImageGallery);

galleryListEl.addEventListener('click', onGalleriesImageClick);

closeModalBtn.addEventListener('click', onCloseModalbtn);

function onGalleriesImageClick(evt) {
  if (!evt.target.classList.contains('.gallery__image')) {
    return;
  }

  const selectedEl = evt.target;
  const parentCard = selectedEl.closest('.js-gallery');

  document.lightbox.classList.add('is-open');
}

function onCloseModalbtn(evt) {
  document.lightbox.classList.remove('is-open');
}

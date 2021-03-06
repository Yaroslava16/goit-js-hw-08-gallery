import galleryItems from './data/gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const lightbox = document.querySelector('.js-lightbox');

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

const modalImg = document.querySelector('.js-lightbox .lightbox__image');

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
  evt.preventDefault();

  const selectedEl = evt.target;
  const selectedElData = selectedEl.dataset.source;

  if (selectedEl) {
    lightbox.classList.add('is-open');
    modalImg.src = selectedElData;
    modalImg.alt = selectedEl.alt;
  }

  if (!selectedEl.classList.contains('.gallery__image')) {
    return;
  }
}

function onCloseModalbtn(evt) {
  lightbox.classList.remove('is-open');
}

import galleryItems from './data/gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const lightbox = document.querySelector('.js-lightbox');

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

const modalImg = document.querySelector('.js-lightbox .lightbox__image');

const overleyModal = document.querySelector('.lightbox__overlay');

const makeAnImageGallery = galleryItems
  .map(
    ({ preview, original, description }, index) => `
<li class = "gallery__item"><a class="gallery__link" href="${original}"> <image class = "gallery__image" src = "${preview}" data-source="${original}" alt = "${description}" data-index="${index}"></a></li>`,
  )
  .join('');

galleryListEl.insertAdjacentHTML('beforeend', makeAnImageGallery);

galleryListEl.addEventListener('click', onGalleriesImageClick);

closeModalBtn.addEventListener('click', onCloseModal);

overleyModal.addEventListener('click', onCloseModal);

function onGalleriesImageClick(e) {
  // if (!selectedEl.classList.contains('.gallery__image')) {
  //   return;
  // }
  e.preventDefault();
  const selectedEl = e.target;
  let selectedElData = selectedEl.dataset.source;

  lightbox.classList.add('is-open');
  modalImg.src = selectedElData;
  modalImg.alt = selectedEl.alt;

  modalImg.dataset.index = selectedEl.dataset.index;
}

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    onCloseModal();
  }

  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }

  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

function onCloseModal(e) {
  lightbox.classList.remove('is-open');
  modalImg.src = '';
}

function setNewSrc(step, index) {
  modalImg.dataset.index = `${index + step}`;
  modalImg.src = galleryItems[index + step].original;
}

function onArrowLeft(e) {
  let index = Number(modalImg.dataset.index);
  if (index === 0) {
    setNewSrc(0, galleryItems.length - 1);
    return;
  }
  setNewSrc(-1, index);
}

function onArrowRight(e) {
  let index = Number(modalImg.dataset.index);
  if (index === galleryItems.length - 1) {
    setNewSrc(0, 0);
    return;
  }
  setNewSrc(1, index);
}

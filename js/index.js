import galleryItems from './data/gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const lightbox = document.querySelector('.js-lightbox');

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

const modalImg = document.querySelector('.js-lightbox .lightbox__image');

const overleyModal = document.querySelector('.lightbox__overlay');

const makeAnImageGallery = galleryItems
  .map(
    ({ preview, original, description }) => `
<li class = "gallery__item"><a class="gallery__link" href="${original}"> <image class = "gallery__image" src = "${preview}" data-source="${original}" alt = "${description}"></a></li>`,
  )
  .join('');

galleryListEl.insertAdjacentHTML('beforeend', makeAnImageGallery);

galleryListEl.addEventListener('click', onGalleriesImageClick);

closeModalBtn.addEventListener('click', onCloseModal);

overleyModal.addEventListener('click', onCloseModal);

function onGalleriesImageClick(evt) {
  evt.preventDefault();
  modalImg.setAttribute('data-index');

  const selectedEl = evt.target;
  const selectedElData = selectedEl.dataset.source;

  if (selectedEl) {
    window.addEventListener('keydown', onEscKeyPress);

    window.addEventListener('keydown', e => {
      if (e.code === 'ArrowLeft') {
        onArrowLeft();
      }

      if (e.code === 'ArrowRight') {
        onArrowRight();
      }
    });

    window.addEventListener('keydown', onArrowRight);

    lightbox.classList.add('is-open');
    modalImg.src = selectedElData;
    modalImg.alt = selectedEl.alt;
  }

  if (!selectedEl.classList.contains('.gallery__image')) {
    return;
  }
}

function onCloseModal(evt) {
  lightbox.classList.remove('is-open');
  modalImg.src = '';
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}
function setNewSrc(step, index) {
  modalImg.dataset.index = `${index + step}`;
  modalImg.src = galleryItems[index + step].original;
}

function onArrowLeft(evt) {
  let index = Number(modalImg.dataset.index);
  if (index === 0) {
    setNewSrc(0, galleryItems.length - 1);
    return;
  }
  setNewSrc(-1, index);
}

function onArrowRight(evt) {
  let index = Number(modalImg.dataset.index);
  if (index === galleryItems.length - 1) {
    setNewSrc(0, 0);
    return;
  }
  console.log(index);
  setNewSrc(1, index);
}

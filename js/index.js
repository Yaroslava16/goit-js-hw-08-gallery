import galleryItems from './data/gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const makeAnImageGallery = galleryItems
  .map(
    ({ preview, description }) => `
  <li>
    <img src = "${preview}" alt = "${description}">
  </li>`,
  )
  .join('');

galleryListEl.insertAdjacentHTML('afterend', makeAnImageGallery);

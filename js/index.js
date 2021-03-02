import galleryItems from './data/gallery-items';

const galleryListEl = document.querySelector('js-gallery');

const makesImageMarkup = ({ preview, description }) => {
  return `
  <li>
    <img src = "${preview}" alt = "${description}">
  </li>`;
};

const makeAnImageGallery = galleryItems.map(makesImageMarkup).join('');
galleryListEl.insertAdjacentHTML('afterend', makeAnImageGallery);

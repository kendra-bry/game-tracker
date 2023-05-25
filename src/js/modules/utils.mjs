import PlayedModal from './PlayedModal.mjs';
import Search from './Search.mjs';

export const renderListWithTemplate = (
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) => {
  const html = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = '';
  }
  if (html && parentElement) {
    parentElement.insertAdjacentHTML(position, html.join(''));
  }
};

export const renderWithTemplate = (
  template,
  parent,
  callback,
  data,
  position = 'afterbegin'
) => {
  parent.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
};

export const loadTemplate = async (path) => {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
};

export const loadHeaderFooter = async () => {
  const headerTemplate = await loadTemplate('../../partials/header.html');
  const headerHtml = document.querySelector('#main-header');
  renderWithTemplate(headerTemplate, headerHtml, initializeHeader);

  const footerTemplate = await loadTemplate('../../partials/footer.html');
  const footerHtml = document.querySelector('#main-footer');
  renderWithTemplate(footerTemplate, footerHtml);
};

export const loadModal = async () => await new PlayedModal().render();

export const getParams = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

export const getStarRating = (rating) => {
  let stars = '';

  const parts = rating.toString().split('.');
  const wholeStars = parseInt(parts[0]);
  const partialStars = parseInt(parts[1]);
  let emptyStars = 5 - wholeStars;

  for (let i = 0; i < wholeStars; i++) {
    stars += '<i class="bi bi-star-fill mx-sm-1"></i>';
  }

  if (parts.length > 1) {
    if (partialStars >= 50) {
      emptyStars--;
      stars += `<i class="bi bi-star-half mx-sm-1"></i>`;
    }
  }

  if (wholeStars < 5) {
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="bi bi-star mx-sm-1"></i>';
    }
  }

  return stars;
};

export const formDataToJSON = (formElement) => {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => (convertedJSON[key] = value));

  return convertedJSON;
};

export const getUserEntry = (gameId) => {
  let userEntries = JSON.parse(localStorage.getItem('user-entries'));
  let userEntry;
  if (userEntries) {
    userEntry = userEntries.find((entry) => entry.game_id == gameId);
  }
  return userEntry;
};

const initializeHeader = () => {
  new Search().init();
  setActivePage();
};

const setActivePage = () => {
  const page = window.location.pathname.split('/')[1];
  if (page.length) {
    if (page == 'search') {
      const query = JSON.parse(localStorage.getItem('search-query'));
      const searchBox = document.querySelector('#search-box');
      searchBox.value = query.query;
    }

    let link = document.querySelector(`#${page}`);
    link?.classList.add('active');
    link?.setAttribute('aria-current', 'page');

    let home = document.querySelector('#home');
    home.classList.remove('active');
    home.removeAttribute('aria-current');
  }
};

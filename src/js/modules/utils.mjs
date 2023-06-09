import PlayedModal from './PlayedModal.mjs';
import GameDetails from './GameDetails.mjs';
import DataSource from './DataSource.mjs';
import Search from './Search.mjs';

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

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

export const getUserPlayData = (gameId) => {
  let userPlayData = getLocalStorage('user-play-data');
  let data;
  if (userPlayData) {
    data = userPlayData.find((entry) => entry.game_id == gameId);
  }
  return data;
};

const initializeHeader = () => {
  new Search().init();
  setActivePage();
};

const setActivePage = () => {
  const page = window.location.pathname.split('/')[1];
  if (page.length) {
    if (page == 'search') {
      const query = getLocalStorage('search-query');
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

export const addToBacklog = async (gameId) => {
  let id = getParams('id');
  let backlog = getLocalStorage('user-backlog');

  let addToBacklogBtn = document.querySelector(`#add-backlog-${gameId}`);
  addToBacklogBtn?.classList.add('d-none');

  let loadingBtn = document.querySelector(`#loading-btn-${gameId}`);
  loadingBtn?.classList.remove('d-none');

  let game = id
    ? getLocalStorage('game-details')
    : await new DataSource().getGameDetails(gameId);

  if (!backlog) {
    backlog = [];
    backlog.push(game);
  } else {
    let index = backlog.findIndex((game) => game.id == gameId);
    if (index == -1) {
      backlog.push(game);
    }
  }

  setLocalStorage('user-backlog', backlog);

  if (id) {
    new GameDetails(gameId).update();
  } else {
    window.location.reload();
  }
};

export const removeFromBacklog = (gameId) => {
  let backlog = getLocalStorage('user-backlog');

  if (!backlog) {
    return;
  } else {
    let index = backlog.findIndex((game) => game.id == gameId);

    if (index > -1) {
      backlog.splice(index, 1);
    }
  }

  setLocalStorage('user-backlog', backlog);

  if (getParams('id')) {
    new GameDetails(gameId).update();
  } else {
    window.location.reload();
  }
};

export const addBacklogBtn = (gameId, page) => {
  const addBtn = `<button
      id="add-backlog-${gameId}"
      data-gameId="${gameId}"
      class="btn ${page ? 'btn-secondary' : 'btn-light'} w-100 addToBacklog"
    >
    <i class="bi bi-plus-square me-1"></i>
    Add to Backlog
  </button>`;

  const removeBtn = `<button
      id="remove-backlog-${gameId}"
      data-gameId="${gameId}"
      class="btn w-100 removeFromBacklog ${
        page ? 'btn-secondary' : 'btn-light'
      }"
    >
    <i class="bi bi-dash-square me-1"></i>
    Remove from Backlog
  </button>`;

  let backlog = getLocalStorage('user-backlog');
  if (!backlog) {
    backlog = [];
  }
  let index = backlog.findIndex((game) => game.id == gameId);

  return index == -1 ? addBtn : removeBtn;
};

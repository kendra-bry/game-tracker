import { interactiveStars, submitMarkAsPlayed } from './StarRater.mjs';

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

export function renderWithTemplate(
  template,
  parent,
  callback,
  data,
  position = 'afterbegin'
) {
  parent.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
}

export const smallGameCardTemplate = (game) => {
  return `
  <div class="col">
    <div class="card shadow h-100">
      <img
        src="${game.background_image}"
        class="card-img-top"
        alt="${game.name}"
        height="300"
      >
      <div class="card-body">
        <h5 class="card-title">${game.name}</h5>
        <div class="fw-semibold mb-1 border-bottom pb-1">
          Release Date: ${game.released}
        </div>
        <div class="star-container">
          <span class="fw-semibold">My Rating:</span>
          <div class="ms-2 d-flex align-items-center">
           ${getStarRating(game.rating)}
          </div>
        </div>
        <div class="fw-semibold mb-1">Finished: ${game.released}</div>
        <div class="row gx-2 mt-4">
          <div class="col-12 mb-2">
            <a href="/details/index.html?id=${
              game.id
            }" class="btn btn-outline-primary w-100">View Details</a>
          </div>
          <div class="col-12">
            <a href="#" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#playedModal">Mark As Played</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

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

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../../partials/header.html');
  const headerHtml = document.querySelector('#main-header');
  renderWithTemplate(headerTemplate, headerHtml);

  const footerTemplate = await loadTemplate('../../partials/footer.html');
  const footerHtml = document.querySelector('#main-footer');
  renderWithTemplate(footerTemplate, footerHtml);
}

export async function loadModal() {
  const modalTemplate = await loadTemplate('../../partials/playedModal.html');
  const main = document.querySelector('.main');
  renderWithTemplate(modalTemplate, main, interactiveStars);
  submitMarkAsPlayed();
}

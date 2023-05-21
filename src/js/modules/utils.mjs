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

export const smallGameCardTemplate = (game) => {
  return `
  <div class="col">
    <div class="card shadow h-100">
      <img src="${game.background_image}" class="card-img-top" alt="${game.name}" height="300">
      <div class="card-body">
        <h5 class="card-title">${game.name}</h5>
        <div class="fw-semibold mb-1 border-bottom pb-1">Release Date: ${game.released}</div>
        <div class="star-container">
          <span class="fw-semibold">My Rating:</span>
          <div class="ms-2">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-half"></i>
            <i class="bi bi-star"></i>
          </div>
        </div>
        <div class="fw-semibold mb-1">Finished: ${game.released}</div>
        <div class="row gx-2 mt-4">
          <div class="col-12 mb-2">
            <a href="/details/index.html?id=${game.id}" class="btn btn-outline-primary w-100">View Details</a>
          </div>
          <div class="col-12">
            <a href="#" class="btn btn-primary w-100">Mark As Played</a>
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
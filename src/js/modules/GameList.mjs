import {
  getStarRating,
  renderListWithTemplate,
  getUserEntry,
} from './utils.mjs';

export default class GameList {
  constructor(dataSource, query) {
    this.dataSource = dataSource;
    this.query = query;
  }

  async librarySearch() {
    const results = await this.dataSource.search(this.query);
    localStorage.setItem('search-results', JSON.stringify(results));
  }

  render(games, container) {
    loadSearchResults(games, container);
  }
}

const loadSearchResults = (games, container) => {
  if (games) {
    renderListWithTemplate(smallGameCardTemplate, container, games);
  }
};

const smallGameCardTemplate = (game) => {
  const userEntry = getUserEntry(game.id);

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
        <h5 class="card-title fs-4">${game.name}</h5>
        <div class="fw-semibold mb-1 row">
          <div class="col-5">
            Release Date:
          </div>
          <div class="col">
            ${game.released ?? 'No data'}
          </div>
        </div>
        <div class="fw-semibold mb-1 row">
          <div class="col-5">
            Global Rating:
          </div>
          <div class="col ps-2 text-warning">
            ${getStarRating(game.rating)}
          </div>
        </div>
        ${setUserData(userEntry)}
      </div>
      <div class="card-footer py-3">
        <div class="row gx-2">
          <div class="col-12 mb-2">
            <a
              href="/details/index.html?id=${game.id}"
              class="btn btn-outline-primary w-100"
            >View Details</a>
          </div>
          <div class="col-12">
            <a
              href="#"
              class="btn btn-primary w-100"
              data-bs-toggle="modal"
              data-bs-target="#playedModal"
              data-bs-gameId="${game.id}"
              data-bs-gameName="${game.name}"
              data-bs-title="${userEntry ? 'Edit Play Data' : 'Mark As Played'}"
            >${userEntry ? 'Edit Play Data' : 'Mark As Played'}</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

const setUserData = (userEntry) => {
  if (userEntry) {
    return `
    <div class="border-top pt-2 mt-2">
      <div class="d-flex justify-content-center mt-1">
        <h5 class="fw-bold bg-success text-light py-1 rounded w-50 text-center">
          <i class="bi bi-check2-square"></i>
          Played
        </h5>
      </div>
      <div class="fw-semibold mb-1 row">
        <div class="col-5">
          My Rating:
        </div>
        <div class="col pt-1 text-info">
          ${getStarRating(userEntry.rating)}
        </div>
      </div>
      <div class="fw-semibold mb-1 row">
        <div class="col-5">
          Finished:
        </div>
        <div class="col">
          ${userEntry.end_date}
        </div>
      </div>
    </div>
    `;
  }
  return '';
};

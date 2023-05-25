import {
  getStarRating,
  renderListWithTemplate,
  getUserEntry,
} from './utils.mjs';

export default class GameListing {
  constructor(dataSource, query) {
    this.dataSource = dataSource;
    this.query = query;
  }

  async librarySearch() {
    const results = await this.dataSource.search(this.query);
    localStorage.setItem('search-results', JSON.stringify(results));
  }

  render() {
    loadSearchResults();
  }
}

const loadSearchResults = () => {
  const games = JSON.parse(localStorage.getItem('search-results')).results;

  if (games) {
    renderListWithTemplate(
      smallGameCardTemplate,
      document.querySelector('#card-holder'),
      games
    );
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
        <h5 class="card-title">${game.name}</h5>
        <div class="fw-semibold mb-1">
          Release Date: ${game.released}
        </div>
        ${setUserData(userEntry)}
      </div>
      <div class="card-footer">
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
      <div class="d-flex justify-content-center">
        <h5 class="fw-bold bg-success text-light p-2 rounded w-50 text-center">
          <i class="bi bi-check2-square"></i>
          Played
        </h5>
      </div>
      <div class="star-container">
        <span class="fw-semibold">My Rating:</span>
        <div class="ms-1 d-flex align-items-center">
          ${getStarRating(userEntry.rating)}
        </div>
      </div>
      <div class="fw-semibold mb-1">Finished: ${userEntry.end_date}</div>
    </div>
    `;
  }
  return '';
};

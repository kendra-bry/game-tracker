import {
  getStarRating,
  addToBacklog,
  getUserPlayData,
  removeFromBacklog,
  addBacklogBtn,
  getLocalStorage,
  setLocalStorage,
} from './utils.mjs';

export default class GameDetails {
  constructor(gameId, dataSource) {
    this.gameId = gameId;
    this.dataSource = dataSource;
    this.userEntries = null;
  }

  async init() {
    this.game = await this.dataSource.getGameDetails(this.gameId);
    setLocalStorage('game-details', this.game)

    this.userEntries = getUserPlayData(this.game.id);
    this.render();
  }

  update() {
    this.game = getLocalStorage('game-details');
    this.userEntries = getUserPlayData(this.game.id);
    this.render();
  }

  render() {
    document.querySelector('#loading-game').classList.add('d-none');
    document.querySelector('#game-details').innerHTML = detailsTemplate(
      this.game,
      this.userEntries
    );
    document
      .querySelector('.addToBacklog')
      ?.addEventListener('click', () => addToBacklog(this.game.id));
    document
      .querySelector('.removeFromBacklog')
      ?.addEventListener('click', () => removeFromBacklog(this.game.id));
  }
}

const detailsTemplate = (game, userEntries) => {
  return `<div class="border rounded p-3 shadow bg-light">
    <div class="row">
    <h1 class="col-md-7">${game.name}</h1>
      <div class="col-md-5 d-md-flex justify-content-end align-items-center">
        <div>
          <div class="rating-stars text-warning">
            ${getStarRating(game.rating)}
          </div>
          <div class="ms-1 ms-md-5 global-rating">Global Rating</div>
        </div>
      </div>
    </div>

    <div class="row my-4 row-cols-1 row-cols-lg-2">
      <div class="col-lg-8 mb-3 order-last order-lg-first">
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col">
            <div class="row">
              <label class="col text-uppercase fw-bold fs-6" for="">Metacritic:</label>
              <span class="col">${game.metacritic ?? 'No data'}</span>
            </div>
            <div class="row">
              <label class="col text-uppercase fw-bold fs-6" for="">Released:</label>
              <span class="col">${game.released}</span>
            </div>
            <div class="row">
              <label class="col text-uppercase fw-bold fs-6" for="">Genres:</label>
              <span class="col">${getGenres(game.genres)}</span>
            </div>
          </div>

          ${addUserDetails(userEntries)}

        </div>
        <hr class="border-3">
        <div>
          <h5 class="text-uppercase">Description</h5>
          ${getDescription(game.description_raw)}
        </div>
        <hr class="border-3">
        ${getComments(userEntries)}
      </div>
      <div class="col-lg-4 mb-3 order-first order-lg-last">
        <img
          src="${game.background_image}"
          alt="${game.name} image"
          class="img-fluid rounded"
        >
      </div>
    </div>

    <div class="row mb-1 d-flex justify-content-end">
      <div class="col-lg-4">
       ${addBacklogBtn(game.id, 'details')}
        <button
          class="btn btn-primary d-flex align-items-center d-none"
          type="button"
          id="loading-btn-${game.id}"
          disabled
        >
          <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Updating...
        </button>
      </div>
    </div>
    <div class="row mb-1 d-flex justify-content-end">
      <div class="col-lg-4">
        <button
          id="mark-played-btn"
          type="button"
          class="btn ${userEntries ? 'btn-warning' : 'btn-primary'} w-100"
          data-bs-toggle="modal"
          data-bs-target="#playedModal"
          data-bs-gameId="${game.id}"
          data-bs-gameName="${game.name}"
          data-bs-title="${userEntries ? 'Edit Play Data' : 'Mark As Played'}"
        >${userEntries ? 'Edit Play Data' : 'Mark As Played'}</button>
      </div>
    </div>

  </div>`;
};

const addUserDetails = (userEntries) => {
  if (userEntries) {
    return `<div class="col">
      <div class="row">
        <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">Started On:</label>
        <span class="col">${userEntries.start_date}</span>
      </div>
      <div class="row">
        <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">Finished On:</label>
        <span class="col">${userEntries.end_date}</span>
      </div>
      <div class="row">
        <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">My Rating:</label>
        <span class="col ps-md-2 text-primary">
            ${getStarRating(userEntries.rating)}
        </span>
      </div>
    </div>`;
  }
  return '';
};

const getDescription = (description) => {
  let desc = description;

  if (desc.includes('Español')) {
    desc = desc.split('Español')[0];
  }

  desc = desc.split('\n').filter((line) => line.length);

  const descHTML = desc.map((line) => `<p>${line}</p>`);
  return descHTML.join('');
};

const getGenres = (genres) => genres.map((genre) => genre.name).join(', ');

const getComments = (userEntries) => {
  if (userEntries?.comments) {
    return `<div>
      <h5 class="text-uppercase">Comments</h5>
      <p>${userEntries.comments}</p>
    </div>`;
  }
  return '';
};

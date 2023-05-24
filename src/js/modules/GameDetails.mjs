import { getStarRating } from './utils.mjs';

export default class GameDetails {
  constructor(gameId, dataSource) {
    this.gameId = gameId;
    this.dataSource = dataSource;
    this.userGameData = null;
  }

  async init() {
    this.game = await this.dataSource.getGameDetails(this.gameId);
    localStorage.setItem('game-details', JSON.stringify(this.game));

    this.setUserDetails();
    this.render();
  }

  update() {
    this.game = JSON.parse(localStorage.getItem('game-details'));
    this.setUserDetails();
    this.render();
  }

  render() {
    document.querySelector('#game-details').innerHTML = detailsTemplate(
      this.game,
      this.userGameData
    );
  }

  setUserDetails() {
    let userLibrary = JSON.parse(localStorage.getItem('user-library'));
    if (userLibrary) {
      let userEntry = userLibrary.find(
        (entry) => entry.game_id == this.game.id
      );
      if (userEntry) {
        this.userGameData = userEntry;
      }
    }
  }
}

const detailsTemplate = (game, userGameData) => {
  return `<div class="border rounded p-3 shadow bg-light">
    <div class="row">
      <h1 class="col-md-8">${game.name}</h1>
      <div class="col-md-4 rating-stars d-md-flex justify-content-end text-warning align-items-center">
          ${getStarRating(game.rating)}
      </div>
    </div>

    <div class="row my-4 row-cols-1 row-cols-lg-2">
      <div class="col-lg-8 mb-3 order-last order-lg-first">
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col">
            <div class="row">
              <label class="col text-uppercase fw-bold fs-6" for="">Metacritic:</label>
              <span class="col">${game.metacritic ?? ''}</span>
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

          ${addUserDetails(userGameData)}

        </div>
        <hr class="border-3">
        <div>
          <h5 class="text-uppercase">Description</h5>
          ${getDescription(game.description_raw)}
        </div>
        <hr class="border-3">
        ${getComments(userGameData)}
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
        <button
          id="mark-played-btn"
          type="button"
          class="btn btn-primary w-100"
          data-bs-toggle="modal"
          data-bs-target="#playedModal"
          data-bs-gameId="${game.id}"
          data-bs-gameName="${game.name}"
          data-bs-title="${userGameData ? 'Edit Play Data' : 'Mark As Played'}"
        >${userGameData ? 'Edit Play Data' : 'Mark As Played'}</button>
      </div>
    </div>

  </div>`;
};

const addUserDetails = (userGameData) => {
  if (userGameData) {
    return `<div class="col">
        <div class="row">
          <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">Started On:</label>
          <span class="col">${userGameData.start_date}</span>
        </div>
        <div class="row">
          <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">Finished On:</label>
          <span class="col">${userGameData.end_date}</span>
        </div>
        <div class="row">
          <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">My Rating:</label>
          <span class="col">
            <div>
              ${getStarRating(userGameData.rating)}
            </div>
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

const getGenres = (genres) => {
  return genres.map((genre) => genre.name).join(', ');
};

const getComments = (userGameData) => {
  if (userGameData?.comments) {
    return `<div>
      <h5 class="text-uppercase">Comments</h5>
      <p>${userGameData.comments}</p>
    </div>`;
  }
  return '';
};

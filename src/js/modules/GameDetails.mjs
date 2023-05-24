import { getStarRating } from './utils.mjs';

export default class GameDetails {
  constructor(gameId, dataSource) {
    this.gameId = gameId;
    this.dataSource = dataSource;
  }

  async init() {
    this.game = await this.dataSource.getGameDetails(this.gameId);
    console.log({ game: this.game });
    this.render();
  }

  render() {
    document.querySelector('#game-details').innerHTML = detailsTemplate(
      this.game
    );
  }
}

const detailsTemplate = (game) => {
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
              <span class="col">${game.metacritic}</span>
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

          ${addUserDetails()}

        </div>
        <hr class="border-3">
        <div>
          <h5 class="text-uppercase">Description</h5>
          ${getDescription(game.description_raw)}
        </div>
        <hr class="border-3">
        <div>
          <h5 class="text-uppercase">Comments</h5>
          <p>Every single time you click your mouse while holding a gun, you expect bullets to fly and enemies to fall. But here you will try out the FPS game filled with environmental puzzles and engaging story. </p>
        </div>
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
        >Mark As Played</button>
      </div>
    </div>

  </div>`;
};

const addUserDetails = () => {
  return `<div class="col">
    <div class="row">
      <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">Started On:</label>
      <span class="col">2007-10-09</span>
    </div>
    <div class="row">
      <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">Finished On:</label>
      <span class="col">2007-10-09</span>
    </div>
    <div class="row">
      <label class="col-6 col-xl-5 text-uppercase fw-bold fs-6" for="">My Rating:</label>
      <span class="col">
        <div>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
          <i class="bi bi-star"></i>
        </div>
      </span>
    </div>
  </div>`;
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

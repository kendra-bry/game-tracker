import {
  formDataToJSON,
  getParams,
  renderWithTemplate,
  loadTemplate,
  getUserPlayData,
  getLocalStorage,
  setLocalStorage,
} from './utils.mjs';
import GameDetails from './GameDetails.mjs';

export default class PlayedModal {
  constructor() {}

  init() {
    interactiveStars();
    handleSubmit();
    handleShowHide();
  }

  async render() {
    const modalTemplate = await loadTemplate('../../partials/playedModal.html');
    const main = document.getElementsByTagName('main')[0];
    renderWithTemplate(modalTemplate, main, this.init, null, 'beforebegin');
  }
}

const handleSubmit = () => {
  document
    .querySelector('#mark-as-played-submit')
    .addEventListener('click', () => {
      const form = document.querySelector('#mark-as-played');
      let jsonFormData = formDataToJSON(form);
      let filledStars = document.querySelectorAll('.selected-star');
      jsonFormData.rating = filledStars.length;
      updateUserEntries(jsonFormData);
      updateUserLibrary(jsonFormData.game_id);

      if (getParams('id')) {
        new GameDetails(jsonFormData.game_id).update();
      } else {
        window.location.reload();
      }

      bootstrap.Modal.getInstance(
        document.querySelector('#playedModal')
      ).hide();
    });
};

const handleShowHide = () => {
  const playedModal = document.getElementById('playedModal');
  if (playedModal) {
    playedModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;

      const gameId = button.getAttribute('data-bs-gameId');
      const gameName = button.getAttribute('data-bs-gameName');
      const title = button.getAttribute('data-bs-title');
      playedModal.querySelector('[name="game_id"]').value = gameId;
      playedModal.querySelector('[name="game_name"]').value = gameName;
      playedModal.querySelector('#playedModalLabel').innerText = title;

      let userPlayData = getUserPlayData(gameId);
      if (userPlayData) {
        playedModal.querySelector('[name="start_date"]').value =
          userPlayData.start_date;
        playedModal.querySelector('[name="end_date"]').value =
          userPlayData.end_date;
        playedModal.querySelector('[name="comments"]').value =
          userPlayData.comments;
        setRating(userPlayData.rating);

        addDeleteBtn(gameId);
      }
    });

    playedModal.addEventListener('hide.bs.modal', () => {
      ['star-1', 'star-2', 'star-3', 'star-4', 'star-5'].forEach((id) =>
        emptyStarClick(id)
      );
      document.querySelector('#mark-as-played').reset();
    });
  }
};

const interactiveStars = () => {
  document.querySelectorAll('.star').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      fillStar(item.id);
      switch (item.id) {
        case 'star-1':
          break;
        case 'star-2':
          fillStar('star-1');
          break;
        case 'star-3':
          ['star-1', 'star-2'].forEach((id) => fillStar(id));
          break;
        case 'star-4':
          ['star-1', 'star-2', 'star-3'].forEach((id) => fillStar(id));
          break;
        case 'star-5':
          ['star-1', 'star-2', 'star-3', 'star-4'].forEach((id) =>
            fillStar(id)
          );
          break;
      }
    });

    item.addEventListener('mouseout', () => {
      emptyStar(item.id);
      switch (item.id) {
        case 'star-1':
          break;
        case 'star-2':
          emptyStar('star-1');
          break;
        case 'star-3':
          ['star-1', 'star-2'].forEach((id) => emptyStar(id));
          break;
        case 'star-4':
          ['star-1', 'star-2', 'star-3'].forEach((id) => emptyStar(id));
          break;
        case 'star-5':
          ['star-1', 'star-2', 'star-3', 'star-4'].forEach((id) =>
            emptyStar(id)
          );
          break;
      }
    });

    item.addEventListener('click', () => {
      fillStarClick(item.id);
      switch (item.id) {
        case 'star-1':
          break;
        case 'star-2':
          fillStarClick('star-1');
          break;
        case 'star-3':
          ['star-1', 'star-2'].forEach((id) => fillStarClick(id));
          break;
        case 'star-4':
          ['star-1', 'star-2', 'star-3'].forEach((id) => fillStarClick(id));
          break;
        case 'star-5':
          ['star-1', 'star-2', 'star-3', 'star-4'].forEach((id) =>
            fillStarClick(id)
          );
          break;
      }
    });
  });

  document.querySelectorAll('.star-fill').forEach((item) => {
    item.addEventListener('click', () => {
      switch (item.id) {
        case 'star-1-fill':
          ['star-2', 'star-3', 'star-4', 'star-5'].forEach((id) =>
            emptyStarClick(id)
          );
          break;
        case 'star-2-fill':
          ['star-3', 'star-4', 'star-5'].forEach((id) => emptyStarClick(id));
          break;
        case 'star-3-fill':
          ['star-4', 'star-5'].forEach((id) => emptyStarClick(id));
          break;
        case 'star-4-fill':
          emptyStarClick('star-5');
          break;
        case 'star-5-fill':
          break;
      }
    });
  });
};

const addDeleteBtn = (gameId) => {
  const userPlayData = getLocalStorage('user-play-data');
  const userLibrary = getLocalStorage('user-library');

  const deleteBtn = `<button type="button" class="btn btn-outline-danger" id="delete-play-data">Delete Play Data</button>`;

  const handleDelete = () => {
    document
      .querySelector('#delete-play-data')
      .addEventListener('click', () => {
        let userPlayDataIndex = userPlayData.findIndex(
          (game) => game.game_id == gameId
        );
        userPlayData.splice(userPlayDataIndex, 1);
        setLocalStorage('user-play-data', userPlayData);

        let libraryIndex = userLibrary.findIndex((game) => game.id == gameId);
        userLibrary.splice(libraryIndex, 1);
        setLocalStorage('user-library', userLibrary);

        if (getParams('id')) {
          new GameDetails(gameId).update();
        } else {
          window.location.reload();
        }

        bootstrap.Modal.getInstance(
          document.querySelector('#playedModal')
        ).hide();
      });
  };

  let existingDeleteBtn = document.querySelector('#delete-play-data');
  if (!existingDeleteBtn) {
    renderWithTemplate(
      deleteBtn,
      document.querySelector('#mark-as-played-submit'),
      handleDelete,
      null,
      'beforebegin'
    );
  }
};

const fillStar = (query) => {
  let el = document.querySelector(`#${query}`);
  el.classList.remove('bi-star');
  el.classList.add('bi-star-fill');
};

const emptyStar = (query) => {
  let el = document.querySelector(`#${query}`);
  el.classList.add('bi-star');
  el.classList.remove('bi-star-fill');
};

const fillStarClick = (query) => {
  let filledStar = document.querySelector(`#${query}-fill`);
  filledStar.classList.remove('d-none');
  filledStar.classList.add('selected-star');

  let emptyStar = document.querySelector(`#${query}`);
  emptyStar.classList.add('d-none');
};

const emptyStarClick = (query) => {
  let filledStar = document.querySelector(`#${query}-fill`);
  filledStar.classList.add('d-none');
  filledStar.classList.remove('selected-star');

  let emptyStar = document.querySelector(`#${query}`);
  emptyStar.classList.remove('d-none');
};

const setRating = (rating) => {
  switch (rating) {
    case 1:
      fillStarClick('star-1');
      break;
    case 2:
      ['star-1', 'star-2'].forEach((id) => fillStarClick(id));
      break;
    case 3:
      ['star-1', 'star-2', 'star-3'].forEach((id) => fillStarClick(id));
      break;
    case 4:
      ['star-1', 'star-2', 'star-3', 'star-4'].forEach((id) =>
        fillStarClick(id)
      );
      break;
    case 5:
      ['star-1', 'star-2', 'star-3', 'star-4', 'star-5'].forEach((id) =>
        fillStarClick(id)
      );
      break;
  }
};

const updateUserEntries = (jsonFormData) => {
  let userPlayData = getLocalStorage('user-play-data');
  if (!userPlayData) {
    userPlayData = [];
    userPlayData.push(jsonFormData);
  } else {
    let index = userPlayData.findIndex(
      (game) => game.game_id == jsonFormData.game_id
    );

    if (index > -1) {
      userPlayData[index] = jsonFormData;
    } else {
      userPlayData.push(jsonFormData);
    }
  }
  setLocalStorage('user-play-data', userPlayData);
};

const updateUserLibrary = (gameId) => {
  let searchResults = getLocalStorage('search-results').results;
  let userLibrary = getLocalStorage('user-library');
  if (!userLibrary) {
    userLibrary = [];
  }
  let game = searchResults.find((game) => game.id == gameId);

  let index = userLibrary.findIndex(
    (libraryEntry) => libraryEntry.id == game.id
  );

  if (index < 0) {
    userLibrary.push(game);
  }

  setLocalStorage('user-library', userLibrary);
};

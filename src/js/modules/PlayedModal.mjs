import { formDataToJSON, getParams, renderWithTemplate } from './utils.mjs';
import GameDetails from './GameDetails.mjs';

export function interactiveStars() {
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
}

export function handleModalActions() {
  document
    .querySelector('#mark-as-played-submit')
    .addEventListener('click', () => {
      const form = document.querySelector('#mark-as-played');
      let jsonFormData = formDataToJSON(form);
      let filledStars = document.querySelectorAll('.selected-star');
      jsonFormData.rating = filledStars.length;
      updateLibraryStorage(jsonFormData);

      if (getParams('id')) {
        new GameDetails(jsonFormData.game_id).update();
      } else {
        window.location.reload();
      }

      bootstrap.Modal.getInstance(
        document.querySelector('#playedModal')
      ).hide();
    });
}

export function handleMetaData() {
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

      let userEntries = JSON.parse(localStorage.getItem('user-entries'));
      if (userEntries) {
        let game = userEntries.find((game) => game.game_id == gameId);

        if (game) {
          playedModal.querySelector('[name="start_date"]').value =
            game.start_date;
          playedModal.querySelector('[name="end_date"]').value = game.end_date;
          playedModal.querySelector('[name="comments"]').value = game.comments;
          setRating(game.rating);

          addDeleteBtn(userEntries, gameId);
        }
      }

    });

    playedModal.addEventListener('hide.bs.modal', (event) => {
      ['star-1', 'star-2', 'star-3', 'star-4', 'star-5'].forEach((id) =>
        emptyStarClick(id)
      );
      document.querySelector('#mark-as-played').reset();
    });
  }
}

function addDeleteBtn(userEntries, gameId) {
  const deleteBtn = `<button type="button" class="btn btn-danger" id="delete-play-data">Delete Play Data</button>`;

  renderWithTemplate(
    deleteBtn,
    document.querySelector('#mark-as-played-submit'),
    null,
    null,
    'beforebegin'
  );

  document.querySelector('#delete-play-data').addEventListener('click', () => {
    let gameIndex = userEntries.findIndex((game) => game.game_id == gameId);
    userEntries.splice(gameIndex, 1);
    localStorage.setItem('user-entries', JSON.stringify(userEntries));

    if (getParams('id')) {
      new GameDetails(gameId).update();
    } else {
      window.location.reload();
    }

    bootstrap.Modal.getInstance(document.querySelector('#playedModal')).hide();
  });
}

function fillStar(query) {
  let el = document.querySelector(`#${query}`);
  el.classList.remove('bi-star');
  el.classList.add('bi-star-fill');
}

function emptyStar(query) {
  let el = document.querySelector(`#${query}`);
  el.classList.add('bi-star');
  el.classList.remove('bi-star-fill');
}

function fillStarClick(query) {
  let filledStar = document.querySelector(`#${query}-fill`);
  filledStar.classList.remove('d-none');
  filledStar.classList.add('selected-star');

  let emptyStar = document.querySelector(`#${query}`);
  emptyStar.classList.add('d-none');
}

function emptyStarClick(query) {
  let filledStar = document.querySelector(`#${query}-fill`);
  filledStar.classList.add('d-none');
  filledStar.classList.remove('selected-star');

  let emptyStar = document.querySelector(`#${query}`);
  emptyStar.classList.remove('d-none');
}

function setRating(rating) {
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
}

function updateLibraryStorage(jsonFormData) {
  let userEntries = JSON.parse(localStorage.getItem('user-entries'));
  if (!userEntries) {
    userEntries = [];
  } else {
    let index = userEntries.findIndex(
      (game) => game.game_id == jsonFormData.game_id
    );

    if (index > -1) {
      userEntries[index] = jsonFormData;
    } else {
      userEntries.push(jsonFormData);
    }
  }
  localStorage.setItem('user-entries', JSON.stringify(userEntries));
}

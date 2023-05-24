import { formDataToJSON } from './utils.mjs';

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

export function submitMarkAsPlayed() {
  document
    .querySelector('#mark-as-played-submit')
    .addEventListener('click', () => {
      const form = document.querySelector('#mark-as-played');
      let jsonFormData = formDataToJSON(form);
      let filledStars = document.querySelectorAll('.selected-star');
      jsonFormData.rating = filledStars.length;
      console.log({ jsonFormData });

      let userLibrary;
      userLibrary = JSON.parse(localStorage.getItem('user-library'));
      if (!userLibrary) {
        userLibrary = [];
      }
      userLibrary.push(jsonFormData);
      localStorage.setItem('user-library', JSON.stringify(userLibrary));
    });
}

export function handleMetaData() {
  const playedModal = document.getElementById('playedModal');
  if (playedModal) {
    playedModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      const gameId = button.getAttribute('data-bs-gameId');
      playedModal.querySelector('[name="game_id"]').value = gameId;
      const gameName = button.getAttribute('data-bs-gameName');
      playedModal.querySelector('[name="game_name"]').value = gameName;

      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // const now = new Date();
      // const day = ('0' + now.getDate()).slice(-2);
      // const month = ('0' + (now.getMonth() + 1)).slice(-2);
      // const today = now.getFullYear() + '-' + month + '-' + day;
      // playedModal.querySelector('[name="start_date"]').value = today;
      // const tomorrow =
      //   now.getFullYear() + '-' + month + '-' + (parseInt(day) + 1);
      // playedModal.querySelector('[name="end_date"]').value = tomorrow;
      // playedModal.querySelector('[name="comments"]').value =
      //   'These are my test comments.';
    });

    playedModal.addEventListener('hide.bs.modal', (event) => {
      ['star-1', 'star-2', 'star-3', 'star-4', 'star-5'].forEach((id) =>
        emptyStarClick(id)
      );
      document.querySelector('#mark-as-played').reset();
    });
  }
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

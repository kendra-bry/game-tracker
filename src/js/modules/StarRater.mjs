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
  document.querySelector('#mark-as-played-submit').addEventListener('click', () => {
    console.log('submit');
  })
}

function fillStar(query) {
  let el = document.querySelector(`#${query}`);
  el.classList.remove('bi-star');
  el.classList.add('bi-star-fill', 'text-warning');
}

function emptyStar(query) {
  let el = document.querySelector(`#${query}`);
  el.classList.add('bi-star');
  el.classList.remove('bi-star-fill', 'text-warning');
}

function fillStarClick(query) {
  let filledStar = document.querySelector(`#${query}-fill`);
  filledStar.classList.remove('d-none');

  let emptyStar = document.querySelector(`#${query}`);
  emptyStar.classList.add('d-none');
}

function emptyStarClick(query) {
  let filledStar = document.querySelector(`#${query}-fill`);
  filledStar.classList.add('d-none');

  let emptyStar = document.querySelector(`#${query}`);
  emptyStar.classList.remove('d-none');
}

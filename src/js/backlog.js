import { loadHeaderFooter, loadModal } from './modules/utils.mjs';
import GameList from './modules/GameList.mjs';

loadHeaderFooter();
loadModal();

const backlog = JSON.parse(localStorage.getItem('user-backlog'));
if (backlog.length) {
  new GameList().render(backlog, document.querySelector('#card-holder'));
} else {
  document.querySelector('#no-backlog')?.classList.remove('d-none');
}

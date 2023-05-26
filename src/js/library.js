import { loadHeaderFooter, loadModal } from './modules/utils.mjs';
import GameList from './modules/GameList.mjs';

loadHeaderFooter();
loadModal();

const library = JSON.parse(localStorage.getItem('user-library'));
if (library?.length) {
  new GameList().render(library, document.querySelector('#card-holder'));
} else {
  document.querySelector('#no-library')?.classList.remove('d-none');
}

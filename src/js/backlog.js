import { loadHeaderFooter, loadModal } from './modules/utils.mjs';
import GameList from './modules/GameList.mjs';

loadHeaderFooter();
loadModal();

const backlog = JSON.parse(localStorage.getItem('user-backlog'));
new GameList().render(backlog, document.querySelector('#card-holder'));

// TODO- add to backlog
// TODO- if a game has a finished date, remove it from the backlog
// TODO- remove from backlog
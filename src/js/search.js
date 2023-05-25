import { loadHeaderFooter, loadModal } from './modules/utils.mjs';
import GameList from './modules/GameList.mjs';

loadHeaderFooter();
loadModal();

const games = JSON.parse(localStorage.getItem('search-results')).results;
console.log({ games });
new GameList().render(games, document.querySelector('#card-holder'));

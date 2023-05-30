import {
  getLocalStorage,
  loadHeaderFooter,
  loadModal,
} from './modules/utils.mjs';
import GameList from './modules/GameList.mjs';

loadHeaderFooter();
loadModal();

const games = getLocalStorage('search-results').results;
new GameList().render(games, document.querySelector('#card-holder'));

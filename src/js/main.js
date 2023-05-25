import { loadHeaderFooter, loadModal } from './modules/utils.mjs';
import GameListing from './modules/GameList.mjs';

loadHeaderFooter();
loadModal();

new GameListing().render();
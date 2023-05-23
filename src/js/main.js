import DataSource from './modules/DataSource.mjs';
import GameListing from './modules/GameList.mjs';
import { loadHeaderFooter, loadModal } from './modules/utils.mjs';

const dataSource = new DataSource();
const cardHolder = document.querySelector('#card-holder');

const gameList = new GameListing(dataSource, cardHolder);
gameList.init();

loadHeaderFooter();
loadModal();
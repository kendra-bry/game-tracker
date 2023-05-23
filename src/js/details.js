import { getParams } from './modules/utils.mjs';
import DataSource from './modules/DataSource.mjs';
import GameDetails from './modules/GameDetails.mjs';
import { loadHeaderFooter, loadModal } from './modules/utils.mjs';

const id = getParams('id');

const dataSource = new DataSource();
const details = new GameDetails(id, dataSource);
details.init();

loadHeaderFooter();
loadModal();

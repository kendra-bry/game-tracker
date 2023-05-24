import { formDataToJSON } from './utils.mjs';
import DataSource from './DataSource.mjs';
import GameListing from './GameList.mjs';

export default class Search {
  submitSearch() {
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const queryString = formDataToJSON(form);
      const dataSource = new DataSource();
      const gameList = new GameListing(dataSource, queryString.query);
      gameList.init();
    });
  }
}

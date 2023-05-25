import { formDataToJSON } from './utils.mjs';
import DataSource from './DataSource.mjs';

export default class Search {
  submitSearch() {
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const query = formDataToJSON(form);
      const dataSource = new DataSource();

      const results = await dataSource.search(query.query);
      localStorage.setItem('search-results', JSON.stringify(results));

      window.location.replace('/');
    });
  }
}

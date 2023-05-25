import { formDataToJSON } from './utils.mjs';
import DataSource from './DataSource.mjs';

export default class Search {
  init() {
    handleSubmit();
    setFocus();
  }
}

const handleSubmit = () => {
  const form = document.querySelector('#search-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = formDataToJSON(form);
    const dataSource = new DataSource();

    const results = await dataSource.search(query.query);
    localStorage.setItem('search-results', JSON.stringify(results));
    localStorage.setItem('search-query', JSON.stringify(query));

    window.location.replace('/search/index.html');
  });
};

const setFocus = () => {
  const searchBox = document.querySelector('#search-box');
  searchBox.addEventListener('focus', () => {
    searchBox.select();
  });
};

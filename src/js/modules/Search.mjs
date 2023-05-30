import { formDataToJSON, setLocalStorage } from './utils.mjs';
import DataSource from './DataSource.mjs';

export default class Search {
  init() {
    handleSubmit();
    setFocus();
  }
}

const handleSubmit = () => {
  const forms = document.querySelectorAll('.search-form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const searchBtns = document.querySelectorAll('.search-submit');
      searchBtns.forEach((btn) => btn.classList.add('d-none'));

      const searchingBtns = document.querySelectorAll('.searching-btn');
      searchingBtns.forEach((btn) => btn.classList.remove('d-none'));

      const query = formDataToJSON(form);
      const dataSource = new DataSource();

      const results = await dataSource.search(query.query);
      setLocalStorage('search-results', results);
      setLocalStorage('search-query', query);

      window.location.replace('/search/index.html');
    });
  });
};

const setFocus = () => {
  const searchBox = document.querySelector('#search-box');
  searchBox.addEventListener('focus', () => {
    searchBox.select();
  });
};

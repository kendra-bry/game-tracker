export default class GameListing {
  constructor(dataSource, query) {
    this.dataSource = dataSource;
    this.query = query;
  }

  async init() {
    const results = await this.dataSource.search(this.query);
    localStorage.setItem('search-results', JSON.stringify(results));
    window.location.replace('/');
  }
}

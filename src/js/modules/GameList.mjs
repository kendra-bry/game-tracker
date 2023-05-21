import { renderListWithTemplate, smallGameCardTemplate } from './utils.mjs';

export default class GameListing {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    this.games = await this.dataSource.getData();
    renderListWithTemplate(smallGameCardTemplate, this.listElement, this.games);
  }
}

